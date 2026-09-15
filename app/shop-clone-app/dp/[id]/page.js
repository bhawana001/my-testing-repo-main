"use client";
// Product page (use cases 1.2 add-to-cart with variant, and 1.3 one-click buy).
//
// Variants are real: each option carries a price delta and its own stock, so
// picking "Arctic White" changes the price and picking a sold-out combination
// disables buying. Buy Now is a genuine one-click path -- it charges the default
// saved card to the default address with no form to fill, the way 1-Click works.
import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../../Header";
import { findProduct, variantPrice, defaultSelection } from "../../data";
import { BASE, usd } from "../../lib";
import { addLine } from "../../cart";
import { useAccount, placeOrder } from "../../store";

function Stars({ n }) {
  return <span className="pdp-stars">{"★".repeat(Math.floor(n))}{"☆".repeat(5 - Math.floor(n))}</span>;
}

export default function ProductPage({ params }) {
  const { id } = use(params);
  const product = findProduct(id);
  const router = useRouter();
  const [account, update] = useAccount();
  const [selection, setSelection] = useState(() => (product ? defaultSelection(product) : {}));
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(null);
  const [placing, setPlacing] = useState(false);

  if (!product) {
    return (
      <>
        <Header />
        <div className="pdp-missing">
          <h1>We couldn&rsquo;t find that product</h1>
          <Link href={BASE} className="srp-link">Back to ShopKart home</Link>
        </div>
      </>
    );
  }

  const { price, stock, label } = variantPrice(product, selection);
  const inStock = stock > 0;
  const address = account.addresses.find((a) => a.id === (account.addresses.find((x) => x.default) || {}).id) || account.addresses[0];
  const card = account.cards.find((c) => c.default) || account.cards[0];

  function choose(axisName, optionLabel) {
    setSelection((s) => ({ ...s, [axisName]: optionLabel }));
    setAdded(null);
  }

  function handleAdd() {
    addLine({ id: product.id, title: product.title, emoji: product.emoji, price, qty, variant: label });
    setAdded({ qty, label, price });
  }

  // One-click: no card entry, no address entry, straight to a real order.
  function buyNow() {
    setPlacing(true);
    const order = placeOrder(update, {
      items: [{ productId: product.id, variant: label, qty, price }],
      total: Number((price * qty * 1.08).toFixed(2)),
      addressId: address.id,
      cardId: card.id,
    });
    router.push(`${BASE}/orders/${order.id}?placed=1`);
  }

  return (
    <>
      <Header onOpenCart={() => router.push(`${BASE}?cart=1`)} />
      <nav className="pdp-crumbs">
        <Link href={BASE}>ShopKart</Link> <span>›</span>
        <Link href={`${BASE}/s?k=${encodeURIComponent(product.category)}`}>{product.category}</Link> <span>›</span>
        <span>{product.title}</span>
      </nav>

      <div className="pdp">
        <div className="pdp-gallery" aria-hidden="true">{product.emoji}</div>

        <div className="pdp-info">
          <h1 className="pdp-title" data-testid="pdp-title">{product.title}</h1>
          <div className="pdp-brand">Brand: <strong data-testid="pdp-brand">{product.brand}</strong></div>
          <div className="pdp-rating">
            <Stars n={product.rating} /> <span className="pdp-muted">{product.ratingCount.toLocaleString()} ratings</span>
          </div>
          <div className="pdp-divider" />
          <div className="pdp-price" data-testid="pdp-price">{usd(price)}</div>
          {label && <div className="pdp-muted" data-testid="pdp-variant">Selected: {label}</div>}

          {product.variants && product.variants.axes.map((axis) => (
            <div className="pdp-axis" key={axis.name}>
              <div className="pdp-axis-name">{axis.name}: <strong>{selection[axis.name]}</strong></div>
              <div className="pdp-swatches" role="group" aria-label={axis.name}>
                {axis.options.map((o) => {
                  const soldOut = o.stock === 0;
                  const active = selection[axis.name] === o.label;
                  return (
                    <button
                      key={o.label}
                      className={"pdp-swatch" + (active ? " is-active" : "") + (soldOut ? " is-soldout" : "")}
                      onClick={() => choose(axis.name, o.label)}
                      aria-pressed={active}
                      data-testid={`variant-${o.label.replace(/\s+/g, "-").toLowerCase()}`}
                    >
                      <span>{o.label}</span>
                      {o.delta !== 0 && <span className="pdp-delta">{o.delta > 0 ? "+" : "−"}{usd(Math.abs(o.delta))}</span>}
                      {soldOut && <span className="pdp-delta">Sold out</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="pdp-divider" />
          <ul className="pdp-about">
            {(product.about || []).map((a) => <li key={a}>{a}</li>)}
          </ul>
        </div>

        <aside className="pdp-buybox" data-testid="buybox">
          <div className="pdp-price">{usd(price)}</div>
          <div className="pdp-ship">FREE delivery <strong>Thursday, September 18</strong></div>
          <div className={inStock ? "pdp-stock" : "pdp-stock is-out"} data-testid="pdp-stock">
            {inStock ? (stock <= 5 ? `Only ${stock} left in stock — order soon.` : "In Stock") : "Currently unavailable"}
          </div>

          <label className="pdp-qty">
            Qty:
            <select value={qty} onChange={(e) => setQty(Number(e.target.value))} aria-label="Quantity" disabled={!inStock}>
              {Array.from({ length: Math.min(5, Math.max(stock, 1)) }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>

          <button className="pdp-btn pdp-btn--cart" onClick={handleAdd} disabled={!inStock} data-testid="add-to-cart">
            Add to Cart
          </button>
          <button className="pdp-btn pdp-btn--buy" onClick={buyNow} disabled={!inStock || placing} data-testid="buy-now">
            {placing ? "Placing your order…" : "Buy Now"}
          </button>

          <div className="pdp-oneclick">
            <div className="pdp-muted">Buy Now uses 1-Click settings:</div>
            <div data-testid="oneclick-address">📍 {address.label} — {address.line1}, {address.city}</div>
            <div data-testid="oneclick-card">💳 {card.brand} ending in {card.last4}</div>
          </div>

          {added && (
            <div className="pdp-added" role="status" data-testid="added-confirmation">
              ✓ Added to Cart: {added.qty} × {product.title}
              {added.label ? ` (${added.label})` : ""} at {usd(added.price)}
              <Link href={`${BASE}/checkout`} className="pdp-added-link">Go to checkout</Link>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
