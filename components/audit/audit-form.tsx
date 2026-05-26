"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PRIMARY_USE_CASES, QUICK_PRESETS, TOOL_OPTIONS } from "@/lib/constants/audit-config";
import { AuditInput, ToolInput, ToolKey } from "@/types/audit";

const STORAGE_KEY = "lucent-audit-input";

// Build a lookup map once at module level — avoids O(n) find() on every render
const TOOL_LABEL_MAP: Record<ToolKey, string> = Object.fromEntries(
  TOOL_OPTIONS.map((t) => [t.key, t.label])
) as Record<ToolKey, string>;

export function AuditForm() {
  const router = useRouter();
  const [form, setForm] = useState<AuditInput>({
    teamSize: 5,
    primaryUseCase: "coding",
    tools: [],
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hydrate from localStorage after mount (SSR-safe)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as AuditInput;
      if (parsed?.tools?.length) setForm(parsed);
    } catch {
      // Ignore malformed or missing drafts
    }
  }, []);

  const totalSpend = useMemo(
    () => form.tools.reduce((sum, t) => sum + Number(t.monthlySpend || 0), 0),
    [form.tools]
  );

  function applyPreset(presetId: string) {
    const preset = QUICK_PRESETS.find((p) => p.id === presetId);
    if (preset) setForm(preset.payload);
  }

  function addTool(toolKey: ToolKey) {
    if (form.tools.some((t) => t.key === toolKey)) return;
    const config = TOOL_OPTIONS.find((t) => t.key === toolKey);
    if (!config) return;
    const next: ToolInput = { key: toolKey, plan: config.plans[0], monthlySpend: 0, seats: 1 };
    setForm((prev) => ({ ...prev, tools: [...prev.tools, next] }));
  }

  function removeTool(toolKey: ToolKey) {
    setForm((prev) => ({ ...prev, tools: prev.tools.filter((t) => t.key !== toolKey) }));
  }

  function updateTool(toolKey: ToolKey, patch: Partial<ToolInput>) {
    setForm((prev) => ({
      ...prev,
      tools: prev.tools.map((t) => (t.key === toolKey ? { ...t, ...patch } : t)),
    }));
  }

  async function submitAudit() {
    setSubmitting(true);
    setError(null);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok || !json?.data?.id) throw new Error("audit failed");
      router.push(`/audit/${json.data.id}`);
    } catch {
      setError("Could not generate audit right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="audit-form" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Run Your AI Spend Audit</h2>
        <p className="mt-1 text-sm text-slate-600">
          No login required. You will see results before any email request.
        </p>
      </div>

      {/* Quick presets */}
      <div className="mb-6 grid gap-3 md:grid-cols-3">
        {QUICK_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => applyPreset(preset.id)}
            className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-left hover:border-blue-600 hover:bg-blue-50 transition-colors"
          >
            <div className="text-sm font-semibold text-slate-900">{preset.label}</div>
            <div className="mt-1 text-xs text-slate-600">{preset.description}</div>
          </button>
        ))}
      </div>

      {/* Global inputs */}
      <div className="grid gap-4 md:grid-cols-3">
        <label className="text-sm font-medium text-slate-700">
          Team size
          <input
            type="number"
            min={1}
            value={form.teamSize}
            onChange={(e) => setForm((prev) => ({ ...prev, teamSize: Math.max(1, Number(e.target.value)) }))}
            className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 text-slate-900 outline-none ring-blue-600 focus:ring"
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Primary use case
          <select
            value={form.primaryUseCase}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, primaryUseCase: e.target.value as AuditInput["primaryUseCase"] }))
            }
            className="mt-1 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-blue-600 focus:ring"
          >
            {PRIMARY_USE_CASES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium text-slate-700">
          Add a tool
          <select
            defaultValue=""
            onChange={(e) => {
              if (e.target.value) addTool(e.target.value as ToolKey);
              e.currentTarget.value = "";
            }}
            className="mt-1 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-blue-600 focus:ring"
          >
            <option value="" disabled>
              Select tool
            </option>
            {TOOL_OPTIONS.map((tool) => (
              <option key={tool.key} value={tool.key}>
                {tool.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Tool rows */}
      <div className="mt-6 space-y-3">
        {form.tools.length === 0 && (
          <p className="rounded-md border border-dashed border-slate-300 p-4 text-sm text-slate-600">
            Add at least one AI tool to run the audit.
          </p>
        )}

        {form.tools.map((tool) => {
          const planOptions = TOOL_OPTIONS.find((t) => t.key === tool.key)?.plans ?? [];
          return (
            <div
              key={tool.key}
              className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-12"
            >
              <div className="md:col-span-3">
                <p className="text-sm font-semibold text-slate-900">{TOOL_LABEL_MAP[tool.key]}</p>
                <button
                  type="button"
                  onClick={() => removeTool(tool.key)}
                  className="mt-2 text-xs font-medium text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>

              <label className="text-sm font-medium text-slate-700 md:col-span-3">
                Plan
                <select
                  value={tool.plan}
                  onChange={(e) => updateTool(tool.key, { plan: e.target.value })}
                  className="mt-1 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-blue-600 focus:ring"
                >
                  {planOptions.map((plan) => (
                    <option key={plan} value={plan}>
                      {plan}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm font-medium text-slate-700 md:col-span-3">
                Monthly spend (USD)
                <input
                  type="number"
                  min={0}
                  value={tool.monthlySpend}
                  onChange={(e) => updateTool(tool.key, { monthlySpend: Math.max(0, Number(e.target.value)) })}
                  className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 text-slate-900 outline-none ring-blue-600 focus:ring"
                />
              </label>

              <label className="text-sm font-medium text-slate-700 md:col-span-3">
                Seats
                <input
                  type="number"
                  min={1}
                  value={tool.seats}
                  onChange={(e) => updateTool(tool.key, { seats: Math.max(1, Number(e.target.value)) })}
                  className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 text-slate-900 outline-none ring-blue-600 focus:ring"
                />
              </label>
            </div>
          );
        })}
      </div>

      {/* Submit bar */}
      <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          Current stack spend:{" "}
          <span className="font-semibold text-slate-900">${totalSpend.toFixed(2)}/month</span>
        </p>
        <button
          type="button"
          onClick={submitAudit}
          disabled={form.tools.length === 0 || submitting}
          className="h-11 rounded-md bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 transition-colors"
        >
          {submitting ? "Generating…" : "Generate Audit"}
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </section>
  );
}
