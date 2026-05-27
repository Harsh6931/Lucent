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
  "You are Lucent, an expert SaaS spend optimization advisor. Write one polished paragraph of 2 to 4 complete sentences, around 70 to 110 words. Mention total current spend, potential monthly and annual savings, and the single most impactful recommendation. Do not use markdown bullets. Do not invent savings or details not present in the audit payload. Always finish the final sentence.";

function asNumber(value: number | string | null | undefined): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function money(value: number | string | null | undefined): string {
  return asNumber(value).toFixed(2);
}

export function getFallbackSummary(data: SummaryRequestBody): string {
  const { teamSize, totalMonthlySpend, totalMonthlySavings, totalAnnualSavings, recommendations } = data;
  const monthlySavings = asNumber(totalMonthlySavings);

  if (!recommendations?.length || monthlySavings <= 0) {
    return `Your AI spend audit shows an efficient configuration for a team of ${teamSize}. Current monthly AI spend is $${money(totalMonthlySpend)}, and Lucent did not find a defensible savings opportunity from the submitted stack. Keep the current setup for now, but recheck monthly because AI vendor pricing, credits, and team usage can change quickly.`;
  }

  const sorted = [...recommendations].sort((a, b) => asNumber(b.monthlySavings) - asNumber(a.monthlySavings));
  const topRec = sorted[0];
  const secondRec = sorted[1];
  const secondSentence = secondRec
    ? ` A secondary opportunity is "${secondRec.action}" for ${secondRec.tool}, which adds another $${money(secondRec.monthlySavings)}/mo in potential savings.`
    : "";

  return `Your audit found $${money(monthlySavings)}/mo in potential savings, or $${money(totalAnnualSavings)}/yr, against current monthly AI spend of $${money(totalMonthlySpend)} for a team of ${teamSize}. The highest-impact action is "${topRec.action}" for ${topRec.tool}, which could save about $${money(topRec.monthlySavings)}/mo.${secondSentence} Start with the highest-confidence items first, then revisit medium-confidence recommendations once usage data is clearer.`;
}

function buildUserPrompt(body: SummaryRequestBody): string {
  const recLines = body.recommendations
    .map(
      (r) =>
        `Tool: ${r.tool}; Plan: ${r.currentPlan}; Action: ${r.action}; Reason: ${r.reason}; Savings: $${money(
          r.monthlySavings
        )}/mo; Confidence: ${r.confidence}`
    )
    .join("\n");

  return [
    `Team size: ${body.teamSize}`,
    `Primary use case: ${body.primaryUseCase}`,
    `Total monthly spend: $${money(body.totalMonthlySpend)}`,
    `Total monthly savings: $${money(body.totalMonthlySavings)}`,
    `Total annual savings: $${money(body.totalAnnualSavings)}`,
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
        temperature: 0.35,
        maxOutputTokens: 320
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

export function isCompleteUsefulSummary(summary: string): boolean {
  const trimmed = summary.trim();
  const sentenceCount = (trimmed.match(/[.!?](\s|$)/g) ?? []).length;
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  return trimmed.length >= 180 && wordCount >= 35 && sentenceCount >= 2 && /[.!?]$/.test(trimmed);
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
    if (!isCompleteUsefulSummary(summary)) {
      return ok({ summary: getFallbackSummary(body), fallbackUsed: true, reason: "ai_summary_too_short" });
    }
    return ok({ summary, fallbackUsed: false, model: getGeminiModelName() });
  } catch (error) {
    console.error("AI summary failed, using fallback:", error);
    return ok({ summary: getFallbackSummary(body), fallbackUsed: true, reason: "gemini_request_failed" });
  } finally {
    clearTimeout(timeoutId);
  }
}
