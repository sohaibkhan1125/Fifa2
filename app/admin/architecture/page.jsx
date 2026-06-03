import Card from "@/components/ui/Card";

export const metadata = {
  title: "Architecture | PrimeTools Admin",
};

export default function AdminArchitecturePage() {
  return (
    <div className="space-y-5 max-w-5xl">
      <div>
        <h1 className="font-display font-bold text-2xl mb-1">Architecture</h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          How PrimeTools scales from 1 tool to 100+ without rebuilding.
        </p>
      </div>

      {/* System overview */}
      <Card padding="lg">
        <h2 className="font-display font-bold text-lg mb-4">System Overview</h2>
        <pre className="text-[11px] md:text-xs leading-relaxed overflow-x-auto bg-[var(--color-bg)] p-4 rounded-xl font-mono">{`
                    ┌───────────────────────────────────┐
                    │       data/tools.json             │
                    │   (single source of truth)        │
                    │  ┌─────────────────────────────┐  │
                    │  │ id, slug, kind, seo, config │  │
                    │  └─────────────────────────────┘  │
                    └────────────┬──────────────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
    ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
    │ Public Site    │  │ Admin Panel    │  │  SEO Engine    │
    │                │  │                │  │                │
    │ /tools         │  │ /admin/tools   │  │  sitemap.xml   │
    │ /predictions/* │  │ + form CRUD    │  │  per-route SEO │
    │ /predictions/  │  │ + status toggle│  │  FAQ schema    │
    │   [slug]       │  │ + JSON export  │  │  OG images     │
    └────────────────┘  └────────────────┘  └────────────────┘
                                 │
                                 │ writes
                                 ▼
                    ┌───────────────────────────────────┐
                    │   lib/toolsRepository.js          │
                    │   (storage adapter — SWAPPABLE)   │
                    │  ┌─────────────────────────────┐  │
                    │  │ Current: JSON + localStorage│  │
                    │  │ Future:  Postgres / Supabase│  │
                    │  └─────────────────────────────┘  │
                    └───────────────────────────────────┘
`}</pre>
      </Card>

      {/* Adding a new tool */}
      <Card padding="lg">
        <h2 className="font-display font-bold text-lg mb-3">Adding a new tool (Tool #10, #50, #100)</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          Once the framework exists, every new tool is just data. Code stays the same.
        </p>
        <ol className="space-y-3 text-sm">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center">1</span>
            <div>
              <strong>Add tool entry</strong> to <code className="font-mono text-xs bg-[var(--color-bg)] px-1.5 py-0.5 rounded">data/tools.json</code> (or use this admin panel).
              ID, name, kind, SEO content, FAQs — everything in one place.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center">2</span>
            <div>
              <strong>Auto-rendered at <code className="font-mono text-xs bg-[var(--color-bg)] px-1.5 py-0.5 rounded">/predictions/&lt;slug&gt;</code></strong>{" "}
              by the dynamic <code className="font-mono text-xs bg-[var(--color-bg)] px-1.5 py-0.5 rounded">[slug]</code> route. The route reads <code className="font-mono text-xs bg-[var(--color-bg)] px-1.5 py-0.5 rounded">tool.kind</code> and renders the right template.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center">3</span>
            <div>
              <strong>Auto-appears everywhere:</strong> /tools index, navbar dropdown, Related Tools sidebars on every other tool page, sitemap.xml, breadcrumbs.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center">4</span>
            <div>
              <strong>SEO auto-generated:</strong> meta tags from <code className="font-mono text-xs bg-[var(--color-bg)] px-1.5 py-0.5 rounded">tool.seo.metaTitle</code> + <code className="font-mono text-xs bg-[var(--color-bg)] px-1.5 py-0.5 rounded">metaDescription</code>, FAQ Schema.org JSON-LD from <code className="font-mono text-xs bg-[var(--color-bg)] px-1.5 py-0.5 rounded">tool.seo.faqs</code>, internal linking from <code className="font-mono text-xs bg-[var(--color-bg)] px-1.5 py-0.5 rounded">tool.seo.relatedIds</code>.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">✓</span>
            <div>
              <strong>Tool #100 cost ≈ Tool #1 cost:</strong> filling out one form. No new code, no new routes, no new components.
            </div>
          </li>
        </ol>
      </Card>

      {/* Tool kinds */}
      <Card padding="lg">
        <h2 className="font-display font-bold text-lg mb-3">Tool Kinds (Templates)</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          Each "kind" maps to a pre-built template. Adding a new tool means picking a kind, not writing code.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <KindCard
            name="leaderboard"
            icon="📈"
            description="Players/teams + adjustable values + auto-sort"
            example="Golden Boot Predictor, Top Assists, Most Saves"
          />
          <KindCard
            name="single-pick"
            icon="🎯"
            description="User picks ONE option from a list"
            example="Dark Horse Team, Best Young Player, Player of the Tournament"
          />
          <KindCard
            name="bracket"
            icon="🏆"
            description="Multi-tier picks (champion, runner-up, ...)"
            example="World Cup Winner Predictor, Final Four"
          />
          <KindCard
            name="poll"
            icon="🗳️"
            description="Vote among options with results"
            example="Match Day Poll, Best Match, Best Goal"
          />
          <KindCard
            name="custom"
            icon="⚙️"
            description="Tool has its own bespoke page"
            example="Currently: Golden Boot, World Cup Winner"
          />
        </div>
      </Card>

      {/* Database schemas */}
      <Card padding="lg">
        <h2 className="font-display font-bold text-lg mb-3">Database Schemas</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          Defined as JSDoc types in <code className="font-mono text-xs bg-[var(--color-bg)] px-1.5 py-0.5 rounded">lib/schemas.js</code>. Compatible with the current JSON adapter AND any future SQL database without consumer code changes.
        </p>

        <SchemaBlock title="Tool" code={`{
  id: string                   // "golden-boot"
  slug: string                 // "golden-boot" (URL slug)
  name: string                 // "Golden Boot Predictor"
  tagline: string
  description: string          // 1-2 sentence summary
  shortDescription: string     // one-line for cards
  kind: "leaderboard" | "single-pick" | "bracket" | "poll" | "custom"
  categoryId: string           // references Category.id
  tournament: string           // "FIFA World Cup 2026"
  icon: string                 // "⚽"
  accent: "primary" | "amber" | "emerald" | "blue" | "rose"
  status: "live" | "coming-soon" | "draft"
  featured: boolean
  keywords: string[]
  config: ToolConfig           // kind-specific
  seo: SeoContent              // long-form content + FAQs
  createdAt: ISO timestamp
  updatedAt: ISO timestamp
}`} />

        <SchemaBlock title="Category" code={`{
  id: string                   // "predictions"
  name: string                 // "Predictions"
  slug: string
  description: string
  icon: string
  order: number                // nav sort order
}`} />

        <SchemaBlock title="SeoContent" code={`{
  metaTitle: string
  metaDescription: string
  sections: SeoSection[]       // long-form content (800-1200 words)
  faqs: Faq[]                  // FAQ list (renders Schema.org JSON-LD)
  relatedIds: string[]         // manually curated related tools
}

SeoSection: { heading: string, body: string }
Faq:        { question: string, answer: string }`} />

        <SchemaBlock title="Prediction (user's saved picks)" code={`{
  id: string                   // generated
  toolId: string               // references Tool.id
  userId: string               // browser-local ID
  data: Record<string, any>    // tool-specific picks
  createdAt: ISO timestamp
  updatedAt: ISO timestamp
}`} />
      </Card>

      {/* Storage adapter */}
      <Card padding="lg">
        <h2 className="font-display font-bold text-lg mb-3">Storage Adapter Pattern</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          All read/write operations go through <code className="font-mono text-xs bg-[var(--color-bg)] px-1.5 py-0.5 rounded">lib/toolsRepository.js</code>. To migrate from JSON to Postgres, change ONE file — every page, component, sitemap, and the admin panel keep working unchanged.
        </p>
        <pre className="text-xs leading-relaxed overflow-x-auto bg-[var(--color-bg)] p-4 rounded-xl font-mono">{`// Current (JSON + localStorage overlay)
export function getAllTools() {
  // reads from data/tools.json + localStorage admin edits
}

// Future migration to Supabase — ONE function changes
export async function getAllTools() {
  const { data } = await supabase.from('tools').select('*');
  return data;
}

// Every component still calls getAllTools() — no code changes`}</pre>
      </Card>

      {/* Programmatic SEO */}
      <Card padding="lg">
        <h2 className="font-display font-bold text-lg mb-3">Programmatic SEO</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-3">
          The dynamic <code className="font-mono text-xs bg-[var(--color-bg)] px-1.5 py-0.5 rounded">/predictions/[slug]</code> route uses <code className="font-mono text-xs bg-[var(--color-bg)] px-1.5 py-0.5 rounded">generateStaticParams</code> to pre-render a static page for every tool at build time:
        </p>
        <pre className="text-xs leading-relaxed overflow-x-auto bg-[var(--color-bg)] p-4 rounded-xl font-mono">{`// app/predictions/[slug]/layout.jsx
export async function generateStaticParams() {
  return toolsData
    .filter((t) => t.status === "live")
    .map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const tool = toolsData.find((t) => t.slug === params.slug);
  return {
    title: tool.seo.metaTitle,
    description: tool.seo.metaDescription,
    keywords: tool.keywords,
    openGraph: { ... },
    alternates: { canonical: \`/predictions/\${tool.slug}\` },
  };
}`}</pre>
        <p className="text-sm text-[var(--color-text-muted)] mt-3">
          Result: every tool gets its own statically-generated, SEO-optimized page. Add a tool → new page in sitemap → Google indexes it.
        </p>
      </Card>

      {/* Reusable components */}
      <Card padding="lg">
        <h2 className="font-display font-bold text-lg mb-3">Reusable Components Library</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ComponentList title="Layout" items={["PredictionLayout", "Navbar (with auto-populated Tools dropdown)", "Footer", "Breadcrumbs"]} />
          <ComponentList title="UI Atoms" items={["Button", "Card", "Modal", "Toast", "Tooltip", "PlayerAvatar", "AnimatedNumber"]} />
          <ComponentList title="Predictor" items={["HeroSection", "BigWinnerCard", "PredictionTable", "BonusPredictions", "PredictionReadyCard", "BottomActionBar", "MatchSchedule", "SinglePickTool (generic)"]} />
          <ComponentList title="SEO" items={["SeoContent", "FaqAccordion (with Schema.org JSON-LD)", "RelatedTools (auto-resolved)"]} />
          <ComponentList title="Sharing" items={["ShareableCard (1080x1080 PNG)", "FloatingShareButton", "OnboardingHint"]} />
          <ComponentList title="Admin" items={["ToolForm (reusable for new + edit)", "Admin layout (auth-gated)", "ToolsList"]} />
        </div>
      </Card>

      {/* Production migration */}
      <Card padding="lg" className="border-primary-200 dark:border-primary-800/40 bg-gradient-to-br from-[var(--color-primary-soft)] to-white dark:from-primary-900/20 dark:to-[var(--color-surface)]">
        <h2 className="font-display font-bold text-lg mb-3">Production Migration Path</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-3">
          The current implementation uses JSON + localStorage so the entire platform works without a backend (zero hosting cost, perfect for prototyping). To scale to thousands of users:
        </p>
        <ol className="space-y-2 text-sm list-decimal pl-5">
          <li>
            Pick a database (Supabase recommended — free tier, Postgres, REST + realtime out of the box).
          </li>
          <li>
            Create tables matching the schemas in <code className="font-mono text-xs bg-white dark:bg-[var(--color-surface)] px-1.5 py-0.5 rounded">lib/schemas.js</code>.
          </li>
          <li>
            Replace the storage functions in <code className="font-mono text-xs bg-white dark:bg-[var(--color-surface)] px-1.5 py-0.5 rounded">lib/toolsRepository.js</code> with Supabase queries.
          </li>
          <li>
            Add Auth.js or Supabase Auth for the admin panel.
          </li>
          <li>
            Convert <code className="font-mono text-xs bg-white dark:bg-[var(--color-surface)] px-1.5 py-0.5 rounded">[slug]</code> route from static generation to ISR (incremental static regeneration) so new tools appear without redeploy.
          </li>
        </ol>
        <p className="text-xs text-[var(--color-text-muted)] mt-3">
          🎯 Every consumer (pages, components, navbar, sitemap, related tools) keeps working unchanged — the storage adapter pattern guarantees it.
        </p>
      </Card>
    </div>
  );
}

function KindCard({ name, icon, description, example }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-3">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-xl">{icon}</span>
        <code className="font-mono text-xs font-bold">{name}</code>
      </div>
      <p className="text-xs text-[var(--color-text)] mb-1">{description}</p>
      <p className="text-[11px] text-[var(--color-text-muted)] italic">e.g. {example}</p>
    </div>
  );
}

function SchemaBlock({ title, code }) {
  return (
    <div className="mb-4">
      <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">{title}</div>
      <pre className="text-xs leading-relaxed overflow-x-auto bg-[var(--color-bg)] p-3 rounded-lg font-mono">{code}</pre>
    </div>
  );
}

function ComponentList({ title, items }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-3">
      <div className="text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)] mb-2">{title}</div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="text-xs flex items-start gap-1.5">
            <span className="text-primary-600">•</span>
            <code className="font-mono">{item}</code>
          </li>
        ))}
      </ul>
    </div>
  );
}
