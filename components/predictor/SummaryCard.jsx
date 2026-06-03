import Card from "@/components/ui/Card";

/**
 * Prediction Summary card.
 * Combines tournament-constant stats (matches, teams) with dynamic user-state stats.
 */
export default function SummaryCard({ players = [], winner = null }) {
  // FIFA World Cup 2026 actual constants
  const TOTAL_MATCHES = 104; // 48-team format: group stage + knockouts
  const TOTAL_TEAMS = 48;

  // Dynamic from user state
  const playersTracked = players.length;
  const winnerPredicted = winner && winner.predictedGoals > 0 ? 1 : 0;

  const stats = [
    {
      label: "Matches Predicted",
      value: TOTAL_MATCHES,
      icon: MatchIcon,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      label: "Players Tracked",
      value: playersTracked,
      icon: PlayerIcon,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      label: "Teams Covered",
      value: TOTAL_TEAMS,
      icon: TeamIcon,
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      label: "Winner Predicted",
      value: winnerPredicted,
      icon: WinnerIcon,
      color: "text-primary-600",
      bg: "bg-[var(--color-primary-soft)]",
    },
  ];

  return (
    <Card padding="md">
      <h3 className="font-display font-bold text-sm mb-4">
        Your Prediction Summary
      </h3>
      <ul className="space-y-3">
        {stats.map((stat) => (
          <li key={stat.label} className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center flex-shrink-0`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-display font-bold text-xl tabular-nums">
                {stat.value}
              </span>
              <span className="text-xs text-[var(--color-text-muted)] truncate">
                {stat.label}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function MatchIcon(props) { return (<svg viewBox="0 0 24 24" fill="none" {...props}><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M3 10h18M12 5v14" stroke="currentColor" strokeWidth="2"/></svg>); }
function PlayerIcon(props) { return (<svg viewBox="0 0 24 24" fill="none" {...props}><circle cx="9" cy="8" r="3.5" stroke="currentColor" strokeWidth="2"/><path d="M2.5 19a6.5 6.5 0 0113 0M16 11a3 3 0 100-6M22 19a5.5 5.5 0 00-4-5.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>); }
function TeamIcon(props) { return (<svg viewBox="0 0 24 24" fill="none" {...props}><path d="M5 21V10l7-6 7 6v11M9 21v-7h6v7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>); }
function WinnerIcon(props) { return (<svg viewBox="0 0 24 24" fill="none" {...props}><path d="M7 4h10v6a5 5 0 11-10 0V4zM5 4H3v3a3 3 0 003 3M19 4h2v3a3 3 0 01-3 3M10 16h4v2h2v2H8v-2h2v-2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>); }
