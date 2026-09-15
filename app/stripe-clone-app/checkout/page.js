"use client";
// Hosted Checkout (9.1), 3DS challenge (9.2) and declined-card recovery (9.3).
// Which path you get is decided by the test card, and a decline leaves the form
// usable so the retry is a real retry rather than a fresh page.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Field, Input, Row, Badge, Banner, Modal } from "../../clones/kit/ui";
import { BRAND, BASE, PRODUCT, lookupCard, useStore, money, newPaymentId } from "../shared";

export default function CheckoutPage() {
  const [s, update] = useStore();
  const [email, setEmail] = useState("priya.nair@example.com");
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [challenge, setChallenge] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);

  function complete(match, threeDS) {
    const id = newPaymentId(s.counter);
    const payment = {
      id, amount: PRODUCT.price, status: "succeeded",
      card: `${match.brand} ••••${match.last4}`, customer: email,
      at: "2026-09-15 10:30", description: PRODUCT.name, threeDS,
    };
    update((st) => { st.payments.unshift(payment); st.counter += 1; return st; });
    setReceipt(payment);
    setProcessing(false);
  }

  function pay(e) {
    e.preventDefault();
    const match = lookupCard(card);
    if (!match) {
      setError("That card number isn't a recognised test card.");
      return;
    }
    setError("");
    setProcessing(true);
    if (match.outcome === "declined") {
      setAttempts((n) => n + 1);
      setError(match.message + " Try a different card.");
      setProcessing(false);
      return;
    }
    if (match.outcome === "3ds") {
      setChallenge(true);
      setProcessing(false);
      return;
    }
    complete(match, false);
  }

  function approveChallenge() {
    const match = lookupCard(card);
    setChallenge(false);
    complete(match, true);
  }

  if (receipt) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Back to merchant" }, { href: `${BASE}/dashboard`, label: "Dashboard" }]} />
        <Page>
          <Banner tone="ok" title="Payment successful" testId="payment-success">
            Thanks — your payment of <strong data-testid="paid-amount">{money(receipt.amount)}</strong> went through.
          </Banner>
          <Card title="Receipt" testId="receipt">
            <Row label="Payment ID" value={receipt.id} testId="payment-id" />
            <Row label="Amount paid" value={money(receipt.amount)} strong testId="receipt-amount" />
            <Row label="Card" value={receipt.card} testId="receipt-card" />
            <Row label="Status" value="succeeded" testId="receipt-status" />
            {receipt.threeDS && <Badge tone="ok" testId="threeds-badge">3D Secure authenticated</Badge>}
            {attempts > 0 && <Badge tone="info" testId="retry-badge">Succeeded after {attempts} declined attempt{attempts === 1 ? "" : "s"}</Badge>}
          </Card>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Cancel and return" }]} />
      <Page title="Checkout" sub="Stripey hosted checkout session">
        <div className="ck-split">
          <Card title="Pay with card">
            <form onSubmit={pay}>
              <Field label="Email">
                <Input value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" data-testid="email" />
              </Field>
              <Field label="Card number" error={error}
                     hint="4242… succeeds · 4000 0025 0000 3155 needs 3DS · 4000…0002 declines">
                <Input value={card} onChange={(e) => setCard(e.target.value)} inputMode="numeric"
                       placeholder="4242 4242 4242 4242" aria-label="Card number" data-testid="card-number" />
              </Field>
              <div className="ck-grid ck-grid--2">
                <Field label="Expiry">
                  <Input value={exp} onChange={(e) => setExp(e.target.value)} placeholder="12 / 34" aria-label="Expiry" data-testid="card-exp" />
                </Field>
                <Field label="CVC">
                  <Input value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="123" aria-label="CVC" data-testid="card-cvc" />
                </Field>
              </div>
              {attempts > 0 && !error && (
                <Badge tone="warn" testId="retry-hint">Previous attempt declined — try another card</Badge>
              )}
              <Btn block type="submit" disabled={processing} data-testid="pay-button">
                {processing ? "Processing…" : `Pay ${money(PRODUCT.price)}`}
              </Btn>
            </form>
          </Card>

          <Card title="Order summary">
            <Row label={PRODUCT.name} value={money(PRODUCT.price)} />
            <Row label="Total due" value={money(PRODUCT.price)} strong testId="checkout-total" />
            <p className="ck-muted">{PRODUCT.description}</p>
          </Card>
        </div>
      </Page>

      <Modal open={challenge} title="3D Secure authentication" onClose={() => setChallenge(false)} testId="threeds-challenge"
             actions={<>
               <Btn variant="secondary" onClick={() => { setChallenge(false); setError("Authentication cancelled. Try again."); }}
                    data-testid="threeds-cancel">Cancel</Btn>
               <Btn onClick={approveChallenge} data-testid="threeds-approve">Approve payment</Btn>
             </>}>
        <p>Your bank needs to verify this payment.</p>
        <Card tone="warn">
          <div className="ck-strong">Northwind Software</div>
          <Row label="Amount" value={money(PRODUCT.price)} testId="challenge-amount" />
          <Row label="Card" value={`Visa ••••${lookupCard(card)?.last4 || ""}`} />
        </Card>
        <p className="ck-muted">This simulates the issuer challenge window.</p>
      </Modal>
    </Shell>
  );
}
