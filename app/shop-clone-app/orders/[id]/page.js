"use client";
// Order detail: tracking timeline (use case 1.4) and return initiation (1.5).
// Also the landing page for a Buy Now purchase -- ?placed=1 shows the order
// confirmation banner with the order number, which is what one-click asserts.
import { Suspense, use, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../../Header";
import { useAccount, stageIndex, TIMELINE, createReturn, RETURN_REASONS, RETURN_METHODS } from "../../store";
import { findProduct } from "../../data";
import { BASE, usd } from "../../lib";

function OrderDetail({ id }) {
  const [account, update] = useAccount();
  const params = useSearchParams();
  const router = useRouter();
  const justPlaced = params.get("placed") === "1";

  const [returnOpen, setReturnOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [method, setMethod] = useState("dropoff");
  const [comment, setComment] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState("");

  const order = account.orders.find((o) => o.id === id);
  if (!order) {
    return (
      <>
        <Header />
        <div className="ord">
          <h1 className="ord-h1">Order not found</h1>
          <p className="ord-muted">We couldn&rsquo;t find order {id} on this account.</p>
          <Link href={`${BASE}/orders`} className="srp-link">Back to Your Orders</Link>
        </div>
      </>
    );
  }

  const address = account.addresses.find((a) => a.id === order.addressId) || account.addresses[0];
  const card = account.cards.find((c) => c.id === order.cardId) || account.cards[0];
  const stage = stageIndex(order.status);
  const existingReturn = account.returns.find((r) => r.orderId === order.id);

  function submitReturn(e) {
    e.preventDefault();
    if (!reason) {
      setError("Choose a reason for your return.");
      return;
    }
    setError("");
    setReceipt(createReturn(account, update, { orderId: order.id, reason, method, comment }));
  }

  return (
    <>
      <Header onOpenCart={() => router.push(`${BASE}?cart=1`)} />
      <div className="ord">
        {justPlaced && (
          <div className="ord-placed" role="status" data-testid="order-placed">
            <div className="ord-placed-tick">✓</div>
            <div>
              <h2>Order placed, thank you!</h2>
              <p>
                Your order number is <strong data-testid="placed-order-id">{order.id}</strong>.
                Charged {usd(order.total)} to {card.brand} ending in {card.last4}.
              </p>
              <p className="ord-muted">A confirmation email was sent to {account.profile.email}.</p>
            </div>
          </div>
        )}

        <Link href={`${BASE}/orders`} className="srp-link">← Back to Your Orders</Link>
        <h1 className="ord-h1">Order details</h1>
        <div className="ord-meta">
          <span>Ordered {order.placedAt}</span> · <span data-testid="detail-order-id">Order # {order.id}</span>
        </div>

        <section className="ord-track" data-testid="tracking">
          <h2 className="ord-h2" data-testid="tracking-headline">
            {order.status === "delivered" ? `Delivered ${order.deliveredOn}` : `Arriving ${order.eta}`}
          </h2>
          <div className="ord-muted">
            {order.carrier ? `${order.carrier} · Tracking ID ${order.trackingId}` : "Delivered by ShopKart Logistics"}
          </div>

          <ol className="ord-timeline" data-testid="timeline">
            {TIMELINE.map((step, i) => (
              <li key={step} className={"ord-step" + (i <= stage ? " is-done" : "") + (i === stage ? " is-current" : "")}
                  data-testid={`step-${step.replace(/\s+/g, "-").toLowerCase()}`}>
                <span className="ord-dot">{i <= stage ? "✓" : ""}</span>
                <span className="ord-step-label">{step}</span>
                {i === stage && <span className="ord-step-now">Current status</span>}
              </li>
            ))}
          </ol>
        </section>

        <section className="ord-grid">
          <div className="ord-panel">
            <h3>Shipping address</h3>
            <p data-testid="ship-address">{account.profile.name}<br />{address.line1}<br />{address.city}, {address.state} {address.zip}</p>
          </div>
          <div className="ord-panel">
            <h3>Payment method</h3>
            <p data-testid="pay-method">{card.brand} ending in {card.last4}</p>
          </div>
          <div className="ord-panel">
            <h3>Order summary</h3>
            <p data-testid="order-total">Order total: <strong>{usd(order.total)}</strong></p>
          </div>
        </section>

        <section className="ord-panel">
          <h3>Items</h3>
          {order.items.map((it) => {
            const p = findProduct(it.productId);
            return (
              <div className="ord-item" key={it.productId + it.variant}>
                <div className="ord-item-img" aria-hidden="true">{p ? p.emoji : "📦"}</div>
                <div>
                  <Link href={`${BASE}/dp/${it.productId}`} className="ord-item-title">{p ? p.title : it.productId}</Link>
                  {it.variant && <div className="ord-muted">{it.variant}</div>}
                  <div className="ord-muted">Qty: {it.qty} · {usd(it.price)} each</div>
                </div>
              </div>
            );
          })}
        </section>

        {/* ---- Returns (use case 1.5) ---- */}
        <section className="ord-panel" id="return">
          <h3>Returns</h3>

          {receipt || existingReturn ? (
            <div className="ord-return-done" data-testid="return-confirmation">
              <div className="ord-placed-tick">✓</div>
              <div>
                <h4>Return started</h4>
                <p>
                  Return authorization <strong data-testid="rma-id">{(receipt || existingReturn).id}</strong> for order {order.id}.
                </p>
                <p data-testid="refund-amount">
                  Refund of <strong>{usd((receipt || existingReturn).refund)}</strong> will be issued to {card.brand} ending in {card.last4} once we receive the item.
                </p>
                <p className="ord-muted" data-testid="return-reason">Reason: {(receipt || existingReturn).reason}</p>
                <p className="ord-muted" data-testid="return-method">
                  Method: {RETURN_METHODS.find((m) => m.id === (receipt || existingReturn).method).label}
                </p>
              </div>
            </div>
          ) : !order.returnable ? (
            <p className="ord-muted" data-testid="return-unavailable">
              {order.status === "delivered"
                ? `The return window for this order closed on ${order.returnWindowEnds || "an earlier date"}.`
                : "You can start a return once this order is delivered."}
            </p>
          ) : !returnOpen ? (
            <>
              <p className="ord-muted">Eligible for return through {order.returnWindowEnds}.</p>
              <button className="ord-btn ord-btn--primary" onClick={() => setReturnOpen(true)} data-testid="start-return">
                Return or replace items
              </button>
            </>
          ) : (
            <form onSubmit={submitReturn} className="ord-return-form">
              <label className="ord-field">
                <span>Why are you returning this?</span>
                <select value={reason} onChange={(e) => setReason(e.target.value)} aria-label="Reason for return" data-testid="return-reason-select">
                  <option value="">Choose a reason</option>
                  {RETURN_REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </label>

              <fieldset className="ord-field">
                <legend>How do you want to send it back?</legend>
                {RETURN_METHODS.map((m) => (
                  <label key={m.id} className="srp-check">
                    <input type="radio" name="method" checked={method === m.id} onChange={() => setMethod(m.id)} aria-label={m.label} />
                    <span>{m.label} <span className="ord-muted">— {m.detail}</span></span>
                  </label>
                ))}
              </fieldset>

              <label className="ord-field">
                <span>Comments (optional)</span>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} aria-label="Comments" />
              </label>

              {error && <div className="ord-error" role="alert" data-testid="return-error">{error}</div>}

              <div className="ord-card-actions">
                <button type="submit" className="ord-btn ord-btn--primary" data-testid="submit-return">Submit return</button>
                <button type="button" className="ord-btn" onClick={() => setReturnOpen(false)}>Cancel</button>
              </div>
            </form>
          )}
        </section>
      </div>
    </>
  );
}

export default function OrderDetailPage({ params }) {
  const { id } = use(params);
  return (
    <Suspense fallback={<div className="srp-loading">Loading order…</div>}>
      <OrderDetail id={id} />
    </Suspense>
  );
}
