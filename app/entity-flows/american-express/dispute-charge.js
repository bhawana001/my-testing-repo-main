"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { BankShell } from "@/app/components/engines/BankShell";
import { Wizard, SEED_WIZARD } from "@/app/components/engines/Wizard";
import { Card, Badge, KV, Btn } from "@/app/components/eval/ui";

const CHARGES = [{ value: "c1", label: "GRAND HOTEL PLAZA · $612.00", desc: "Sep 8, 2026" }, { value: "c2", label: "STREAMING SERVICE · $15.99", desc: "Sep 10, 2026" }, { value: "c3", label: "ELECTRONICS DEPOT · $249.00", desc: "Sep 12, 2026" }];
const STEPS = [
  { id: "charge", title: "Charge", heading: "Select the charge to dispute", fields: [{ name: "charge", label: "Recent charges", type: "radio-cards", required: true, options: CHARGES }] },
  { id: "reason", title: "Reason", heading: "Why are you disputing this charge?", fields: [
    { name: "reason", label: "Reason", type: "radio-cards", required: true, options: [{ value: "fraud", label: "I didn't make this purchase" }, { value: "amount", label: "The amount is wrong" }, { value: "quality", label: "Goods or services not as described" }, { value: "refund", label: "I'm owed a refund I haven't received" }] },
    { name: "details", label: "Details", type: "textarea", required: true },
  ] },
  { id: "review", title: "Review", heading: "Review", summary: true, nextLabel: "Open dispute" },
];
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), () => ({ wiz: { ...SEED_WIZARD } }));
  return (
    <BankShell entity={ent} nav={["Account", "Activity", "Disputes"]} active="Activity" title="Dispute a charge" sub="Platinum Card •••• 1005">
      <div style={{ maxWidth: 640 }}>
        <Wizard state={s.wiz} setState={(u) => set((st) => ({ ...st, wiz: typeof u === "function" ? u(st.wiz) : u }))} steps={STEPS} submitLabel="Open dispute" testIdPrefix="amex-dispute"
          onSubmit={(v) => ({ caseId: "INQ-" + v.charge.toUpperCase() + "-77120", charge: CHARGES.find((c) => c.value === v.charge).label })}
          result={(r) => (
            <Card data-testid="dispute-opened">
              <Badge tone="ok">Case opened</Badge>
              <h2 style={{ margin: "8px 0" }}>Your dispute has been opened</h2>
              <KV k="Case number" v={<span className="ee-mono" data-testid="case-number">{r.caseId}</span>} />
              <KV k="Charge" v={r.charge} />
              <KV k="What's next" v="You don't need to pay the disputed amount while we investigate." />
              <Btn variant="secondary" size="sm" style={{ marginTop: 10 }} onClick={() => set({ wiz: { ...SEED_WIZARD } })}>Dispute another</Btn>
            </Card>
          )} />
      </div>
    </BankShell>
  );
}
