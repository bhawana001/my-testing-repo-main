"use client";
// Multi-shop cart (5.3): lines group by shop and each shop charges its own
// shipping, so the summary shows one shipping line per shop rather than a
// single blended number.
import { useState } from "react";
import Link from "next/link";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Empty, Banner } from "../../clones/kit/ui";
import { BRAND, BASE, useStore, money, cartTotals } from "../shared";

export default function CartPage() {
  const [s, update] = useStore();
  const [placed, setPlaced] = useState(null);
  const t = cartTotals(s.cart);

  function checkout() {
    const id = "ET-" + (s.counter + 1);
    const order = {
      id, placedAt: "2026-09-15", status: "processing",
      items: s.cart.map((l) => ({ ...l })), total: t.total,
      shippingBreakdown: t.groups.map((g) => ({ shop: g.shop.name, shipping: g.shipping })),
    };
    update((st) => { st.orders.unshift(order); st.counter += 1; st.cart = []; return st; });
    setPlaced(order);
  }

  if (placed) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Keep shopping" }, { href: `${BASE}/orders`, label: "Orders" }]} />
        <Page>
          <Banner tone="ok" title="Order placed" testId="order-confirmation">
            Order <strong data-testid="order-id">{placed.id}</strong> confirmed.
          </Banner>
          <Card title="Items">
            {placed.items.map((l, i) => (
              <div key={i} data-testid={`confirm-item-${i}`}>
                <Row label={`${l.title} × ${l.qty}`} value={money(l.price * l.qty)} />
                {l.personalization && (
                  <div className="ck-muted" data-testid={`confirm-personalization-${i}`}>
                    Personalization: “{l.personalization}”
                  </div>
                )}
              </div>
            ))}
            <Row label="Total paid" value={money(placed.total)} strong testId="confirm-total" />
          </Card>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Keep shopping" }, { href: `${BASE}/orders`, label: "Orders" }]} />
      <Page title="Your cart">
        {s.cart.length === 0 ? (
          <Empty>Your cart is empty. <Link href={BASE}>Find something handmade</Link>.</Empty>
        ) : (
          <div className="ck-split">
            <div data-testid="shop-groups">
              {t.groups.map((g) => (
                <Card key={g.shop.id} title={`${g.shop.name} · ${g.shop.location}`} testId={`group-${g.shop.id}`}>
                  {g.lines.map((l, i) => {
                    const idx = s.cart.indexOf(l);
                    return (
                      <div key={i} style={{ borderBottom: "1px solid #f0e8de", paddingBottom: 8, marginBottom: 8 }}>
                        <div className="ck-row">
                          <span><span aria-hidden="true">{l.emoji}</span> <strong>{l.title}</strong></span>
                          <span>{money(l.price * l.qty)}</span>
                        </div>
                        {l.personalization && (
                          <Badge tone="info" testId={`personalization-${l.id}`}>
                            Personalization: “{l.personalization}”
                          </Badge>
                        )}
                        <div>
                          <Btn variant="ghost" size="sm" data-testid={`remove-${l.id}`}
                               onClick={() => update((st) => { st.cart.splice(idx, 1); return st; })}>Remove</Btn>
                        </div>
                      </div>
                    );
                  })}
                  <Row label="Items subtotal" value={money(g.items)} testId={`items-${g.shop.id}`} />
                  <Row label={`Shipping from ${g.shop.name}`} value={money(g.shipping)} testId={`shipping-${g.shop.id}`} />
                  <Row label="Shop total" value={money(g.total)} strong testId={`total-${g.shop.id}`} />
                </Card>
              ))}
            </div>

            <Card title="Order total">
              <div className="ck-muted" data-testid="shop-count">
                {t.groups.length} shop{t.groups.length === 1 ? "" : "s"} in this order
              </div>
              <Row label="Items" value={money(t.items)} testId="grand-items" />
              {t.groups.map((g) => (
                <Row key={g.shop.id} label={`Shipping — ${g.shop.name}`} value={money(g.shipping)} testId={`ship-line-${g.shop.id}`} />
              ))}
              <Row label="Total shipping" value={money(t.shipping)} testId="grand-shipping" />
              <Row label="Total" value={money(t.total)} strong testId="grand-total" />
              <Btn block onClick={checkout} data-testid="checkout">Proceed to checkout</Btn>
            </Card>
          </div>
        )}
      </Page>
    </Shell>
  );
}
