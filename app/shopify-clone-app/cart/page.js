"use client";
import Link from "next/link";
import { Shell, TopBar, Page, Card, Btn, Row, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, THEMES, useStore, money, totals } from "../shared";

export default function CartPage() {
  const [s, update] = useStore();
  const theme = THEMES.find((t) => t.id === s.activeTheme) || THEMES[0];
  const brand = { ...BRAND, accent: theme.accent };
  const t = totals(s.cart, null);

  const setQty = (i, qty) => update((st) => { st.cart[i].qty = Math.max(1, qty); return st; });
  const remove = (i) => update((st) => { st.cart.splice(i, 1); return st; });

  return (
    <Shell brand={brand}>
      <TopBar brand={brand} nav={[{ href: BASE, label: "Continue shopping", testId: "nav-shop" }]} />
      <Page title="Your cart">
        {s.cart.length === 0 ? (
          <Empty>
            Your cart is empty. <Link href={BASE}>Browse the store</Link>.
          </Empty>
        ) : (
          <div className="ck-split">
            <Card testId="cart-lines">
              {s.cart.map((l, i) => (
                <div key={l.id + l.variant} className="ck-row" data-testid={`line-${i}`}>
                  <span>
                    <span aria-hidden="true">{l.emoji}</span> <strong>{l.title}</strong>
                    {l.variant && <span className="ck-muted"> — {l.variant}</span>}
                    <br />
                    <input
                      type="number" min="1" className="ck-input" style={{ width: 74, marginTop: 6 }}
                      value={l.qty} aria-label={`Quantity for ${l.title}`}
                      onChange={(e) => setQty(i, Number(e.target.value))}
                      data-testid={`qty-${i}`}
                    />
                    <Btn variant="ghost" size="sm" onClick={() => remove(i)} data-testid={`remove-${i}`}>Remove</Btn>
                  </span>
                  <span data-testid={`line-total-${i}`}>{money(l.price * l.qty)}</span>
                </div>
              ))}
            </Card>
            <Card title="Summary">
              <Row label="Subtotal" value={money(t.subtotal)} testId="cart-subtotal" />
              <Row label="Shipping" value={money(t.shipping)} />
              <Row label="Estimated tax" value={money(t.tax)} />
              <Row label="Total" value={money(t.total)} strong testId="cart-total" />
              <Btn as="link" href={`${BASE}/checkout`} block data-testid="checkout">Checkout</Btn>
              <p className="ck-muted" style={{ marginTop: 8 }}>Discounts are applied at checkout.</p>
            </Card>
          </div>
        )}
      </Page>
    </Shell>
  );
}
