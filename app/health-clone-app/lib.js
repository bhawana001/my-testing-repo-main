// Route prefix for the healthcare clone app — equal to the folder name.
export const BASE = "/health-clone-app";

// slug helpers (mirror bank-clone-app/lib.js so article/link building is consistent)
export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function titleize(slug) {
  return String(slug)
    .replace(/-/g, " ")
    .replace(/\band\b/g, "&")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function articleHref(label) {
  return `${BASE}/article/${slugify(label)}`;
}
