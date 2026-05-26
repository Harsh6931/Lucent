"use client";

import { useState } from "react";

type LeadCaptureFormProps = {
  auditId: string;
};

export function LeadCaptureForm({ auditId }: LeadCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<"idle" | "notice" | "saving" | "saved" | "error">("idle");

  /** First click shows the sandbox notice; second click (Confirm) proceeds. */
  function handleButtonClick() {
    if (status === "idle") {
      setStatus("notice");
      return;
    }
    void submitLead();
  }

  async function submitLead() {
    try {
      setStatus("saving");
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId, email, companyName, role, honeypot: "" }),
      });
      if (!res.ok) throw new Error("lead failed");
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }

  const buttonLabel =
    status === "saving"
      ? "Sending…"
      : status === "notice"
      ? "Confirm & Send"
      : "Save And Email Report";

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-slate-900">Save This Report</h2>
      <p className="mt-1 text-sm text-slate-600">
        Get a copy in your inbox. We only ask after showing your audit.
      </p>

      {/* ── Sandbox notice banner ─────────────────────────────────────────── */}
      {status === "notice" && (
        <div
          role="status"
          aria-live="polite"
          className="mt-4 flex items-start gap-3 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800"
        >
          {/* Info icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="mt-0.5 h-4 w-4 shrink-0 text-amber-500"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
              clipRule="evenodd"
            />
          </svg>

          <div className="flex-1">
            <p className="font-semibold leading-snug">Demo Environment Notice</p>
            <p className="mt-1 leading-relaxed">
              This product is currently running in a <strong>sandbox email mode</strong> powered
              by&nbsp;Resend. In this configuration, outbound emails are restricted to the
              developer&apos;s verified address only.External recipients will not receive
              a&nbsp;delivery.
            </p>
            <p className="mt-2 text-xs text-amber-700">
              This behaviour is intentional for portfolio &amp; evaluation purposes and would be
              lifted upon connecting a verified sending domain in production.
            </p>
          </div>

          {/* Dismiss */}
          <button
            type="button"
            aria-label="Dismiss notice"
            onClick={() => setStatus("idle")}
            className="ml-1 shrink-0 rounded p-0.5 text-amber-600 hover:bg-amber-100 hover:text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>
      )}
      {/* ──────────────────────────────────────────────────────────────────── */}

      <form className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium text-slate-700 sm:col-span-2">
          Work email
          <input
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 text-slate-900 outline-none ring-blue-600 focus:ring"
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Company (optional)
          <input
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 text-slate-900 outline-none ring-blue-600 focus:ring"
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Role (optional)
          <input
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 text-slate-900 outline-none ring-blue-600 focus:ring"
          />
        </label>
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={!email || status === "saving" || status === "saved"}
          className="h-11 rounded-md bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-slate-300 sm:col-span-2"
        >
          {buttonLabel}
        </button>
        {status === "saved" ? (
          <p className="text-sm text-green-600 sm:col-span-2">Report saved successfully.</p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm text-red-600 sm:col-span-2">Could not save lead. Try again.</p>
        ) : null}
      </form>
    </section>
  );
}
