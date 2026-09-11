"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Wizard, SEED_WIZARD } from "@/app/components/engines/Wizard";
import { Card, Badge, KV, Btn } from "@/app/components/eval/ui";
import { TxFeed } from "@/app/components/engines/Feed";
import { money } from "@/lib/seed";

const CONTACTS = [{ value: "Priya Nair", label: "Priya Nair", desc: "priya@sandbox.test" }, { value: "Tom Alvarez", label: "Tom Alvarez", desc: "tom@sandbox.test" }];
const STEPS = [
  { id: "to", title: "Recipient", heading: "Send money", fields: [{ name: "to", label: "Contacts", type: "radio-cards", required: true, options: CONTACTS }] },
  { id: "amount", title: "Amount", heading: "How much?", fields: [{ name: "amount", label: "Amount (USD)", required: true, inputMode: "decimal", validate: (v) => (Number(v) > 0 && Number(v) <= 500 ? null : "Enter between $0.01 and your $500.00 balance.") }, { name: "note", label: "Add a note", placeholder: "Dinner 🍜" }, { name: "type", label: "Payment type", type: "radio-cards", required: true, options: [{ value: "friends", label: "Sending to a friend", desc: "No fee from balance" }, { value: "goods", label: "Paying for an item or service", desc: "Purchase protection" }] }] },
  { id: "review", title: "Review", heading: "Review", summary: true, nextLabel: "Send Payment Now" },
];
const seed = () => ({ wiz: { ...SEED_WIZARD, values: { type: "friends" } }, activity: [{ id: "a1", who: "Sam Lee", note: "Concert tickets", amount: 25, dir: "in", when: "Sep 11" }] });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  return (
    <>
      <Topbar entity={ent} light nav={["Home", "Send & Request", "Activity"]} active="Send & Request" />
      <main className="ee-main">
        <div className="ee-split">
          <Wizard state={s.wiz} setState={(u) => set((st) => ({ ...st, wiz: typeof u === "function" ? u(st.wiz) : u }))} steps={STEPS} submitLabel="Send Payment Now" testIdPrefix="send"
            onSubmit={(v) => { const tx = { id: "a" + (s.activity.length + 1), who: v.to, note: v.note || "", amount: Number(v.amount), dir: "out", when: "Sep 14" }; set((st) => ({ ...st, activity: [tx, ...st.activity] })); return { ...tx, ref: "PAYID-SEND" + String(Math.round(tx.amount * 100)).padStart(5, "0") }; }}
            result={(r) => (<Card data-testid="send-done"><Badge tone="ok">Sent</Badge><h2 style={{ margin: "8px 0" }}>You sent {money(r.amount)} to {r.who}</h2><KV k="Note" v={r.note || "—"} /><KV k="Transaction ID" v={r.ref} /><Btn variant="secondary" size="sm" style={{ marginTop: 10 }} onClick={() => set((st) => ({ ...st, wiz: { ...SEED_WIZARD, values: { type: "friends" } } }))}>Send more</Btn></Card>)} />
          <Card title="Recent activity" data-testid="activity"><TxFeed items={s.activity} testIdPrefix="act" /></Card>
        </div>
      </main>
    </>
  );
}
