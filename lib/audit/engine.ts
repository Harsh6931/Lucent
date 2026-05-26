import { ALTERNATIVE_BY_USE_CASE, MONTHLY_PLAN_PRICE } from "@/lib/audit/pricing";
import { AuditInput, Recommendation, ToolInput } from "@/types/audit";

export type AuditOutput = {
  totalMonthlySpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  recommendations: Recommendation[];
};

function planCost(tool: ToolInput): number {
  const base = MONTHLY_PLAN_PRICE[tool.key]?.[tool.plan] ?? 0;
  if (tool.key.includes("_api") || tool.plan === "API direct" || tool.plan === "Usage-based") {
    return tool.monthlySpend;
  }
  return base * Math.max(tool.seats, 1);
}

function confidenceFor(tool: ToolInput, modeled: number): Recommendation["confidence"] {
  if (tool.monthlySpend <= 0) return "low";
  if (tool.plan === "Usage-based" || tool.plan === "API direct") return "medium";
  const delta = Math.abs(tool.monthlySpend - modeled) / Math.max(tool.monthlySpend, 1);
  if (delta < 0.2) return "high";
  return "medium";
}

function recommendationForTool(input: AuditInput, tool: ToolInput): Recommendation {
  const currentMonthly = Math.max(tool.monthlySpend, 0);
  let projectedMonthly = currentMonthly;
  let action = "Keep current plan";
  let reason = "Current setup appears aligned with your reported usage.";

  const modeledCurrent = planCost(tool);
  const sameVendorOptions = Object.entries(MONTHLY_PLAN_PRICE[tool.key] ?? {}).map(([plan, price]) => ({
    plan,
    monthly: tool.key.includes("_api") || plan === "API direct" || plan === "Usage-based" ? currentMonthly : price * Math.max(tool.seats, 1)
  }));
  const cheaperOption = sameVendorOptions
    .filter((opt) => opt.monthly < currentMonthly && opt.plan !== tool.plan)
    .sort((a, b) => a.monthly - b.monthly)[0];

  if (cheaperOption) {
    projectedMonthly = cheaperOption.monthly;
    action = `Switch to ${cheaperOption.plan}`;
    reason = `Your current ${tool.plan} setup looks over-tiered for ${tool.seats} seat(s); ${cheaperOption.plan} should cover likely usage at lower cost.`;
  } else {
    const alt = ALTERNATIVE_BY_USE_CASE[input.primaryUseCase];
    if (alt.preferredTool !== tool.key && alt.estimatedMonthly < currentMonthly * 0.8) {
      projectedMonthly = alt.estimatedMonthly;
      action = `Consider ${alt.preferredTool} (${alt.targetPlan})`;
      reason = `For ${input.primaryUseCase} workflows, a lower-cost alternative could maintain capability with meaningful savings.`;
    } else if (modeledCurrent < currentMonthly && modeledCurrent > 0) {
      projectedMonthly = modeledCurrent;
      action = "Right-size current usage";
      reason = "Your reported spend is above modeled plan cost; usage controls or credit optimization can reduce waste.";
    }
  }

  const monthlySavings = Math.max(currentMonthly - projectedMonthly, 0);
  const confidence = confidenceFor(tool, modeledCurrent);

  let assumptionNote: string | undefined = undefined;
  if (confidence === "low") {
    assumptionNote = "Zero spend reported for active tool. Verify if this tool is actually in use or if the license was forgotten.";
  } else if (confidence === "medium") {
    if (tool.plan === "Usage-based" || tool.plan === "API direct") {
      assumptionNote = "Usage-based pricing assumes flat historical consumption; savings may vary with actual API/credit usage.";
    } else {
      assumptionNote = "Reported spend deviates significantly from modeled base plans. This may be due to custom discounts, API add-ons, or overages.";
    }
  }

  return {
    tool: tool.key,
    currentPlan: tool.plan,
    action,
    reason,
    currentMonthly: Number(currentMonthly.toFixed(2)),
    projectedMonthly: Number(projectedMonthly.toFixed(2)),
    monthlySavings: Number(monthlySavings.toFixed(2)),
    confidence,
    implementationEffort: monthlySavings > 100 ? "moderate" : "quick",
    assumptionNote
  };
}

export function runAudit(input: AuditInput): AuditOutput {
  const recommendations = input.tools.map((tool) => recommendationForTool(input, tool));
  const totalMonthlySpend = input.tools.reduce((sum, tool) => sum + Math.max(tool.monthlySpend, 0), 0);
  const totalMonthlySavings = recommendations.reduce((sum, item) => sum + item.monthlySavings, 0);
  return {
    totalMonthlySpend: Number(totalMonthlySpend.toFixed(2)),
    totalMonthlySavings: Number(totalMonthlySavings.toFixed(2)),
    totalAnnualSavings: Number((totalMonthlySavings * 12).toFixed(2)),
    recommendations
  };
}

