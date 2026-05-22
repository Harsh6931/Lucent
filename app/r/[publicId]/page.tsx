import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type PublicReportPageProps = { params: { publicId: string } };

export default function PublicReportPage({ params }: PublicReportPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Public Report</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Lucent Audit Snapshot</h1>
          <p className="mt-2 text-sm text-slate-600">Report ID: {params.publicId}</p>
          <p className="mt-4 text-sm text-slate-700">
            This is a share-safe version of the audit. Personal identifiers are removed by default.
          </p>
        </section>

        <section className="mt-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Estimated Savings</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Monthly</p>
              <p className="text-3xl font-bold text-green-600">$119.00</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Annual</p>
              <p className="text-3xl font-bold text-slate-900">$1428.00</p>
            </div>
          </div>
          <a
            href="/"
            className="mt-6 inline-flex h-11 items-center rounded-md bg-sky-500 px-5 text-sm font-semibold text-white hover:bg-sky-600"
          >
            Run Your Own Audit
          </a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
