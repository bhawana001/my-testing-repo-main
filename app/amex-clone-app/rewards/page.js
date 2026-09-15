"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Field, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, CENTS_PER_POINT, MIN_REDEEM_POINTS, useStore, money, pointsToDollars } from "../shared";

export default function Rewards() {
  const [s, update] = useStore();
  const [points, setPoints] = useState("5000");
  const [error, setError] = useState(null);
  const [done, setDone] = useState(null);

  const n = Number(points) || 0;
  const value = pointsToDollars(n);

  function redeem() {
    if (n < MIN_REDEEM_POINTS) {
      setError(`The minimum redemption is ${MIN_REDEEM_POINTS.toLocaleString()} points.`);
      return;
    }
    if (n > s.points) { setError("You do not have that many points."); return; }
    const credit = {
      id: `cr_${s.statement.credits.length + 1}`, points: n, amount: value,
      status: "Pending", at: "now", appliesBy: "2026-09-24",
    };
    update((st) => {
      st.points -= n;
      st.statement.credits.unshift(credit);
      return st;
    });
    setError(null);
    setDone(credit);
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Membership Rewards" sub={`${s.points.toLocaleString()} points available`}>
        {error && <Banner tone="bad" testId="redeem-error">{error}</Banner>}
        {done && (
          <Banner tone="ok" title="Redemption submitted" testId="redeem-success">
            {done.points.toLocaleString()} points redeemed for a {money(done.amount)} statement credit.
          </Banner>
        )}

        <Card title="Redeem for a statement credit">
          <Row label="Points balance" value={s.points.toLocaleString()} testId="points-balance" />
          <Row label="Rate" value={`${CENTS_PER_POINT} cents per point`} testId="redeem-rate" />
          <Field label="Points to redeem" hint={`Minimum ${MIN_REDEEM_POINTS.toLocaleString()} points`}>
            <Input value={points} data-testid="points-input" aria-label="Points to redeem"
                   onChange={(e) => setPoints(e.target.value)} />
          </Field>
          <Row label="Statement credit" value={money(value)} strong testId="credit-preview" />
          <div className="ck-card-actions">
            <Btn onClick={redeem} data-testid="redeem">Redeem</Btn>
          </div>
        </Card>

        <Card title="Statement credits" testId="credit-list">
          {s.statement.credits.length === 0 && <Empty>No credits requested.</Empty>}
          {s.statement.credits.map((c) => (
            <div key={c.id} className="ck-row" data-testid={`credit-${c.id}`}>
              <span>
                <strong data-testid={`credit-amount-${c.id}`}>{money(c.amount)}</strong>
                <div className="ck-muted">{c.points.toLocaleString()} points · applies by {c.appliesBy}</div>
              </span>
              <Badge tone={c.status === "Pending" ? "warn" : "ok"} testId={`credit-status-${c.id}`}>{c.status}</Badge>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
