"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Wizard, SEED_WIZARD } from "@/app/components/engines/Wizard";
import { Card, Badge, KV, Btn, Input } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const SEED_LISTINGS = [{ id: "L-1", title: "Vintage Film Camera · 35mm · Fully working", price: 185, condition: "Used", photos: 4 }, { id: "L-2", title: "Analog Synthesizer · 37 keys · Boxed", price: 240, condition: "Used", photos: 6 }];
const SAMPLE_PHOTOS = ["front.jpg", "back.jpg", "box.jpg"];
const STEPS = [
  { id: "photos", title: "Photos", heading: "Add photos", description: "Add at least 2 photos. Use the sample photos to continue.", render: ({ values, setValue, errors }) => (
    <div className="ee-stack">
      <div className="ee-row">{(values.photos || []).map((p) => <Badge key={p}>🖼️ {p}</Badge>)}{(values.photos || []).length === 0 && <span className="ee-small ee-muted">No photos yet</span>}</div>
      <div className="ee-row">{SAMPLE_PHOTOS.map((p) => <Btn key={p} size="sm" variant="secondary" disabled={(values.photos || []).includes(p)} onClick={() => setValue("photos", [...(values.photos || []), p])} data-testid={`add-photo-${p.split(".")[0]}`}>+ {p}</Btn>)}</div>
      {errors.photos && <div className="ee-error">{errors.photos}</div>}
    </div>
  ), validate: (v) => ((v.photos || []).length >= 2 ? null : { photos: "Add at least 2 photos." }) },
  { id: "details", title: "Details", heading: "Item details", fields: [
    { name: "title", label: "Title", required: true, validate: (v) => (v.length <= 80 ? null : "Titles can be up to 80 characters.") },
    { name: "condition", label: "Condition", type: "radio-cards", required: true, options: [{ value: "New", label: "New" }, { value: "Used", label: "Used" }, { value: "For parts", label: "For parts or not working" }] },
    { name: "description", label: "Description", type: "textarea", required: true },
  ] },
  { id: "price", title: "Pricing", heading: "Set your price", fields: [{ name: "price", label: "Buy It Now price (USD)", required: true, inputMode: "decimal", validate: (v) => (Number(v) >= 1 ? null : "Price must be at least $1.00.") }, { name: "shipping", label: "Shipping", type: "select", required: true, options: ["Free standard shipping", "Buyer pays: $9.99"] }] },
  { id: "review", title: "Review", heading: "Review your listing", summary: true, nextLabel: "List it" },
];
const seed = () => ({ wiz: { ...SEED_WIZARD, values: { photos: [] } }, listings: SEED_LISTINGS, q: "" });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [q, setQ] = useState("");
  const results = s.q ? s.listings.filter((l) => l.title.toLowerCase().includes(s.q.toLowerCase())) : [];
  return (
    <>
      <Topbar entity={ent} nav={["Selling", "Listings", "Orders"]} active="Selling" light />
      <main className="ee-main">
        <div className="ee-split">
          <Wizard state={s.wiz} setState={(u) => set((st) => ({ ...st, wiz: typeof u === "function" ? u(st.wiz) : u }))} steps={STEPS} submitLabel="List it" testIdPrefix="listing" title="Create your listing"
            onSubmit={(v) => { const l = { id: "L-" + (s.listings.length + 1), title: v.title, price: Number(v.price), condition: v.condition, photos: v.photos.length }; set((st) => ({ ...st, listings: [l, ...st.listings] })); return l; }}
            result={(l) => (<Card data-testid="listing-live"><Badge tone="ok">Your listing is live</Badge><h2 style={{ margin: "8px 0" }} data-testid="live-title">{l.title}</h2><KV k="Item number" v={l.id} /><KV k="Price" v={money(l.price)} testId="live-price" /><KV k="Condition" v={l.condition} /><KV k="Photos" v={l.photos} /><Btn variant="secondary" size="sm" style={{ marginTop: 10 }} onClick={() => set((st) => ({ ...st, wiz: { ...SEED_WIZARD, values: { photos: [] } } }))}>List another item</Btn></Card>)} />
          <Card title="Search eBidz" data-testid="search">
            <form className="ee-row" onSubmit={(e) => { e.preventDefault(); set({ ...s, q: q.trim() }); }}><Input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for anything" aria-label="Search listings" style={{ flex: 1 }} /><Btn type="submit" data-testid="search-btn">Search</Btn></form>
            {s.q && <div className="ee-small ee-muted" style={{ marginTop: 8 }} data-testid="search-count">{results.length} result{results.length === 1 ? "" : "s"} for “{s.q}”</div>}
            <div className="ee-stack" style={{ marginTop: 8 }}>{results.map((l) => <div key={l.id} className="ee-row ee-row--between ee-small" data-testid={`search-${l.id}`}><span><b>{l.title}</b> · {l.condition}</span><span>{money(l.price)}</span></div>)}</div>
          </Card>
        </div>
      </main>
    </>
  );
}
