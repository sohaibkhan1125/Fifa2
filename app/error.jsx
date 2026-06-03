"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
            <path
              d="M12 9v4M12 17h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4a2 2 0 00-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="font-display font-bold text-2xl mb-2">
          Something went wrong
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm mb-6">
          An unexpected error occurred. You can try again, or head back home and reload your predictions.
        </p>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={reset}
            className="h-11 px-5 inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl btn-press shadow-soft"
          >
            Try again
          </button>
          <Link
            href="/"
            className="h-11 px-5 inline-flex items-center border border-[var(--color-border)] hover:bg-[var(--color-bg)] text-sm font-semibold rounded-xl btn-press"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
