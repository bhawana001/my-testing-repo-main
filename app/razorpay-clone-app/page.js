"use client";
// Merchant page + checkout modal: UPI intent (11.2), EMI plans (11.3) and the
// standard success path (11.1).
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Modal, Field, Input, Radio, Select, Banner, Empty } from "../clones/kit/ui";
import { BRAND, BASE, ORDERS, EMI_MIN, EMI_BANKS, emiFor, VPA_RE, KNOWN_VPAS, useStore, money, newPayId } from "./shared";

const METHODS = [
  { id: "upi", label: "UPI", detail: "Pay by VPA or UPI app" },
  { id: "card", label: "Card", detail: "Credit or debit card" },
  { id: "emi", label: "EMI", detail: "Pay in monthly instalments" },
];

export default function Merchant() {
  const [s, update] = useStore();
  const [order, setOrder] = useState(null);
  const [method, setMethod] = useState("upi");
  const [vpa, setVpa] = useState("");
  const [vpaError, setVpaError] = useState("");
  const [verified, setVerified] = useState(false);
  const [bank, setBank] = useState("hdfc");
  const [tenure, setTenure] = useState(6);
  const [card, setCard] = useState("");
  const [receipt, setReceipt] = useState(null);

  const emiAvailable = order && order.amount >= EMI_MIN;
  const bankObj = EMI_BANKS.find((b) => b.id === bank);
  const plan = bankObj?.plans.find((p) => p.months === tenure) || bankObj?.plans[0];
  const emi = order && plan ? emiFor(order.amount, plan.months, plan.rate) : null;

  function openCheckout(o) {
    setOrder(o); setMethod("upi"); setVpa(""); setVpaError(""); setVerified(false); setCard("");
    setTenure(o.amount >= EMI_MIN ? 6 : 3);
  }

  function verifyVpa() {
    if (!VPA_RE.test(vpa.trim())) {
      setVpaError("Enter a valid UPI ID, for example name@bank.");
      setVerified(false);
      return;
    }
    if (!KNOWN_VPAS.includes(vpa.trim().toLowerCase())) {
      setVpaError("No account found for that UPI ID.");
      setVerified(false);
      return;
    }
    setVpaError("");
    setVerified(true);
  }

  function pay() {
    const id = newPayId(s.counter);
    const payment = {
      id, orderId: order.id, label: order.label, amount: order.amount, method,
      vpa: method === "upi" ? vpa.trim() : null,
      emi: method === "emi" ? { bank: bankObj.name, months: plan.months, rate: plan.rate, monthly: emi.monthly } : null,
      at: "2026-09-15", status: "captured",
    };
    update((st) => { st.payments.unshift(payment); st.counter += 1; return st; });
    setReceipt(payment);
    setOrder(null);
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: `${BASE}/link`, label: "Payment link", testId: "nav-link" }]} />
      <Page title="Kraft Bazaar" sub="Demo merchant using Razorpie Checkout">
        {receipt && (
          <Banner tone="ok" title="Payment successful" testId="payment-success">
            Payment <strong data-testid="payment-id">{receipt.id}</strong> captured for <strong data-testid="paid-amount">{money(receipt.amount)}</strong>
            {receipt.method === "upi" && <> via UPI ({receipt.vpa})</>}
            {receipt.method === "emi" && <> as {receipt.emi.months}-month EMI with {receipt.emi.bank}</>}.
          </Banner>
        )}

        <div className="ck-grid ck-grid--2">
          {ORDERS.map((o) => (
            <Card key={o.id} title={o.label} testId={`order-${o.id}`}>
              <div style={{ fontSize: 24, fontWeight: 700 }} data-testid={`amount-${o.id}`}>{money(o.amount)}</div>
              {o.amount >= EMI_MIN && <Badge tone="info" testId={`emi-flag-${o.id}`}>EMI available</Badge>}
              <Btn block style={{ marginTop: 10 }} onClick={() => openCheckout(o)} data-testid={`pay-${o.id}`}>Pay now</Btn>
            </Card>
          ))}
        </div>

        <Card title={`Payments (${s.payments.length})`} testId="payments">
          {s.payments.length === 0 ? <Empty>No payments yet.</Empty> : s.payments.map((p) => (
            <Row key={p.id} label={`${p.id} · ${p.label} · ${p.method.toUpperCase()}`} value={money(p.amount)} />
          ))}
        </Card>
      </Page>

      <Modal open={Boolean(order)} title={`Razorpie · ${order ? money(order.amount) : ""}`}
             onClose={() => setOrder(null)} testId="checkout-modal">
        <div className="ck-muted" style={{ marginBottom: 10 }}>{order?.label}</div>
        <div data-testid="method-list">
          {METHODS.filter((m) => m.id !== "emi" || emiAvailable).map((m) => (
            <Radio key={m.id} name="method" label={m.label} detail={m.detail} testId={`method-${m.id}`}
                   checked={method === m.id} onChange={() => setMethod(m.id)} />
          ))}
        </div>

        {method === "upi" && (
          <div data-testid="upi-intent">
            <Field label="UPI ID" error={vpaError} hint="Try priya@okhdfb">
              <Input value={vpa} onChange={(e) => { setVpa(e.target.value); setVerified(false); }}
                     placeholder="name@bank" aria-label="UPI ID" data-testid="vpa-input" />
            </Field>
            <Btn variant="secondary" size="sm" onClick={verifyVpa} data-testid="verify-vpa">Verify UPI ID</Btn>
            {verified && <Badge tone="ok" testId="vpa-verified">UPI ID verified — request will be sent to {vpa.trim()}</Badge>}
            <Btn block style={{ marginTop: 10 }} disabled={!verified} onClick={pay} data-testid="upi-pay">
              Pay {order ? money(order.amount) : ""}
            </Btn>
          </div>
        )}

        {method === "card" && (
          <div data-testid="card-form">
            <Field label="Card number" hint="Test card 4111 1111 1111 1111">
              <Input value={card} onChange={(e) => setCard(e.target.value)} inputMode="numeric"
                     aria-label="Card number" data-testid="card-input" />
            </Field>
            <Btn block disabled={card.replace(/\s/g, "").length < 15} onClick={pay} data-testid="card-pay">
              Pay {order ? money(order.amount) : ""}
            </Btn>
          </div>
        )}

        {method === "emi" && emiAvailable && (
          <div data-testid="emi-panel">
            <Field label="Bank">
              <Select value={bank} onChange={(e) => { setBank(e.target.value); setTenure(EMI_BANKS.find((b) => b.id === e.target.value).plans[0].months); }}
                      aria-label="EMI bank" data-testid="emi-bank">
                {EMI_BANKS.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </Select>
            </Field>
            <div className="ck-strong" style={{ margin: "8px 0 6px" }}>Available plans</div>
            <table className="ck-table" data-testid="emi-plans">
              <thead><tr><th>Tenure</th><th>Interest</th><th>Monthly</th><th>Total</th><th /></tr></thead>
              <tbody>
                {bankObj.plans.map((p) => {
                  const e = emiFor(order.amount, p.months, p.rate);
                  return (
                    <tr key={p.months} data-testid={`emi-${p.months}`}>
                      <td>{p.months} months</td>
                      <td>{p.rate}% p.a.</td>
                      <td className="ck-strong" data-testid={`emi-monthly-${p.months}`}>{money(e.monthly)}</td>
                      <td>{money(e.total)}</td>
                      <td><Btn size="sm" variant={tenure === p.months ? "primary" : "secondary"}
                               onClick={() => setTenure(p.months)} data-testid={`pick-emi-${p.months}`}>Select</Btn></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {emi && <Row label={`${plan.months}-month EMI selected`} value={`${money(emi.monthly)} × ${plan.months}`} strong testId="emi-selected" />}
            <Btn block style={{ marginTop: 10 }} onClick={pay} data-testid="emi-pay">Pay with EMI</Btn>
          </div>
        )}
      </Modal>
    </Shell>
  );
}
