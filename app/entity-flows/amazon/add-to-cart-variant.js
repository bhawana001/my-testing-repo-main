"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { findProduct } from "@/lib/seed/products";
import { money } from "@/lib/seed";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Btn, Card, Badge, Chips, Alert } from "@/app/components/eval/ui";
import { CartLines, OrderSummary, computeTotals } from "@/app/components/engines/Checkout";

const PRODUCT = findProduct("p-tee-1");
const seed = () => ({ view: "pdp", cart: [], lastAdded: null });

function priceFor(size) {
  return PRODUCT.priceBySize?.[size] ?? PRODUCT.price;
}

export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [err, setErr] = useState(null);
  const count = s.cart.reduce((n, l) => n + l.qty, 0);

  function addToCart() {
    if (!size || !color) {
      setErr(`Please select ${!size ? "a size" : "a color"} before adding to cart.`);
      return;
    }
    setErr(null);
    const id = `${PRODUCT.id}:${size}:${color}`;
    set((st) => {
      const existing = st.cart.find((l) => l.id === id);
      const cart = existing ? st.cart.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l)) : [...st.cart, { id, name: PRODUCT.name, price: priceFor(size), qty: 1, variant: { size, color }, emoji: "👕" }];
      return { ...st, cart, lastAdded: { size, color } };
    });
  }

  const totals = computeTotals(s.cart, { shipping: 0, taxRate: 0 });
  return (
    <>
      <Topbar entity={ent} nav={["Today's Deals", "Fashion", "Electronics", "Home"]} active="Fashion"
        right={<button className="ee-btn ee-btn--secondary ee-btn--sm" onClick={() => set({ ...s, view: "cart" })} data-testid="cart-button">🛒 Cart <span data-testid="cart-count">{count}</span></button>} />
      <main className="ee-main">
        {s.view === "pdp" ? (
          <div className="ee-split">
            <div className="ee-row" style={{ alignItems: "flex-start", gap: 24 }}>
              <div className="ee-product__img" style={{ width: 300, fontSize: 96, flex: "none" }} aria-hidden="true">👕</div>
              <div style={{ flex: 1, minWidth: 260 }}>
                <div className="ee-small ee-muted">Brand: {PRODUCT.brand}</div>
                <h1 className="ee-page-title" data-testid="pdp-title">{PRODUCT.name}</h1>
                <div className="ee-small" style={{ color: "var(--ee-warn)" }}>★★★★½ <span className="ee-muted">{PRODUCT.reviews.toLocaleString()} ratings</span></div>
                <div className="ee-price" style={{ fontSize: 26, margin: "10px 0" }} data-testid="pdp-price">{money(priceFor(size || "M"))}</div>
                <p className="ee-small ee-muted" style={{ marginBottom: 14 }}>XL costs {money(PRODUCT.priceBySize.XL)}. All other sizes {money(PRODUCT.price)}. Free returns.</p>
                <div className="ee-stack">
                  <div>
                    <div className="ee-label" style={{ marginBottom: 6 }}>Size: <span data-testid="selected-size">{size || "Select"}</span></div>
                    <Chips options={PRODUCT.variants.size} value={size} onChange={setSize} />
                  </div>
                  <div>
                    <div className="ee-label" style={{ marginBottom: 6 }}>Color: <span data-testid="selected-color">{color || "Select"}</span></div>
                    <Chips options={PRODUCT.variants.color} value={color} onChange={setColor} />
                  </div>
                </div>
              </div>
            </div>
            <Card>
              <div className="ee-price" style={{ fontSize: 22 }}>{money(priceFor(size || "M"))}</div>
              <div className="ee-small" style={{ color: "var(--ee-ok)", margin: "4px 0 12px" }}>In stock · FREE delivery Tuesday</div>
              {err && <Alert tone="err" data-testid="variant-error">{err}</Alert>}
              <Btn block pill onClick={addToCart} data-testid="add-to-cart" style={{ marginTop: 10, background: "#ffd814", color: "#0f1111" }}>Add to Cart</Btn>
              {s.lastAdded && (
                <Alert tone="ok" data-testid="added-banner" style={{ marginTop: 10 }}>
                  Added to cart: Size {s.lastAdded.size}, Color {s.lastAdded.color}. <button className="ee-link" onClick={() => set({ ...s, view: "cart" })}>Go to cart</button>
                </Alert>
              )}
            </Card>
          </div>
        ) : (
          <div className="ee-split">
            <Card title={`Shopping Cart (${count} item${count === 1 ? "" : "s"})`} right={<button className="ee-link" onClick={() => set({ ...s, view: "pdp" })}>Continue shopping</button>}>
              <CartLines lines={s.cart} onQty={(id, qty) => set({ ...s, cart: s.cart.map((l) => (l.id === id ? { ...l, qty } : l)) })} onRemove={(id) => set({ ...s, cart: s.cart.filter((l) => l.id !== id) })} />
            </Card>
            <Card>
              <OrderSummary totals={totals} labels={{ subtotal: `Subtotal (${count} item${count === 1 ? "" : "s"})`, total: "Cart total" }} />
              <Btn block pill style={{ marginTop: 12, background: "#ffd814", color: "#0f1111" }}>Proceed to checkout</Btn>
            </Card>
          </div>
        )}
      </main>
    </>
  );
}
