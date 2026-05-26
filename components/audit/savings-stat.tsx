/** Reusable savings stat display used by SavingsHero and PublicReportClient. */
type SavingsStatProps = {
  monthly: number;
  annual: number;
};

export function SavingsStat({ monthly, annual }: SavingsStatProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">Monthly</p>
        <p className="text-3xl font-bold text-green-600">${monthly.toFixed(2)}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">Annual</p>
        <p className="text-3xl font-bold text-slate-900">${annual.toFixed(2)}</p>
      </div>
    </div>
  );
}
