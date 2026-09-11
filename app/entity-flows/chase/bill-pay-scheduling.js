"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { BankShell } from "@/app/components/engines/BankShell";
import { Card, Field, Input, Select, Btn, Table, Badge, Alert } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const PAYEES = ["City Power & Light", "Metro Water", "Bay Internet"];
const TODAY = "2026-09-14";
const seed = () => ({ scheduled: [{ id: "bp-1", payee: "Bay Internet", amount: 59.99, date: "2026-09-20", status: "Scheduled" }] });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [payee, setPayee] = useState(""); const [amount, setAmount] = useState(""); const [date, setDate] = useState(""); const [err, setErr] = useState(null); const [ok, setOk] = useState(null);
  function schedule() {
    if (!payee) { setErr("Choose a payee."); return; }
    if (!(Number(amount) > 0)) { setErr("Enter an amount."); return; }
    if (!date || date <= TODAY) { setErr("Choose a future date (after September 14, 2026)."); return; }
    setErr(null);
    const id = "bp-" + (s.scheduled.length + 1);
    set({ scheduled: [...s.scheduled, { id, payee, amount: Number(amount), date, status: "Scheduled" }] });
    setOk(`Payment of ${money(Number(amount))} to ${payee} scheduled for ${date}.`);
    setPayee(""); setAmount(""); setDate("");
  }
  return (
    <BankShell entity={ent} nav={["Accounts", "Pay & transfer", "Bill pay", "Statements"]} active="Bill pay" title="Schedule a bill payment" sub="Today is September 14, 2026. Choose a future delivery date.">
      <div className="ee-split">
        <Card data-testid="billpay-form">
          <div className="ee-stack">
            <Field label="Payee" htmlFor="bp-payee"><Select id="bp-payee" value={payee} onChange={(e) => setPayee(e.target.value)}><option value="">Choose a payee…</option>{PAYEES.map((p) => <option key={p}>{p}</option>)}</Select></Field>
            <Field label="Amount" htmlFor="bp-amount"><Input id="bp-amount" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" /></Field>
            <Field label="Deliver by" htmlFor="bp-date" help="Format YYYY-MM-DD"><Input id="bp-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} min="2026-09-15" /></Field>
            {err && <Alert tone="err">{err}</Alert>}
            {ok && <Alert tone="ok" data-testid="billpay-ok">{ok}</Alert>}
            <Btn onClick={schedule} data-testid="billpay-schedule">Schedule payment</Btn>
          </div>
        </Card>
        <Card title="Scheduled payments" data-testid="scheduled-list">
          <Table cols={[{ key: "payee", label: "Payee" }, { key: "amount", label: "Amount", align: "right", render: (r) => money(r.amount) }, { key: "date", label: "Deliver by" }, { key: "status", label: "Status", render: (r) => <Badge tone="info">{r.status}</Badge> }]} rows={s.scheduled} rowKey={(r) => r.id} />
        </Card>
      </div>
    </BankShell>
  );
}
