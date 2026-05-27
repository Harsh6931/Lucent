import { fail, ok } from "@/lib/api/response";
import { Recommendation } from "@/types/audit";

type SummaryRequestBody = {
  teamSize: number;
  primaryUseCase: string;
  totalMonthlySpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  recommendations: Recommendation[];
};

const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

const SYSTEM_PROMPT =
  "You are Lucent, an expert SaaS spend optimization advisor. Summarize the spend audit in one concise, professional paragraph of 80 to 100 words. Do not use markdown bullet points or lists. Mention total current spend, potential monthly savings, and highlight the single most impactful recommendation to action. Do not invent savings or details not present in the audit payload.";

function getFallbackSummary(data: SummaryRequestBody): string {
  const { teamSize, totalMonthlySpend, totalMonthlySavings, totalAnnualSavings, recommendations } = data;

  if (!recommendations?.length || totalMonthlySavings <= 0) {
    return `Your AI spend audit shows an efficient configuration. For a team of ${teamSize}, your total monthly spend is $${totalMonthlySpend.toFixed(2)}. No immediate optimizations are recommended right now, but it is worth rechecking monthly as vendor pricing and credits change.`;
  }

  const topRec = [...recommendations].sort((a, b) => b.monthlySavings - a.monthlySavings)[0];

  return `Your audit shows potential savings of $${totalMonthlySavings.toFixed(2)}/mo, or $${totalAnnualSavings.toFixed(2)}/yr, on a total monthly AI spend of $${totalMonthlySpend.toFixed(2)} for a team of ${teamSize}. The highest-impact action is "${topRec.action}" for ${topRec.tool}, which could save about $${topRec.monthlySavings.toFixed(2)}/mo. Start with high-confidence recommendations, then revisit medium-confidence items once usage data is clearer.`;
}

function buildUserPrompt(body: SummaryRequestBody): string {
  const recLines = body.recommendations
    .map(
      (r) =>
        `Tool: ${r.tool}; Plan: ${r.currentPlan}; Action: ${r.action}; Reason: ${r.reason}; Savings: $${r.monthlySavings}/mo; Confidence: ${r.confidence}`
    )
    .join("\n");

  return [
    `Team size: ${body.teamSize}`,
    `Primary use case: ${body.primaryUseCase}`,
    `Total monthly spend: $${body.totalMonthlySpend}`,
    `Total monthly savings: $${body.totalMonthlySavings}`,
    `Total annual savings: $${body.totalAnnualSavings}`,
    "Recommendations:",
    recLines || "No recommendations."
  ].join("\n");
}

function getGeminiModelName(): string {
  const configured = process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;
  return configured.startsWith("models/") ? configured : `models/${configured}`;
}

async function callGemini(userPrompt: string, signal: AbortSignal): Promise<string> {
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  if (!geminiKey) throw new Error("No Gemini API key configured");

  const modelName = getGeminiModelName();
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${encodeURIComponent(
    geminiKey
  )}`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 220
      }
    }),
    signal
  });

  if (!res.ok) {
    const details = await res.text().catch(() => "");
    throw new Error(`Gemini API error ${res.status}: ${details.slice(0, 300)}`);
  }

  const json = await res.json();
  const text = json.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text ?? "").join("").trim();
  if (!text) throw new Error("Empty Gemini response");
  return text;
}

export async function POST(request: Request) {
  let body: SummaryRequestBody;

  try {
    body = await request.json();
  } catch {
    return fail("VALIDATION_ERROR", "Invalid summary payload.", 400);
  }

  if (!process.env.GEMINI_API_KEY?.trim()) {
    return ok({ summary: getFallbackSummary(body), fallbackUsed: true, reason: "missing_gemini_api_key" });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const summary = await callGemini(buildUserPrompt(body), controller.signal);
    return ok({ summary, fallbackUsed: false, model: getGeminiModelName() });
  } catch (error) {
    console.error("AI summary failed, using fallback:", error);
    return ok({ summary: getFallbackSummary(body), fallbackUsed: true, reason: "gemini_request_failed" });
  } finally {
    clearTimeout(timeoutId);
  }
}

