import Card from "@/components/ui/Card";
import PlayerAvatar from "@/components/ui/PlayerAvatar";

/**
 * BIG horizontal current winner card.
 * Replaces the old sidebar WinnerCard with a hero-level display matching the redesigned mockup.
 */
export default function BigWinnerCard({ winner }) {
  // Empty state
  if (!winner || winner.predictedGoals === 0) {
    return (
      <Card padding="lg" className="relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[var(--color-bg)] border-2 border-dashed border-[var(--color-border)] flex items-center justify-center flex-shrink-0">
            <CrownIcon className="w-10 h-10 text-[var(--color-text-muted)]/40" />
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
              No Winner Yet
            </div>
            <h2 className="font-display font-bold text-2xl mb-1">
              Make your first prediction
            </h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              Tap the <span className="font-bold text-primary-600">+</span> button next to a player to start predicting goals.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="lg" className="relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-amber-200/30 to-primary-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-8">
        {/* Avatar with crown */}
        <div className="relative flex justify-center md:justify-start flex-shrink-0">
          <div className="relative">
            <PlayerAvatar
              initials={winner.initials}
              colorClass={winner.avatarColor}
              size="xl"
              ringClass="ring-4 ring-amber-200 dark:ring-amber-800/40 w-28 h-28 text-3xl"
            />
            {/* Crown badge */}
            <div className="absolute -top-2 -left-2 w-11 h-11 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center shadow-lg border-2 border-white dark:border-[var(--color-surface)]">
              <CrownIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Center: name + label */}
        <div className="text-center md:text-left min-w-0">
          <div className="inline-flex items-center gap-1.5 mb-2">
            <TrophyIcon className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Current Golden Boot Winner
            </span>
          </div>

          <h2 className="font-display font-extrabold text-3xl md:text-4xl mb-2 leading-tight">
            {winner.name}
          </h2>

          <div className="flex items-center justify-center md:justify-start gap-1.5 text-sm text-[var(--color-text-muted)] mb-3">
            <span className="text-lg">{winner.flag}</span>
            <span className="font-medium">{winner.country}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-primary-soft)] text-primary-600">
            <span className="text-xs font-bold">#1</span>
            <span className="text-xs font-semibold">Predicted Scorer</span>
          </div>
        </div>

        {/* Right: goal count + trophy */}
        <div className="flex items-center gap-4 justify-center md:justify-end">
          <div className="text-center">
            <div
              className="font-display font-extrabold text-5xl md:text-6xl leading-none"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {winner.predictedGoals}
            </div>
            <div className="text-xs font-semibold text-[var(--color-text-muted)] mt-1.5">
              Predicted Goals
            </div>
          </div>
          {/* Laurel trophy icon */}
          <div className="hidden sm:block">
            <LaurelTrophyIcon className="w-20 h-20" />
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

function LaurelTrophyIcon({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="trophyGold3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="50%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>
      {/* Left laurel */}
      <g fill="#16a34a" opacity="0.85">
        <ellipse cx="22" cy="35" rx="4" ry="9" transform="rotate(-30 22 35)" />
        <ellipse cx="15" cy="48" rx="4" ry="9" transform="rotate(-15 15 48)" />
        <ellipse cx="14" cy="62" rx="4" ry="9" transform="rotate(15 14 62)" />
        <ellipse cx="20" cy="74" rx="4" ry="9" transform="rotate(35 20 74)" />
      </g>
      {/* Right laurel */}
      <g fill="#16a34a" opacity="0.85">
        <ellipse cx="78" cy="35" rx="4" ry="9" transform="rotate(30 78 35)" />
        <ellipse cx="85" cy="48" rx="4" ry="9" transform="rotate(15 85 48)" />
        <ellipse cx="86" cy="62" rx="4" ry="9" transform="rotate(-15 86 62)" />
        <ellipse cx="80" cy="74" rx="4" ry="9" transform="rotate(-35 80 74)" />
      </g>
      {/* Trophy body */}
      <path
        d="M35 30 L65 30 L62 60 Q55 70 50 70 Q45 70 38 60 Z"
        fill="url(#trophyGold3)"
        stroke="#92400e"
        strokeWidth="1.5"
      />
      {/* Handles */}
      <path d="M35 35 Q25 38 25 48 Q25 55 32 55" stroke="#92400e" strokeWidth="2" fill="none" />
      <path d="M65 35 Q75 38 75 48 Q75 55 68 55" stroke="#92400e" strokeWidth="2" fill="none" />
      {/* Base */}
      <rect x="40" y="70" width="20" height="6" fill="#92400e" />
      <rect x="35" y="76" width="30" height="6" rx="1" fill="#78350f" />
      {/* Highlight */}
      <ellipse cx="45" cy="40" rx="3" ry="6" fill="#fef3c7" opacity="0.6" />
    </svg>
  );
}
