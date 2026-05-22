import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Privacy Policy</h1>
          <p className="mt-2 text-sm text-slate-600">
            Lucent captures only the minimum data required for audit delivery and lead follow-up. Public report links strip identifying details.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
