"use client";

export function LeadCaptureForm() {
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
            className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 text-slate-900 outline-none ring-sky-500 focus:ring"
          />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Company (optional)
          <input className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 text-slate-900 outline-none ring-sky-500 focus:ring" />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Role (optional)
          <input className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 text-slate-900 outline-none ring-sky-500 focus:ring" />
        </label>
        <button type="button" className="h-11 rounded-md bg-sky-500 px-5 text-sm font-semibold text-white hover:bg-sky-600 sm:col-span-2">
          Save And Email Report
        </button>
      </form>
    </section>
  );
}
