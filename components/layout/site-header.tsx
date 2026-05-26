import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors">
          Lucent
        </Link>
        <nav className="flex items-center gap-5 text-sm text-slate-600">
          <a href="#how-it-works" className="hover:text-slate-900">
            How It Works
          </a>
          <a href="#faq" className="hover:text-slate-900">
            FAQ
          </a>
          <a href="/privacy" className="hover:text-slate-900">
            Privacy
          </a>
        </nav>
      </div>
    </header>
  );
}
