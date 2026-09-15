"use client";
// Cash out to bank (22.3). Instant carries a percentage fee with a minimum;
// standard is free but slower. Both state the fee and arrival before you commit.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input, Radio, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, CASHOUT, useStore, money } from "../shared";

export default function CashoutPage() {
  const [s, update] = useStore();
  const [amount, setAmount] = useState("");
  const [speed, setSpeed] = useState("instant");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(null);

  const amt = Number(amount) || 0;
  const opt = CASHOUT[speed];
  const fee = speed === "instant" ? +Math.max(amt * opt.feePct, opt.minFee).toFixed(2) : 0;
  const receives = +(amt - fee).toFixed(2);

  function cashOut() {
    if (!amt || amt <= 0) { setErr("Enter an amount above zero."); return; }
    if (amt > s.balance) { setErr(`Your balance is ${money(s.balance)}.`); return; }
    setErr("");
    const id = "CO-" + (s.counter + 1);
    update((st) => {
      st.balance = +(st.balance - amt).toFixed(2);
      st.cashouts.unshift({ id, amount: amt, fee, receives, speed, arrival: opt.arrival, at: "2026-09-15" });
      st.counter += 1;
      return st;
    });
    setDone({ id, amt, fee, receives, speed, arrival: opt.arrival });
    setAmount("");
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/pay`, label: "Pay" }]} />
      <Page title="Cash out">
        {done && (
          <Banner tone="ok" title="Transfer started" testId="cashout-done">
            <strong data-testid="cashout-receives">{money(done.receives)}</strong> heading to your bank after a{" "}
            <strong data-testid="cashout-fee">{money(done.fee)}</strong> fee · {done.arrival}.
          </Banner>
        )}

        <Card title="Balance" testId="balance-card">
          <div style={{ fontSize: 30, fontWeight: 700 }} data-testid="balance">{money(s.balance)}</div>
          <Row label="To" value={s.bank} testId="bank" />
        </Card>

        <Card title="How fast?">
          <Field label="Amount" error={err}>
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal"
                   aria-label="Amount" data-testid="cashout-amount" />
          </Field>
          <Radio name="speed" testId="speed-instant"
                 label={`Instant — ${money(speed === "instant" ? fee : Math.max(amt * CASHOUT.instant.feePct, CASHOUT.instant.minFee) || 0)} fee`}
                 detail={CASHOUT.instant.arrival}
                 checked={speed === "instant"} onChange={() => setSpeed("instant")} />
          <Radio name="speed" testId="speed-standard"
                 label="Standard — no fee" detail={CASHOUT.standard.arrival}
                 checked={speed === "standard"} onChange={() => setSpeed("standard")} />
          <Row label="Fee" value={money(fee)} testId="fee-display" />
          <Row label="You receive" value={money(receives)} strong testId="receives-display" />
          <Row label="Arrives" value={opt.arrival} testId="arrival-display" />
          <Btn block onClick={cashOut} data-testid="do-cashout">Cash out</Btn>
        </Card>

        <Card title={`Transfers (${s.cashouts.length})`} testId="cashout-history">
          {s.cashouts.length === 0 ? <Empty>No transfers yet.</Empty> : s.cashouts.map((c) => (
            <div key={c.id} data-testid={`cashout-${c.id}`}>
              <Row label={`${c.id} · ${CASHOUT[c.speed].label}`} value={money(c.receives)} />
              <div className="ck-muted">Fee {money(c.fee)} · {c.arrival}</div>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
