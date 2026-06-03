import Link from "next/link";
import Card from "@/components/ui/Card";
import toolsData from "@/data/tools.json";

const accentMap = {
  primary: "bg-primary-50 text-primary-600 dark:bg-primary-900/30",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/30",
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30",
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/30",
  rose: "bg-rose-50 text-rose-600 dark:bg-rose-900/30",
};

function ToolMiniCard({ tool }) {
  const accentClass = accentMap[tool.accent] || accentMap.primary;
  const isLive = tool.status === "live";

  const cardClasses = `relative rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-4 transition-colors ${
    isLive
      ? "hover:border-primary-300 dark:hover:border-primary-700 cursor-pointer"
      : "opacity-70 cursor-not-allowed"
  }`;

  const content = (
    <>
      {!isLive && (
        <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-[var(--color-text-muted)]/15 text-[var(--color-text-muted)]">
          Soon
        </span>
      )}
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-3 ${accentClass}`}>
        {tool.icon}
      </div>
      <h3 className="font-display font-bold text-sm mb-1 hover:text-primary-600 transition-colors">
        {tool.name}
      </h3>
      <p className="text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-2">
        {tool.shortDescription}
      </p>
    </>
  );

  if (isLive) {
    return (
      <Link href={`/predictions/${tool.slug}`} className={`group ${cardClasses}`}>
        {content}
      </Link>
    );
  }

  return <div className={cardClasses} aria-disabled="true">{content}</div>;
}

export default function RelatedTools({ currentToolId, limit = 4 }) {
  const related = toolsData
    .filter((t) => t.id !== currentToolId)
    .slice(0, limit);

  return (
    <Card padding="md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display font-bold text-lg">Related Tools</h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Explore more from the PrimeTools sports ecosystem
          </p>
        </div>
        <Link
          href="/tools"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700"
        >
          View all
          <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {related.map((tool) => (
          <ToolMiniCard key={tool.id} tool={tool} />
        ))}
      </div>
    </Card>
  );
}
