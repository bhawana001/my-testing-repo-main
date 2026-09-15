"use client";
// Multi-currency balance conversion (15.4). Converting debits one balance and
// credits the other by exactly the converted amount at the shown rate.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Field, Input, Select, Banner } from "../../clones/kit/ui";
import { BRAND, BASE, rateFor, useStore, fmt } from "../shared";

export default function BalancesPage() {
  const [s, update] = useStore();
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState("100");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(null);

  const amt = Number(amount) || 0;
  const rate = rateFor(from, to);
  const converted = +(amt * rate).toFixed(2);
  const fromBal = s.balances.find((b) => b.currency === from);
  const toBal = s.balances.find((b) => b.currency === to);

  function convertNow() {
    if (!amt || amt <= 0) { setErr("Enter an amount above zero."); return; }
    if (amt > fromBal.amount) { setErr(`Your ${from} balance is only ${fmt(fromBal.amount, from)}.`); return; }
    setErr("");
    const before = { from: fromBal.amount, to: toBal.amount };
    update((st) => {
      const f = st.balances.find((b) => b.currency === from);
      const t = st.balances.find((b) => b.currency === to);
      f.amount = +(f.amount - amt).toFixed(2);
      t.amount = +(t.amount + converted).toFixed(2);
      return st;
    });
    setDone({ amt, converted, rate, from, to, before });
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/send`, label: "Send money" }]} />
      <Page title="Balances">
        {done && (
          <Banner tone="ok" title="Conversion complete" testId="convert-done">
            Converted <strong data-testid="converted-from">{fmt(done.amt, done.from)}</strong> to{" "}
            <strong data-testid="converted-to">{fmt(done.converted, done.to)}</strong> at 1 {done.from} = {done.rate} {done.to}.
          </Banner>
        )}

        <Card title="Your balances" testId="balances">
          {s.balances.map((b) => (
            <Row key={b.currency} label={b.currency} value={fmt(b.amount, b.currency)} testId={`balance-${b.currency}`} />
          ))}
        </Card>

        <Card title="Convert between balances">
          <div className="ck-grid ck-grid--3">
            <Field label="From">
              <Select value={from} onChange={(e) => { setFrom(e.target.value); setDone(null); }} aria-label="From" data-testid="convert-from">
                {s.balances.map((b) => <option key={b.currency}>{b.currency}</option>)}
              </Select>
            </Field>
            <Field label="To">
              <Select value={to} onChange={(e) => { setTo(e.target.value); setDone(null); }} aria-label="To" data-testid="convert-to">
                {s.balances.filter((b) => b.currency !== from).map((b) => <option key={b.currency}>{b.currency}</option>)}
              </Select>
            </Field>
            <Field label="Amount" error={err}>
              <Input value={amount} onChange={(e) => { setAmount(e.target.value); setDone(null); }} inputMode="decimal"
                     aria-label="Amount" data-testid="convert-amount" />
            </Field>
          </div>
          <Row label="Rate" value={`1 ${from} = ${rate} ${to}`} testId="convert-rate" />
          <Row label="You'll get" value={fmt(converted, to)} strong testId="convert-preview" />
          <Btn block onClick={convertNow} data-testid="do-convert">Convert</Btn>
        </Card>
      </Page>
    </Shell>
  );
}
