import { fail, ok } from "@/lib/api/response";
import { Recommendation } from "@/types/audit";

// ─── Types ────────────────────────────────────────────────────────────────────

type SummaryRequestBody = {
  teamSize: number;
  primaryUseCase: string;
  totalMonthlySpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  recommendations: Recommendation[];
};

// ─── Fallback (no AI key or timeout) ─────────────────────────────────────────

function getFallbackSummary(data: SummaryRequestBody): string {
  const { teamSize, totalMonthlySpend, totalMonthlySavings, totalAnnualSavings, recommendations } =
    data;

  if (!recommendations?.length || totalMonthlySavings <= 0) {
    return `Your SaaS spend audit shows an efficient configuration. For a team of ${teamSize}, your total monthly spend is $${totalMonthlySpend.toFixed(2)}. No immediate optimizations are recommended at this time. Keep monitoring your subscription usage monthly.`;
  }

  const topRec = [...recommendations].sort((a, b) => b.monthlySavings - a.monthlySavings)[0];

  return `Your spend audit reveals potential savings of $${totalMonthlySavings.toFixed(2)}/mo (or $${totalAnnualSavings.toFixed(2)}/yr) on a total monthly spend of $${totalMonthlySpend.toFixed(2)} for a team of ${teamSize}. The most significant savings come from the recommendation to "${topRec.action}" for ${topRec.tool}, saving $${topRec.monthlySavings.toFixed(2)}/mo due to ${topRec.reason.toLowerCase()} We recommend executing these adjustments starting with high-confidence items.`;
}

// ─── Gemini ───────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT =
  "You are Lucent, an expert SaaS spend optimization advisor. Summarize the spend audit in one concise, professional paragraph of 80 to 100 words. Do not use markdown bullet points or lists. Mention total current spend, potential monthly savings, and highlight the single most impactful recommendation to action.";

function buildUserPrompt(body: SummaryRequestBody): string {
  const recLines = body.recommendations
    .map(
      (r) =>
        `- Tool: ${r.tool}, Plan: ${r.currentPlan}, Action: ${r.action}, Reason: ${r.reason}, Savings: $${r.monthlySavings}/mo, Confidence: ${r.confidence}`
    )
    .join("\n");

  return `Audit payload:\nTeam Size: ${body.teamSize}\nPrimary Use Case: ${body.primaryUseCase}\nTotal Monthly Spend: $${body.totalMonthlySpend}\nTotal Monthly Savings: $${body.totalMonthlySavings}\nRecommendations:\n${recLines}`;
}

async function callGemini(userPrompt: string, signal: AbortSignal): Promise<string> {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) throw new Error("No Gemini API key configured");

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        generationConfig: { maxOutputTokens: 200 },
      }),
      signal,
    }
  );

  if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);
  const json = await res.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty Gemini response");
  return text.trim();
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  let body: SummaryRequestBody;
  try {
    body = await request.json();
  } catch {
    return fail("VALIDATION_ERROR", "Invalid payload.", 400);
  }

  if (!process.env.GEMINI_API_KEY) {
    return ok({ summary: getFallbackSummary(body), fallbackUsed: true });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4500);

  try {
    const summary = await callGemini(buildUserPrompt(body), controller.signal);
    return ok({ summary, fallbackUsed: false });
  } catch (error) {
    console.error("AI summary failed, using fallback:", error);
    return ok({ summary: getFallbackSummary(body), fallbackUsed: true });
  } finally {
    clearTimeout(timeoutId);
  }
}
