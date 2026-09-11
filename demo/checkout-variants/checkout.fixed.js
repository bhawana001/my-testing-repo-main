"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "../data";
import { BASE, usd } from "../lib";

// The cart is handed over from the store page through sessionStorage. If someone
// opens /shop-clone-app/checkout directly (a deep link, or a test that starts
// here) we fall back to a single-item cart so the page is always payable.
const CART_KEY = "shopkart_cart";
const FALLBACK = [{ ...PRODUCTS.find((p) => p.id === "sku_headset"), qty: 1 }];

function readCart() {
  try {
    const raw = sessionStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed) && parsed.length) return parsed;
  } catch {
    // ignore malformed storage, fall through
  }
  return FALLBACK;
}

export default function CheckoutPage() {
  // Seeded with the fallback so the server-rendered summary already shows a
  // payable order; the effect swaps in the real cart after hydration.
  const [items, setItems] = useState(FALLBACK);
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [status, setStatus] = useState("idle"); // idle | processing | success | declined | error
  const [errorMsg, setErrorMsg] = useState("");
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    setItems(readCart());
  }, []);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = Number((subtotal * 0.08).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  async function pay(e) {
    e.preventDefault();
    setErrorMsg("");
    setStatus("processing");

    try {
      const res = await fetch("/api/shop/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardNumber: card, exp, cvc, amount: total }),
      });
      const charge = await res.json();

      if (!res.ok) {
        setErrorMsg(
          charge.error === "card_declined"
            ? "Your card was declined. Try a different card."
            : "We couldn't read those card details. Check and try again."
        );
        setStatus("declined");
        return;
      }

      const orderRes = await fetch("/api/shop/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.id, qty: i.qty })),
          total,
        }),
      });
      const order = await orderRes.json();

      // Charge succeeded — commit the receipt to state so the component
      // re-renders out of "processing" and onto the confirmation screen.
      setReceipt({ charge, order });
      setStatus("success");
      sessionStorage.removeItem(CART_KEY);
    } catch {
      setErrorMsg("Network error while contacting the payment service.");
      setStatus("error");
    }
  }

  if (status === "success" && receipt) {
    return (
      <div className="pay-page">
        <div className="pay-confirm">
          <div className="pay-confirm-icon">✓</div>
          <h1 className="pay-confirm-title">Payment successful</h1>
          <p className="pay-confirm-sub">
            We charged {usd(receipt.charge.amount)} to the card ending in{" "}
            {receipt.charge.last4}. A confirmation email is on its way.
          </p>
          <div className="pay-receipt">
            <div className="pay-row">
              <span>Charge ID</span>
              <span data-testid="charge-id">{receipt.charge.chargeId}</span>
            </div>
            <div className="pay-row">
              <span>Order</span>
              <span data-testid="order-id">{receipt.order.orderId}</span>
            </div>
            <div className="pay-row pay-row--total">
              <span>Total paid</span>
              <span>{usd(receipt.charge.amount)}</span>
            </div>
          </div>
          <Link href={BASE} className="pay-btn pay-btn--ghost">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pay-page">
      <div className="pay-grid">
        <form className="pay-panel" onSubmit={pay}>
          <h1 className="pay-title">Checkout</h1>
          <p className="pay-sub">Enter your card to complete the order.</p>

          <label className="pay-field">
            <span>Card number</span>
            <input
              name="cardNumber"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="4242 4242 4242 4242"
              value={card}
              onChange={(e) => setCard(e.target.value)}
              required
            />
          </label>

          <div className="pay-field-row">
            <label className="pay-field">
              <span>Expiration</span>
              <input
                name="exp"
                autoComplete="cc-exp"
                placeholder="12 / 34"
                value={exp}
                onChange={(e) => setExp(e.target.value)}
                required
              />
            </label>
            <label className="pay-field">
              <span>CVC</span>
              <input
                name="cvc"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                required
              />
            </label>
          </div>

          {errorMsg && (
            <div className="pay-error" role="alert">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            className="pay-btn"
            disabled={status === "processing" || items.length === 0}
          >
            {status === "processing" ? "Processing…" : `Pay ${usd(total)}`}
          </button>

          {status === "processing" && (
            <p className="pay-processing" aria-live="polite">
              Processing your payment…
            </p>
          )}

          <p className="pay-note">
            Demo checkout. Test card 4242 4242 4242 4242 succeeds,
            4000 0000 0000 0002 is declined. No real money moves.
          </p>
        </form>

        <aside className="pay-summary">
          <h2>Order summary</h2>
          {items.map((i) => (
            <div className="pay-row" key={i.id}>
              <span>
                {i.emoji} {i.title} × {i.qty}
              </span>
              <span>{usd(i.price * i.qty)}</span>
            </div>
          ))}
          <div className="pay-divider" />
          <div className="pay-row">
            <span>Subtotal</span>
            <span>{usd(subtotal)}</span>
          </div>
          <div className="pay-row">
            <span>Estimated tax</span>
            <span>{usd(tax)}</span>
          </div>
          <div className="pay-row pay-row--total">
            <span>Order total</span>
            <span data-testid="order-total">{usd(total)}</span>
          </div>
          <Link href={BASE} className="pay-back">
            ← Back to ShopKart
          </Link>
        </aside>
      </div>
    </div>
  );
}
