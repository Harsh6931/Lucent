import { Recommendation } from "@/types/audit";

type RecommendationTableProps = {
  items: Recommendation[];
};

const confidenceClass: Record<Recommendation["confidence"], string> = {
  high: "bg-green-100 text-green-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-slate-200 text-slate-700"
};

export function RecommendationTable({ items }: RecommendationTableProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-slate-900">Per-Tool Recommendations</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="py-2">Tool</th>
              <th className="py-2">Current</th>
              <th className="py-2">Action</th>
              <th className="py-2">Savings</th>
              <th className="py-2">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.tool} className="border-b border-slate-100 align-top text-sm text-slate-700">
                <td className="py-3 font-semibold text-slate-900">{item.tool}</td>
                <td className="py-3">
                  {item.currentPlan}
                  <div className="text-xs text-slate-500">${item.currentMonthly.toFixed(2)}/mo</div>
                </td>
                <td className="py-3">
                  <p className="font-medium text-slate-900">{item.action}</p>
                  <p className="mt-1 text-xs text-slate-600">{item.reason}</p>
                </td>
                <td className="py-3 font-semibold text-green-600">${item.monthlySavings.toFixed(2)}/mo</td>
                <td className="py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${confidenceClass[item.confidence]}`}>
                    {item.confidence}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
