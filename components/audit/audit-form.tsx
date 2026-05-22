"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PRIMARY_USE_CASES, QUICK_PRESETS, TOOL_OPTIONS } from "@/lib/constants/audit-config";
import { AuditInput, ToolInput, ToolKey } from "@/types/audit";

const STORAGE_KEY = "lucent-audit-input";

function labelFromKey(key: ToolKey): string {
  return TOOL_OPTIONS.find((tool) => tool.key === key)?.label ?? key;
}

export function AuditForm() {
  const router = useRouter();
  const [form, setForm] = useState<AuditInput>({
    teamSize: 5,
    primaryUseCase: "coding",
    tools: []
  });

  const totalSpend = useMemo(
    () => form.tools.reduce((sum, tool) => sum + Number(tool.monthlySpend || 0), 0),
    [form.tools]
  );

  function applyPreset(presetId: string) {
    const preset = QUICK_PRESETS.find((item) => item.id === presetId);
    if (!preset) return;
    setForm(preset.payload);
  }

  function addTool(toolKey: ToolKey) {
    if (form.tools.some((tool) => tool.key === toolKey)) return;
    const config = TOOL_OPTIONS.find((tool) => tool.key === toolKey);
    if (!config) return;
    const next: ToolInput = {
      key: toolKey,
      plan: config.plans[0],
      monthlySpend: 0,
      seats: 1
    };
    setForm((prev) => ({ ...prev, tools: [...prev.tools, next] }));
  }

  function removeTool(toolKey: ToolKey) {
    setForm((prev) => ({ ...prev, tools: prev.tools.filter((tool) => tool.key !== toolKey) }));
  }

  function updateTool(toolKey: ToolKey, patch: Partial<ToolInput>) {
    setForm((prev) => ({
      ...prev,
      tools: prev.tools.map((tool) => (tool.key === toolKey ? { ...tool, ...patch } : tool))
    }));
  }

  function submitAudit() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    router.push("/audit/local-preview");
  }

  return (
    <section id="audit-form" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Run Your AI Spend Audit</h2>
        <p className="mt-1 text-sm text-slate-600">No login required. You will see results before any email request.</p>
      </div>

      <div className="mb-6 grid gap-3 md:grid-cols-3">
        {QUICK_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => applyPreset(preset.id)}
            className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-left hover:border-sky-500 hover:bg-sky-50"
          >
            <div className="text-sm font-semibold text-slate-900">{preset.label}</div>
            <div className="mt-1 text-xs text-slate-600">{preset.description}</div>
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="text-sm font-medium text-slate-700">
          Team size
          <input
            type="number"
            min={1}
            value={form.teamSize}
            onChange={(event) => setForm((prev) => ({ ...prev, teamSize: Number(event.target.value || 1) }))}
            className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 text-slate-900 outline-none ring-sky-500 focus:ring"
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Primary use case
          <select
            value={form.primaryUseCase}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, primaryUseCase: event.target.value as AuditInput["primaryUseCase"] }))
            }
            className="mt-1 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-sky-500 focus:ring"
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
            onChange={(event) => {
              if (event.target.value) addTool(event.target.value as ToolKey);
              event.currentTarget.value = "";
            }}
            className="mt-1 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-sky-500 focus:ring"
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

      <div className="mt-6 space-y-3">
        {form.tools.length === 0 ? (
          <p className="rounded-md border border-dashed border-slate-300 p-4 text-sm text-slate-600">
            Add at least one AI tool to run the audit.
          </p>
        ) : null}

        {form.tools.map((tool) => {
          const planOptions = TOOL_OPTIONS.find((item) => item.key === tool.key)?.plans ?? [];
          return (
            <div key={tool.key} className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-12">
              <div className="md:col-span-3">
                <p className="text-sm font-semibold text-slate-900">{labelFromKey(tool.key)}</p>
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
                  onChange={(event) => updateTool(tool.key, { plan: event.target.value })}
                  className="mt-1 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-sky-500 focus:ring"
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
                  onChange={(event) => updateTool(tool.key, { monthlySpend: Number(event.target.value || 0) })}
                  className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 text-slate-900 outline-none ring-sky-500 focus:ring"
                />
              </label>

              <label className="text-sm font-medium text-slate-700 md:col-span-3">
                Seats
                <input
                  type="number"
                  min={1}
                  value={tool.seats}
                  onChange={(event) => updateTool(tool.key, { seats: Number(event.target.value || 1) })}
                  className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3 text-slate-900 outline-none ring-sky-500 focus:ring"
                />
              </label>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          Current stack spend: <span className="font-semibold text-slate-900">${totalSpend.toFixed(2)}/month</span>
        </p>
        <button
          type="button"
          onClick={submitAudit}
          disabled={form.tools.length === 0}
          className="h-11 rounded-md bg-sky-500 px-5 text-sm font-semibold text-white hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Generate Audit
        </button>
      </div>
    </section>
  );
}
