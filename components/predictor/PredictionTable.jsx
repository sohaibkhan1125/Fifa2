"use client";

import { useState, useMemo } from "react";
import Card from "@/components/ui/Card";
import PlayerAvatar from "@/components/ui/PlayerAvatar";
import AnimatedNumber from "@/components/ui/AnimatedNumber";

const INITIAL_VISIBLE = 8;
const SHOW_MORE_STEP = 6;

export default function PredictionTable({
  players,
  onIncrement,
  onDecrement,
}) {
  const [search, setSearch] = useState("");
  const [filterCountry, setFilterCountry] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  // Get unique countries for filter
  const countries = useMemo(() => {
    return [...new Set(players.map((p) => p.country))].sort();
  }, [players]);

  // Apply search + filter
  const filteredPlayers = useMemo(() => {
    return players.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.country.toLowerCase().includes(search.toLowerCase());
      const matchesCountry =
        filterCountry === "all" || p.country === filterCountry;
      return matchesSearch && matchesCountry;
    });
  }, [players, search, filterCountry]);

  // Apply visible limit (only when no filtering)
  const isFiltering = search || filterCountry !== "all";
  const visiblePlayers = isFiltering
    ? filteredPlayers
    : filteredPlayers.slice(0, visibleCount);

  const hasMore = !isFiltering && visibleCount < filteredPlayers.length;
  const canShowLess = !isFiltering && visibleCount > INITIAL_VISIBLE;

  return (
    <Card padding="none" className="overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 md:p-6 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[var(--color-primary-soft)] flex items-center justify-center text-primary-600">
            <ChartIcon className="w-5 h-5" />
          </div>
          <h2 className="font-display font-bold text-lg leading-tight">
            Top Scorer Predictions
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            aria-label="Toggle filters"
            className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border text-sm font-medium btn-press transition-colors ${
              showFilters || isFiltering
                ? "border-primary-300 text-primary-600 bg-[var(--color-primary-soft)]"
                : "border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-bg)]"
            }`}
          >
            <FilterIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      {/* Filter bar */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-2 p-4 md:px-6 border-b border-[var(--color-border)] bg-[var(--color-bg)]/40 animate-slide-up">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search player or country..."
              className="w-full h-10 pl-10 pr-3 rounded-lg bg-white dark:bg-[var(--color-surface)] border border-[var(--color-border)] text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900/30"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)] flex items-center justify-center"
                aria-label="Clear search"
              >
                <CloseIcon className="w-3 h-3" />
              </button>
            )}
          </div>
          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="h-10 px-3 rounded-lg bg-white dark:bg-[var(--color-surface)] border border-[var(--color-border)] text-sm font-medium focus:outline-none focus:border-primary-400 cursor-pointer"
          >
            <option value="all">All Countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      )}

      {/* Column headers - desktop */}
      <div className="hidden md:grid grid-cols-[70px_1fr_1fr_200px] items-center px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] border-b border-[var(--color-border)] bg-[var(--color-bg)]/40">
        <div>Rank</div>
        <div>Player</div>
        <div>Team</div>
        <div className="text-right">Predicted Goals</div>
      </div>

      {/* Rows */}
      {visiblePlayers.length > 0 ? (
        <div className="divide-y divide-[var(--color-border)]">
          {visiblePlayers.map((player) => (
            <PlayerRow
              key={player.id}
              player={player}
              onIncrement={() => onIncrement(player.id)}
              onDecrement={() => onDecrement(player.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          search={search}
          onClear={() => {
            setSearch("");
            setFilterCountry("all");
          }}
        />
      )}

      {/* Show More / Show Less button */}
      {(hasMore || canShowLess) && visiblePlayers.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 p-4 md:p-5 border-t border-[var(--color-border)] bg-[var(--color-bg)]/40">
          {hasMore && (
            <button
              onClick={() => setVisibleCount((c) => Math.min(c + SHOW_MORE_STEP, filteredPlayers.length))}
              className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold btn-press shadow-soft hover:shadow-glow transition-all"
            >
              <ChevronDownIcon className="w-4 h-4" />
              Show More Players ({filteredPlayers.length - visibleCount} remaining)
            </button>
          )}
          {canShowLess && (
            <button
              onClick={() => setVisibleCount(INITIAL_VISIBLE)}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-bg)] text-sm font-semibold btn-press transition-colors"
            >
              <ChevronUpIcon className="w-4 h-4" />
              Show Less
            </button>
          )}
        </div>
      )}
    </Card>
  );
}

function PlayerRow({ player, onIncrement, onDecrement }) {
  const rankChange = player.previousRank - player.currentRank;
  const isFirst = player.currentRank === 1;

  return (
    <div
      className={`rank-row grid grid-cols-[60px_1fr_auto] md:grid-cols-[70px_1fr_1fr_200px] items-center gap-3 md:gap-4 px-4 md:px-6 py-3.5 transition-colors ${
        isFirst
          ? "bg-gradient-to-r from-amber-50/80 to-amber-50/30 dark:from-amber-900/20 dark:to-amber-900/5 hover:from-amber-50 hover:to-amber-50/50"
          : "hover:bg-[var(--color-bg)]/50"
      }`}
    >
      {/* Rank with medal for top 3 */}
      <div className="flex items-center gap-1.5">
        <RankBadge rank={player.currentRank} />
        <RankArrow change={rankChange} />
      </div>

      {/* Player */}
      <div className="flex items-center gap-3 min-w-0">
        <PlayerAvatar
          initials={player.initials}
          colorClass={player.avatarColor}
          size="md"
        />
        <div className="min-w-0">
          <div className="font-semibold text-sm truncate">{player.name}</div>
          <div className="md:hidden text-xs text-[var(--color-text-muted)] flex items-center gap-1 mt-0.5">
            <span>{player.flag}</span>
            <span>{player.country}</span>
          </div>
        </div>
      </div>

      {/* Team (desktop) */}
      <div className="hidden md:flex items-center gap-2 text-sm">
        <span className="text-lg">{player.flag}</span>
        <span className="font-medium">{player.country}</span>
      </div>

      {/* Goal counter */}
      <div className="flex items-center justify-end gap-2">
        <CounterButton
          onClick={onDecrement}
          disabled={player.predictedGoals <= 0}
          ariaLabel={`Decrease goals for ${player.name}`}
        >
          <MinusIcon className="w-3.5 h-3.5" />
        </CounterButton>
        <div className="w-9 md:w-10 text-center font-display font-bold text-lg tabular-nums">
          <AnimatedNumber value={player.predictedGoals} />
        </div>
        <CounterButton
          onClick={onIncrement}
          disabled={player.predictedGoals >= 20}
          ariaLabel={`Increase goals for ${player.name}`}
        >
          <PlusIcon className="w-3.5 h-3.5" />
        </CounterButton>
      </div>
    </div>
  );
}

/** Medal badge for top 3, plain number for others */
function RankBadge({ rank }) {
  if (rank === 1) {
    return (
      <div className="relative w-9 h-9 flex items-center justify-center">
        <svg viewBox="0 0 40 40" className="w-9 h-9 absolute inset-0">
          <defs>
            <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="20" r="16" fill="url(#gold)" stroke="#92400e" strokeWidth="1.5" />
          <path d="M14 30l2 8M26 30l-2 8M16 36l4-1 4 1" stroke="#dc2626" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
        <span className="relative text-xs font-extrabold text-amber-900">1</span>
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="relative w-9 h-9 flex items-center justify-center">
        <svg viewBox="0 0 40 40" className="w-9 h-9 absolute inset-0">
          <defs>
            <linearGradient id="silver" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="20" r="16" fill="url(#silver)" stroke="#475569" strokeWidth="1.5" />
        </svg>
        <span className="relative text-xs font-extrabold text-slate-700">2</span>
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="relative w-9 h-9 flex items-center justify-center">
        <svg viewBox="0 0 40 40" className="w-9 h-9 absolute inset-0">
          <defs>
            <linearGradient id="bronze" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="50%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#9a3412" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="20" r="16" fill="url(#bronze)" stroke="#7c2d12" strokeWidth="1.5" />
        </svg>
        <span className="relative text-xs font-extrabold text-orange-900">3</span>
      </div>
    );
  }
  return (
    <span className="w-9 text-center font-display font-bold text-base tabular-nums text-[var(--color-text)]">
      {rank}
    </span>
  );
}

function CounterButton({ children, onClick, disabled, ariaLabel }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="w-8 h-8 md:w-9 md:h-9 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-primary-300 hover:text-primary-600 hover:bg-[var(--color-primary-soft)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[var(--color-text-muted)] disabled:hover:border-[var(--color-border)] btn-press flex items-center justify-center transition-colors"
    >
      {children}
    </button>
  );
}

function EmptyState({ search, onClear }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-14 h-14 rounded-full bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-text-muted)] mb-3">
        <SearchIcon className="w-6 h-6" />
      </div>
      <h3 className="font-display font-bold text-base mb-1">No players found</h3>
      <p className="text-sm text-[var(--color-text-muted)] mb-4 max-w-xs">
        {search ? `No matches for "${search}"` : "No players match your filters"}
      </p>
      <button
        onClick={onClear}
        className="text-sm font-semibold text-primary-600 hover:text-primary-700"
      >
        Clear filters
      </button>
    </div>
  );
}

function RankArrow({ change }) {
  if (change > 0) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-emerald-500" aria-label={`Up ${change}`}>
        <path d="M12 5l-6 8h12l-6-8z" fill="currentColor" />
      </svg>
    );
  }
  if (change < 0) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-red-500" aria-label={`Down ${Math.abs(change)}`}>
        <path d="M12 19l6-8H6l6 8z" fill="currentColor" />
      </svg>
    );
  }
  return <span className="w-3.5 h-3.5 inline-block" />;
}

function ChartIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 19h4v-7H4v7zM10 19h4V5h-4v14zM16 19h4v-10h-4v10z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}
function MinusIcon(props) { return (<svg viewBox="0 0 24 24" fill="none" {...props}><path d="M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>); }
function PlusIcon(props) { return (<svg viewBox="0 0 24 24" fill="none" {...props}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>); }
function SearchIcon(props) { return (<svg viewBox="0 0 24 24" fill="none" {...props}><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="M21 21l-4.5-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>); }
function FilterIcon(props) { return (<svg viewBox="0 0 24 24" fill="none" {...props}><path d="M4 5h16M7 12h10M10 19h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>); }
function CloseIcon(props) { return (<svg viewBox="0 0 24 24" fill="none" {...props}><path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>); }
function ChevronDownIcon(props) { return (<svg viewBox="0 0 24 24" fill="none" {...props}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>); }
function ChevronUpIcon(props) { return (<svg viewBox="0 0 24 24" fill="none" {...props}><path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>); }
