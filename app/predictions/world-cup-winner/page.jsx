"use client";

import { useEffect, useState, useMemo } from "react";
import PredictionLayout from "@/components/layout/PredictionLayout";
import Card from "@/components/ui/Card";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/predictor/RelatedTools";
import SeoContent from "@/components/seo/SeoContent";
import FaqAccordion from "@/components/seo/FaqAccordion";
import teamsData from "@/data/teams.json";
import toolsData from "@/data/tools.json";

const STORAGE_KEY = "pt-world-cup-winner";
const toolMeta = toolsData.find((t) => t.id === "world-cup-winner");

const ROUNDS = [
  { id: "champion", label: "Champion", icon: "🏆", color: "from-amber-400 to-amber-600" },
  { id: "runnerUp", label: "Runner-up", icon: "🥈", color: "from-gray-300 to-gray-500" },
  { id: "third", label: "Third Place", icon: "🥉", color: "from-orange-400 to-orange-600" },
  { id: "fourth", label: "Fourth Place", icon: "4️⃣", color: "from-blue-400 to-blue-600" },
];

export default function WorldCupWinnerPage() {
  const [picks, setPicks] = useState({
    champion: null,
    runnerUp: null,
    third: null,
    fourth: null,
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setPicks(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(picks));
    } catch {}
  }, [picks]);

  const handlePick = (round, team) => {
    setPicks((prev) => ({ ...prev, [round]: team }));
  };

  const handleReset = () => {
    setPicks({ champion: null, runnerUp: null, third: null, fourth: null });
    setToast({ message: "Picks reset", type: "info" });
  };

  const handleShare = async () => {
    if (!picks.champion) {
      setToast({ message: "Pick a champion first!", type: "info" });
      return;
    }
    const text = `🏆 My FIFA World Cup 2026 Final Four:\n\n🥇 ${picks.champion?.flag} ${picks.champion?.name}\n🥈 ${picks.runnerUp?.flag || ""} ${picks.runnerUp?.name || "—"}\n🥉 ${picks.third?.flag || ""} ${picks.third?.name || "—"}\n\nMake yours at PrimeTools!`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "World Cup Winner Predictor", text });
      } else {
        await navigator.clipboard.writeText(text);
      }
      setToast({ message: "Shared!", type: "success" });
    } catch {}
  };

  const completion = useMemo(() => {
    const total = ROUNDS.length;
    const filled = ROUNDS.filter((r) => picks[r.id]).length;
    return Math.round((filled / total) * 100);
  }, [picks]);

  return (
    <PredictionLayout
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        { label: "World Cup Winner Predictor" },
      ]}
    >
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl hero-bg border border-[var(--color-border)] shadow-soft px-6 md:px-10 py-8 md:py-10">
        <div className="absolute inset-0 confetti-bg opacity-50 pointer-events-none" />
        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-600 text-white text-xs font-bold tracking-wide shadow-glow mb-3">
            🏆 FIFA WORLD CUP 2026
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.1] mb-2">
            World Cup <span className="text-gradient">Winner Predictor</span>
          </h1>
          <p className="text-sm md:text-base text-[var(--color-text-muted)]">
            Pick your champion, runner-up, and final four. Crown your World Cup 2026 winner.
          </p>

          {/* Progress */}
          <div className="mt-5 max-w-md">
            <div className="flex items-center justify-between text-xs font-semibold text-[var(--color-text-muted)] mb-2">
              <span>Your prediction</span>
              <span>{completion}% complete</span>
            </div>
            <div className="h-2 rounded-full bg-[var(--color-border)] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-700 transition-all duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Picks grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        <div className="space-y-4">
          {ROUNDS.map((round) => (
            <Card key={round.id} padding="md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${round.color} text-white flex items-center justify-center text-xl shadow-soft`}>
                    {round.icon}
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-base">{round.label}</h2>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {picks[round.id] ? `${picks[round.id].flag} ${picks[round.id].name}` : "Select a team"}
                    </p>
                  </div>
                </div>
                {picks[round.id] && (
                  <button
                    onClick={() => handlePick(round.id, null)}
                    className="text-xs font-semibold text-[var(--color-text-muted)] hover:text-red-600"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-2">
                {teamsData.map((team) => {
                  const isSelected = picks[round.id]?.id === team.id;
                  return (
                    <button
                      key={team.id}
                      onClick={() => handlePick(round.id, team)}
                      className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-center transition-all btn-press ${
                        isSelected
                          ? "border-primary-500 bg-[var(--color-primary-soft)] ring-2 ring-primary-200 dark:ring-primary-800/40"
                          : "border-[var(--color-border)] hover:border-primary-300 hover:bg-[var(--color-bg)]/50"
                      }`}
                    >
                      <span className="text-2xl">{team.flag}</span>
                      <span className="text-[10px] font-semibold truncate w-full">{team.name}</span>
                    </button>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>

        {/* Sidebar: summary */}
        <div className="space-y-4">
          <Card padding="md" className="bg-gradient-to-br from-[var(--color-primary-soft)] to-white dark:from-primary-900/20 dark:to-[var(--color-surface)]">
            <h3 className="font-display font-bold text-sm mb-4">Your Final Four</h3>
            <ul className="space-y-3">
              {ROUNDS.map((round) => (
                <li key={round.id} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${round.color} text-white flex items-center justify-center text-sm flex-shrink-0`}>
                    {round.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                      {round.label}
                    </div>
                    <div className="font-semibold text-sm truncate">
                      {picks[round.id] ? `${picks[round.id].flag} ${picks[round.id].name}` : "—"}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex gap-2 mt-5">
              <button
                onClick={handleReset}
                className="flex-1 h-10 rounded-xl border border-[var(--color-border)] text-sm font-semibold hover:bg-[var(--color-bg)] btn-press"
              >
                Reset
              </button>
              <button
                onClick={handleShare}
                className="flex-1 h-10 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold btn-press shadow-soft hover:shadow-glow"
              >
                Share
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* SEO Content sections */}
      <SeoContent sections={toolMeta.seo.sections} />

      {/* FAQ Accordion */}
      <FaqAccordion faqs={toolMeta.seo.faqs} />

      {/* Related tools — internal linking */}
      <RelatedTools currentToolId="world-cup-winner" />

      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </PredictionLayout>
  );
}
