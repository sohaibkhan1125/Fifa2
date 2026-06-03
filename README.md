# FIFA World Cup 2026 — Golden Boot Predictor

A scalable, mobile-first sports prediction tool built for the **PrimeTools ecosystem**. Predict the top scorers, crown the Golden Boot winner, and share your predictions virally.

---

## ✨ Features

### Core
- 🏆 **Top Scorer Predictions** — Interactive +/- counters with auto-sorting leaderboard
- 📈 **Auto Ranking** — Live rank changes with up/down arrows
- 🔍 **Search & Filter** — Find players by name or filter by country
- 🎯 **Winner Card** — Displays the current #1 predicted player
- 🎁 **Bonus Predictions** — World Cup Winner, Dark Horse, Biggest Upset, Best Young Player
- 📊 **Prediction Summary** — Stats overview (matches, players, teams, winner)

### Viral / Social
- 🎉 **Confetti** — Celebration when the #1 winner changes
- 🔗 **Share** — Web Share API with clipboard fallback
- 🖼️ **Branded PNG Export** — Beautiful 1080×1080 shareable card (Instagram-ready)
- 📲 **Floating Mobile Share Button** — Always-visible viral access
- 🔢 **Animated Counters** — Smooth number transitions

### Ecosystem Scalability
- 🗂️ **Tools Registry** — Single JSON source of truth in `/data/tools.json`
- 🧩 **Reusable PredictionLayout** — All future tools share the same shell
- 🔗 **Internal Linking** — Breadcrumbs + Related Tools per page
- 🌐 **Tools Index Page** (`/tools`) — Auto-generated catalog of all predictors
- 🌎 **SEO Automation** — Per-route metadata, sitemap.xml, robots.txt
- 🎨 **Design Tokens** — CSS variables for instant ecosystem consistency

### Polish
- 🌙 **Light/Dark Mode** — Theme toggle with localStorage persistence
- 💾 **Auto-Save** — All predictions persist in localStorage
- 📱 **Mobile-First** — Fully responsive across all devices
- ♿ **Accessible** — ARIA labels, keyboard navigation, focus states
- 🎨 **Branded Modal** — Replaces ugly browser confirm dialogs
- 🍃 **Smooth Animations** — Slide-up, scale-in, fade-in micro-interactions

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 3.4
- **State**: React Hooks + localStorage (no database, no API)
- **PNG Export**: html2canvas (lazy-loaded)
- **Confetti**: Pure vanilla JS (Web Animations API)
- **No authentication, no backend** — pure frontend

---

## 🚀 Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve production build
```

Opening `/` redirects to `/predictions/golden-boot`.

---

## 📁 Project Structure

```
golden-boot-predictor/
├── app/
│   ├── globals.css                     # Tailwind + design tokens
│   ├── layout.jsx                      # Root layout (global SEO metadata)
│   ├── page.jsx                        # Homepage redirect
│   ├── not-found.jsx                   # Custom 404
│   ├── sitemap.js                      # Auto-generated sitemap
│   ├── robots.js                       # Robots.txt
│   ├── tools/
│   │   └── page.jsx                    # Tools ecosystem index
│   └── predictions/
│       ├── golden-boot/
│       │   ├── layout.jsx              # Per-route SEO metadata
│       │   └── page.jsx                # Golden Boot Predictor (main tool)
│       └── world-cup-winner/
│           ├── layout.jsx              # Per-route SEO metadata
│           └── page.jsx                # World Cup Winner Predictor
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx                  # PrimeTools navbar + theme toggle
│   │   ├── Footer.jsx
│   │   ├── PredictionLayout.jsx        # Shared layout wrapper for tools
│   │   └── Breadcrumbs.jsx
│   ├── ui/                             # Reusable atoms
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── PlayerAvatar.jsx
│   │   ├── Toast.jsx
│   │   ├── Modal.jsx
│   │   ├── Tooltip.jsx
│   │   └── AnimatedNumber.jsx
│   └── predictor/                      # Tool-specific components
│       ├── HeroSection.jsx
│       ├── PredictionTable.jsx         # Sortable + filterable + search
│       ├── WinnerCard.jsx
│       ├── HowItWorks.jsx
│       ├── SummaryCard.jsx
│       ├── ShareCard.jsx
│       ├── RecentPredictions.jsx
│       ├── BonusPredictions.jsx
│       ├── BottomActionBar.jsx
│       ├── FloatingShareButton.jsx     # Mobile viral access
│       ├── ShareableCard.jsx           # 1080×1080 branded PNG export
│       └── RelatedTools.jsx            # Internal linking + ecosystem
├── data/                               # JSON data layer
│   ├── tools.json                      # Tools registry (ecosystem source of truth)
│   ├── players.json                    # 22 top scorer candidates
│   ├── teams.json                      # 28 World Cup nations
│   ├── youngPlayers.json
│   └── matchups.json
├── lib/
│   ├── storage.js                      # localStorage helpers
│   ├── share.js                        # Share + PNG export
│   └── confetti.js                     # Pure JS confetti
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── jsconfig.json
└── package.json
```

---

## 🎨 Design System

- **Colors**: PrimeTools purple `#7C3AED` primary, with light/dark surface tokens
- **Typography**: Inter (body) + Plus Jakarta Sans (display)
- **Spacing**: Tailwind default scale
- **Radius**: `rounded-xl` for buttons, `rounded-2xl` for cards
- **Shadows**: `shadow-soft`, `shadow-card`, `shadow-glow` (custom)

All theme tokens are CSS variables in `app/globals.css` consumed via Tailwind classes — perfect for ecosystem consistency.

---

## ♻️ How to Add a New Tool (Scalability)

1. Add a new entry to `data/tools.json` with `id`, `slug`, `name`, etc.
2. Create `app/predictions/<slug>/page.jsx` and wrap with `<PredictionLayout>`
3. Create `app/predictions/<slug>/layout.jsx` for SEO metadata (uses `tools.json`)
4. Reuse existing components: `<PredictionTable>`, `<RelatedTools>`, etc.

The new tool will automatically:
- Appear in `/tools` (ecosystem index)
- Appear in "Related Tools" on every other tool page
- Get its own sitemap entry
- Inherit the PrimeTools navbar, footer, breadcrumbs, and design tokens

---

## 🔍 SEO & pSEO Architecture

- **Per-route metadata** generated from `tools.json` (title, description, keywords, OpenGraph)
- **Auto-generated sitemap.xml** that crawls all live tools
- **Auto-generated robots.txt**
- **Breadcrumbs** on every tool page for internal linking
- **Related Tools** section on every tool page (ecosystem internal linking)
- **Canonical URLs** on every tool route

To enable programmatic pSEO (e.g., a page per matchup), add a `[slug]` dynamic route under `app/predictions/<tool>/` and source from JSON.

---

## 📱 Responsive Breakpoints

- **Mobile (<640px)**: Single column, sticky bottom action bar, floating share button
- **Tablet (640–1024px)**: 2-column bonus predictions, 3-up sidebar
- **Desktop (≥1024px)**: 2-column main layout (table + middle sidebar)
- **Wide (≥1280px)**: Full 3-column layout matching the reference design

---

## 📦 Deployment

Ready for Vercel, Netlify, or any Next.js-compatible host. No environment variables required.

```bash
vercel --prod
# or
netlify deploy --prod
```

---

## 📝 License

MIT — built for PrimeTools.
