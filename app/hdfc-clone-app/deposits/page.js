"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Select, Field, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, FD_RATES, useStore, inr, maturityAmount, rateFor, fdNumber } from "../shared";

export default function Deposits() {
  const [s, update] = useStore();
  const [fromId, setFromId] = useState("sav");
  const [amount, setAmount] = useState("100000");
  const [months, setMonths] = useState("12");
  const [error, setError] = useState(null);
  const [receipt, setReceipt] = useState(null);

  const principal = Number(amount) || 0;
  const term = Number(months);
  const rate = rateFor(term);
  const projected = maturityAmount(principal, term, rate);

  function open() {
    const from = s.accounts.find((a) => a.id === fromId);
    if (principal < 5000) { setError("The minimum fixed deposit is ₹5,000."); return; }
    if (principal > from.balance) { setError("Insufficient balance in the funding account."); return; }
    const fd = {
      id: fdNumber(s.deposits.length), principal, months: term, rate,
      maturityAmount: projected, interest: Math.round((projected - principal) * 100) / 100,
      openedOn: "2026-09-16", maturesOn: term === 6 ? "2027-03-16" : term === 12 ? "2027-09-16"
        : term === 24 ? "2028-09-16" : "2031-09-16",
      fundedFrom: from.name,
    };
    update((st) => {
      st.accounts.find((a) => a.id === fromId).balance -= principal;
      st.deposits.unshift(fd);
      return st;
    });
    setError(null);
    setReceipt(fd);
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Fixed deposits" sub="Interest compounded quarterly" wide>
        {error && <Banner tone="bad" testId="fd-error">{error}</Banner>}

        {receipt && (
          <Card title="Fixed deposit opened" tone="ok" testId="fd-receipt">
            <Row label="Deposit number" value={receipt.id} testId="fd-number" />
            <Row label="Principal" value={inr(receipt.principal)} testId="fd-principal" />
            <Row label="Tenure" value={`${receipt.months} months`} testId="fd-tenure" />
            <Row label="Rate" value={`${receipt.rate.toFixed(2)}% per annum`} testId="fd-rate" />
            <Row label="Interest earned" value={inr(receipt.interest)} testId="fd-interest" />
            <Row label="Maturity amount" value={inr(receipt.maturityAmount)} strong testId="fd-maturity" />
            <Row label="Matures on" value={receipt.maturesOn} testId="fd-matures-on" />
            <Badge tone="ok">Active</Badge>
          </Card>
        )}

        <Card title="Open a deposit">
          <Field label="Fund from">
            <Select value={fromId} data-testid="fd-from" aria-label="Funding account"
                    onChange={(e) => setFromId(e.target.value)}>
              {s.accounts.map((a) => <option key={a.id} value={a.id}>{a.name} — {inr(a.balance)}</option>)}
            </Select>
          </Field>
          <Field label="Amount" hint="Minimum ₹5,000">
            <Input value={amount} data-testid="fd-amount" aria-label="Amount"
                   onChange={(e) => setAmount(e.target.value)} />
          </Field>
          <Field label="Tenure">
            <Select value={months} data-testid="fd-months" aria-label="Tenure"
                    onChange={(e) => setMonths(e.target.value)}>
              {FD_RATES.map((r) => (
                <option key={r.months} value={r.months}>{r.months} months — {r.rate.toFixed(2)}%</option>
              ))}
            </Select>
          </Field>
          <Row label="Rate applied" value={`${rate.toFixed(2)}% per annum`} testId="preview-rate" />
          <Row label="Maturity amount" value={inr(projected)} strong testId="preview-maturity" />
          <div className="ck-card-actions">
            <Btn onClick={open} data-testid="open-fd">Open the deposit</Btn>
          </div>
        </Card>

        <Card title="Your deposits" testId="fd-list">
          {s.deposits.length === 0 && <Empty>No deposits open.</Empty>}
          {s.deposits.map((d) => (
            <div key={d.id} className="ck-row" data-testid={`deposit-${d.id}`}>
              <span>
                <strong>{d.id}</strong>
                <div className="ck-muted">{inr(d.principal)} for {d.months} months at {d.rate.toFixed(2)}%</div>
              </span>
              <span data-testid={`deposit-maturity-${d.id}`}>{inr(d.maturityAmount)}</span>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
