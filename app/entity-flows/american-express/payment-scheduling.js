"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { BankShell } from "@/app/components/engines/BankShell";
import { Card, RadioCard, Field, Input, Select, Btn, Alert, KV, Badge, Table } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const STATEMENT = 1284.6, MIN = 40, DUE = "2026-09-25";
const seed = () => ({ scheduled: [] });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [choice, setChoice] = useState("statement"); const [other, setOther] = useState(""); const [date, setDate] = useState(DUE); const [err, setErr] = useState(null); const [ok, setOk] = useState(null);
  const amount = choice === "statement" ? STATEMENT : choice === "min" ? MIN : Number(other);
  function schedule() {
    if (!(amount > 0)) { setErr("Enter an amount."); return; }
    if (!date || date < "2026-09-15" || date > DUE) { setErr("Choose a date between September 15 and the due date, September 25, 2026."); return; }
    setErr(null);
    const rec = { id: "PAY-" + (s.scheduled.length + 1), amount, date, from: "Checking •••• 4821", status: "Scheduled" };
    set({ scheduled: [rec, ...s.scheduled] }); setOk(rec);
  }
  return (
    <BankShell entity={ent} nav={["Account", "Payments", "Rewards", "Statements"]} active="Payments" title="Make a payment" sub={`Statement balance ${money(STATEMENT)} · Minimum due ${money(MIN)} · Due September 25, 2026`}>
      <div className="ee-split">
        <Card data-testid="payment-form">
          <div className="ee-stack" role="radiogroup" aria-label="Amount">
            <RadioCard name="amt" value="statement" checked={choice === "statement"} onChange={setChoice} title="Statement balance" right={money(STATEMENT)} />
            <RadioCard name="amt" value="min" checked={choice === "min"} onChange={setChoice} title="Minimum payment due" right={money(MIN)} />
            <RadioCard name="amt" value="other" checked={choice === "other"} onChange={setChoice} title="Other amount" />
            {choice === "other" && <Input inputMode="decimal" value={other} onChange={(e) => setOther(e.target.value)} placeholder="0.00" aria-label="Other amount" />}
            <Field label="Pay from"><Select value="chk" readOnly aria-label="Pay from"><option value="chk">Checking •••• 4821</option></Select></Field>
            <Field label="Payment date" htmlFor="pay-date" help="Today is September 14, 2026"><Input id="pay-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} min="2026-09-15" max={DUE} /></Field>
            {err && <Alert tone="err">{err}</Alert>}
            <Btn onClick={schedule} data-testid="schedule-payment">Schedule payment of {money(amount || 0)}</Btn>
            {ok && <Alert tone="ok" data-testid="schedule-ok">Payment of {money(ok.amount)} scheduled for {ok.date}. Confirmation {ok.id}.</Alert>}
          </div>
        </Card>
        <Card title="Scheduled payments" data-testid="scheduled-list">
          <Table cols={[{ key: "id", label: "Ref" }, { key: "amount", label: "Amount", align: "right", render: (r) => money(r.amount) }, { key: "date", label: "Date" }, { key: "status", label: "Status", render: (r) => <Badge tone="info">{r.status}</Badge> }]} rows={s.scheduled} rowKey={(r) => r.id} empty="No scheduled payments" />
        </Card>
      </div>
    </BankShell>
  );
}
