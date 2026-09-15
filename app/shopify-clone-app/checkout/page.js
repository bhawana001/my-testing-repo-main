"use client";
// Guest checkout (2.1), discount codes (2.2) and the checkout extension (2.3).
// The extension is a merchant-installed block that injects custom fields and an
// upsell between shipping and payment -- the thing 2.3 checks renders without
// breaking the payment step.
import { useState } from "react";
import Link from "next/link";
import { Shell, TopBar, Page, Card, Btn, Field, Input, Select, Row, Check, Badge, Banner, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, THEMES, DISCOUNTS, PRODUCTS, useStore, money, totals, nextOrderId } from "../shared";

const STEPS = ["Contact", "Shipping", "Payment"];
const GIFT_WRAP = { id: "p_wrap", title: "Gift wrapping", price: 4.5, emoji: "🎁" };

export default function CheckoutPage() {
  const [s, update] = useStore();
  const theme = THEMES.find((t) => t.id === s.activeTheme) || THEMES[0];
  const brand = { ...BRAND, accent: theme.accent };

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(null);
  const [codeError, setCodeError] = useState("");
  // Checkout extension state
  const [deliveryNote, setDeliveryNote] = useState("");
  const [giftWrap, setGiftWrap] = useState(false);
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [payError, setPayError] = useState("");
  const [placing, setPlacing] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const lines = giftWrap ? [...s.cart, { ...GIFT_WRAP, qty: 1, variant: "" }] : s.cart;
  const t = totals(lines, applied);

  function applyCode(e) {
    e.preventDefault();
    const key = code.trim().toUpperCase();
    if (!key) return;
    if (!DISCOUNTS[key]) {
      setApplied(null);
      setCodeError(`Discount code ${key} isn't valid for this order.`);
      return;
    }
    setApplied(key);
    setCodeError("");
  }

  function pay(e) {
    e.preventDefault();
    const digits = card.replace(/\s+/g, "");
    if (digits === "4000000000000002") {
      setPayError("Your card was declined. Try a different payment method.");
      return;
    }
    if (digits.length < 15) {
      setPayError("Enter a valid card number. Test card: 4242 4242 4242 4242");
      return;
    }
    setPayError("");
    setPlacing(true);
    const id = nextOrderId(s.counter);
    const order = {
      id, email, customer: name || "Guest", total: t.total, status: "paid",
      channel: "Online Store", placedAt: "2026-09-15",
      items: lines.map((l) => ({ id: l.id, title: l.title, variant: l.variant, qty: l.qty, price: l.price })),
      discountCode: applied, discountAmount: t.discount,
      deliveryNote, giftWrap,
    };
    update((st) => {
      st.orders.unshift(order);
      st.counter += 1;
      st.cart = [];
      return st;
    });
    setReceipt({ order, t });
  }

  if (receipt) {
    return (
      <Shell brand={brand}>
        <TopBar brand={brand} nav={[{ href: BASE, label: "Back to store" }]} />
        <Page>
          <Banner tone="ok" title="Thank you for your order!" testId="thank-you">
            Order <strong data-testid="order-number">{receipt.order.id}</strong> is confirmed.
            A receipt was emailed to {receipt.order.email || "your inbox"}.
          </Banner>
          <Card title="Order summary">
            {receipt.order.items.map((l, i) => (
              <Row key={i} label={`${l.title}${l.variant ? ` — ${l.variant}` : ""} × ${l.qty}`} value={money(l.price * l.qty)} />
            ))}
            <Row label="Subtotal" value={money(receipt.t.subtotal)} testId="sum-subtotal" />
            {receipt.order.discountCode && (
              <Row label={`Discount (${receipt.order.discountCode})`} value={`−${money(receipt.t.discount)}`} testId="sum-discount" />
            )}
            <Row label="Shipping" value={money(receipt.t.shipping)} />
            <Row label="Tax" value={money(receipt.t.tax)} />
            <Row label="Total paid" value={money(receipt.t.total)} strong testId="order-total" />
          </Card>
          {receipt.order.deliveryNote && (
            <Card title="Delivery instructions" testId="receipt-note">{receipt.order.deliveryNote}</Card>
          )}
          <Btn as="link" href={`${BASE}/admin`} variant="secondary">View in admin</Btn>
        </Page>
      </Shell>
    );
  }

  if (s.cart.length === 0) {
    return (
      <Shell brand={brand}>
        <TopBar brand={brand} nav={[{ href: BASE, label: "Back to store" }]} />
        <Page title="Checkout">
          <Empty>Your cart is empty. <Link href={BASE}>Add something first</Link>.</Empty>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={brand}>
      <TopBar brand={brand} nav={[{ href: `${BASE}/cart`, label: "Back to cart" }]} />
      <Page title="Checkout" sub="Guest checkout — no account required">
        <div className="ck-split">
          <div>
            <Card title="Contact" testId="step-contact">
              <Field label="Email">
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                       placeholder="you@example.com" aria-label="Email" data-testid="email" required />
              </Field>
              <Badge tone="info">Checking out as guest</Badge>
            </Card>

            <Card title="Shipping address" testId="step-shipping">
              <Field label="Full name">
                <Input value={name} onChange={(e) => setName(e.target.value)} aria-label="Full name" data-testid="name" />
              </Field>
              <Field label="Address">
                <Input value={address} onChange={(e) => setAddress(e.target.value)} aria-label="Address" data-testid="address" />
              </Field>
              <div className="ck-grid ck-grid--2">
                <Field label="City">
                  <Input value={city} onChange={(e) => setCity(e.target.value)} aria-label="City" data-testid="city" />
                </Field>
                <Field label="ZIP">
                  <Input value={zip} onChange={(e) => setZip(e.target.value)} aria-label="ZIP" data-testid="zip" />
                </Field>
              </div>
            </Card>

            {/* ---- Checkout extension (2.3) ---- */}
            <Card title="Order details" testId="checkout-extension" tone="warn">
              <Badge tone="warn" testId="extension-badge">Checkout extension · Alder Add-ons v1.4</Badge>
              <Field label="Delivery instructions" hint="Custom field added by the extension">
                <Input value={deliveryNote} onChange={(e) => setDeliveryNote(e.target.value)}
                       aria-label="Delivery instructions" data-testid="delivery-note"
                       placeholder="Leave at the side door" />
              </Field>
              <div data-testid="upsell-block">
                <Check
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  label={`Add gift wrapping — ${money(GIFT_WRAP.price)}`}
                  detail="Recycled kraft paper and a hand-tied ribbon"
                  testId="upsell-giftwrap"
                />
              </div>
            </Card>

            <Card title="Payment" testId="step-payment">
              <form onSubmit={pay}>
                <Field label="Card number" error={payError} hint="Test card 4242 4242 4242 4242 · 4000 0000 0000 0002 declines">
                  <Input value={card} onChange={(e) => setCard(e.target.value)} inputMode="numeric"
                         placeholder="4242 4242 4242 4242" aria-label="Card number" data-testid="card" required />
                </Field>
                <div className="ck-grid ck-grid--2">
                  <Field label="Expiration">
                    <Input value={exp} onChange={(e) => setExp(e.target.value)} placeholder="12 / 34" aria-label="Expiration" data-testid="exp" required />
                  </Field>
                  <Field label="CVC">
                    <Input value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="123" aria-label="CVC" data-testid="cvc" required />
                  </Field>
                </div>
                <Btn block type="submit" disabled={placing} data-testid="pay-now">
                  {placing ? "Processing…" : `Pay ${money(t.total)}`}
                </Btn>
              </form>
            </Card>
          </div>

          <Card title="Order summary">
            {lines.map((l, i) => (
              <Row key={i} label={`${l.title}${l.variant ? ` — ${l.variant}` : ""} × ${l.qty}`} value={money(l.price * l.qty)} />
            ))}

            <form onSubmit={applyCode} style={{ display: "flex", gap: 8, margin: "12px 0" }}>
              <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Discount code"
                     aria-label="Discount code" data-testid="discount-code" />
              <Btn variant="secondary" type="submit" data-testid="apply-discount">Apply</Btn>
            </form>
            {codeError && <div className="ck-field-error" role="alert" data-testid="discount-error">{codeError}</div>}
            {applied && (
              <Badge tone="ok" testId="discount-applied">{DISCOUNTS[applied].label} applied</Badge>
            )}

            <Row label="Subtotal" value={money(t.subtotal)} testId="subtotal" />
            {applied && <Row label={`Discount (${applied})`} value={`−${money(t.discount)}`} testId="discount-line" />}
            <Row label="Shipping" value={t.shipping === 0 ? "Free" : money(t.shipping)} testId="shipping-line" />
            <Row label="Estimated tax" value={money(t.tax)} />
            <Row label="Total" value={money(t.total)} strong testId="checkout-total" />
          </Card>
        </div>
      </Page>
    </Shell>
  );
}
