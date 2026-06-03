import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import toolsData from "@/data/tools.json";

export const metadata = {
  title: "All Tools | PrimeTools FIFA World Cup 2026 Predictors",
  description:
    "Browse all PrimeTools sports prediction tools — Golden Boot, World Cup Winner, Dark Horse, Best Young Player, and more.",
  keywords: [
    "FIFA World Cup 2026 tools",
    "sports predictors",
    "football prediction tools",
    "PrimeTools",
  ],
};

const accentMap = {
  primary: { bg: "bg-primary-50 dark:bg-primary-900/20", text: "text-primary-600", grad: "from-primary-500 to-primary-700" },
  amber: { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-600", grad: "from-amber-400 to-amber-600" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-600", grad: "from-emerald-400 to-emerald-600" },
  blue: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-600", grad: "from-blue-400 to-blue-600" },
  rose: { bg: "bg-rose-50 dark:bg-rose-900/20", text: "text-rose-600", grad: "from-rose-400 to-rose-600" },
};

function ToolCard({ tool, featured }) {
  const accent = accentMap[tool.accent] || accentMap.primary;
  const isLive = tool.status === "live";
  const baseClasses = featured
    ? "group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white dark:bg-[var(--color-surface)] p-6 md:p-7 shadow-soft transition-all"
    : "group rounded-xl border border-[var(--color-border)] bg-white dark:bg-[var(--color-surface)] p-4 transition-all";

  const interactiveClasses = isLive
    ? featured
      ? "hover:shadow-card hover:-translate-y-0.5"
      : "hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-soft"
    : "opacity-70 cursor-not-allowed";

  const content = (
    <>
      {featured && (
        <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${accent.grad} opacity-10 blur-2xl pointer-events-none`} />
      )}
      <div className="relative">
        <div className={`flex items-start justify-between ${featured ? "mb-4" : "mb-3"}`}>
          <div className={`${featured ? "w-14 h-14 rounded-2xl text-3xl" : "w-10 h-10 rounded-lg text-xl"} ${accent.bg} ${accent.text} flex items-center justify-center`}>
            {tool.icon}
          </div>
          {featured && (
            <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-md flex items-center gap-1 ${isLive ? "bg-emerald-500/15 text-emerald-600" : "bg-[var(--color-text-muted)]/15 text-[var(--color-text-muted)]"}`}>
              {isLive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
              {isLive ? "Live" : "Coming Soon"}
            </span>
          )}
        </div>
        {featured && (
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
            {tool.tournament}
          </div>
        )}
        <h3 className={`font-display font-bold ${featured ? "text-xl mb-2" : "text-sm mb-1"} group-hover:text-primary-600 transition-colors`}>
          {tool.name}
        </h3>
        <p className={`${featured ? "text-sm mb-4" : "text-xs line-clamp-2"} text-[var(--color-text-muted)] leading-relaxed`}>
          {featured ? tool.description : tool.shortDescription}
        </p>
        {featured && isLive && (
          <div className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600">
            Open tool
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        )}
      </div>
    </>
  );

  if (isLive) {
    return (
      <Link href={`/predictions/${tool.slug}`} className={`${baseClasses} ${interactiveClasses}`}>
        {content}
      </Link>
    );
  }

  return (
    <div className={`${baseClasses} ${interactiveClasses}`} aria-disabled="true">
      {content}
    </div>
  );
}

export default function ToolsIndexPage() {
  const featured = toolsData.filter((t) => t.featured);
  const byCategory = toolsData.reduce((acc, tool) => {
    if (!acc[tool.categoryLabel]) acc[tool.categoryLabel] = [];
    acc[tool.categoryLabel].push(tool);
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <main className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-10">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl hero-bg border border-[var(--color-border)] shadow-soft p-8 md:p-12 mb-8 md:mb-10">
          <div className="absolute inset-0 confetti-bg opacity-50 pointer-events-none" />
          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-600 text-white text-xs font-bold tracking-wide shadow-glow mb-4">
              ✨ {toolsData.length} TOOLS · GROWING WEEKLY
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.1] mb-3">
              The PrimeTools <span className="text-gradient">Sports Ecosystem</span>
            </h1>
            <p className="text-base text-[var(--color-text-muted)] max-w-xl">
              A growing collection of fast, free, mobile-first prediction tools for FIFA World Cup 2026. Pick a tool, make your call, share with friends.
            </p>
          </div>
        </section>

        {/* Featured */}
        <section className="mb-10">
          <h2 className="font-display font-bold text-xl mb-4">Featured Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featured.map((tool) => (
              <ToolCard key={tool.id} tool={tool} featured />
            ))}
          </div>
        </section>

        {/* By category */}
        {Object.entries(byCategory).map(([category, tools]) => (
          <section key={category} className="mb-10">
            <h2 className="font-display font-bold text-xl mb-4">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
