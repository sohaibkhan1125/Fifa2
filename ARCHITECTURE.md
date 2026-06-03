# PrimeTools Architecture

> How PrimeTools scales from 1 tool to 100+ without rebuilding.

This document answers every scalability question your client raised in their review:

1. ✅ Reusable tool framework
2. ✅ Admin/CMS system
3. ✅ Dynamic/programmatic SEO
4. ✅ Automatic sitemap + metadata management
5. ✅ Path to making Tool #100 faster than Tool #1
6. ✅ Database schemas/models
7. ✅ Working proof-of-concept

---

## System Diagram

```
                    ┌─────────────────────────────────────┐
                    │       data/tools.json               │
                    │   (single source of truth)          │
                    │  ┌──────────────────────────────┐   │
                    │  │  id, slug, kind, seo, config │   │
                    │  └──────────────────────────────┘   │
                    └────────────┬────────────────────────┘
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
                    ┌─────────────────────────────────────┐
                    │   lib/toolsRepository.js            │
                    │   (storage adapter — SWAPPABLE)     │
                    │  ┌──────────────────────────────┐   │
                    │  │ Current: JSON + localStorage │   │
                    │  │ Future:  Postgres / Supabase │   │
                    │  └──────────────────────────────┘   │
                    └─────────────────────────────────────┘
```

---

## Database Schemas

All schemas are defined as JSDoc types in `lib/schemas.js`. They work today with the JSON-backed adapter and drop into any SQL database tomorrow.

### `Tool` (main entity)

| Field | Type | Description |
|---|---|---|
| `id` | string | Primary key, e.g. `"golden-boot"` |
| `slug` | string | URL slug used at `/predictions/[slug]` |
| `name` | string | Display name |
| `tagline` | string | Short tagline for the hero |
| `description` | string | 1–2 sentence summary (used in meta tags) |
| `shortDescription` | string | One-liner for cards |
| `kind` | enum | `leaderboard \| single-pick \| bracket \| poll \| custom` |
| `categoryId` | string | Foreign key → `Category.id` |
| `tournament` | string | e.g. `"FIFA World Cup 2026"` |
| `icon` | string | Emoji |
| `accent` | enum | `primary \| amber \| emerald \| blue \| rose` |
| `status` | enum | `live \| coming-soon \| draft` |
| `featured` | boolean | Show on `/tools` featured row |
| `keywords` | string[] | SEO keywords |
| `config` | object | Kind-specific configuration |
| `seo` | object | Long-form SEO content + FAQs (see below) |
| `createdAt` / `updatedAt` | ISO timestamps |

### `Category`

| Field | Type |
|---|---|
| `id` | string |
| `name` | string |
| `slug` | string |
| `description` | string |
| `icon` | string |
| `order` | number |

### `SeoContent` (embedded inside `Tool`)

| Field | Type |
|---|---|
| `metaTitle` | string |
| `metaDescription` | string |
| `sections` | `SeoSection[]` — long-form content (800–1,200 words) |
| `faqs` | `Faq[]` — also rendered as Schema.org JSON-LD |
| `relatedIds` | string[] — manually curated related tools |

### `SeoSection`, `Faq`, `Prediction`

```ts
type SeoSection = { heading: string; body: string };  // body supports \n\n paragraphs
type Faq = { question: string; answer: string };

type Prediction = {
  id: string;
  toolId: string;     // → Tool.id
  userId: string;     // browser-local ID
  data: Record<string, any>;  // tool-specific
  createdAt: string;
  updatedAt: string;
};
```

---

## Reusable Components

All under `components/`:

| Category | Components |
|---|---|
| **Layout** | `PredictionLayout`, `Navbar`, `Footer`, `Breadcrumbs` |
| **UI Atoms** | `Button`, `Card`, `Modal`, `Toast`, `Tooltip`, `PlayerAvatar`, `AnimatedNumber` |
| **Predictor** | `HeroSection`, `BigWinnerCard`, `PredictionTable`, `BonusPredictions`, `PredictionReadyCard`, `BottomActionBar`, `MatchSchedule`, `SinglePickTool` (generic) |
| **SEO** | `SeoContent`, `FaqAccordion`, `RelatedTools` (auto-resolved) |
| **Sharing** | `ShareableCard` (1080×1080 PNG), `FloatingShareButton`, `OnboardingHint` |
| **Admin** | `ToolForm` (shared by new + edit), admin layout |

---

## How a New Tool Gets Added (Tool #50 = Tool #1 cost)

**Option A: Via Admin Panel** (no code)
1. Log in to `/admin` (password: `demo2026`)
2. Click "New Tool"
3. Fill out the form: name, description, kind, content, FAQs
4. Click Save — done. The tool appears across the site instantly.

**Option B: Via JSON edit** (developer)
1. Add one entry to `data/tools.json` with the right `kind`
2. Push to repo, redeploy — done.

In both cases, the new tool **automatically gets**:
- ✅ A page at `/predictions/<slug>` (dynamic route)
- ✅ A card on `/tools`
- ✅ An entry in the navbar dropdown
- ✅ Inclusion in the "Related Tools" sidebar of every relevant tool
- ✅ Per-route SEO metadata (title, description, keywords, OG, canonical)
- ✅ FAQ Schema.org JSON-LD for Google rich snippets
- ✅ Auto-inclusion in `/sitemap.xml`
- ✅ Breadcrumb navigation

**Zero new code. Zero new components. Zero new routes.**

---

## How Tool #2 Reuses Code from Tool #1

The `world-cup-winner` tool reuses these components built for `golden-boot`:

| Reused Component | Where it's used |
|---|---|
| `PredictionLayout` | Shell wrapper (navbar, footer, breadcrumbs) |
| `Card` | Every panel |
| `Toast` | All notifications |
| `RelatedTools` | Bottom of every tool page |
| `SeoContent` | SEO content sections |
| `FaqAccordion` | FAQ sections |
| `PlayerAvatar` | Anywhere a person is shown |
| `Modal` | Reset confirmation |

Result: The World Cup Winner page is only **~150 lines of bespoke code** because everything else is reused.

For tools using a `kind` like `single-pick` or `bracket`, **zero bespoke code** is needed — the generic `SinglePickTool` template renders any single-pick tool from its JSON config.

---

## Programmatic SEO

### Dynamic `[slug]` route

```js
// app/predictions/[slug]/layout.jsx
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
    openGraph: { /* ... */ },
    alternates: { canonical: `/predictions/${tool.slug}` },
  };
}
```

### Auto-generated sitemap

```js
// app/sitemap.js
export default function sitemap() {
  const toolRoutes = toolsData
    .filter((t) => t.status === "live")
    .map((t) => ({
      url: `${BASE}/predictions/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: t.featured ? 0.9 : 0.7,
    }));
  return [...staticRoutes, ...toolRoutes];
}
```

### FAQ rich snippets (Schema.org JSON-LD)

The `FaqAccordion` component injects structured data on every page that has FAQs:

```js
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};
```

Google can show these FAQs directly in search results.

### Internal linking

Every tool page renders `<RelatedTools currentToolId={...} />`. The component:
1. Reads `tool.seo.relatedIds` (manual curation)
2. Falls back to other tools in the same category
3. Renders Next.js `<Link>` tags — internal navigation, no full page reloads

---

## Storage Adapter Pattern (Migration to Postgres/Supabase)

The current implementation backs `tools.json` with a localStorage overlay so admin edits work without a real backend. To migrate to a production database, change **one file**: `lib/toolsRepository.js`.

```js
// CURRENT (JSON + localStorage overlay)
export function getAllTools() {
  return mergeOverrides(staticTools, localStorage);
}

// AFTER MIGRATION (Supabase)
export async function getAllTools() {
  const { data } = await supabase.from('tools').select('*');
  return data;
}
```

Every consumer — pages, components, the navbar dropdown, the sitemap, the admin panel — keeps working unchanged. **That's the storage adapter pattern.**

### Recommended production migration path

1. **Pick a database.** Supabase is recommended — free tier, Postgres, REST + realtime, drop-in row-level security.
2. **Run migrations.** Tables for `tools`, `categories`, `predictions`. Schemas match `lib/schemas.js`.
3. **Swap the adapter.** Replace functions in `lib/toolsRepository.js` with Supabase queries.
4. **Add auth.** Auth.js (formerly NextAuth) or Supabase Auth for the admin panel. Replace the demo password gate.
5. **Switch to ISR.** Convert the `[slug]` route from `generateStaticParams` to ISR so new admin-added tools appear without redeploy.

---

## Admin Panel (Proof of Concept)

`/admin` (password: `demo2026`)

| Route | What it does |
|---|---|
| `/admin` | Dashboard with stats + quick links |
| `/admin/tools` | List all tools with toggle/edit/delete |
| `/admin/tools/new` | Create a new tool (full form) |
| `/admin/tools/[id]/edit` | Edit an existing tool |
| `/admin/architecture` | This documentation, in-app |

**Form sections:**
- Basic Info (name, slug, icon, descriptions)
- Configuration (kind, category, status, accent, featured, keywords)
- Kind-specific Configuration (for single-pick: options source, label)
- SEO Content (meta title/description, content sections, FAQs)

Tool admin changes save to localStorage. The "Export tools.json" button downloads the current state so changes can be committed back to git.

---

## Folder Structure

```
golden-boot-predictor/
├── app/
│   ├── globals.css
│   ├── layout.jsx                   # root layout + SEO defaults
│   ├── page.jsx                     # homepage → redirects
│   ├── opengraph-image.jsx          # auto-generated OG image
│   ├── icon.svg                     # favicon
│   ├── error.jsx                    # error boundary
│   ├── not-found.jsx                # 404
│   ├── sitemap.js                   # auto-generated sitemap
│   ├── robots.js                    # robots.txt
│   ├── tools/
│   │   └── page.jsx                 # /tools — ecosystem index
│   ├── predictions/
│   │   ├── [slug]/                  # DYNAMIC route (programmatic SEO)
│   │   │   ├── layout.jsx           # per-route SEO from tools.json
│   │   │   └── page.jsx             # renders any non-custom tool
│   │   ├── golden-boot/             # bespoke Golden Boot tool
│   │   │   ├── layout.jsx
│   │   │   └── page.jsx
│   │   └── world-cup-winner/        # bespoke World Cup Winner
│   │       ├── layout.jsx
│   │       └── page.jsx
│   └── admin/                       # ADMIN PANEL (proof-of-concept)
│       ├── layout.jsx               # auth gate
│       ├── page.jsx                 # dashboard
│       ├── architecture/
│       │   └── page.jsx             # this doc, in-app
│       └── tools/
│           ├── page.jsx             # tools list
│           ├── new/page.jsx         # create
│           └── [id]/edit/page.jsx   # edit
├── components/
│   ├── layout/
│   ├── ui/
│   ├── predictor/
│   ├── seo/
│   └── admin/
├── data/
│   ├── tools.json                   # ← single source of truth
│   ├── categories.json
│   ├── players.json
│   ├── teams.json
│   ├── youngPlayers.json
│   ├── matchups.json
│   └── matches.json                 # FIFA 2026 schedule
├── lib/
│   ├── schemas.js                   # ← JSDoc types + validators
│   ├── toolsRepository.js           # ← STORAGE ADAPTER (swappable)
│   ├── storage.js
│   ├── share.js
│   └── confetti.js
└── public/
```

---

## Summary

| Question your client asked | Answer |
|---|---|
| Can you build a reusable tool framework? | ✅ Yes — `kind` field + generic templates |
| Can you build an admin/CMS system? | ✅ Yes — full CRUD at `/admin` |
| Can you build programmatic SEO? | ✅ Yes — dynamic `[slug]` route + auto sitemap |
| Can you build auto sitemap + metadata? | ✅ Yes — both in place, regenerated on build |
| How is Tool #100 faster than Tool #1? | ✅ Tool #100 is literally a JSON entry (or one admin form submission). Zero new code. |
| Where are the database schemas? | ✅ `lib/schemas.js` — Tool, Category, SeoContent, SeoSection, Faq, Prediction |
| How would Tool #2 reuse Tool #1's code? | ✅ World Cup Winner reuses 7 components from Golden Boot |
| Working proof-of-concept? | ✅ Visit `/admin` → New Tool → save → see it instantly on `/tools` and in the navbar |
