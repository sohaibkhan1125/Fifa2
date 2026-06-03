"use client";

import { useState, useRef, useEffect } from "react";
import Card from "@/components/ui/Card";

export default function BonusPredictions({
  teams,
  youngPlayers,
  matchups,
  bonus,
  onChange,
}) {
  return (
    <Card padding="md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 text-white flex items-center justify-center shadow-glow">
            <StarIcon className="w-5 h-5" />
          </div>
          <h2 className="font-display font-bold text-lg">Bonus Predictions</h2>
        </div>
        <span className="text-xs text-[var(--color-text-muted)] sm:ml-2">
          Make your extra tournament predictions!
        </span>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <BonusCard
          icon="🏆"
          label="World Cup Winner"
          options={teams}
          value={bonus.worldCupWinner}
          onChange={(v) => onChange({ ...bonus, worldCupWinner: v })}
          renderOption={renderTeam}
          renderSelected={renderTeam}
        />
        <BonusCard
          icon="🐎"
          label="Dark Horse Team"
          options={teams}
          value={bonus.darkHorse}
          onChange={(v) => onChange({ ...bonus, darkHorse: v })}
          renderOption={renderTeam}
          renderSelected={renderTeam}
        />
        <BonusCard
          icon="⚡"
          label="Biggest Upset"
          options={matchups}
          value={bonus.biggestUpset}
          onChange={(v) => onChange({ ...bonus, biggestUpset: v })}
          renderOption={renderMatchup}
          renderSelected={renderMatchup}
        />
        <BonusCard
          icon="⭐"
          label="Best Young Player"
          options={youngPlayers}
          value={bonus.bestYoungPlayer}
          onChange={(v) => onChange({ ...bonus, bestYoungPlayer: v })}
          renderOption={renderYoungPlayer}
          renderSelected={renderYoungPlayer}
        />
      </div>
    </Card>
  );
}

function renderTeam(team) {
  return (
    <>
      <span className="text-xl">{team.flag}</span>
      <span className="font-medium truncate">{team.name}</span>
    </>
  );
}

function renderMatchup(m) {
  return <span className="font-medium truncate">{m.label}</span>;
}

function renderYoungPlayer(p) {
  return (
    <>
      <span className="text-xl">{p.flag}</span>
      <span className="font-medium truncate">{p.name}</span>
    </>
  );
}

function BonusCard({
  icon,
  label,
  options,
  value,
  onChange,
  renderOption,
  renderSelected,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-3.5 transition-colors hover:border-primary-300 dark:hover:border-primary-800">
      <div className="flex items-center gap-1.5 mb-2.5 text-xs font-semibold text-[var(--color-text-muted)]">
        <span className="text-sm">{icon}</span>
        {label}
      </div>

      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-full h-10 px-3 rounded-lg bg-white dark:bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-between gap-2 text-sm hover:border-primary-400 transition-colors btn-press"
        >
          <div className="flex items-center gap-2 min-w-0">
            {value ? renderSelected(value) : <span className="text-[var(--color-text-muted)]">Select…</span>}
          </div>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {open && (
          <div className="absolute z-20 mt-1.5 w-full max-h-64 overflow-y-auto rounded-xl bg-white dark:bg-[var(--color-surface)] border border-[var(--color-border)] shadow-card animate-scale-in">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full px-3 py-2.5 flex items-center gap-2 text-sm text-left hover:bg-[var(--color-primary-soft)] transition-colors ${
                  value?.id === opt.id ? "bg-[var(--color-primary-soft)] text-primary-600" : ""
                }`}
              >
                {renderOption(opt)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2l3 7 7 .5-5.5 4.5L18 21l-6-4-6 4 1.5-7L2 9.5 9 9l3-7z"/>
    </svg>
  );
}
