type AiSummaryCardProps = {
  summary: string;
  fallbackUsed?: boolean;
};

export function AiSummaryCard({ summary, fallbackUsed = false }: AiSummaryCardProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-900">Personalized Summary</h2>
        {fallbackUsed ? (
          <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">Fallback</span>
        ) : (
          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">AI</span>
        )}
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-700">{summary}</p>
    </section>
  );
}
