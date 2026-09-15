"use client";
import { Shell, TopBar, Page, Card, Btn, Row, Badge } from "../clones/kit/ui";
import { BRAND, BASE, CART, cartTotal, useStore, money } from "./shared";

export default function Merchant() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[
        { href: `${BASE}/checkout`, label: "Checkout", testId: "nav-checkout" },
        { href: `${BASE}/app`, label: "Klarnah app", testId: "nav-app" },
      ]} />
      <Page title={CART.merchant} sub="Merchant demo store">
        <Card title="Your basket" testId="basket">
          {CART.items.map((i) => <Row key={i.id} label={`${i.name} × ${i.qty}`} value={money(i.price * i.qty)} />)}
          <Row label="Order total" value={money(cartTotal())} strong testId="basket-total" />
          <Btn as="link" href={`${BASE}/checkout`} block data-testid="go-checkout">Checkout</Btn>
        </Card>
        {s.order && <Badge tone="ok" testId="has-order">Order {s.order.id} placed</Badge>}
      </Page>
    </Shell>
  );
}
