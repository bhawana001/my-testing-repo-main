"use client";
// Checkout with cash on delivery (3.3). COD adds a handling fee and the
// confirmation states the payment mode, which is what the use case asserts.
import { useState } from "react";
import Link from "next/link";
import { Shell, TopBar, Page, Card, Btn, Row, Radio, Badge, Banner, Empty, Field, Input } from "../../clones/kit/ui";
import { BRAND, BASE, useStore, money, cartTotals } from "../shared";

const MODES = [
  { id: "cod", label: "Cash on Delivery", detail: "Pay in cash when the order arrives · ₹25 handling fee" },
  { id: "upi", label: "UPI", detail: "Pay instantly from any UPI app" },
  { id: "card", label: "Credit / Debit Card", detail: "Visa, Mastercard, RuPay" },
];

export default function CheckoutPage() {
  const [s, update] = useStore();
  const [mode, setMode] = useState("cod");
  const [addr, setAddr] = useState("12 Brigade Road, Bengaluru 560001");
  const [placed, setPlaced] = useState(null);
  const t = cartTotals(s.cart, s.exchange, mode);

  function placeOrder() {
    const id = "OD" + (s.counter + 1);
    const order = {
      id, mode, modeLabel: MODES.find((m) => m.id === mode).label,
      total: t.payable, coins: t.coinsEarned, address: addr,
      items: s.cart, exchange: s.exchange, placedAt: "2026-09-15",
      status: mode === "cod" ? "Confirmed — pay on delivery" : "Confirmed — paid",
    };
    update((st) => {
      st.orders.unshift(order);
      st.counter += 1;
      st.superCoins += t.coinsEarned;
      st.coinHistory.unshift({ at: "2026-09-15", label: `Order ${id} — earned`, delta: t.coinsEarned });
      st.cart = [];
      st.exchange = null;
      return st;
    });
    setPlaced(order);
  }

  if (placed) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/rewards`, label: "SuperCoins" }]} />
        <Page>
          <Banner tone="ok" title="Order confirmed" testId="order-confirmation">
            Order <strong data-testid="order-id">{placed.id}</strong> placed successfully.
          </Banner>
          <Card title="Payment">
            <Row label="Payment mode" value={placed.modeLabel} testId="payment-mode" />
            <Badge tone={placed.mode === "cod" ? "warn" : "ok"} testId="payment-badge">
              {placed.mode === "cod" ? "Cash on Delivery" : "Prepaid"}
            </Badge>
            <Row label="Order status" value={placed.status} testId="order-status" />
            <Row label="Amount payable" value={money(placed.total)} strong testId="order-total" />
            <Row label="SuperCoins earned" value={`+${placed.coins}`} testId="coins-earned" />
          </Card>
          <Card title="Delivery address"><div data-testid="order-address">{placed.address}</div></Card>
        </Page>
      </Shell>
    );
  }

  if (s.cart.length === 0) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }]} />
        <Page title="Checkout"><Empty>Nothing to check out. <Link href={BASE}>Shop first</Link>.</Empty></Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: `${BASE}/cart`, label: "Back to cart" }]} />
      <Page title="Checkout">
        <div className="ck-split">
          <div>
            <Card title="Delivery address">
              <Field label="Address">
                <Input value={addr} onChange={(e) => setAddr(e.target.value)} aria-label="Delivery address" data-testid="address" />
              </Field>
            </Card>
            <Card title="Payment mode" testId="payment-modes">
              {MODES.map((m) => (
                <Radio key={m.id} name="mode" label={m.label} detail={m.detail} testId={`mode-${m.id}`}
                       checked={mode === m.id} onChange={() => setMode(m.id)} />
              ))}
            </Card>
          </div>
          <Card title="Price details">
            <Row label="Price" value={money(t.subtotal)} />
            {s.exchange && <Row label="Exchange discount" value={`−${money(t.exchangeValue)}`} testId="co-exchange" />}
            <Row label="Delivery" value={t.delivery === 0 ? "Free" : money(t.delivery)} />
            {t.codFee > 0 && <Row label="COD handling fee" value={money(t.codFee)} testId="cod-fee" />}
            <Row label="Total payable" value={money(t.payable)} strong testId="checkout-total" />
            <Btn block onClick={placeOrder} data-testid="confirm-order">
              {mode === "cod" ? "Confirm COD order" : "Pay now"}
            </Btn>
          </Card>
        </div>
      </Page>
    </Shell>
  );
}
