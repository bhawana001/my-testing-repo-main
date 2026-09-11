"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { BankShell } from "@/app/components/engines/BankShell";
import { Wizard, SEED_WIZARD } from "@/app/components/engines/Wizard";
import { Card, Badge, KV, Btn } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const CONTACTS = [{ value: "priya", label: "Priya Nair", desc: "priya@example.com" }, { value: "tom", label: "Tom Alvarez", desc: "(555) 010-0199" }];
const STEPS = [
  { id: "to", title: "Recipient", heading: "Send money with Zelly", fields: [{ name: "to", label: "Saved contact", type: "radio-cards", required: true, options: CONTACTS }] },
  { id: "amount", title: "Amount", heading: "How much?", fields: [
    { name: "from", label: "From account", type: "select", required: true, options: [{ value: "chk", label: "Total Checking (•••• 4821) · $4,210.55" }] },
    { name: "amount", label: "Amount", required: true, inputMode: "decimal", validate: (v) => (Number(v) > 0 && Number(v) <= 4210.55 ? null : "Enter an amount up to your available balance.") },
    { name: "memo", label: "Memo (optional)", placeholder: "Dinner" },
  ] },
  { id: "review", title: "Review", heading: "Review and send", summary: true, nextLabel: "Send money" },
];
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), () => ({ wiz: { ...SEED_WIZARD, values: { from: "chk" } } }));
  return (
    <BankShell entity={ent} nav={["Accounts", "Pay & transfer", "Zelly", "Statements"]} active="Zelly" accounts={[{ id: "chk", name: "Total Checking", mask: "•••• 4821", balance: s.wiz.done ? 4210.55 - Number(s.wiz.values.amount) : 4210.55 }]}>
      <div style={{ maxWidth: 640 }}>
        <Wizard state={s.wiz} setState={(u) => set((st) => ({ ...st, wiz: typeof u === "function" ? u(st.wiz) : u }))} steps={STEPS} submitLabel="Send money" testIdPrefix="zelle"
          onSubmit={(v) => ({ ref: "ZL-" + String(Math.round(Number(v.amount) * 100)).padStart(6, "0") + "-14", to: CONTACTS.find((c) => c.value === v.to).label, amount: Number(v.amount), memo: v.memo })}
          result={(r) => (
            <Card data-testid="zelle-confirmation">
              <Badge tone="ok">Sent</Badge>
              <h2 style={{ margin: "8px 0" }}>You sent {money(r.amount)} to {r.to}</h2>
              <KV k="Reference number" v={<span className="ee-mono" data-testid="zelle-ref">{r.ref}</span>} />
              <KV k="From" v="Total Checking (•••• 4821)" />
              {r.memo && <KV k="Memo" v={r.memo} />}
              <KV k="Delivery" v="Typically within minutes" />
              <Btn variant="secondary" size="sm" style={{ marginTop: 10 }} onClick={() => set({ wiz: { ...SEED_WIZARD, values: { from: "chk" } } })}>Send another</Btn>
            </Card>
          )} />
      </div>
    </BankShell>
  );
}
