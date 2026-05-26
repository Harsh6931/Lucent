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

function getFallbackSummary(data: SummaryRequestBody): string {
  const { teamSize, totalMonthlySpend, totalMonthlySavings, totalAnnualSavings, recommendations } = data;

  if (!recommendations || recommendations.length === 0 || totalMonthlySavings <= 0) {
    return `Your SaaS spend audit shows an efficient configuration. For a team of ${teamSize}, your total monthly spend is $${totalMonthlySpend.toFixed(2)}. No immediate optimizations are recommended at this time. Keep monitoring your subscription usage monthly.`;
  }

  const topRec = [...recommendations].sort((a, b) => b.monthlySavings - a.monthlySavings)[0];

  return `Your spend audit reveals potential savings of $${totalMonthlySavings.toFixed(2)}/mo (or $${totalAnnualSavings.toFixed(2)}/yr) on a total monthly spend of $${totalMonthlySpend.toFixed(2)} for a team of ${teamSize}. The most significant savings come from the recommendation to "${topRec.action}" for ${topRec.tool}, saving $${topRec.monthlySavings.toFixed(2)}/mo due to ${topRec.reason.toLowerCase()} We recommend executing these adjustments starting with high-confidence items.`;
}

const SYSTEM_PROMPT = "You are Lucent, an expert SaaS spend optimization advisor. Summarize the spend audit in one concise, professional paragraph of 80 to 100 words. Do not use markdown bullet points or lists. Mention total current spend, potential monthly savings, and highlight the single most impactful recommendation to action.";

function buildUserPrompt(body: SummaryRequestBody): string {
  return `Audit payload:
Team Size: ${body.teamSize}
Primary Use Case: ${body.primaryUseCase}
Total Monthly Spend: $${body.totalMonthlySpend}
Total Monthly Savings: $${body.totalMonthlySavings}
Recommendations:
${body.recommendations.map(r => `- Tool: ${r.tool}, Plan: ${r.currentPlan}, Action: ${r.action}, Reason: ${r.reason}, Savings: $${r.monthlySavings}/mo, Confidence: ${r.confidence}`).join("\n")}`;
}

async function callAI(systemPrompt: string, userPrompt: string, signal: AbortSignal): Promise<string> {
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  if (anthropicKey) {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 200,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
      signal,
    });
    if (!res.ok) throw new Error(`Anthropic API returned status ${res.status}`);
    const json = await res.json();
    const text = json.content?.[0]?.text;
    if (!text) throw new Error("Empty response from Anthropic");
    return text.trim();
  }

  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) throw new Error("No AI key configured");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${openaiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      max_tokens: 200,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
    }),
    signal,
  });
  if (!res.ok) throw new Error(`OpenAI API returned status ${res.status}`);
  const json = await res.json();
  const text = json.choices?.[0]?.message?.content;
  if (!text) throw new Error("Empty response from OpenAI");
  return text.trim();
}

export async function POST(request: Request) {
  let body: SummaryRequestBody;
  try {
    body = await request.json();
  } catch {
    return fail("VALIDATION_ERROR", "Invalid payload.", 400);
  }

  if (!process.env.ANTHROPIC_API_KEY && !process.env.OPENAI_API_KEY) {
    return ok({ summary: getFallbackSummary(body), fallbackUsed: true });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4500);

  try {
    const summary = await callAI(SYSTEM_PROMPT, buildUserPrompt(body), controller.signal);
    return ok({ summary, fallbackUsed: false });
  } catch (error) {
    console.error("AI summary failed, using fallback:", error);
    return ok({ summary: getFallbackSummary(body), fallbackUsed: true });
  } finally {
    clearTimeout(timeoutId);
  }
}
