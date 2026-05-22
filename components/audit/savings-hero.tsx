type SavingsHeroProps = {
  totalMonthlySavings: number;
  totalAnnualSavings: number;
};

export function SavingsHero({ totalMonthlySavings, totalAnnualSavings }: SavingsHeroProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <p className="text-sm font-medium text-slate-600">Estimated Savings Opportunity</p>
      <div className="mt-2 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Monthly</p>
          <p className="text-3xl font-bold text-green-600">${totalMonthlySavings.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Annual</p>
          <p className="text-3xl font-bold text-slate-900">${totalAnnualSavings.toFixed(2)}</p>
        </div>
      </div>
    </section>
  );
}
