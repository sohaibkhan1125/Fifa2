"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "pt-golden-boot-onboarded";

export default function OnboardingHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) {
        // Slight delay so user notices it
        const timer = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  };

  if (!visible) return null;

  return (
    <div
      className="relative rounded-2xl border border-primary-200 dark:border-primary-800/40 bg-gradient-to-r from-[var(--color-primary-soft)] to-white dark:from-primary-900/20 dark:to-[var(--color-surface)] p-4 animate-slide-up shadow-soft"
      role="status"
    >
      <div className="flex items-start gap-3 pr-8">
        <div className="w-9 h-9 rounded-lg bg-primary-600 text-white flex items-center justify-center flex-shrink-0 shadow-glow">
          <SparkleIcon className="w-4 h-4" />
        </div>
        <div className="text-sm">
          <div className="font-display font-bold text-[var(--color-text)] mb-0.5">
            Welcome — make your picks!
          </div>
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
            Tap <span className="font-semibold text-primary-600">+</span> or <span className="font-semibold text-primary-600">−</span> to adjust predicted goals. Rankings update automatically. Your picks save to this browser.
          </p>
        </div>
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute top-3 right-3 w-7 h-7 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)] flex items-center justify-center btn-press"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
          <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}

function SparkleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"/>
    </svg>
  );
}
