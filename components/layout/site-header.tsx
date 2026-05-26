import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 text-lg font-semibold text-slate-900 hover:text-teal-600 transition-colors">
          <Logo className="h-6 w-6" />
          <span>Lucent</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-slate-600">
          <Link href="/#how-it-works" className="hover:text-slate-900">
            How It Works
          </Link>
          <Link href="/#faq" className="hover:text-slate-900">
            FAQ
          </Link>
          <Link href="/privacy" className="hover:text-slate-900">
            Privacy
          </Link>
        </nav>
      </div>
    </header>
  );
}
