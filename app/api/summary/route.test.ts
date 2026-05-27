import { describe, expect, it } from "vitest";
import { getFallbackSummary, isCompleteUsefulSummary } from "@/app/api/summary/route";
import { Recommendation } from "@/types/audit";

const recommendation: Recommendation = {
  tool: "Cursor",
  currentPlan: "Business",
  action: "Switch to Pro",
  reason: "Business features are not needed for the current seat count.",
  currentMonthly: 120,
  projectedMonthly: 40,
  monthlySavings: 80,
  confidence: "high",
  implementationEffort: "quick"
};

describe("summary helpers", () => {
  it("generates a useful multi-sentence fallback summary when savings exist", () => {
    const summary = getFallbackSummary({
      teamSize: 4,
      primaryUseCase: "coding",
      totalMonthlySpend: 240,
      totalMonthlySavings: 80,
      totalAnnualSavings: 960,
      recommendations: [recommendation]
    });

    expect(summary).toContain("$80.00/mo");
    expect(summary).toContain("$960.00/yr");
    expect(summary).toContain("Switch to Pro");
    expect((summary.match(/[.!?](\s|$)/g) ?? []).length).toBeGreaterThanOrEqual(2);
    expect(summary.split(/\s+/).length).toBeGreaterThanOrEqual(35);
  });

  it("rejects broken or incomplete AI summaries", () => {
    expect(isCompleteUsefulSummary("This spend audit identifies a current total monthly")).toBe(false);
  });

  it("accepts complete 2-4 sentence AI summaries", () => {
    const summary =
      "Lucent found $80.00/mo in potential savings on a $240.00/mo AI stack, equal to $960.00/yr. The highest-impact recommendation is to switch Cursor from Business to Pro because the current seat count does not need Business features. Start with this high-confidence change, then review usage again next month.";

    expect(isCompleteUsefulSummary(summary)).toBe(true);
  });
});

