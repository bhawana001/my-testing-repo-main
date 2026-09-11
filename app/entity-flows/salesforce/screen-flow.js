"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Wizard, SEED_WIZARD } from "@/app/components/engines/Wizard";
import { Card, Badge, KV, Btn, Table } from "@/app/components/eval/ui";

const STEPS = [
  { id: "type", title: "Request type", heading: "Customer intake", fields: [
    { name: "kind", label: "What does the customer need?", type: "radio-cards", required: true, options: [{ value: "support", label: "Support issue" }, { value: "sales", label: "Sales inquiry" }] },
    { name: "account", label: "Account", type: "select", required: true, options: ["Globex Corporation", "Initech", "Umbrella Corp"] },
  ], next: (v) => (v.kind === "support" ? "support" : "sales") },
  { id: "support", title: "Support details", heading: "Support issue", fields: [
    { name: "subject", label: "Subject", required: true },
    { name: "priority", label: "Priority", type: "select", required: true, options: ["Low", "Medium", "High"] },
  ], next: () => "confirm" },
  { id: "sales", title: "Sales details", heading: "Sales inquiry", fields: [
    { name: "product", label: "Product interest", type: "select", required: true, options: ["Platform", "Analytics add-on", "Services"] },
    { name: "budget", label: "Budget (USD)", required: true, inputMode: "numeric" },
  ] },
  { id: "confirm", title: "Confirm", heading: "Confirm and finish", summary: true, nextLabel: "Finish" },
];
const seed = () => ({ wiz: { ...SEED_WIZARD }, records: [] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  return (
    <SaasShell flow={flow} nav={["Home", "Cases", "Leads", "Flows"]} active="Flows" title="Screen Flow · Customer Intake" sub="Flow runtime">
      <div className="ee-split">
        <Wizard state={s.wiz} setState={(u) => set((st) => ({ ...st, wiz: typeof u === "function" ? u(st.wiz) : u }))} steps={STEPS} submitLabel="Finish" testIdPrefix="flow"
          onSubmit={(v) => { const rec = v.kind === "support" ? { id: "500-" + (s.records.length + 101), type: "Case", name: v.subject, detail: `Priority ${v.priority}`, account: v.account } : { id: "00Q-" + (s.records.length + 301), type: "Lead", name: `${v.product} inquiry`, detail: `Budget $${v.budget}`, account: v.account }; set((st) => ({ ...st, records: [rec, ...st.records] })); return rec; }}
          result={(r) => (
            <Card data-testid="flow-success">
              <Badge tone="ok">Flow finished</Badge>
              <h2 style={{ margin: "8px 0" }}>Your {r.type.toLowerCase()} has been created</h2>
              <KV k="Record" v={<span className="ee-mono" data-testid="flow-record-id">{r.id}</span>} /><KV k="Type" v={<span data-testid="flow-record-type">{r.type}</span>} /><KV k="Name" v={r.name} /><KV k="Account" v={r.account} />
              <Btn variant="secondary" size="sm" style={{ marginTop: 10 }} onClick={() => set((st) => ({ ...st, wiz: { ...SEED_WIZARD } }))}>Run again</Btn>
            </Card>
          )} />
        <Card title="Records created by this flow" data-testid="flow-records">
          <Table cols={[{ key: "id", label: "Id" }, { key: "type", label: "Type" }, { key: "name", label: "Name" }, { key: "detail", label: "Detail" }]} rows={s.records} rowKey={(r) => r.id} empty="None yet" />
        </Card>
      </div>
    </SaasShell>
  );
}
