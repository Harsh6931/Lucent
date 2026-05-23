"use client";

import { useState } from "react";

type LeadCaptureFormProps = {
  auditId: string;
};

export function LeadCaptureForm({ auditId }: LeadCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function submitLead() {
    try {
      setStatus("saving");
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId, email, companyName, role, honeypot: "" })
      });
      if (!res.ok) throw new Error("lead failed");
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-slate-900">Save This Report</h2>
      <p className="mt-1 text-sm text-slate-600">Get a copy in your inbox. We only ask after showing your audit.</p>
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
          onClick={submitLead}
          disabled={!email || status === "saving"}
          className="h-11 rounded-md bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-slate-300 sm:col-span-2"
        >
          Save And Email Report
        </button>
        {status === "saved" ? <p className="text-sm text-green-600 sm:col-span-2">Report saved successfully.</p> : null}
        {status === "error" ? <p className="text-sm text-red-600 sm:col-span-2">Could not save lead. Try again.</p> : null}
      </form>
    </section>
  );
}

