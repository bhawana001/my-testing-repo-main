"use client";
// Checkout engine: composable cart, coupon, address, payment and confirmation
// pieces plus a default orchestrator. Skins configure it; math is in
// lib/engines/checkout-math.js so every total is deterministic.
import { useState } from "react";
import { Alert, Badge, Btn, Card, Field, Input, KV, RadioCard, Select, Stepper, useDelay } from "../eval/ui";
import { computeTotals, lookupCoupon, orderNumber } from "@/lib/engines/checkout-math";
import { ADDRESSES, CARDS, cardOutcome, money, DEMO_USER } from "@/lib/seed";

export { computeTotals, lookupCoupon, orderNumber };

export function CartLines({ lines, currency = "USD", onQty, onRemove, showSeller, extra }) {
  if (!lines.length) return <div className="ee-empty" data-testid="cart-empty">Your cart is empty.</div>;
  return (
    <div className="ee-stack" data-testid="cart-lines">
      {lines.map((l) => (
        <div key={l.id} className="ee-row" style={{ alignItems: "flex-start" }} data-testid="cart-line">
          <div className="ee-product__img ee-product__img--sm" aria-hidden="true">{l.emoji || "📦"}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="ee-strong">{l.name}</div>
            {l.variant && (
              <div className="ee-small ee-muted" data-testid="cart-line-variant">
                {Object.entries(l.variant).map(([k, v]) => `${k[0].toUpperCase() + k.slice(1)}: ${v}`).join(" · ")}
              </div>
            )}
            {l.personalization && <div className="ee-small ee-muted">Personalization: “{l.personalization}”</div>}
            {showSeller && l.seller && <div className="ee-small ee-muted">Sold by {l.seller}</div>}
            {l.exchange ? <div className="ee-small" style={{ color: "var(--ee-ok)" }}>Exchange offer applied: −{money(l.exchange, currency)}</div> : null}
            {extra && extra(l)}
            {onQty && (
              <div className="ee-row ee-small" style={{ marginTop: 6 }}>
                <label className="ee-muted">Qty</label>
                <Select value={l.qty || 1} onChange={(e) => onQty(l.id, Number(e.target.value))} style={{ width: 70 }} aria-label={`Quantity for ${l.name}`}>
                  {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                </Select>
                {onRemove && <button className="ee-link" onClick={() => onRemove(l.id)}>Remove</button>}
              </div>
            )}
          </div>
          <div className="ee-price ee-num" data-testid="cart-line-price">{money(l.price * (l.qty || 1), currency)}</div>
        </div>
      ))}
    </div>
  );
}

export function OrderSummary({ totals, currency = "USD", labels = {}, children, testId = "order-summary", extraRows = [] }) {
  const t = totals;
  return (
    <div data-testid={testId}>
      <KV k={labels.subtotal || "Subtotal"} v={money(t.subtotal, currency)} testId="sum-subtotal" />
      {t.exchange > 0 && <KV k="Exchange deduction" v={"−" + money(t.exchange, currency)} discount testId="sum-exchange" />}
      {t.discount > 0 && <KV k={labels.discount || "Discount"} v={"−" + money(t.discount, currency)} discount testId="sum-discount" />}
      {t.shippingLines.length > 0
        ? t.shippingLines.map((s) => <KV key={s.seller} k={`Shipping · ${s.seller}`} v={s.amount === 0 ? "Free" : money(s.amount, currency)} testId="sum-shipping-line" />)
        : <KV k={labels.shipping || "Shipping"} v={t.shipping === 0 ? "Free" : money(t.shipping, currency)} testId="sum-shipping" />}
      {t.fees > 0 && <KV k={labels.fees || "Fees"} v={money(t.fees, currency)} testId="sum-fees" />}
      {t.tax > 0 && <KV k={labels.tax || "Tax"} v={money(t.tax, currency)} testId="sum-tax" />}
      {t.tip > 0 && <KV k="Tip" v={money(t.tip, currency)} testId="sum-tip" />}
      {extraRows.map((r) => <KV key={r.k} k={r.k} v={r.v} testId={r.testId} />)}
      <KV k={labels.total || "Order total"} v={money(t.total, currency)} total testId="sum-total" />
      {children}
    </div>
  );
}

export function CouponBox({ coupon, onApply, onRemove, currency = "USD", error }) {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState(null);
  function apply() {
    const c = lookupCoupon(code);
    if (!c) {
      setMsg({ tone: "err", text: `Code “${code.toUpperCase()}” is not valid.` });
      return;
    }
    setMsg({ tone: "ok", text: `${c.code} applied${c.type === "percent" ? ` (${c.value}% off)` : ""}.` });
    onApply(c);
    setCode("");
  }
  return (
    <div className="ee-stack" data-testid="coupon-box">
      {coupon ? (
        <div className="ee-row ee-row--between">
          <Badge tone="ok" data-testid="coupon-applied">{coupon.code} applied</Badge>
          <button className="ee-link" onClick={onRemove}>Remove</button>
        </div>
      ) : (
        <div className="ee-row">
          <Input placeholder="Discount code" value={code} onChange={(e) => setCode(e.target.value)} aria-label="Discount code" style={{ flex: 1 }} onKeyDown={(e) => e.key === "Enter" && apply()} />
          <Btn variant="secondary" onClick={apply} disabled={!code.trim()}>Apply</Btn>
        </div>
      )}
      {(msg || error) && <div className={msg?.tone === "err" || error ? "ee-error" : "ee-small ee-strong"} style={!error && msg?.tone === "ok" ? { color: "var(--ee-ok)" } : undefined} role="status">{error || msg.text}</div>}
    </div>
  );
}

export function AddressCard({ address = ADDRESSES.us, name = DEMO_USER.name, editable, onChange, title = "Shipping address" }) {
  const [edit, setEdit] = useState(false);
  const [draft, setDraft] = useState(address);
  return (
    <Card title={title} right={editable && !edit && <button className="ee-link" onClick={() => setEdit(true)}>Change</button>} flat tight data-testid="address-card">
      {!edit ? (
        <div className="ee-small">
          <div className="ee-strong">{name}</div>
          <div>{address.line1}</div>
          <div>{address.city}, {address.state} {address.zip}</div>
          <div>{address.country}</div>
        </div>
      ) : (
        <div className="ee-stack">
          {["line1", "city", "state", "zip"].map((k) => (
            <Field key={k} label={k === "line1" ? "Street" : k.toUpperCase() === "ZIP" ? "ZIP / Postcode" : k[0].toUpperCase() + k.slice(1)}>
              <Input value={draft[k]} onChange={(e) => setDraft({ ...draft, [k]: e.target.value })} />
            </Field>
          ))}
          <div className="ee-row">
            <Btn size="sm" onClick={() => { onChange?.(draft); setEdit(false); }}>Save address</Btn>
            <Btn size="sm" variant="secondary" onClick={() => setEdit(false)}>Cancel</Btn>
          </div>
        </div>
      )}
    </Card>
  );
}

/**
 * PaymentForm: card entry with deterministic outcomes.
 *  4242… success · 4000…0002 decline · 4000…3220 3DS challenge (OTP 123456)
 * Props: amount, currency, savedCards[], onSuccess(payment), allow3ds, methods (["card","cod","upi","wallet"]), method, onMethod
 */
export function PaymentForm({ amount, currency = "USD", savedCards = [], onSuccess, buttonLabel, methods = ["card"], defaultMethod, allow3ds = true, extraMethodUI, testIdPrefix = "pay" }) {
  const delay = useDelay();
  const [method, setMethod] = useState(defaultMethod || methods[0]);
  const [useSaved, setUseSaved] = useState(savedCards.length > 0 ? savedCards[0].id : null);
  const [card, setCard] = useState({ number: "", exp: "", cvc: "", name: DEMO_USER.name });
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);
  const [challenge, setChallenge] = useState(null);
  const [otp, setOtp] = useState("");

  async function pay() {
    setErr(null);
    if (method === "card") {
      let outcome, last4, brand;
      if (useSaved) {
        const s = savedCards.find((c) => c.id === useSaved);
        outcome = s.outcome || "success";
        last4 = s.last4;
        brand = s.brand;
      } else {
        if (!card.number.trim() || !card.exp.trim() || !card.cvc.trim()) {
          setErr("Enter card number, expiry and CVC.");
          return;
        }
        outcome = cardOutcome(card.number);
        last4 = card.number.replace(/\s+/g, "").slice(-4);
        brand = "Visa";
        if (outcome === "invalid") {
          setErr("Your card number is invalid.");
          return;
        }
      }
      setBusy(true);
      await delay(700);
      setBusy(false);
      if (outcome === "decline") {
        setErr("Your card was declined. Try a different payment method.");
        return;
      }
      if (outcome === "3ds" && allow3ds) {
        setChallenge({ last4, brand });
        return;
      }
      onSuccess({ method: "card", last4, brand, amount, currency, authCode: "AUTH-" + last4 + "77" });
      return;
    }
    setBusy(true);
    await delay(600);
    setBusy(false);
    onSuccess({ method, amount, currency });
  }

  async function approveChallenge() {
    if (otp !== "123456") {
      setErr("Incorrect verification code. Use the code sent to your phone.");
      return;
    }
    setBusy(true);
    await delay(600);
    setBusy(false);
    const c = challenge;
    setChallenge(null);
    onSuccess({ method: "card", last4: c.last4, brand: c.brand, amount, currency, authCode: "AUTH-3DS-" + c.last4, threeDS: true });
  }

  if (challenge) {
    return (
      <div className="ee-card ee-card--flat" data-testid={`${testIdPrefix}-3ds`} style={{ borderColor: "var(--ee-accent)" }}>
        <div className="ee-badge ee-badge--info" style={{ marginBottom: 8 }}>Bank verification · 3-D Secure</div>
        <h3 style={{ marginBottom: 6 }}>Confirm this payment</h3>
        <p className="ee-small ee-muted" style={{ marginBottom: 12 }}>
          Your bank sent a one-time code to your phone ending in 0123 to authorise {money(amount, currency)} on the card ending {challenge.last4}.
        </p>
        <Field label="One-time code" error={err} htmlFor="tds-otp">
          <Input id="tds-otp" inputMode="numeric" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit code" aria-label="One-time code" />
        </Field>
        <div className="ee-row" style={{ marginTop: 12 }}>
          <Btn onClick={approveChallenge} loading={busy} data-testid={`${testIdPrefix}-3ds-approve`}>Approve payment</Btn>
          <Btn variant="secondary" onClick={() => { setChallenge(null); setErr("Verification cancelled. Payment was not completed."); }}>Cancel</Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="ee-stack" data-testid={`${testIdPrefix}-form`}>
      {methods.length > 1 && (
        <div className="ee-stack" role="radiogroup" aria-label="Payment method">
          {methods.map((m) => (
            <RadioCard key={m} name="pm" value={m} checked={method === m} onChange={setMethod}
              title={{ card: "Credit / debit card", cod: "Cash on delivery", upi: "UPI", wallet: "Wallet balance", netbanking: "Net banking", paypal: "PayPally", klarna: "Pay in 4" }[m] || m}
              desc={{ card: "Visa, Mastercard, Amex", cod: "Pay in cash when your order arrives", upi: "Pay with any UPI app", wallet: "Use your stored balance" }[m]} />
          ))}
        </div>
      )}
      {method === "card" && (
        <>
          {savedCards.length > 0 && (
            <div className="ee-stack" role="radiogroup" aria-label="Saved cards">
              {savedCards.map((s) => (
                <RadioCard key={s.id} name="saved" value={s.id} checked={useSaved === s.id} onChange={setUseSaved} title={`${s.brand} •••• ${s.last4}`} desc={s.isDefault ? "Default" : `Expires ${s.exp}`} />
              ))}
              <RadioCard name="saved" value="__new" checked={useSaved === null} onChange={() => setUseSaved(null)} title="Use a new card" />
            </div>
          )}
          {useSaved === null && (
            <div className="ee-grid ee-grid--2" style={{ gap: 10 }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <Field label="Card number" htmlFor="card-number">
                  <Input id="card-number" inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} />
                </Field>
              </div>
              <Field label="Expiry" htmlFor="card-exp"><Input id="card-exp" placeholder="MM/YY" autoComplete="cc-exp" value={card.exp} onChange={(e) => setCard({ ...card, exp: e.target.value })} /></Field>
              <Field label="CVC" htmlFor="card-cvc"><Input id="card-cvc" placeholder="123" inputMode="numeric" autoComplete="cc-csc" value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value })} /></Field>
              <div style={{ gridColumn: "1 / -1" }}>
                <Field label="Name on card" htmlFor="card-name"><Input id="card-name" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} /></Field>
              </div>
            </div>
          )}
        </>
      )}
      {extraMethodUI && extraMethodUI(method)}
      {err && <Alert tone="err" data-testid={`${testIdPrefix}-error`}>{err}</Alert>}
      <Btn size="lg" block onClick={pay} loading={busy} data-testid={`${testIdPrefix}-submit`}>
        {buttonLabel || (method === "cod" ? "Place order" : `Pay ${money(amount, currency)}`)}
      </Btn>
      <div className="ee-tiny ee-muted ee-center">Test cards: {CARDS.success} succeeds · {CARDS.decline} declines{allow3ds ? ` · ${CARDS.threeDS} triggers 3-D Secure` : ""}</div>
    </div>
  );
}

export function Confirmation({ order, currency = "USD", title = "Thank you, your order is confirmed", children, extra = [] }) {
  return (
    <Card data-testid="order-confirmation">
      <div className="ee-badge ee-badge--ok" style={{ marginBottom: 10 }}>Order placed</div>
      <h2 style={{ fontSize: 22, marginBottom: 6 }}>{title}</h2>
      <p className="ee-muted" style={{ marginBottom: 14 }}>
        Order number <span className="ee-strong ee-mono" data-testid="order-number">{order.number}</span>. A confirmation has been sent to {DEMO_USER.email}.
      </p>
      <div className="ee-grid ee-grid--2" style={{ gap: 10 }}>
        <KV k="Order total" v={money(order.total, currency)} testId="confirm-total" />
        {order.payment && <KV k="Payment" v={order.payment.method === "card" ? `${order.payment.brand} •••• ${order.payment.last4}` : order.payment.method === "cod" ? "Cash on delivery" : order.payment.method.toUpperCase()} testId="confirm-payment" />}
        {order.eta && <KV k="Arrives" v={order.eta} testId="confirm-eta" />}
        {extra.map((e) => <KV key={e.k} k={e.k} v={e.v} testId={e.testId} />)}
      </div>
      {children}
    </Card>
  );
}

export const CHECKOUT_STEPS = ["Cart", "Delivery", "Payment", "Done"];
export function CheckoutStepper({ step }) {
  return <Stepper steps={CHECKOUT_STEPS} current={step} />;
}
