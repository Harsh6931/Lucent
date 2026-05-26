import type { Metadata } from "next";
import { AuditForm } from "@/components/audit/audit-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Free AI Spend Audit for Startups",
  description:
    "Lucent analyzes your AI tool stack — Cursor, Copilot, ChatGPT, Claude, and more — and finds where you are overspending. Free, instant, no login.",
};


export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main>
        <section className="mx-auto w-full max-w-6xl px-4 pb-8 pt-12 sm:px-6 lg:px-8 lg:pt-16">
          <p className="text-sm font-medium text-blue-700">AI Spend Audit For Startups</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Find hidden AI tool overspend in under two minutes.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600">
            Lucent analyzes your AI stack, flags plan mismatches, and estimates monthly and annual savings with clear reasoning.
          </p>
          <a
            href="#audit-form"
            className="mt-6 inline-flex h-11 items-center rounded-md bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Start Free Audit
          </a>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-6 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
            Supports Cursor, Copilot, Claude, ChatGPT, OpenAI API, Anthropic API, Gemini, and Windsurf.
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
          <AuditForm />
        </section>

        <section id="how-it-works" className="border-y border-slate-200 bg-white">
          <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
            {[
              { title: "1. Enter your stack", text: "Add plans, seats, and monthly spend for each AI tool." },
              { title: "2. Review recommendations", text: "See clear actions with estimated savings and confidence labels." },
              { title: "3. Save and share", text: "Capture report by email and share a PII-free public link." }
            ].map((step) => (
              <article key={step.title} className="rounded-lg border border-slate-200 p-4">
                <h2 className="text-base font-semibold text-slate-900">{step.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">What your output looks like</h2>
            <p className="mt-2 text-sm text-slate-600">
              Total monthly and annual savings, top priority actions, confidence meter, and per-tool recommendation table.
            </p>
          </div>
        </section>

        <section id="faq" className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              {
                q: "Do I need an account to use Lucent?",
                a: "No account, no sign-up, no password. Fill in your AI tool stack, hit Generate Audit, and see your full results instantly. We only ask for your email after you have already seen your savings report and even that is completely optional."
              },
              {
                q: "Are recommendations AI-generated guesses?",
                a: "No, every savings figure comes from a deterministic, rule based audit engine that compares your reported spend against real published pricing for Cursor, Copilot, Claude, ChatGPT, OpenAI API, Anthropic API, Gemini and Windsurf. The math is transparent and reproducible. AI (Google Gemini) is only used to write the personalised summary paragraph, the numbers behind it are never AI generated. Each recommendation also carries a confidence label (High / Medium / Low) with an explanation note."
              },
              {
                q: "Can I share reports publicly?",
                a: "Yes, every audit gets a unique shareable link that is safe to send to your team, CFO, or investors. The public view strips all personal identifiers — no email, company name, or role is ever exposed. Only the savings figures and tool recommendations are visible."
              },
              {
                q: "What if I am already optimized?",
                a: "We will tell you exactly that. If your stack is well-matched to your team size and usage, Lucent returns an honest result with zero savings opportunity, no upsell, no inflated numbers. Each recommendation includes a confidence label so you can see why we reached that conclusion. Re-run the audit any time your team grows or you add a new tool."
              },
              {
                q: "Is my spending data stored or sold?",
                a: "Your input data is used only to calculate your audit result and is stored in our database tied to an anonymous audit ID.Its never linked to your name, company or email unless you optionally submit the lead form afterwards. We do not sell, share or use your data for advertising. The public share link exposes only savings figures, not your spend inputs. You can treat the audit as fully disposable. There is no account to delete."
              }

            ].map(({ q, a }) => (
              <details key={q} className="rounded-lg border border-slate-200 bg-white p-4">
                <summary className="cursor-pointer text-sm font-semibold text-slate-900">{q}</summary>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

