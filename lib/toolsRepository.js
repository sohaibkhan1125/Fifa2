/**
 * ============================================================
 * TOOLS REPOSITORY
 * ============================================================
 * Storage-adapter pattern.
 *
 * Current adapter: JSON file + localStorage overlay (admin edits).
 * To migrate to Postgres/Supabase/Mongo, swap ONE function below.
 * All consumer code (pages, components, sitemap, admin) is untouched.
 * ============================================================
 */

import staticTools from "@/data/tools.json";

const ADMIN_OVERRIDES_KEY = "pt-admin-tools-overrides";
const ADMIN_DELETED_KEY = "pt-admin-tools-deleted";

/**
 * Load all tools (server + client safe).
 * On client, layers admin localStorage overrides on top of the static JSON.
 */
export function getAllTools() {
  if (typeof window === "undefined") {
    return staticTools;
  }

  let overrides = {};
  let deleted = [];
  try {
    overrides = JSON.parse(window.localStorage.getItem(ADMIN_OVERRIDES_KEY) || "{}");
    deleted = JSON.parse(window.localStorage.getItem(ADMIN_DELETED_KEY) || "[]");
  } catch {}

  const merged = staticTools
    .filter((t) => !deleted.includes(t.id))
    .map((t) => (overrides[t.id] ? { ...t, ...overrides[t.id] } : t));

  // Add admin-created new tools
  Object.values(overrides).forEach((tool) => {
    if (!staticTools.find((t) => t.id === tool.id) && !deleted.includes(tool.id)) {
      merged.push(tool);
    }
  });

  return merged;
}

export function getToolBySlug(slug) {
  return getAllTools().find((t) => t.slug === slug) || null;
}

export function getToolById(id) {
  return getAllTools().find((t) => t.id === id) || null;
}

export function getLiveTools() {
  return getAllTools().filter((t) => t.status === "live");
}

export function getFeaturedTools() {
  return getAllTools().filter((t) => t.featured);
}

export function getToolsByCategory(categoryId) {
  return getAllTools().filter((t) => t.categoryId === categoryId);
}

export function getRelatedTools(toolId, limit = 4) {
  const tool = getToolById(toolId);
  if (!tool) return [];

  // Use manually curated related IDs if present
  if (tool.seo?.relatedIds?.length) {
    const related = tool.seo.relatedIds
      .map((id) => getToolById(id))
      .filter(Boolean)
      .slice(0, limit);
    if (related.length >= 2) return related;
  }

  // Auto-fallback: same category, exclude self
  return getAllTools()
    .filter((t) => t.id !== toolId && t.categoryId === tool.categoryId)
    .slice(0, limit);
}

/* ============================================================
 * WRITE operations (admin panel uses these)
 * Current implementation: localStorage overlay.
 * Migration target: API calls to Postgres/Supabase.
 * ============================================================ */

export function saveTool(tool) {
  if (typeof window === "undefined") return { ok: false, error: "Server-side" };

  try {
    const overrides = JSON.parse(window.localStorage.getItem(ADMIN_OVERRIDES_KEY) || "{}");
    overrides[tool.id] = { ...tool, updatedAt: new Date().toISOString() };
    window.localStorage.setItem(ADMIN_OVERRIDES_KEY, JSON.stringify(overrides));
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

export function createTool(tool) {
  if (typeof window === "undefined") return { ok: false, error: "Server-side" };

  // Check ID uniqueness
  if (getAllTools().find((t) => t.id === tool.id)) {
    return { ok: false, error: `Tool with id "${tool.id}" already exists` };
  }

  const now = new Date().toISOString();
  return saveTool({ ...tool, createdAt: now, updatedAt: now });
}

export function deleteTool(id) {
  if (typeof window === "undefined") return { ok: false, error: "Server-side" };

  try {
    const deleted = JSON.parse(window.localStorage.getItem(ADMIN_DELETED_KEY) || "[]");
    if (!deleted.includes(id)) deleted.push(id);
    window.localStorage.setItem(ADMIN_DELETED_KEY, JSON.stringify(deleted));

    // Also remove from overrides if present
    const overrides = JSON.parse(window.localStorage.getItem(ADMIN_OVERRIDES_KEY) || "{}");
    delete overrides[id];
    window.localStorage.setItem(ADMIN_OVERRIDES_KEY, JSON.stringify(overrides));

    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

export function toggleToolStatus(id) {
  const tool = getToolById(id);
  if (!tool) return { ok: false, error: "Tool not found" };

  const nextStatus = tool.status === "live" ? "coming-soon" : "live";
  return saveTool({ ...tool, status: nextStatus });
}

/* ============================================================
 * EXPORT — admin can export current state as JSON
 * Useful for committing changes back to the static file
 * ============================================================ */
export function exportToolsAsJson() {
  return JSON.stringify(getAllTools(), null, 2);
}

export function resetAdminChanges() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(ADMIN_OVERRIDES_KEY);
    window.localStorage.removeItem(ADMIN_DELETED_KEY);
  } catch {}
}
