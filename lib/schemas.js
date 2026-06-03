/**
 * ============================================================
 * PRIMETOOLS DATABASE SCHEMAS
 * ============================================================
 * Single source of truth for all entities in the PrimeTools ecosystem.
 * These JSDoc types are usable in:
 *   1. The current JSON-backed implementation (lib/toolsRepository.js)
 *   2. A future Postgres/Supabase migration (drop-in compatible)
 *   3. The admin panel forms (auto-generated from these shapes)
 *
 * To migrate to a real database, only swap the storage adapter in
 * `lib/toolsRepository.js` — the schemas stay the same.
 * ============================================================
 */

/**
 * @typedef {Object} Tool
 * @property {string} id                 - Unique identifier (snake-case, e.g. "golden-boot")
 * @property {string} slug               - URL slug, used in /predictions/[slug]
 * @property {string} name               - Display name (e.g. "Golden Boot Predictor")
 * @property {string} tagline            - Short tagline shown in hero
 * @property {string} description        - Long description (1-2 sentences)
 * @property {string} shortDescription   - One-line description for cards
 * @property {ToolKind} kind             - Determines which generic template renders this tool
 * @property {string} categoryId         - References Category.id
 * @property {string} tournament         - e.g. "FIFA World Cup 2026"
 * @property {string} icon               - Emoji or icon identifier
 * @property {AccentColor} accent        - Theme accent: primary | amber | emerald | blue | rose
 * @property {ToolStatus} status         - live | coming-soon | draft
 * @property {boolean} featured          - Whether to feature on /tools index
 * @property {string[]} keywords         - SEO keywords array
 * @property {ToolConfig} [config]       - Kind-specific configuration
 * @property {SeoContent} [seo]          - Long-form SEO content + FAQs
 * @property {string} [createdAt]        - ISO timestamp
 * @property {string} [updatedAt]        - ISO timestamp
 */

/**
 * @typedef {"leaderboard" | "single-pick" | "bracket" | "poll" | "custom"} ToolKind
 *
 * leaderboard  → Players + adjustable goals + auto-sort (Golden Boot)
 * single-pick  → User picks ONE option from a list (Dark Horse, Best Young Player)
 * bracket      → Multi-tier picks (Final Four, Winner, Runner-up...)
 * poll         → Vote among options with vote counts
 * custom       → Has its own bespoke page (golden-boot, world-cup-winner)
 */

/**
 * @typedef {"live" | "coming-soon" | "draft"} ToolStatus
 */

/**
 * @typedef {"primary" | "amber" | "emerald" | "blue" | "rose"} AccentColor
 */

/**
 * @typedef {Object} ToolConfig
 * @property {string} [optionsRef]    - References data file (e.g. "players", "teams")
 * @property {string} [optionLabel]   - Label shown above options ("Pick a team")
 * @property {string} [defaultPick]   - Default option id
 * @property {number} [minGoals]      - For leaderboard
 * @property {number} [maxGoals]      - For leaderboard
 * @property {BracketTier[]} [tiers]  - For bracket
 */

/**
 * @typedef {Object} BracketTier
 * @property {string} id
 * @property {string} label
 * @property {string} icon
 */

/**
 * @typedef {Object} SeoContent
 * @property {string} metaTitle       - <title> tag
 * @property {string} metaDescription - <meta description>
 * @property {SeoSection[]} sections  - Long-form content sections (800-1200 words total)
 * @property {Faq[]} faqs             - FAQ list
 * @property {string[]} relatedIds    - Manually-curated related tools (optional; auto-fills if empty)
 */

/**
 * @typedef {Object} SeoSection
 * @property {string} heading
 * @property {string} body            - Markdown-style paragraphs separated by \n\n
 */

/**
 * @typedef {Object} Faq
 * @property {string} question
 * @property {string} answer
 */

/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} name            - e.g. "Predictions", "Rankings", "Polls"
 * @property {string} slug            - URL slug for /categories/[slug]
 * @property {string} description
 * @property {string} icon
 * @property {number} order           - Sort order in nav
 */

/**
 * @typedef {Object} Prediction
 * @property {string} id              - Auto-generated
 * @property {string} toolId          - References Tool.id
 * @property {string} userId          - Browser-local user ID (no auth required)
 * @property {Object} data            - Tool-specific prediction data (JSON)
 * @property {string} createdAt
 * @property {string} updatedAt
 */

// ============================================================
// VALIDATORS
// ============================================================

/** @type {ToolKind[]} */
export const TOOL_KINDS = ["leaderboard", "single-pick", "bracket", "poll", "custom"];

/** @type {ToolStatus[]} */
export const TOOL_STATUSES = ["live", "coming-soon", "draft"];

/** @type {AccentColor[]} */
export const ACCENT_COLORS = ["primary", "amber", "emerald", "blue", "rose"];

/**
 * Validates a Tool object. Returns { ok: true } or { ok: false, errors: [] }
 */
export function validateTool(tool) {
  const errors = [];
  if (!tool.id || typeof tool.id !== "string") errors.push("id is required");
  if (!tool.slug || !/^[a-z0-9-]+$/.test(tool.slug))
    errors.push("slug must be lowercase letters, numbers, and hyphens");
  if (!tool.name) errors.push("name is required");
  if (!tool.description) errors.push("description is required");
  if (!TOOL_KINDS.includes(tool.kind)) errors.push(`kind must be one of: ${TOOL_KINDS.join(", ")}`);
  if (!TOOL_STATUSES.includes(tool.status))
    errors.push(`status must be one of: ${TOOL_STATUSES.join(", ")}`);
  if (tool.accent && !ACCENT_COLORS.includes(tool.accent))
    errors.push(`accent must be one of: ${ACCENT_COLORS.join(", ")}`);
  if (!Array.isArray(tool.keywords)) errors.push("keywords must be an array");

  return errors.length === 0 ? { ok: true } : { ok: false, errors };
}

/** Generates an empty tool template for the admin form */
export function emptyTool() {
  return {
    id: "",
    slug: "",
    name: "",
    tagline: "",
    description: "",
    shortDescription: "",
    kind: "single-pick",
    categoryId: "predictions",
    tournament: "FIFA World Cup 2026",
    icon: "🎯",
    accent: "primary",
    status: "draft",
    featured: false,
    keywords: [],
    config: {},
    seo: {
      metaTitle: "",
      metaDescription: "",
      sections: [],
      faqs: [],
      relatedIds: [],
    },
  };
}

/** Auto-generate slug from name */
export function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
