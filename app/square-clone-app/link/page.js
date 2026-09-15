"use client";
// Online checkout link (12.1): pay with a test card and land on a receipt.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input } from "../../clones/kit/ui";
import { BRAND, BASE, CHECKOUT_LINK, useStore, money, nextPayId } from "../shared";

export default function LinkPage() {
  const [s, update] = useStore();
  const [card, setCard] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [receipt, setReceipt] = useState(null);

  function pay() {
    if (card.replace(/\s/g, "").length < 15) { setErr("Enter a valid test card, e.g. 4242 4242 4242 4242."); return; }
    setErr("");
    const id = nextPayId(s.counter);
    const payment = { id, source: `Checkout link ${CHECKOUT_LINK.id}`, amount: CHECKOUT_LINK.amount,
                      tip: 0, at: "2026-09-15", status: "Completed", card: "Visa ••••" + card.replace(/\s/g, "").slice(-4), refunded: 0 };
    update((st) => { st.payments.unshift(payment); st.counter += 1; st.link = { status: "paid", paymentId: id }; return st; });
    setReceipt({ ...payment, email });
  }

  if (receipt) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/dashboard`, label: "Dashboard" }]} />
        <Page>
          <Banner tone="ok" title="Payment complete" testId="link-receipt">
            Thanks — your payment of <strong data-testid="receipt-amount">{money(receipt.amount)}</strong> was received.
          </Banner>
          <Card title="Receipt" testId="receipt-card">
            <Row label="Payment ID" value={receipt.id} testId="receipt-id" />
            <Row label="Item" value={CHECKOUT_LINK.title} testId="receipt-item" />
            <Row label="Seller" value={CHECKOUT_LINK.seller} />
            <Row label="Card" value={receipt.card} testId="receipt-card-number" />
            <Row label="Total paid" value={money(receipt.amount)} strong testId="receipt-total" />
            {receipt.email && <Row label="Receipt sent to" value={receipt.email} testId="receipt-email" />}
            <Badge tone="ok">Completed</Badge>
          </Card>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }]} />
      <Page title={CHECKOUT_LINK.seller} sub={`Checkout link ${CHECKOUT_LINK.id}`}>
        <Card testId="link-card">
          <div className="ck-strong" style={{ fontSize: 17 }}>{CHECKOUT_LINK.title}</div>
          <div style={{ fontSize: 30, fontWeight: 700, margin: "8px 0" }} data-testid="link-amount">{money(CHECKOUT_LINK.amount)}</div>
          <Field label="Email for receipt">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email for receipt" data-testid="link-email" />
          </Field>
          <Field label="Card number" error={err} hint="Test card 4242 4242 4242 4242">
            <Input value={card} onChange={(e) => setCard(e.target.value)} inputMode="numeric"
                   aria-label="Card number" data-testid="link-card-input" />
          </Field>
          <Btn block onClick={pay} data-testid="link-pay">Pay {money(CHECKOUT_LINK.amount)}</Btn>
        </Card>
      </Page>
    </Shell>
  );
}
