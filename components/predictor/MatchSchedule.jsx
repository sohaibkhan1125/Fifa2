"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";

const INITIAL = 5;

export default function MatchSchedule({ matches = [] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? matches : matches.slice(0, INITIAL);

  return (
    <Card padding="none" className="overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 p-5 md:p-6 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[var(--color-primary-soft)] flex items-center justify-center text-primary-600">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg leading-tight">
              FIFA World Cup 2026 Schedule
            </h2>
            <p className="text-xs text-[var(--color-text-muted)] hidden sm:block">
              Group stage opening matches · June 11–14, 2026
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live Updates
        </span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-[var(--color-border)]">
        {visible.map((match) => (
          <MatchRow key={match.id} match={match} />
        ))}
      </div>

      {/* View All toggle */}
      {matches.length > INITIAL && (
        <div className="flex items-center justify-center p-4 md:p-5 border-t border-[var(--color-border)] bg-[var(--color-bg)]/40">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            {expanded ? "Show Less" : `View All Matches (${matches.length})`}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}
    </Card>
  );
}

function MatchRow({ match }) {
  return (
    <div className="grid grid-cols-[36px_1fr] md:grid-cols-[60px_1fr_60px_1fr_180px_1fr] items-center gap-3 md:gap-4 px-4 md:px-6 py-4 hover:bg-[var(--color-bg)]/50 transition-colors">
      {/* Match number */}
      <div className="text-xs md:text-sm font-semibold text-[var(--color-text-muted)] tabular-nums">
        {match.matchNumber}
      </div>

      {/* Mobile: full match info in one cell */}
      <div className="md:hidden">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-lg">{match.homeTeam.flag}</span>
          <span className="font-semibold text-sm">{match.homeTeam.name}</span>
          <span className="text-[10px] font-bold text-primary-600 px-1.5 py-0.5 rounded bg-[var(--color-primary-soft)]">VS</span>
          <span className="text-lg">{match.awayTeam.flag}</span>
          <span className="font-semibold text-sm">{match.awayTeam.name}</span>
        </div>
        <div className="text-xs text-[var(--color-text-muted)] flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span>{match.date} · {match.time}</span>
          <span>·</span>
          <span className="truncate">{match.stadium}, {match.city}</span>
        </div>
      </div>

      {/* Desktop: separate columns */}
      <div className="hidden md:flex items-center gap-2.5">
        <span className="text-xl">{match.homeTeam.flag}</span>
        <span className="font-semibold text-sm truncate">{match.homeTeam.name}</span>
      </div>

      <div className="hidden md:flex justify-center">
        <span className="text-[10px] font-bold text-primary-600 px-2 py-1 rounded-md bg-[var(--color-primary-soft)] tracking-wider">
          VS
        </span>
      </div>

      <div className="hidden md:flex items-center gap-2.5">
        <span className="text-xl">{match.awayTeam.flag}</span>
        <span className="font-semibold text-sm truncate">{match.awayTeam.name}</span>
      </div>

      <div className="hidden md:block">
        <div className="text-sm font-medium text-[var(--color-text)]">{match.date}</div>
        <div className="text-xs text-[var(--color-text-muted)]">{match.time}</div>
      </div>

      <div className="hidden md:block">
        <div className="text-sm font-medium text-[var(--color-text)] truncate">{match.stadium}</div>
        <div className="text-xs text-[var(--color-text-muted)] truncate">{match.city}</div>
      </div>
    </div>
  );
}

function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
