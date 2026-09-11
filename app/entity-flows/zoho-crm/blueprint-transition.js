"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Modal, Field, Input, Alert, KV, Badge, Timeline, Stepper } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const STAGES = ["Qualification", "Proposal/Price Quote", "Negotiation", "Closed Won"];
const TRANSITIONS = { Qualification: { name: "Send proposal", to: "Proposal/Price Quote", inputs: ["amount", "close"] }, "Proposal/Price Quote": { name: "Start negotiation", to: "Negotiation", inputs: ["discount"] }, Negotiation: { name: "Mark won", to: "Closed Won", inputs: [] } };
const seed = () => ({ stage: "Qualification", amount: null, close: null, discount: null, history: [{ title: "Deal created in Qualification", meta: "Sep 10, 2026 · Demo User", state: "done" }] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [open, setOpen] = useState(false); const [f, setF] = useState({ amount: "", close: "", discount: "" }); const [err, setErr] = useState(null);
  const tr = TRANSITIONS[s.stage];
  function complete() {
    if (tr.inputs.includes("amount") && !(Number(f.amount) > 0)) { setErr("Proposal Amount is required."); return; }
    if (tr.inputs.includes("close") && !(f.close > "2026-09-14")) { setErr("Expected Closing Date is required and must be after today (Sep 14, 2026)."); return; }
    if (tr.inputs.includes("discount") && !(f.discount !== "" && Number(f.discount) >= 0 && Number(f.discount) <= 30)) { setErr("Discount must be between 0 and 30%."); return; }
    setErr(null);
    set({ ...s, stage: tr.to, amount: f.amount ? Number(f.amount) : s.amount, close: f.close || s.close, discount: f.discount || s.discount, history: [{ title: `Transition “${tr.name}” completed: ${s.stage} → ${tr.to}`, meta: "Sep 14, 2026 · Demo User", state: "done" }, ...s.history] });
    setOpen(false); setF({ amount: "", close: "", discount: "" });
  }
  return (
    <SaasShell flow={flow} nav={["Home", "Leads", "Deals", "Blueprints"]} active="Deals" title="Globex · Annual platform deal" sub="Deal · Blueprint: Enterprise Sales Process">
      <Stepper steps={STAGES} current={STAGES.indexOf(s.stage)} />
      <div className="ee-split">
        <Card title="Deal details" data-testid="deal">
          <KV k="Stage" v={<Badge tone="info" data-testid="deal-stage">{s.stage}</Badge>} />
          <KV k="Amount" v={s.amount ? money(s.amount) : "—"} testId="deal-amount" />
          <KV k="Expected close" v={s.close || "—"} testId="deal-close" />
          <div className="ee-divider" />
          {tr ? <Btn onClick={() => setOpen(true)} data-testid="transition-btn">{tr.name}</Btn> : <Badge tone="ok">Blueprint complete</Badge>}
        </Card>
        <Card title="Timeline" data-testid="deal-timeline"><Timeline items={s.history} /></Card>
      </div>
      <Modal open={open} title={tr ? `Transition: ${tr.name}` : ""} onClose={() => setOpen(false)}>
        {tr && <div className="ee-stack" data-testid="transition-modal">
          <div className="ee-small ee-muted">Required during transition</div>
          {tr.inputs.includes("amount") && <Field label="Proposal Amount (USD) *" htmlFor="bp-amount"><Input id="bp-amount" inputMode="decimal" value={f.amount} onChange={(e) => setF({ ...f, amount: e.target.value })} /></Field>}
          {tr.inputs.includes("close") && <Field label="Expected Closing Date *" htmlFor="bp-close"><Input id="bp-close" type="date" value={f.close} onChange={(e) => setF({ ...f, close: e.target.value })} /></Field>}
          {tr.inputs.includes("discount") && <Field label="Discount % *" htmlFor="bp-discount"><Input id="bp-discount" inputMode="decimal" value={f.discount} onChange={(e) => setF({ ...f, discount: e.target.value })} /></Field>}
          {err && <Alert tone="err" data-testid="transition-error">{err}</Alert>}
          <Btn onClick={complete} data-testid="transition-save">Save</Btn>
        </div>}
      </Modal>
    </SaasShell>
  );
}
