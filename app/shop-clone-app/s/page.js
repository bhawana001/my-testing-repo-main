"use client";
// Search results (use case 1.1: search to product page).
// Real behaviour: the query narrows the catalog, the left rail filters narrow it
// further, sort reorders it, and every result links to a real product page.
// Filters live in the URL so a filtered result set is shareable and reloadable.
import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../Header";
import { searchProducts, PRICE_BANDS } from "../data";
import { BASE, usd } from "../lib";

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Avg. Customer Review" },
];

function Stars({ n }) {
  return <span className="srp-stars">{"★".repeat(Math.floor(n))}{"☆".repeat(5 - Math.floor(n))}</span>;
}

function Results() {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get("k") || "";
  const brandParam = params.getAll("brand");
  const bandId = params.get("price") || "";
  const minRating = Number(params.get("rating") || 0);
  const sort = params.get("sort") || "featured";
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Base matches drive the brand facet, so facet counts reflect the query only.
  const base = useMemo(() => searchProducts(q), [q]);
  const brands = useMemo(() => {
    const counts = {};
    base.forEach((p) => { counts[p.brand] = (counts[p.brand] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [base]);

  const band = PRICE_BANDS.find((b) => b.id === bandId);
  let results = base.filter((p) =>
    (!brandParam.length || brandParam.includes(p.brand)) &&
    (!band || (p.price >= band.min && p.price <= band.max)) &&
    (!minRating || p.rating >= minRating)
  );
  if (sort === "price-asc") results = [...results].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") results = [...results].sort((a, b) => b.price - a.price);
  if (sort === "rating") results = [...results].sort((a, b) => b.rating - a.rating);

  // Every facet change rewrites the URL, keeping state in one place.
  function setParam(mutate) {
    const next = new URLSearchParams(params.toString());
    mutate(next);
    router.push(`${BASE}/s?${next.toString()}`);
  }
  const toggleBrand = (b) => setParam((n) => {
    const cur = n.getAll("brand");
    n.delete("brand");
    (cur.includes(b) ? cur.filter((x) => x !== b) : [...cur, b]).forEach((v) => n.append("brand", v));
  });
  const activeFilters = brandParam.length + (band ? 1 : 0) + (minRating ? 1 : 0);

  return (
    <>
      <Header initialQuery={q} onOpenCart={() => router.push(`${BASE}?cart=1`)} onOpenDrawer={() => setDrawerOpen(!drawerOpen)} />
      <div className="srp">
        <aside className="srp-rail" data-testid="filters">
          <h3>Brand</h3>
          {brands.length === 0 && <p className="srp-muted">No brands to filter.</p>}
          {brands.map(([b, n]) => (
            <label key={b} className="srp-check">
              <input type="checkbox" checked={brandParam.includes(b)} onChange={() => toggleBrand(b)} aria-label={b} />
              <span>{b} <span className="srp-muted">({n})</span></span>
            </label>
          ))}

          <h3>Price</h3>
          {PRICE_BANDS.map((b) => (
            <label key={b.id} className="srp-check">
              <input type="radio" name="price" checked={bandId === b.id}
                onChange={() => setParam((n) => n.set("price", b.id))} aria-label={b.label} />
              <span>{b.label}</span>
            </label>
          ))}

          <h3>Customer Review</h3>
          {[4, 3].map((r) => (
            <label key={r} className="srp-check">
              <input type="radio" name="rating" checked={minRating === r}
                onChange={() => setParam((n) => n.set("rating", String(r)))} aria-label={`${r} stars and up`} />
              <span><Stars n={r} /> &amp; Up</span>
            </label>
          ))}

          {activeFilters > 0 && (
            <button className="srp-clear" onClick={() => setParam((n) => { n.delete("brand"); n.delete("price"); n.delete("rating"); })}>
              Clear all filters
            </button>
          )}
        </aside>

        <section className="srp-main">
          <div className="srp-head">
            <div data-testid="result-count">
              {results.length === 0
                ? <>No results for <strong>&ldquo;{q}&rdquo;</strong></>
                : <><strong>{results.length}</strong> result{results.length === 1 ? "" : "s"} for <strong>&ldquo;{q}&rdquo;</strong></>}
              {activeFilters > 0 && <span className="srp-muted"> · {activeFilters} filter{activeFilters === 1 ? "" : "s"} applied</span>}
            </div>
            <label className="srp-sort">
              Sort by:
              <select value={sort} onChange={(e) => setParam((n) => n.set("sort", e.target.value))} aria-label="Sort by">
                {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </label>
          </div>

          {results.length === 0 ? (
            <div className="srp-empty">
              <p>Try a different search, or remove a filter.</p>
              <Link href={BASE} className="srp-link">Back to ShopKart home</Link>
            </div>
          ) : (
            <ol className="srp-list" data-testid="results">
              {results.map((p, i) => (
                <li key={p.id} className="srp-card" data-testid={`result-${i}`}>
                  <Link href={`${BASE}/dp/${p.id}`} className="srp-thumb" aria-hidden="true">{p.emoji}</Link>
                  <div className="srp-info">
                    <Link href={`${BASE}/dp/${p.id}`} className="srp-title" data-testid={`result-title-${i}`}>{p.title}</Link>
                    <div className="srp-brand">by {p.brand}</div>
                    <div className="srp-rating"><Stars n={p.rating} /> <span className="srp-muted">{p.ratingCount.toLocaleString()}</span></div>
                    <div className="srp-price">{usd(p.price)}</div>
                    {p.variants && <div className="srp-muted">{p.variants.axes.map((a) => `${a.options.length} ${a.name.toLowerCase()} options`).join(" · ")}</div>}
                    <div className="srp-ship">FREE delivery <strong>Thu, Sep 18</strong></div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="srp-loading">Loading results…</div>}>
      <Results />
    </Suspense>
  );
}
