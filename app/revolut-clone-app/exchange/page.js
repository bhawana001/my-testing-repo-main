"use client";
// Exchange between pockets (19.2). Both pockets move by exactly the amounts
// shown at the quoted rate.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input, Select } from "../../clones/kit/ui";
import { BRAND, BASE, rateFor, useStore, fmt } from "../shared";

export default function ExchangePage() {
  const [s, update] = useStore();
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState("100");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(null);

  const amt = Number(amount) || 0;
  const rate = rateFor(from, to);
  const converted = +(amt * rate).toFixed(2);
  const fromPocket = s.pockets.find((p) => p.currency === from);
  const toPocket = s.pockets.find((p) => p.currency === to);

  function exchange() {
    if (!amt || amt <= 0) { setErr("Enter an amount above zero."); return; }
    if (amt > fromPocket.amount) { setErr(`Your ${from} pocket holds only ${fmt(fromPocket.amount, from)}.`); return; }
    setErr("");
    const before = { from: fromPocket.amount, to: toPocket.amount };
    update((st) => {
      const f = st.pockets.find((p) => p.currency === from);
      const t = st.pockets.find((p) => p.currency === to);
      f.amount = +(f.amount - amt).toFixed(2);
      t.amount = +(t.amount + converted).toFixed(2);
      return st;
    });
    setDone({ amt, converted, rate, from, to, before,
              after: { from: +(before.from - amt).toFixed(2), to: +(before.to + converted).toFixed(2) } });
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Accounts" }, { href: `${BASE}/vault`, label: "Vaults" }]} />
      <Page title="Exchange">
        {done && (
          <Banner tone="ok" title="Exchange complete" testId="exchange-done">
            Exchanged <strong data-testid="exchanged-from">{fmt(done.amt, done.from)}</strong> for{" "}
            <strong data-testid="exchanged-to">{fmt(done.converted, done.to)}</strong> at 1 {done.from} = {done.rate} {done.to}.
          </Banner>
        )}

        <Card title="Your pockets" testId="pockets">
          {s.pockets.map((p) => (
            <Row key={p.currency} label={p.currency} value={fmt(p.amount, p.currency)} testId={`pocket-${p.currency}`} />
          ))}
        </Card>

        <Card title="Exchange currency">
          <div className="ck-grid ck-grid--3">
            <Field label="From">
              <Select value={from} onChange={(e) => { setFrom(e.target.value); setDone(null); }} aria-label="From" data-testid="from-currency">
                {s.pockets.map((p) => <option key={p.currency}>{p.currency}</option>)}
              </Select>
            </Field>
            <Field label="To">
              <Select value={to} onChange={(e) => { setTo(e.target.value); setDone(null); }} aria-label="To" data-testid="to-currency">
                {s.pockets.filter((p) => p.currency !== from).map((p) => <option key={p.currency}>{p.currency}</option>)}
              </Select>
            </Field>
            <Field label="Amount" error={err}>
              <Input value={amount} onChange={(e) => { setAmount(e.target.value); setDone(null); }} inputMode="decimal"
                     aria-label="Amount" data-testid="exchange-amount" />
            </Field>
          </div>
          <Row label="Rate" value={`1 ${from} = ${rate} ${to}`} testId="exchange-rate" />
          <Row label="You get" value={fmt(converted, to)} strong testId="exchange-preview" />
          <Btn block onClick={exchange} data-testid="do-exchange">Exchange</Btn>
        </Card>
      </Page>
    </Shell>
  );
}
