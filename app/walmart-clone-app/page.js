"use client";
// Wallmark storefront and cart. Grocery items expose a substitution preference
// (4.2) right in the cart line, where a shopper would actually set it.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Badge, Row, Select, Field, Empty, useToast } from "../clones/kit/ui";
import { BRAND, BASE, PRODUCTS, SUBSTITUTION_CHOICES, useStore, money, totals, findProduct } from "./shared";

export default function Storefront() {
  const [s, update] = useStore();
  const [toast, showToast] = useToast();
  const count = s.cart.reduce((n, l) => n + l.qty, 0);
  const t = totals(s.cart, s.slotId, s.isMember);

  function add(p) {
    update((st) => {
      const line = st.cart.find((l) => l.id === p.id);
      if (line) line.qty += 1;
      else st.cart.push({ id: p.id, title: p.title, price: p.price, qty: 1, emoji: p.emoji });
      return st;
    });
    showToast(`${p.title} added to cart`);
  }
  const setQty = (id, qty) => update((st) => {
    const l = st.cart.find((x) => x.id === id);
    if (l) l.qty = Math.max(1, qty);
    return st;
  });
  const remove = (id) => update((st) => { st.cart = st.cart.filter((l) => l.id !== id); return st; });
  const setSub = (id, choice) => update((st) => { st.substitutions[id] = choice; return st; });

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[
        { href: `${BASE}/orders`, label: "Reorder", testId: "nav-orders" },
        { href: `${BASE}/checkout`, label: `Cart (${count})`, testId: "nav-cart" },
      ]} />
      <Page title="Shop groceries & more" sub="Free pickup at your store" wide>
        <div className="ck-split">
          <div>
            <div className="ck-grid ck-grid--3" data-testid="catalog">
              {PRODUCTS.map((p) => (
                <Card key={p.id} testId={`product-${p.id}`}>
                  <div className="ck-thumb" aria-hidden="true">{p.emoji}</div>
                  <div className="ck-strong">{p.title}</div>
                  <div className="ck-muted">{p.aisle}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, margin: "6px 0" }} data-testid={`price-${p.id}`}>{money(p.price)}</div>
                  <Btn block size="sm" onClick={() => add(p)} data-testid={`add-${p.id}`}>Add to cart</Btn>
                </Card>
              ))}
            </div>
          </div>

          <Card title={`Cart (${count})`} testId="cart">
            {s.cart.length === 0 ? <Empty>Your cart is empty.</Empty> : (
              <>
                {s.cart.map((l) => {
                  const p = findProduct(l.id);
                  return (
                    <div key={l.id} style={{ borderBottom: "1px solid #eef1f4", paddingBottom: 10, marginBottom: 10 }}
                         data-testid={`cart-item-${l.id}`}>
                      <div className="ck-row">
                        <span><span aria-hidden="true">{l.emoji}</span> {l.title}</span>
                        <span data-testid={`cart-total-${l.id}`}>{money(l.price * l.qty)}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input type="number" min="1" className="ck-input" style={{ width: 70 }} value={l.qty}
                               aria-label={`Quantity for ${l.title}`} data-testid={`qty-${l.id}`}
                               onChange={(e) => setQty(l.id, Number(e.target.value))} />
                        <Btn variant="ghost" size="sm" onClick={() => remove(l.id)} data-testid={`remove-${l.id}`}>Remove</Btn>
                      </div>
                      {p?.substitutable && (
                        <Field label="If this item is out of stock">
                          <Select value={s.substitutions[l.id] || "best"} aria-label={`Substitution preference for ${l.title}`}
                                  data-testid={`sub-${l.id}`} onChange={(e) => setSub(l.id, e.target.value)}>
                            {SUBSTITUTION_CHOICES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                          </Select>
                        </Field>
                      )}
                      {s.substitutions[l.id] && (
                        <Badge tone="info" testId={`sub-saved-${l.id}`}>
                          Preference saved: {SUBSTITUTION_CHOICES.find((c) => c.id === s.substitutions[l.id]).label}
                        </Badge>
                      )}
                    </div>
                  );
                })}
                <Row label="Subtotal" value={money(t.subtotal)} testId="cart-subtotal" />
                <Btn as="link" href={`${BASE}/checkout`} block data-testid="go-checkout">Continue to checkout</Btn>
              </>
            )}
          </Card>
        </div>
      </Page>
      {toast}
    </Shell>
  );
}
