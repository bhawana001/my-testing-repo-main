export const BASE = "/bank-clone-app";

// "Best High-Yield Savings" -> "best-high-yield-savings"
export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// "best-high-yield-savings" -> "Best High Yield Savings"
export function titleize(slug) {
  return String(slug)
    .replace(/-/g, " ")
    .replace(/\band\b/g, "&")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Build a link to the mock article/detail page from any label.
export function articleHref(label) {
  return `${BASE}/article/${slugify(label)}`;
}
