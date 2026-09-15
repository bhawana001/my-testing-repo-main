"use client";
// Add funds via UPI (17.4). The VPA is validated, then the credit lands in the
// trading balance immediately.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, useStore, money } from "../shared";

const VPA_RE = /^[a-z0-9._-]{3,}@[a-z]{3,}$/i;

export default function FundsPage() {
  const [s, update] = useStore();
  const [amount, setAmount] = useState("");
  const [vpa, setVpa] = useState("");
  const [err, setErr] = useState("");
  const [verified, setVerified] = useState(false);
  const [done, setDone] = useState(null);

  function verify() {
    if (!VPA_RE.test(vpa.trim())) { setErr("Enter a valid UPI ID, for example name@bank."); setVerified(false); return; }
    setErr(""); setVerified(true);
  }

  function addFunds() {
    const amt = Number(amount);
    if (!amt || amt < 100) { setErr("Minimum add is ₹100."); return; }
    if (!verified) { setErr("Verify your UPI ID first."); return; }
    setErr("");
    const before = s.balance;
    update((st) => {
      st.balance = +(st.balance + amt).toFixed(2);
      st.funds.unshift({ id: "FND-" + (st.counter + 1), amount: amt, vpa: vpa.trim(),
                         at: "2026-09-15", status: "Credited" });
      st.counter += 1;
      return st;
    });
    setDone({ amt, before, after: +(before + amt).toFixed(2) });
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Dashboard" }, { href: `${BASE}/orders`, label: "Orders" }]} />
      <Page title="Funds">
        {done && (
          <Banner tone="ok" title="Funds added" testId="funds-added">
            <strong data-testid="added-amount">{money(done.amt)}</strong> credited. Balance moved from{" "}
            {money(done.before)} to <strong data-testid="new-balance">{money(done.after)}</strong>.
          </Banner>
        )}

        <Card title="Available margin" testId="balance-card">
          <div style={{ fontSize: 30, fontWeight: 700 }} data-testid="balance">{money(s.balance)}</div>
        </Card>

        <Card title="Add funds via UPI">
          <Field label="UPI ID" error={err} hint="For example priya@okhdfb">
            <Input value={vpa} onChange={(e) => { setVpa(e.target.value); setVerified(false); }}
                   aria-label="UPI ID" data-testid="vpa" />
          </Field>
          <Btn variant="secondary" size="sm" onClick={verify} data-testid="verify-vpa">Verify UPI ID</Btn>
          {verified && <Badge tone="ok" testId="vpa-verified">UPI ID verified</Badge>}
          <Field label="Amount">
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal"
                   aria-label="Amount" data-testid="amount" />
          </Field>
          <Btn block onClick={addFunds} data-testid="add-funds">Add funds</Btn>
        </Card>

        <Card title={`Fund history (${s.funds.length})`} testId="fund-history">
          {s.funds.length === 0 ? <Empty>No transfers yet.</Empty> : s.funds.map((f) => (
            <div key={f.id} data-testid={`fund-${f.id}`}>
              <Row label={`${f.id} · ${f.vpa}`} value={money(f.amount)} />
              <Badge tone="ok">{f.status}</Badge>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
