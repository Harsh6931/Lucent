import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function AuditLoading() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-5">
          {/* Savings hero skeleton */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="h-4 w-48 rounded bg-slate-200" />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="h-10 w-32 rounded bg-slate-200" />
              <div className="h-10 w-32 rounded bg-slate-200" />
            </div>
          </div>
          {/* Card skeletons */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="h-5 w-40 rounded bg-slate-200" />
              <div className="mt-4 space-y-2">
                <div className="h-4 w-full rounded bg-slate-100" />
                <div className="h-4 w-3/4 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
