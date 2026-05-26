import { Logo } from "@/components/ui/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Logo className="h-5 w-5 shrink-0" />
          <p>Lucent helps startups audit AI spend without login friction.</p>
        </div>
        <div className="flex gap-4">
          <a href="/privacy" className="hover:text-slate-900">
            Privacy
          </a>
          <a href="/terms" className="hover:text-slate-900">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
