"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const ok = sessionStorage.getItem("pt-admin-unlocked");
      if (ok === "1") setUnlocked(true);
    } catch {}
  }, []);

  const handleUnlock = (e) => {
    e.preventDefault();
    // Demo password — replace with real auth in production
    if (password === "demo2026") {
      setUnlocked(true);
      try {
        sessionStorage.setItem("pt-admin-unlocked", "1");
      } catch {}
    } else {
      setError("Incorrect password. Demo password is: demo2026");
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white dark:bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-card p-6 md:p-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center text-white mb-4 shadow-glow">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path d="M12 15v2M6 11V7a6 6 0 1112 0v4M5 11h14v9H5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="font-display font-bold text-xl mb-1">PrimeTools Admin</h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-5">
            This is a proof-of-concept admin panel. In production, replace with real authentication (Auth.js, Clerk, Supabase Auth).
          </p>
          <form onSubmit={handleUnlock} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-[var(--color-text-muted)] uppercase tracking-wide">
                Demo Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="demo2026"
                className="w-full h-11 px-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900/30"
                autoFocus
              />
              {error && <p className="text-xs text-red-600 mt-1.5">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full h-11 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl btn-press shadow-soft hover:shadow-glow"
            >
              Unlock Admin
            </button>
          </form>
          <p className="text-[11px] text-[var(--color-text-muted)] mt-4 text-center">
            Password: <code className="font-mono bg-[var(--color-bg)] px-1.5 py-0.5 rounded">demo2026</code>
          </p>
          <Link href="/" className="block text-center text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] mt-3">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", exact: true },
    { href: "/admin/tools", label: "Tools" },
    { href: "/admin/tools/new", label: "Add Tool" },
    { href: "/admin/architecture", label: "Architecture" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Admin Topbar */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[var(--color-surface)]/80 backdrop-blur-xl border-b border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center shadow-glow">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
                <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-base">
                Prime<span className="text-primary-600">Tools</span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Admin Panel
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-[var(--color-primary-soft)] text-primary-600"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="h-9 px-3 inline-flex items-center text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              View Site →
            </Link>
            <button
              onClick={() => {
                try {
                  sessionStorage.removeItem("pt-admin-unlocked");
                } catch {}
                setUnlocked(false);
              }}
              className="h-9 px-3 rounded-lg border border-[var(--color-border)] text-sm font-medium hover:bg-[var(--color-bg)]"
            >
              Lock
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden flex overflow-x-auto border-t border-[var(--color-border)] px-2">
          {navItems.map((item) => {
            const active = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 ${
                  active ? "border-primary-600 text-primary-600" : "border-transparent text-[var(--color-text-muted)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 md:px-6 py-6">{children}</main>
    </div>
  );
}
