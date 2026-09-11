"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Input, Btn, Check, RadioCard, Badge, Chips } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const SHOES = [
  { id: "r1", name: "Stride Runner 3", brand: "Stride", price: 2499, sizes: ["7", "8", "9", "10"] }, { id: "r2", name: "Velocity Racer", brand: "Velocity", price: 4299, sizes: ["8", "9", "10", "11"] },
  { id: "r3", name: "TrailMax Grip", brand: "Stride", price: 1799, sizes: ["7", "8", "9"] }, { id: "r4", name: "CloudStep Daily", brand: "Cloud", price: 1299, sizes: ["9", "10", "11"] }, { id: "r5", name: "AeroSprint Pro", brand: "Aero", price: 2899, sizes: ["10", "11"] },
];
const BANDS = [{ id: "u1500", l: "Under ₹1,500", min: 0, max: 1499 }, { id: "1500-3000", l: "₹1,500 – ₹3,000", min: 1500, max: 3000 }, { id: "3000+", l: "Above ₹3,000", min: 3001, max: 1e9 }];
const seed = () => ({ q: "", sizes: [], band: null, open: null });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [q, setQ] = useState(s.q);
  const band = BANDS.find((b) => b.id === s.band);
  const res = s.q && /shoe|running|run/i.test(s.q) ? SHOES.filter((x) => (!s.sizes.length || s.sizes.some((z) => x.sizes.includes(z))) && (!band || (x.price >= band.min && x.price <= band.max))) : [];
  const p = SHOES.find((x) => x.id === s.open);
  return (
    <>
      <Topbar entity={ent} light right={<form className="ee-row" onSubmit={(e) => { e.preventDefault(); set({ ...s, q: q.trim(), open: null }); }}><Input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for products, brands and more" aria-label="Search Flipmart" style={{ width: "min(420px, 50vw)" }} /><Btn type="submit" data-testid="fk-search">Search</Btn></form>} />
      <main className="ee-main ee-main--wide">
        {p ? (<Card data-testid="pdp"><button className="ee-link ee-small" onClick={() => set({ ...s, open: null })}>← Back</button><h1 className="ee-page-title" data-testid="pdp-title">{p.name}</h1><div className="ee-price" data-testid="pdp-price">{money(p.price, "INR")}</div><div className="ee-small" style={{ margin: "8px 0" }}>Available sizes (UK): <span data-testid="pdp-sizes">{p.sizes.join(", ")}</span></div><Chips options={p.sizes} value={s.sizes.find((z) => p.sizes.includes(z)) || null} onChange={() => {}} /><div style={{ marginTop: 10 }} data-testid="pdp-match"><Badge tone="ok">Size {s.sizes.filter((z) => p.sizes.includes(z)).join("/") || "any"} available · price {band ? band.l : "any"}</Badge></div></Card>)
          : !s.q ? <Card><div className="ee-empty">Search for “running shoes”.</div></Card> : (
          <div className="ee-split ee-split--sidebar-left">
            <Card title="Filters" data-testid="fk-filters">
              <div className="ee-strong ee-small">Size (UK)</div>{["7", "8", "9", "10", "11"].map((z) => <Check key={z} label={`UK ${z}`} checked={s.sizes.includes(z)} onChange={(e) => set({ ...s, sizes: e.target.checked ? [...s.sizes, z] : s.sizes.filter((x) => x !== z) })} />)}
              <div className="ee-strong ee-small" style={{ marginTop: 10 }}>Price</div><div className="ee-stack" style={{ gap: 6 }}>{BANDS.map((b) => <RadioCard key={b.id} name="band" value={b.id} checked={s.band === b.id} onChange={(v) => set({ ...s, band: v })} title={b.l} />)}</div>
            </Card>
            <div><div className="ee-small ee-muted" data-testid="fk-count">Showing {res.length} results for “{s.q}”{s.sizes.length ? ` · UK ${s.sizes.join(", ")}` : ""}{band ? ` · ${band.l}` : ""}</div>
              <div className="ee-grid ee-grid--3" style={{ marginTop: 8 }}>{res.map((x, i) => <Card key={x.id} tight data-testid={`fk-result-${i}`}><div className="ee-product__img" aria-hidden="true">👟</div><button className="ee-link" style={{ color: "var(--ee-text)", textAlign: "left" }} onClick={() => set({ ...s, open: x.id })} data-testid={`fk-open-${i}`}>{x.name}</button><div className="ee-price">{money(x.price, "INR")}</div><div className="ee-tiny ee-muted">Sizes {x.sizes.join(", ")}</div></Card>)}</div></div>
          </div>
        )}
      </main>
    </>
  );
}
