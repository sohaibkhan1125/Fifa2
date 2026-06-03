import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 md:px-6 py-20 text-center">
        <div className="text-7xl font-display font-extrabold text-gradient mb-4">404</div>
        <h1 className="font-display font-bold text-2xl mb-2">Page not found</h1>
        <p className="text-[var(--color-text-muted)] mb-6">
          The tool or page you're looking for doesn't exist yet — but we're adding new ones every week.
        </p>
        <div className="flex items-center justify-center gap-2">
          <Link
            href="/"
            className="h-11 px-5 inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl btn-press shadow-soft"
          >
            Back to home
          </Link>
          <Link
            href="/tools"
            className="h-11 px-5 inline-flex items-center border border-[var(--color-border)] hover:bg-[var(--color-bg)] font-semibold rounded-xl btn-press"
          >
            Browse all tools
          </Link>
        </div>
      </main>
    </>
  );
}
