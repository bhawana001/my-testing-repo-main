"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Wizard, SEED_WIZARD } from "@/app/components/engines/Wizard";
import { Card, Badge, KV, Btn } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const ITEMS = [{ value: "tee", label: "Everyday Cotton Tee (M, Black)", desc: "Delivered September 5, 2026 · $18.00 · Return by October 5", price: 18 }, { value: "tv", label: 'Vista 55" 4K TV', desc: "Delivered August 24, 2026 · $449.00 · Return by September 23", price: 449 }];
const DROPS = [{ value: "store", label: "Drop off at Parcel Point, Market St", desc: "Free · print-free QR code", fee: 0 }, { value: "locker", label: "Amazonia Locker · 3rd St", desc: "Free · no box needed", fee: 0 }, { value: "pickup", label: "Schedule a pickup", desc: "$5.99 deducted from refund", fee: 5.99 }];
const STEPS = [
  { id: "item", title: "Item", heading: "Choose items to return", fields: [{ name: "item", label: "Delivered items", type: "radio-cards", required: true, options: ITEMS }] },
  { id: "reason", title: "Reason", heading: "Why are you returning this?", fields: [{ name: "reason", label: "Reason", type: "select", required: true, options: ["No longer needed", "Wrong size", "Item defective or doesn't work", "Arrived damaged"] }, { name: "comments", label: "Comments", type: "textarea", when: (v) => v.reason === "Item defective or doesn't work" || v.reason === "Arrived damaged", required: true, requiredMessage: "Please describe the problem." }] },
  { id: "refund", title: "Refund", heading: "How would you like your refund?", fields: [{ name: "refund", label: "Refund method", type: "radio-cards", required: true, options: [{ value: "card", label: "Original payment · Visa •••• 4242", desc: "3–5 business days after drop-off" }, { value: "gift", label: "Amazonia gift card balance", desc: "Instant once dropped off" }] }] },
  { id: "drop", title: "Drop-off", heading: "How will you return it?", fields: [{ name: "drop", label: "Return method", type: "radio-cards", required: true, options: DROPS.map((d) => ({ ...d, right: d.fee ? `−${money(d.fee)}` : "Free" })) }] },
  { id: "review", title: "Confirm", heading: "Confirm your return", summary: true, nextLabel: "Confirm return" },
];
const QR = () => <svg viewBox="0 0 21 21" width="120" height="120" style={{ background: "#fff", padding: 6 }} aria-label="Return QR code" data-testid="return-qr">{Array.from({ length: 21 * 21 }).map((_, i) => { const x = i % 21, y = Math.floor(i / 21); const on = ((x * 7 + y * 13) % 5 < 2) || (x < 7 && y < 7 && (x % 6 === 0 || y % 6 === 0 || (x > 1 && x < 5 && y > 1 && y < 5))); return on ? <rect key={i} x={x} y={y} width="1" height="1" fill="#111" /> : null; })}</svg>;
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), () => ({ wiz: { ...SEED_WIZARD } }));
  return (
    <>
      <Topbar entity={ent} nav={["Returns & Orders", "Account"]} active="Returns & Orders" />
      <main className="ee-main ee-main--narrow">
        <Wizard state={s.wiz} setState={(u) => set((st) => ({ ...st, wiz: typeof u === "function" ? u(st.wiz) : u }))} steps={STEPS} submitLabel="Confirm return" testIdPrefix="return" title="Return or replace items"
          onSubmit={(v) => { const it = ITEMS.find((i) => i.value === v.item); const d = DROPS.find((x) => x.value === v.drop); return { id: "RMA-" + (v.item === "tee" ? "D4471" : "T0824"), item: it, refund: Math.round((it.price - d.fee) * 100) / 100, method: v.refund, drop: d }; }}
          result={(r) => (
            <Card data-testid="return-confirmation">
              <Badge tone="ok">Return started</Badge>
              <h2 style={{ margin: "8px 0" }}>Your return is confirmed</h2>
              <KV k="Return ID" v={<span className="ee-mono" data-testid="return-id">{r.id}</span>} /><KV k="Item" v={r.item.label} />
              <KV k="Refund estimate" v={<span data-testid="refund-estimate">{money(r.refund)} to {r.method === "card" ? "Visa •••• 4242" : "gift card balance"}</span>} />
              <div className="ee-divider" />
              <div className="ee-strong" data-testid="dropoff-step">Next step: {r.drop.label}</div>
              <div className="ee-row" style={{ marginTop: 8 }}><QR /><div className="ee-small">Show this QR code at drop-off. No box or label printing needed. Drop off by October 5, 2026.</div></div>
              <Btn variant="secondary" size="sm" style={{ marginTop: 10 }} onClick={() => set({ wiz: { ...SEED_WIZARD } })}>Return another item</Btn>
            </Card>
          )} />
      </main>
    </>
  );
}
