"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { BankShell } from "@/app/components/engines/BankShell";
import { Wizard, SEED_WIZARD } from "@/app/components/engines/Wizard";
import { Card, Badge, KV, Btn } from "@/app/components/eval/ui";

const TX = [{ value: "tx-1", label: "AIRLINE TICKETS INC · $412.80", desc: "Sep 9, 2026" }, { value: "tx-2", label: "GADGET WORLD ONLINE · $89.00", desc: "Sep 11, 2026" }, { value: "tx-3", label: "CAFE LUNA · $14.20", desc: "Sep 12, 2026" }];
const STEPS = [
  { id: "tx", title: "Transaction", heading: "Which transaction do you want to dispute?", fields: [{ name: "tx", label: "Recent transactions", type: "radio-cards", required: true, options: TX }] },
  { id: "reason", title: "Reason", heading: "Tell us what happened", fields: [
    { name: "reason", label: "Reason", type: "radio-cards", required: true, options: [{ value: "unrecognized", label: "I don't recognize this charge" }, { value: "duplicate", label: "I was charged more than once" }, { value: "notreceived", label: "I didn't receive the goods or services" }, { value: "cancelled", label: "I cancelled but was still charged" }] },
    { name: "details", label: "Additional details", type: "textarea", required: true, requiredMessage: "Please describe what happened." },
    { name: "contacted", label: "I have contacted the merchant to resolve this", type: "checkbox" },
  ] },
  { id: "review", title: "Review", heading: "Review your dispute", summary: true, nextLabel: "Submit dispute" },
];
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), () => ({ wiz: { ...SEED_WIZARD } }));
  return (
    <BankShell entity={ent} nav={["Accounts", "Credit cards", "Disputes"]} active="Credit cards" title="Dispute a transaction" sub="Freedom Credit Card (•••• 1177)">
      <div style={{ maxWidth: 640 }}>
        <Wizard state={s.wiz} setState={(u) => set((st) => ({ ...st, wiz: typeof u === "function" ? u(st.wiz) : u }))} steps={STEPS} submitLabel="Submit dispute" testIdPrefix="dispute"
          onSubmit={(v) => ({ caseRef: "DSP-2026-" + v.tx.replace("tx-", "0091"), tx: TX.find((t) => t.value === v.tx).label })}
          result={(r) => (
            <Card data-testid="dispute-confirmation">
              <Badge tone="ok">Dispute submitted</Badge>
              <h2 style={{ margin: "8px 0" }}>We're reviewing your dispute</h2>
              <KV k="Case reference" v={<span className="ee-mono" data-testid="dispute-ref">{r.caseRef}</span>} />
              <KV k="Transaction" v={r.tx} />
              <KV k="Provisional credit" v="Applied within 2 business days" />
              <KV k="Expected resolution" v="Up to 90 days" />
              <Btn variant="secondary" size="sm" style={{ marginTop: 10 }} onClick={() => set({ wiz: { ...SEED_WIZARD } })}>Dispute another</Btn>
            </Card>
          )} />
      </div>
    </BankShell>
  );
}
