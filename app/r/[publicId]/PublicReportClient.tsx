"use client";

import Link from "next/link";

type PublicReport = {
  publicId: string;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
};

type PublicReportClientProps = {
  publicId: string;
  initialData: PublicReport | null;
  error: boolean;
};

export default function PublicReportClient({ publicId, initialData, error }: PublicReportClientProps) {
  return (
    <>
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
        {error || !initialData ? (
          <p className="mt-3 text-sm text-red-600">Public report not found.</p>
        ) : (
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Monthly</p>
              <p className="text-3xl font-bold text-green-600">${Number(initialData.totalMonthlySavings).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Annual</p>
              <p className="text-3xl font-bold text-slate-900">${Number(initialData.totalAnnualSavings).toFixed(2)}</p>
            </div>
          </div>
        )}
        <Link
          href="/"
          className="mt-6 inline-flex h-11 items-center rounded-md bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Run Your Own Audit
        </Link>
      </section>
    </>
  );
}
