// Safe localStorage wrapper for SSR compatibility
const STORAGE_KEY = "pt-golden-boot-predictions";

export function loadPredictions() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function savePredictions(data) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    // storage quota or disabled
  }
}

export function clearPredictions() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
}

// Theme persistence
const THEME_KEY = "pt-theme";

export function loadTheme() {
  if (typeof window === "undefined") return "light";
  try {
    return window.localStorage.getItem(THEME_KEY) || "light";
  } catch (e) {
    return "light";
  }
}

export function saveTheme(theme) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch (e) {}
}
