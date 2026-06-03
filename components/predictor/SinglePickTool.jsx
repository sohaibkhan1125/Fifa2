"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Toast from "@/components/ui/Toast";

/**
 * Generic renderer for "single-pick" tools (Dark Horse, Best Young Player, etc.)
 * Reads tool.config.optionsRef to know which data array to use.
 * Adding a new single-pick tool = adding a JSON entry. Zero new code.
 */
export default function SinglePickTool({ tool, options }) {
  const storageKey = `pt-pick-${tool.id}`;
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const savedObj = JSON.parse(saved);
        const found = options.find((o) => o.id === savedObj.id);
        if (found) {
          setSelected(found);
          return;
        }
      }
      const def = options.find((o) => o.id === tool.config?.defaultPick);
      if (def) setSelected(def);
    } catch {}
  }, [storageKey, options, tool.config?.defaultPick]);

  useEffect(() => {
    if (!mounted || !selected) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(selected));
    } catch {}
  }, [selected, mounted, storageKey]);

  const handleShare = async () => {
    if (!selected) return;
    const label = selected.name || selected.label;
    const flag = selected.flag || "";
    const text = `${tool.icon} My ${tool.name} pick for FIFA World Cup 2026:\n\n${flag} ${label}\n\nMake yours at PrimeTools!`;
    try {
      if (navigator.share) {
        await navigator.share({ title: tool.name, text });
      } else {
        await navigator.clipboard.writeText(text);
      }
      setToast({ message: "Shared!", type: "success" });
    } catch {}
  };

  const handleReset = () => {
    const def = options.find((o) => o.id === tool.config?.defaultPick) || null;
    setSelected(def);
    setToast({ message: "Reset", type: "info" });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl hero-bg border border-[var(--color-border)] shadow-soft px-6 md:px-10 py-8 md:py-10">
        <div className="absolute inset-0 confetti-bg opacity-50 pointer-events-none" />
        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-600 text-white text-xs font-bold tracking-wide shadow-glow mb-3">
            {tool.icon} {tool.tournament?.toUpperCase()}
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.1] mb-2">
            {tool.name.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-gradient">{tool.name.split(" ").slice(-1)}</span>
          </h1>
          <p className="text-sm md:text-base text-[var(--color-text-muted)]">
            {tool.tagline || tool.description}
          </p>
        </div>
      </section>

      {/* Main pick grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[var(--color-primary-soft)] text-primary-600 flex items-center justify-center text-xl">
                {tool.icon}
              </div>
              <h2 className="font-display font-bold text-base">
                {tool.config?.optionLabel || "Make your pick"}
              </h2>
            </div>
            <span className="text-xs text-[var(--color-text-muted)]">
              {options.length} options
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
            {options.map((opt) => {
              const isSelected = selected?.id === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelected(opt)}
                  className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-center transition-all btn-press ${
                    isSelected
                      ? "border-primary-500 bg-[var(--color-primary-soft)] ring-2 ring-primary-200 dark:ring-primary-800/40"
                      : "border-[var(--color-border)] hover:border-primary-300 hover:bg-[var(--color-bg)]/50"
                  }`}
                >
                  <span className="text-2xl">{opt.flag || tool.icon}</span>
                  <span className="text-[10px] font-semibold truncate w-full">
                    {opt.name || opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Sidebar */}
        <Card padding="md" className="bg-gradient-to-br from-[var(--color-primary-soft)] to-white dark:from-primary-900/20 dark:to-[var(--color-surface)]">
          <h3 className="font-display font-bold text-sm mb-4">Your Pick</h3>
          {selected ? (
            <div className="flex flex-col items-center text-center py-2">
              <div className="text-6xl mb-3">{selected.flag || tool.icon}</div>
              <div className="font-display font-bold text-lg mb-1">
                {selected.name || selected.label}
              </div>
              <div className="text-xs text-[var(--color-text-muted)]">
                {selected.country || ""}
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-sm text-[var(--color-text-muted)]">
              Make a pick above
            </div>
          )}
          <div className="flex gap-2 mt-5">
            <button
              onClick={handleReset}
              className="flex-1 h-10 rounded-xl border border-[var(--color-border)] text-sm font-semibold hover:bg-[var(--color-bg)] btn-press"
            >
              Reset
            </button>
            <button
              onClick={handleShare}
              disabled={!selected}
              className="flex-1 h-10 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white text-sm font-semibold btn-press shadow-soft hover:shadow-glow"
            >
              Share
            </button>
          </div>
        </Card>
      </div>

      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />
    </>
  );
}
