import { Recommendation } from "@/types/audit";

type PriorityActionQueueProps = {
  items: Recommendation[];
};

export function PriorityActionQueue({ items }: PriorityActionQueueProps) {
  const sorted = [...items].sort((a, b) => {
    if (b.monthlySavings !== a.monthlySavings) return b.monthlySavings - a.monthlySavings;
    if (a.implementationEffort === b.implementationEffort) return 0;
    return a.implementationEffort === "quick" ? -1 : 1;
  });

  const top = sorted.slice(0, 3);
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-slate-900">Priority Action Queue</h2>
      <p className="mt-1 text-sm text-slate-600">Start with the highest-impact, lowest-friction changes.</p>
      <ol className="mt-4 space-y-3">
        {top.map((item, idx) => (
          <li key={item.tool} className="rounded-md border border-slate-200 p-3">
            <p className="text-sm font-semibold text-slate-900">
              {idx + 1}. {item.tool}: {item.action}
            </p>
            <p className="mt-1 text-xs text-slate-600">{item.reason}</p>
            <p className="mt-2 text-sm font-semibold text-green-600">Potential: ${item.monthlySavings.toFixed(2)}/mo</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

