"use client";
// Express checkout (10.1) and guest card payment (10.2). The PayPaal button
// opens an approval window; inside it you either log in and approve, or choose
// to pay by card without an account.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Modal, Field, Input } from "../../clones/kit/ui";
import { BRAND, BASE, ACCOUNT, CART, useStore, money, nextTx } from "../shared";

export default function CheckoutPage() {
  const [s, update] = useStore();
  const [win, setWin] = useState(false);
  const [mode, setMode] = useState("login"); // login | guest
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(null);

  function complete(how) {
    const id = nextTx(s.counter);
    const tx = { id, type: "payment", counterparty: CART.merchant, amount: -CART.amount,
                 currency: "USD", at: "2026-09-15", status: "Completed", disputable: true, method: how };
    update((st) => { st.activity.unshift(tx); st.counter += 1; return st; });
    setDone({ ...tx, how });
    setWin(false);
  }

  function approve() {
    if (email.trim() !== ACCOUNT.email || pw.length < 4) {
      setErr("That email and password don't match a PayPaal account.");
      return;
    }
    setErr("");
    complete("PayPaal balance");
  }

  function payGuest() {
    if (card.replace(/\s/g, "").length < 15) { setErr("Enter a valid card number."); return; }
    if (!exp.trim() || !cvc.trim()) { setErr("Enter the expiry and CVC."); return; }
    setErr("");
    complete("Guest card");
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Wallet" }, { href: `${BASE}/activity`, label: "Activity" }]} />
      <Page title={CART.merchant} sub="Merchant demo store">
        {done && (
          <Banner tone="ok" title="Payment complete" testId="payment-complete">
            Paid <strong data-testid="paid-amount">{money(Math.abs(done.amount))}</strong> to {CART.merchant} with {done.how}.
            Transaction <strong data-testid="tx-id">{done.id}</strong>.
          </Banner>
        )}

        <div className="ck-split">
          <Card title="Your basket">
            <Row label={CART.item} value={money(CART.amount)} />
            <Row label="Order total" value={money(CART.amount)} strong testId="order-total" />
          </Card>
          <Card title="Pay with">
            <Btn block onClick={() => { setWin(true); setMode("login"); setErr(""); }} data-testid="paypal-button">
              Pay with PayPaal
            </Btn>
            <p className="ck-muted" style={{ marginTop: 8 }}>
              Opens the PayPaal approval window. You can also pay by card without an account.
            </p>
          </Card>
        </div>

        <Modal open={win} title="PayPaal" onClose={() => setWin(false)} testId="paypal-window">
          <Row label={CART.merchant} value={money(CART.amount)} testId="window-amount" />
          <div className="ck-card-actions" style={{ marginBottom: 10 }}>
            <Btn size="sm" variant={mode === "login" ? "primary" : "secondary"} onClick={() => { setMode("login"); setErr(""); }} data-testid="tab-login">
              Log in
            </Btn>
            <Btn size="sm" variant={mode === "guest" ? "primary" : "secondary"} onClick={() => { setMode("guest"); setErr(""); }} data-testid="tab-guest">
              Pay by card
            </Btn>
          </div>

          {mode === "login" ? (
            <div data-testid="login-pane">
              <Field label="Email"><Input value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" data-testid="pp-email" /></Field>
              <Field label="Password" error={err}>
                <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} aria-label="Password" data-testid="pp-password" />
              </Field>
              <p className="ck-muted">Demo login: {ACCOUNT.email} / any 4+ characters</p>
              <Btn block onClick={approve} data-testid="approve-payment">Agree and pay {money(CART.amount)}</Btn>
            </div>
          ) : (
            <div data-testid="guest-pane">
              <Badge tone="info" testId="guest-badge">Paying as a guest — no PayPaal account needed</Badge>
              <Field label="Card number" error={err}>
                <Input value={card} onChange={(e) => setCard(e.target.value)} inputMode="numeric"
                       placeholder="4242 4242 4242 4242" aria-label="Card number" data-testid="guest-card" />
              </Field>
              <div className="ck-grid ck-grid--2">
                <Field label="Expiry"><Input value={exp} onChange={(e) => setExp(e.target.value)} placeholder="12 / 34" aria-label="Expiry" data-testid="guest-exp" /></Field>
                <Field label="CVC"><Input value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="123" aria-label="CVC" data-testid="guest-cvc" /></Field>
              </div>
              <Btn block onClick={payGuest} data-testid="guest-pay">Pay {money(CART.amount)} as guest</Btn>
            </div>
          )}
        </Modal>
      </Page>
    </Shell>
  );
}
