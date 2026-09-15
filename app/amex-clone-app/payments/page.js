"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Select, Field, Radio, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, useStore, money, paymentRef } from "../shared";

const SOURCES = ["Chaise Bank ••••8841", "Harbour Credit Union ••••2210"];

export default function Payments() {
  const [s, update] = useStore();
  const [which, setWhich] = useState("statement");
  const [custom, setCustom] = useState("500.00");
  const [date, setDate] = useState("2026-09-26");
  const [source, setSource] = useState(SOURCES[0]);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(null);

  const amount = which === "statement" ? s.statement.balance
    : which === "minimum" ? s.statement.minimumDue
    : Number(custom) || 0;

  function schedule() {
    if (amount <= 0) { setError("Enter an amount greater than zero."); return; }
    if (date > s.statement.dueDate) {
      setError(`That date is after the ${s.statement.dueDate} due date. Pick an earlier date.`);
      return;
    }
    const payment = {
      ref: paymentRef(s.scheduledPayments.length),
      amount, date, source,
      what: which === "statement" ? "Statement balance" : which === "minimum" ? "Minimum due" : "Other amount",
      status: "Scheduled",
    };
    update((st) => { st.scheduledPayments.unshift(payment); return st; });
    setError(null);
    setDone(payment);
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Make a payment" sub={`Due ${s.statement.dueDate}`}>
        {error && <Banner tone="bad" testId="payment-error">{error}</Banner>}
        {done && (
          <Banner tone="ok" title="Payment scheduled" testId="payment-success">
            {money(done.amount)} scheduled for {done.date} from {done.source}. Reference {done.ref}.
          </Banner>
        )}

        <Card title="Amount">
          <Radio name="amount" checked={which === "statement"} label="Statement balance"
                 detail={money(s.statement.balance)} testId="amount-statement"
                 onChange={() => setWhich("statement")} />
          <Radio name="amount" checked={which === "minimum"} label="Minimum due"
                 detail={money(s.statement.minimumDue)} testId="amount-minimum"
                 onChange={() => setWhich("minimum")} />
          <Radio name="amount" checked={which === "custom"} label="Another amount"
                 detail="Any amount up to the balance" testId="amount-custom"
                 onChange={() => setWhich("custom")} />
          {which === "custom" && (
            <Field label="Amount">
              <Input value={custom} data-testid="custom-amount" aria-label="Custom amount"
                     onChange={(e) => setCustom(e.target.value)} />
            </Field>
          )}
          <Row label="Payment amount" value={money(amount)} strong testId="payment-amount" />
        </Card>

        <Card title="When and from where">
          <Field label="Payment date" hint={`Must be on or before ${s.statement.dueDate}`}>
            <Input type="date" value={date} data-testid="payment-date" aria-label="Payment date"
                   onChange={(e) => setDate(e.target.value)} />
          </Field>
          <Field label="Pay from">
            <Select value={source} data-testid="payment-source" aria-label="Pay from"
                    onChange={(e) => setSource(e.target.value)}>
              {SOURCES.map((x) => <option key={x} value={x}>{x}</option>)}
            </Select>
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={schedule} data-testid="schedule-payment">Schedule the payment</Btn>
          </div>
        </Card>

        <Card title="Scheduled payments" testId="scheduled-list">
          {s.scheduledPayments.length === 0 && <Empty>Nothing scheduled.</Empty>}
          {s.scheduledPayments.map((p) => (
            <div key={p.ref} className="ck-row" data-testid={`scheduled-${p.ref}`}>
              <span>
                <strong data-testid={`scheduled-amount-${p.ref}`}>{money(p.amount)}</strong>
                <div className="ck-muted">{p.what} · {p.date} · {p.source}</div>
              </span>
              <span>
                <Badge tone="info" testId={`scheduled-status-${p.ref}`}>{p.status}</Badge>{" "}
                <Btn size="sm" variant="ghost" data-testid={`cancel-${p.ref}`}
                     onClick={() => update((st) => {
                       st.scheduledPayments = st.scheduledPayments.filter((x) => x.ref !== p.ref);
                       return st;
                     })}>Cancel</Btn>
              </span>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
