"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Wizard, SEED_WIZARD } from "@/app/components/engines/Wizard";
import { Card, Badge, KV, Btn } from "@/app/components/eval/ui";

const STEPS = [
  { id: "tx", title: "Transaction", heading: "Which transaction is this about?", fields: [{ name: "tx", label: "Recent transactions", type: "radio-cards", required: true, options: [{ value: "t1", label: "Retro Gadgets LLC · −$89.99", desc: "Sep 3, 2026 · Payment for goods" }, { value: "t2", label: "Bean There Coffee · −$35.00", desc: "Sep 1, 2026 · Payment for goods" }] }] },
  { id: "issue", title: "Issue", heading: "What's the problem?", fields: [{ name: "issue", label: "Issue", type: "radio-cards", required: true, options: [{ value: "inr", label: "I didn't receive an item I bought" }, { value: "snad", label: "Item is significantly not as described" }, { value: "unauth", label: "I don't recognize this transaction" }] }, { name: "details", label: "Tell us more", type: "textarea", required: true, validate: (v) => (v.trim().length >= 15 ? null : "Please give a few more details (15+ characters).") }, { name: "contacted", label: "I contacted the seller and couldn't resolve it", type: "checkbox" }] },
  { id: "review", title: "Review", heading: "Review and open dispute", summary: true, nextLabel: "Open dispute" },
];
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), () => ({ wiz: { ...SEED_WIZARD } }));
  return (
    <>
      <Topbar entity={ent} light nav={["Home", "Activity", "Resolution Center"]} active="Resolution Center" />
      <main className="ee-main ee-main--narrow">
        <Wizard state={s.wiz} setState={(u) => set((st) => ({ ...st, wiz: typeof u === "function" ? u(st.wiz) : u }))} steps={STEPS} submitLabel="Open dispute" testIdPrefix="dispute" title="Report a problem"
          onSubmit={(v) => ({ id: "PP-D-" + (v.tx === "t1" ? "8999" : "3500") + "-" + v.issue.toUpperCase(), v })}
          result={({ id, v }) => (<Card data-testid="dispute-created"><Badge tone="warn" data-testid="dispute-status">Open</Badge><h2 style={{ margin: "8px 0" }}>We've opened your dispute</h2><KV k="Case ID" v={<span className="ee-mono" data-testid="case-id">{id}</span>} /><KV k="Transaction" v={v.tx === "t1" ? "Retro Gadgets LLC · $89.99" : "Bean There Coffee · $35.00"} /><KV k="Seller response due" v="September 24, 2026" /><Btn variant="secondary" size="sm" style={{ marginTop: 10 }} onClick={() => set({ wiz: { ...SEED_WIZARD } })}>Report another problem</Btn></Card>)} />
      </main>
    </>
  );
}
