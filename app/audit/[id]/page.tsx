"use client";

import { use, useEffect, useMemo, useState } from "react";
import { AiSummaryCard } from "@/components/audit/ai-summary-card";
import { LeadCaptureForm } from "@/components/audit/lead-capture-form";
import { PriorityActionQueue } from "@/components/audit/priority-action-queue";
import { RecommendationTable } from "@/components/audit/recommendation-table";
import { SavingsHero } from "@/components/audit/savings-hero";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Recommendation } from "@/types/audit";

type AuditPageProps = { params: Promise<{ id: string }> };
type AuditPayload = {
  id: string;
  publicId: string;
  totalMonthlySpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  auditPayload: { output: { recommendations: Recommendation[] } };
};

export default function AuditResultPage({ params }: AuditPageProps) {
  const { id } = use(params);
  const [data, setData] = useState<AuditPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAudit() {
      try {
        setLoading(true);
        const res = await fetch(`/api/audit/${id}`);
        const json = await res.json();
        if (!res.ok) throw new Error("fetch failed");
        setData(json.data);
      } finally {
        setLoading(false);
      }
    }
    loadAudit();
  }, [id]);

  const recommendations = useMemo(() => data?.auditPayload?.output?.recommendations ?? [], [data]);
  const totalMonthlySavings = data?.totalMonthlySavings ?? 0;
  const totalAnnualSavings = data?.totalAnnualSavings ?? 0;
  const highSavings = totalMonthlySavings > 500;
  const lowSavings = totalMonthlySavings < 100;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-600">Loading audit...</p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-sm text-red-600">Audit not found.</p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Audit ID: {id}</p>
        <SavingsHero totalMonthlySavings={totalMonthlySavings} totalAnnualSavings={totalAnnualSavings} />
        <PriorityActionQueue items={recommendations} />
        <RecommendationTable items={recommendations} />
        <AiSummaryCard summary="Audit generated. AI personalized summary API will be connected in next phase." fallbackUsed />

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

        <LeadCaptureForm auditId={data.id} />
      </main>
      <SiteFooter />
    </div>
  );
}

