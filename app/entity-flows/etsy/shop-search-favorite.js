"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, Input, Segment, Badge } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const SHOPS = [{ id: "clay", name: "ClayWorks Studio", loc: "Portland, OR", items: [{ id: "i1", t: "Custom Name Ceramic Mug", p: 22 }, { id: "i2", t: "Speckled Pour-over Set", p: 58 }, { id: "i3", t: "Mini Planter Trio", p: 30 }] }, { id: "fern", name: "Fernhouse Prints", loc: "Leeds, UK", items: [{ id: "i4", t: "Botanical Art Print A3", p: 35 }] }];
const seed = () => ({ q: "", shop: null, favorites: [], tab: "search" });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [q, setQ] = useState(s.q);
  const shops = s.q ? SHOPS.filter((x) => x.name.toLowerCase().includes(s.q.toLowerCase())) : [];
  const shop = SHOPS.find((x) => x.id === s.shop);
  const allItems = SHOPS.flatMap((x) => x.items.map((i) => ({ ...i, shop: x.name })));
  const toggle = (id) => set({ ...s, favorites: s.favorites.includes(id) ? s.favorites.filter((x) => x !== id) : [...s.favorites, id] });
  return (
    <>
      <Topbar entity={ent} light right={<Segment options={[{ value: "search", label: "Shops" }, { value: "favorites", label: `♥ Favorites (${s.favorites.length})` }]} value={s.tab} onChange={(v) => set({ ...s, tab: v })} />} />
      <main className="ee-main">
        {s.tab === "favorites" ? (
          <Card title="Favorite items" data-testid="favorites">{s.favorites.length === 0 ? <div className="ee-empty">No favorites yet.</div> : allItems.filter((i) => s.favorites.includes(i.id)).map((i) => <div key={i.id} className="ee-row ee-row--between" data-testid={`fav-${i.id}`}><span>♥ <b>{i.t}</b> · <span className="ee-small ee-muted">{i.shop}</span></span><span>{money(i.p)}</span></div>)}</Card>
        ) : shop ? (
          <div data-testid="shop-page"><button className="ee-link ee-small" onClick={() => set({ ...s, shop: null })}>← Search results</button><h1 className="ee-page-title">{shop.name}</h1><p className="ee-page-sub">{shop.loc} · ★ 4.9</p>
            <div className="ee-grid ee-grid--3">{shop.items.map((i) => <Card key={i.id} tight data-testid={`item-${i.id}`}><div className="ee-product__img" aria-hidden="true">🏺</div><div className="ee-row ee-row--between" style={{ marginTop: 6 }}><span className="ee-strong ee-small">{i.t}</span><button type="button" onClick={() => toggle(i.id)} aria-pressed={s.favorites.includes(i.id)} aria-label={`Favorite ${i.t}`} style={{ border: 0, background: "none", fontSize: 20, cursor: "pointer", color: s.favorites.includes(i.id) ? "#e0245e" : "inherit" }} data-testid={`fav-btn-${i.id}`}>{s.favorites.includes(i.id) ? "♥" : "♡"}</button></div><div className="ee-price">{money(i.p)}</div></Card>)}</div>
          </div>
        ) : (<>
          <form className="ee-row" onSubmit={(e) => { e.preventDefault(); set({ ...s, q: q.trim() }); }} style={{ maxWidth: 520, marginBottom: 12 }}><Input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for shops" aria-label="Search for shops" style={{ flex: 1 }} /><Btn type="submit" data-testid="shop-search">Search</Btn></form>
          {s.q && <div className="ee-stack" data-testid="shop-results">{shops.map((x) => <Card key={x.id} tight><button className="ee-link" onClick={() => set({ ...s, shop: x.id })} data-testid={`shop-${x.id}`}>{x.name}</button><div className="ee-tiny ee-muted">{x.loc} · {x.items.length} items</div></Card>)}{shops.length === 0 && <div className="ee-empty">No shops found.</div>}</div>}
        </>)}
      </main>
    </>
  );
}
