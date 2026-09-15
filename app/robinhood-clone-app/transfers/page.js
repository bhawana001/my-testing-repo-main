"use client";
// Instant deposit (16.4). Instant availability credits buying power right away
// while the cash settles later, so the two numbers differ on purpose.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, useStore, money } from "../shared";

const INSTANT_LIMIT = 1000;

export default function TransfersPage() {
  const [s, update] = useStore();
  const [amount, setAmount] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(null);

  function deposit() {
    const amt = Number(amount);
    if (!amt || amt <= 0) { setErr("Enter an amount above zero."); return; }
    setErr("");
    const instant = Math.min(amt, INSTANT_LIMIT);
    const before = s.buyingPower;
    update((st) => {
      st.buyingPower = +(st.buyingPower + instant).toFixed(2);
      st.deposits.unshift({ id: "DEP-" + (st.counter + 1), amount: amt, instant,
                            settles: "2026-09-18", at: "2026-09-15", status: "Instant available" });
      st.counter += 1;
      return st;
    });
    setDone({ amt, instant, before, after: +(before + instant).toFixed(2) });
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Markets" }, { href: `${BASE}/portfolio`, label: "Portfolio" }]} />
      <Page title="Transfers">
        {done && (
          <Banner tone="ok" title="Deposit initiated" testId="deposit-result">
            <strong data-testid="instant-credited">{money(done.instant)}</strong> is instantly available.
            Buying power went from {money(done.before)} to <strong data-testid="new-buying-power">{money(done.after)}</strong>.
          </Banner>
        )}

        <Card title="Buying power" testId="bp-card">
          <div style={{ fontSize: 30, fontWeight: 700 }} data-testid="buying-power">{money(s.buyingPower)}</div>
          <Row label="Settled cash" value={money(s.cash)} testId="settled-cash" />
          <Badge tone="info">Instant deposits up to {money(INSTANT_LIMIT)}</Badge>
        </Card>

        <Card title="Deposit from bank">
          <Field label="Amount" error={err}>
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal"
                   aria-label="Amount" data-testid="deposit-amount" />
          </Field>
          <Btn block onClick={deposit} data-testid="submit-deposit">Deposit</Btn>
        </Card>

        <Card title={`Deposits (${s.deposits.length})`} testId="deposit-history">
          {s.deposits.length === 0 ? <Empty>No deposits yet.</Empty> : s.deposits.map((d) => (
            <div key={d.id} data-testid={`deposit-${d.id}`}>
              <Row label={`${d.id} · ${d.at}`} value={money(d.amount)} />
              <div className="ck-muted">Instantly available: {money(d.instant)} · fully settles {d.settles}</div>
              <Badge tone="ok" testId={`deposit-status-${d.id}`}>{d.status}</Badge>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
