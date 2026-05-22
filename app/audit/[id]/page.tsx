"use client";

import { useMemo } from "react";
import { AiSummaryCard } from "@/components/audit/ai-summary-card";
import { LeadCaptureForm } from "@/components/audit/lead-capture-form";
import { PriorityActionQueue } from "@/components/audit/priority-action-queue";
import { RecommendationTable } from "@/components/audit/recommendation-table";
import { SavingsHero } from "@/components/audit/savings-hero";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Recommendation } from "@/types/audit";

type AuditPageProps = { params: { id: string } };

const SAMPLE_RECOMMENDATIONS: Recommendation[] = [
  {
    tool: "GitHub Copilot",
    currentPlan: "Business",
    action: "Move 2 seats to Individual",
    reason: "Two seats have low usage and can shift to lower-cost plans without blocking coding workflows.",
    currentMonthly: 95,
    projectedMonthly: 71,
    monthlySavings: 24,
    confidence: "high",
    implementationEffort: "quick"
  },
  {
    tool: "Claude",
    currentPlan: "Team",
    action: "Downgrade to Pro for 3 users",
    reason: "Team features are underutilized for current collaboration pattern and seat count.",
    currentMonthly: 150,
    projectedMonthly: 90,
    monthlySavings: 60,
    confidence: "medium",
    implementationEffort: "moderate"
  },
  {
    tool: "OpenAI API",
    currentPlan: "Usage-based",
    action: "Optimize model mix and route bulk workloads",
    reason: "Routing non-critical workloads to lower-cost models reduces monthly API burn.",
    currentMonthly: 120,
    projectedMonthly: 85,
    monthlySavings: 35,
    confidence: "medium",
    implementationEffort: "quick"
  }
];

export default function AuditResultPage({ params }: AuditPageProps) {
  const totalMonthlySavings = useMemo(
    () => SAMPLE_RECOMMENDATIONS.reduce((sum, item) => sum + item.monthlySavings, 0),
    []
  );
  const totalAnnualSavings = totalMonthlySavings * 12;
  const highSavings = totalMonthlySavings > 500;
  const lowSavings = totalMonthlySavings < 100;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Audit ID: {params.id}</p>
        <SavingsHero totalMonthlySavings={totalMonthlySavings} totalAnnualSavings={totalAnnualSavings} />
        <PriorityActionQueue items={SAMPLE_RECOMMENDATIONS} />
        <RecommendationTable items={SAMPLE_RECOMMENDATIONS} />
        <AiSummaryCard
          summary="Your current stack can likely save around $119 per month by right-sizing collaboration plans and reducing API waste in non-critical workflows. The highest-confidence changes are lightweight and can be implemented quickly without reducing day-to-day output quality."
        />

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">Next Best Step</h2>
          {highSavings ? (
            <p className="mt-2 text-sm text-slate-700">
              Your savings potential is high. Book a Credex consultation to capture deeper credit-based optimizations.
            </p>
          ) : null}
          {lowSavings ? (
            <p className="mt-2 text-sm text-slate-700">
              Your stack appears efficient. Join optimization alerts to get notified when new pricing opportunities appear.
            </p>
          ) : null}
          {!highSavings && !lowSavings ? (
            <p className="mt-2 text-sm text-slate-700">
              You have meaningful savings potential. Start with the top two actions and re-audit next month.
            </p>
          ) : null}
        </section>

        <LeadCaptureForm />
      </main>
      <SiteFooter />
    </div>
  );
}
