"use client";

import { use, useEffect, useState } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import Link from "next/link";

type PublicReportPageProps = { params: Promise<{ publicId: string }> };
type PublicReport = {
  publicId: string;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
};

export default function PublicReportPage({ params }: PublicReportPageProps) {
  const { publicId } = use(params);
  const [data, setData] = useState<PublicReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`/api/report/${publicId}`);
        const json = await res.json();
        if (!res.ok) throw new Error("not found");
        setData(json.data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [publicId]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Public Report</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Lucent Audit Snapshot</h1>
          <p className="mt-2 text-sm text-slate-600">Report ID: {publicId}</p>
          <p className="mt-4 text-sm text-slate-700">
            This is a share-safe version of the audit. Personal identifiers are removed by default.
          </p>
        </section>

        <section className="mt-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Estimated Savings</h2>
          {loading ? <p className="mt-3 text-sm text-slate-600">Loading report...</p> : null}
          {!loading && !data ? <p className="mt-3 text-sm text-red-600">Public report not found.</p> : null}
          {data ? (
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Monthly</p>
                <p className="text-3xl font-bold text-green-600">${Number(data.totalMonthlySavings).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Annual</p>
                <p className="text-3xl font-bold text-slate-900">${Number(data.totalAnnualSavings).toFixed(2)}</p>
              </div>
            </div>
          ) : null}
          <Link
            href="/"
            className="mt-6 inline-flex h-11 items-center rounded-md bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Run Your Own Audit
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

