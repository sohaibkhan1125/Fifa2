import Link from "next/link";
import Card from "@/components/ui/Card";

export default function RecentPredictions({ winner, bonus }) {
  const items = [
    {
      label: "Golden Boot Winner",
      value: winner?.name || "—",
      icon: "🏆",
      color: "text-amber-600",
    },
    {
      label: "World Cup Winner",
      value: bonus?.worldCupWinner?.name || "—",
      icon: "🥇",
      color: "text-amber-500",
    },
    {
      label: "Dark Horse Team",
      value: bonus?.darkHorse?.name || "—",
      icon: "🐎",
      color: "text-rose-500",
    },
    {
      label: "Biggest Upset",
      value: bonus?.biggestUpset?.label || "—",
      icon: "⚡",
      color: "text-blue-500",
    },
    {
      label: "Best Young Player",
      value: bonus?.bestYoungPlayer?.name || "—",
      icon: "⭐",
      color: "text-emerald-500",
    },
  ];

  return (
    <Card padding="md">
      <h3 className="font-display font-bold text-sm mb-4">Recent Predictions</h3>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-base">{item.icon}</span>
              <span className={`font-semibold truncate ${item.color}`}>
                {item.label}
              </span>
            </div>
            <span className="font-medium text-[var(--color-text)] text-right truncate">
              {item.value}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href="/tools"
        className="mt-4 w-full text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center justify-center gap-1 py-2 rounded-lg hover:bg-[var(--color-primary-soft)] transition-colors"
      >
        View All Tools
        <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </Link>
    </Card>
  );
}
