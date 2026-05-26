import { describe, expect, it } from "vitest";
import { runAudit } from "@/lib/audit/engine";
import { AuditInput } from "@/types/audit";

describe("runAudit", () => {
  it("recommends cheaper same-vendor option for over-tiered seat plan", () => {
    const input: AuditInput = {
      teamSize: 2,
      primaryUseCase: "coding",
      tools: [{ key: "cursor", plan: "Business", monthlySpend: 120, seats: 2 }]
    };
    const out = runAudit(input);
    expect(out.recommendations[0].action).toContain("Switch to");
    expect(out.recommendations[0].monthlySavings).toBeGreaterThan(0);
  });

  it("handles low/no-savings case honestly", () => {
    const input: AuditInput = {
      teamSize: 1,
      primaryUseCase: "coding",
      tools: [{ key: "copilot", plan: "Individual", monthlySpend: 10, seats: 1 }]
    };
    const out = runAudit(input);
    expect(out.totalMonthlySavings).toBeGreaterThanOrEqual(0);
  });

  it("aggregates monthly and annual savings correctly", () => {
    const input: AuditInput = {
      teamSize: 5,
      primaryUseCase: "mixed",
      tools: [
        { key: "chatgpt", plan: "Team", monthlySpend: 200, seats: 5 },
        { key: "claude", plan: "Team", monthlySpend: 180, seats: 5 }
      ]
    };
    const out = runAudit(input);
    expect(out.totalAnnualSavings).toBe(Number((out.totalMonthlySavings * 12).toFixed(2)));
  });

  it("never returns negative savings", () => {
    const input: AuditInput = {
      teamSize: 3,
      primaryUseCase: "research",
      tools: [{ key: "claude", plan: "Pro", monthlySpend: 20, seats: 1 }]
    };
    const out = runAudit(input);
    out.recommendations.forEach((item) => expect(item.monthlySavings).toBeGreaterThanOrEqual(0));
  });

  it("assigns confidence labels for recommendations", () => {
    const input: AuditInput = {
      teamSize: 3,
      primaryUseCase: "data",
      tools: [{ key: "openai_api", plan: "Usage-based", monthlySpend: 300, seats: 3 }]
    };
    const out = runAudit(input);
    expect(["high", "medium", "low"]).toContain(out.recommendations[0].confidence);
  });

  it("attaches an assumption note for low or medium confidence recommendations", () => {
    const input: AuditInput = {
      teamSize: 2,
      primaryUseCase: "coding",
      tools: [
        { key: "cursor", plan: "Business", monthlySpend: 0, seats: 2 },
        { key: "openai_api", plan: "Usage-based", monthlySpend: 150, seats: 2 }
      ]
    };
    const out = runAudit(input);
    expect(out.recommendations[0].confidence).toBe("low");
    expect(out.recommendations[0].assumptionNote).toContain("Zero spend reported");
    expect(out.recommendations[1].confidence).toBe("medium");
    expect(out.recommendations[1].assumptionNote).toContain("Usage-based pricing assumes");
  });
});

