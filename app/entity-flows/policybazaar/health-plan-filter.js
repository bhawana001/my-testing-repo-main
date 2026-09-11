"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Select, Field, Badge, Btn } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const PLANS = [
  { id: 1, name: "Care Supreme", insurer: "Careish Health", premium: 14200, cover: 1000000, room: "No limit" },
  { id: 2, name: "Optima Secure", insurer: "HDFB Ergo", premium: 18900, cover: 1000000, room: "No limit" },
  { id: 3, name: "Health Companion", insurer: "Nivaish Bupa", premium: 11800, cover: 500000, room: "Single private room" },
  { id: 4, name: "Activ Fit", insurer: "Aditya Health", premium: 8900, cover: 500000, room: "1% of sum insured" },
  { id: 5, name: "Family Shield", insurer: "Star-ish Health", premium: 21500, cover: 1500000, room: "Single private room" },
  { id: 6, name: "Basic Care", insurer: "Digit-ish", premium: 7200, cover: 300000, room: "1% of sum insured" },
];
const BANDS = [{ v: "", l: "Any premium" }, { v: "0-10000", l: "Under ₹10,000" }, { v: "10000-15000", l: "₹10,000 – ₹15,000" }, { v: "15000-25000", l: "₹15,000 – ₹25,000" }];
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), () => ({ room: "", band: "" }));
  const [lo, hi] = s.band ? s.band.split("-").map(Number) : [0, Infinity];
  const rows = PLANS.filter((p) => (!s.room || p.room === s.room) && p.premium >= lo && p.premium < hi);
  return (
    <>
      <Topbar entity={ent} nav={["Term Life", "Health", "Car"]} active="Health" light />
      <main className="ee-main">
        <h1 className="ee-page-title">Health insurance plans</h1>
        <p className="ee-page-sub">Family floater · 2 adults · Bengaluru</p>
        <div className="ee-split ee-split--sidebar-left">
          <Card title="Filters" data-testid="filters">
            <div className="ee-stack">
              <Field label="Room rent limit" htmlFor="hp-room"><Select id="hp-room" value={s.room} onChange={(e) => set({ ...s, room: e.target.value })}><option value="">Any</option>{["No limit", "Single private room", "1% of sum insured"].map((r) => <option key={r}>{r}</option>)}</Select></Field>
              <Field label="Premium" htmlFor="hp-band"><Select id="hp-band" value={s.band} onChange={(e) => set({ ...s, band: e.target.value })}>{BANDS.map((b) => <option key={b.v} value={b.v}>{b.l}</option>)}</Select></Field>
              <Btn variant="secondary" size="sm" onClick={() => set({ room: "", band: "" })}>Clear filters</Btn>
            </div>
          </Card>
          <div className="ee-stack">
            <div className="ee-small ee-muted" data-testid="plan-count">{rows.length} plan{rows.length === 1 ? "" : "s"} found</div>
            {rows.length === 0 && <div className="ee-empty">No plans match these filters.</div>}
            {rows.map((p) => (
              <Card key={p.id} tight data-testid={`plan-${p.id}`}>
                <div className="ee-row ee-row--between">
                  <div><div className="ee-strong">{p.name}</div><div className="ee-small ee-muted">{p.insurer} · Cover {money(p.cover, "INR")}</div><div className="ee-small">Room rent: <b data-testid={`plan-${p.id}-room`}>{p.room}</b></div></div>
                  <div className="ee-right"><div className="ee-price" data-testid={`plan-${p.id}-premium`}>{money(p.premium, "INR")}</div><div className="ee-tiny ee-muted">per year</div><Btn size="sm" style={{ marginTop: 6 }}>View plan</Btn></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
