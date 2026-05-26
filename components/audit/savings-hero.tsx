import { SavingsStat } from "@/components/audit/savings-stat";

type SavingsHeroProps = {
  totalMonthlySavings: number;
  totalAnnualSavings: number;
};

export function SavingsHero({ totalMonthlySavings, totalAnnualSavings }: SavingsHeroProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <p className="text-sm font-medium text-slate-600">Estimated Savings Opportunity</p>
      <div className="mt-2">
        <SavingsStat monthly={totalMonthlySavings} annual={totalAnnualSavings} />
      </div>
    </section>
  );
}
