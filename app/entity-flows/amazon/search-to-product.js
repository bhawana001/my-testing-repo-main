"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Input, Btn, Check, Badge, RadioCard } from "@/app/components/eval/ui";
import { searchProducts, findProduct } from "@/lib/seed/products";
import { money } from "@/lib/seed";

const BANDS = [{ id: "u50", l: "Under $50", min: 0, max: 49.99 }, { id: "50-100", l: "$50 to $100", min: 50, max: 100 }, { id: "100-200", l: "$100 to $200", min: 100, max: 200 }, { id: "200+", l: "$200 & above", min: 200, max: 99999 }];
const seed = () => ({ q: "", brands: [], band: null, open: null });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [q, setQ] = useState(s.q);
  const band = BANDS.find((b) => b.id === s.band);
  const base = s.q ? searchProducts(s.q) : [];
  const brands = [...new Set(base.map((p) => p.brand))];
  const results = base.filter((p) => (!s.brands.length || s.brands.includes(p.brand)) && (!band || (p.price >= band.min && p.price <= band.max))).sort((a, b) => b.rating - a.rating);
  const p = s.open ? findProduct(s.open) : null;
  const matches = p && (!s.brands.length || s.brands.includes(p.brand)) && (!band || (p.price >= band.min && p.price <= band.max));
  return (
    <>
      <Topbar entity={ent} right={<form onSubmit={(e) => { e.preventDefault(); set({ ...s, q: q.trim(), open: null }); }} className="ee-row" style={{ minWidth: 0 }}><Input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Amazonia" aria-label="Search Amazonia" style={{ width: "min(420px, 50vw)" }} /><Btn type="submit" style={{ background: "#febd69", color: "#111" }} data-testid="search-go">🔍</Btn></form>} />
      <main className="ee-main ee-main--wide">
        {p ? (
          <div className="ee-split" data-testid="pdp">
            <div className="ee-row" style={{ alignItems: "flex-start", gap: 24 }}><div className="ee-product__img" style={{ width: 280, fontSize: 90, flex: "none" }} aria-hidden="true">🎧</div>
              <div style={{ flex: 1, minWidth: 220 }}><button className="ee-link ee-small" onClick={() => set({ ...s, open: null })}>← Back to results</button><div className="ee-small ee-muted" data-testid="pdp-brand">Brand: {p.brand}</div><h1 className="ee-page-title" data-testid="pdp-title">{p.name}</h1><div className="ee-price" style={{ fontSize: 26 }} data-testid="pdp-price">{money(p.price)}</div><div className="ee-small">★ {p.rating} · {p.reviews.toLocaleString()} ratings</div></div></div>
            <Card><div data-testid="pdp-filter-match">{matches ? <Badge tone="ok">Matches your filters: {s.brands.join(", ") || "any brand"} · {band ? band.l : "any price"}</Badge> : <Badge tone="warn">Doesn't match current filters</Badge>}</div><Btn block pill style={{ marginTop: 12, background: "#ffd814", color: "#111" }}>Add to Cart</Btn></Card>
          </div>
        ) : !s.q ? <Card><div className="ee-empty">Search for a product, e.g. “wireless earbuds”.</div></Card> : (
          <div className="ee-split ee-split--sidebar-left">
            <Card title="Filters" data-testid="filters">
              <div className="ee-strong ee-small">Brand</div>
              {brands.map((b) => <Check key={b} label={b} checked={s.brands.includes(b)} onChange={(e) => set({ ...s, brands: e.target.checked ? [...s.brands, b] : s.brands.filter((x) => x !== b) })} />)}
              <div className="ee-strong ee-small" style={{ marginTop: 10 }}>Price</div>
              <div className="ee-stack" style={{ gap: 6 }}>{BANDS.map((b) => <RadioCard key={b.id} name="band" value={b.id} checked={s.band === b.id} onChange={(v) => set({ ...s, band: v })} title={b.l} />)}</div>
              {(s.brands.length > 0 || s.band) && <Btn size="sm" variant="ghost" onClick={() => set({ ...s, brands: [], band: null })}>Clear filters</Btn>}
            </Card>
            <div>
              <div className="ee-small ee-muted" style={{ marginBottom: 8 }} data-testid="result-count">{results.length} result{results.length === 1 ? "" : "s"} for “{s.q}”{s.brands.length ? ` · Brand: ${s.brands.join(", ")}` : ""}{band ? ` · ${band.l}` : ""}</div>
              <div className="ee-grid ee-grid--3" data-testid="results">
                {results.map((r, i) => <Card key={r.id} tight data-testid={`result-${i}`}><div className="ee-product"><div className="ee-product__img" aria-hidden="true">🎧</div><button className="ee-link" style={{ textAlign: "left", color: "var(--ee-text)" }} onClick={() => set({ ...s, open: r.id })} data-testid={`open-${i}`}>{r.name}</button><div className="ee-small ee-muted">{r.brand} · ★ {r.rating}</div><div className="ee-price">{money(r.price)}</div></div></Card>)}
              </div>
              {results.length === 0 && <div className="ee-empty">No results. Try removing a filter.</div>}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
