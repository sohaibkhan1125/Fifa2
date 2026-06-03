import Card from "@/components/ui/Card";
import PlayerAvatar from "@/components/ui/PlayerAvatar";

export default function WinnerCard({ winner }) {
  // Empty state: no goals predicted yet
  if (!winner || winner.predictedGoals === 0) {
    return (
      <Card padding="md" className="relative overflow-hidden">
        <div className="flex items-center gap-2 mb-5">
          <CrownIcon className="w-5 h-5 text-amber-500" />
          <h3 className="font-display font-bold text-sm">
            Predicted Golden Boot Winner
          </h3>
        </div>

        <div className="flex flex-col items-center text-center py-4">
          <div className="w-24 h-24 rounded-full bg-[var(--color-bg)] border-2 border-dashed border-[var(--color-border)] flex items-center justify-center mb-3">
            <CrownIcon className="w-9 h-9 text-[var(--color-text-muted)]/40" />
          </div>
          <h4 className="font-display font-bold text-base mb-1">
            No winner yet
          </h4>
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed max-w-xs">
            Tap the <span className="font-bold text-primary-600">+</span> button next to a player to start predicting goals.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="md" className="relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-primary-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-2 mb-5">
          <CrownIcon className="w-5 h-5 text-amber-500" />
          <h3 className="font-display font-bold text-sm">
            Predicted Golden Boot Winner
          </h3>
        </div>

        {/* Avatar with badge */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            <PlayerAvatar
              initials={winner.initials}
              colorClass={winner.avatarColor}
              size="xl"
              ringClass="ring-4 ring-amber-100 dark:ring-amber-900/30"
            />
            <div className="absolute -top-1 -right-1 w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white text-xs font-extrabold flex items-center justify-center shadow-soft border-2 border-white dark:border-[var(--color-surface)]">
              #1
            </div>
          </div>

          <h4 className="font-display font-bold text-xl mb-1">{winner.name}</h4>

          <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] mb-4">
            <span className="text-base">{winner.flag}</span>
            <span>{winner.country}</span>
          </div>

          {/* Goal count */}
          <div className="flex items-baseline gap-1.5 mb-4">
            <span className="font-display font-extrabold text-4xl text-gradient">
              {winner.predictedGoals}
            </span>
            <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
              Predicted Goals
            </span>
          </div>

          {/* Winner badge */}
          <div className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40">
            <TrophyIcon className="w-4 h-4 text-amber-600" />
            <span className="font-bold text-sm text-amber-700 dark:text-amber-400">
              Predicted Winner
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function CrownIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M3 17l1.5-9 4.5 4 3-6 3 6 4.5-4L21 17H3z" />
      <rect x="3" y="18" width="18" height="2.5" rx="0.5"/>
    </svg>
  );
}
function TrophyIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7 4h10v6a5 5 0 11-10 0V4zM5 4H3v3a3 3 0 003 3M19 4h2v3a3 3 0 01-3 3M10 16h4v2h2v2H8v-2h2v-2z"/>
    </svg>
  );
}
