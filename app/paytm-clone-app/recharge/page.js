"use client";
// Mobile recharge (20.2). The number must be a valid 10-digit mobile, and the
// chosen plan's price is what gets charged.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input, Select, Radio } from "../../clones/kit/ui";
import { BRAND, BASE, OPERATORS, PLANS, useStore, money, txnId } from "../shared";

export default function RechargePage() {
  const [s, update] = useStore();
  const [number, setNumber] = useState("");
  const [operator, setOperator] = useState(OPERATORS[0]);
  const [planId, setPlanId] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(null);

  const plan = PLANS.find((p) => p.id === planId) || null;

  function recharge() {
    if (!/^[6-9]\d{9}$/.test(number.trim())) { setErr("Enter a valid 10-digit mobile number."); return; }
    if (!plan) { setErr("Choose a plan."); return; }
    if (plan.price > s.walletBalance) { setErr(`Wallet balance is only ${money(s.walletBalance)}.`); return; }
    setErr("");
    const id = txnId(s.counter + 1);
    update((st) => {
      st.walletBalance = +(st.walletBalance - plan.price).toFixed(2);
      st.transactions.unshift({ id, label: `Recharge ${number.trim()} · ${operator}`, amount: plan.price,
                                at: "2026-09-15", status: "Success" });
      st.counter += 1;
      return st;
    });
    setDone({ id, number: number.trim(), operator, plan });
  }

  if (done) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }]} />
        <Page>
          <Banner tone="ok" title="Recharge successful" testId="recharge-success">
            <strong data-testid="recharged-number">{done.number}</strong> recharged with the{" "}
            <strong data-testid="recharged-plan">{money(done.plan.price)}</strong> plan.
          </Banner>
          <Card title="Details" testId="recharge-receipt">
            <Row label="Transaction ID" value={done.id} testId="txn-id" />
            <Row label="Operator" value={done.operator} testId="receipt-operator" />
            <Row label="Plan" value={`${money(done.plan.price)} · ${done.plan.data} · ${done.plan.validity}`} testId="receipt-plan" />
            <Row label="Benefits" value={done.plan.talktime} />
            <Badge tone="ok">Success</Badge>
          </Card>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/bills`, label: "Bills" }]} />
      <Page title="Mobile recharge">
        <Card title="Number">
          <Field label="Mobile number" error={err}>
            <Input value={number} onChange={(e) => setNumber(e.target.value)} inputMode="numeric" maxLength={10}
                   aria-label="Mobile number" data-testid="mobile-number" placeholder="9876543210" />
          </Field>
          <Field label="Operator">
            <Select value={operator} onChange={(e) => setOperator(e.target.value)} aria-label="Operator" data-testid="operator">
              {OPERATORS.map((o) => <option key={o}>{o}</option>)}
            </Select>
          </Field>
        </Card>

        <Card title="Choose a plan" testId="plan-list">
          {PLANS.map((p) => (
            <Radio key={p.id} name="plan" testId={`plan-${p.id}`}
                   label={`${money(p.price)} · ${p.data}`}
                   detail={`${p.validity} · ${p.talktime}`}
                   checked={planId === p.id} onChange={() => setPlanId(p.id)} />
          ))}
          {plan && <Row label="Selected plan" value={`${money(plan.price)} · ${plan.validity}`} strong testId="selected-plan" />}
          <Btn block onClick={recharge} data-testid="do-recharge">
            {plan ? `Proceed to pay ${money(plan.price)}` : "Choose a plan"}
          </Btn>
        </Card>
      </Page>
    </Shell>
  );
}
