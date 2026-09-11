"use client";
import StoreCheckout from "@/app/components/engines/Store";
import { Card, Field, Input, Btn, Badge } from "@/app/components/eval/ui";
import { findProduct } from "@/lib/seed/products";

const P = findProduct("p-tee-1");
const UPSELL = { id: "p-socks", name: "Everyday Crew Socks (3-pack)", price: 8.0, qty: 1, emoji: "🧦" };
const CONFIG = {
  nav: ["Catalog", "Apparel"], active: "Apparel", light: true,
  title: "Checkout",
  seedCart: [{ id: P.id, name: P.name, price: P.price, qty: 1, emoji: "👕", variant: { size: "M", color: "Black" } }],
  shippingOptions: [{ id: "std", label: "Standard shipping", price: 4.0, eta: "3–5 business days" }],
  taxRate: 0, orderPrefix: "SF", seedExtra: { giftMessage: "", instructions: "" },
  payment: { methods: ["card"], allow3ds: false },
  extras: {
    delivery: ({ s, set }) => (
      <Card title={<span>Custom fields <Badge tone="info">Checkout extension</Badge></span>} data-testid="extension-fields">
        <div className="ee-stack">
          <Field label="Gift message (optional)" htmlFor="ext-gift"><Input id="ext-gift" value={s.extra.giftMessage} onChange={(e) => set({ ...s, extra: { ...s.extra, giftMessage: e.target.value } })} placeholder="Happy birthday!" /></Field>
          <Field label="Delivery instructions" htmlFor="ext-instr"><Input id="ext-instr" value={s.extra.instructions} onChange={(e) => set({ ...s, extra: { ...s.extra, instructions: e.target.value } })} placeholder="Leave at the side door" /></Field>
        </div>
      </Card>
    ),
    paymentTop: ({ s, set }) => {
      const has = s.cart.some((l) => l.id === UPSELL.id);
      return (
        <Card title={<span>Complete the look <Badge tone="info">Upsell block</Badge></span>} data-testid="upsell-block">
          <div className="ee-row">
            <div className="ee-product__img ee-product__img--sm" aria-hidden="true">🧦</div>
            <div style={{ flex: 1 }}><div className="ee-strong">{UPSELL.name}</div><div className="ee-small ee-muted">Add to this order for $8.00</div></div>
            {has ? <Badge tone="ok" data-testid="upsell-added">Added</Badge> : <Btn size="sm" variant="secondary" onClick={() => set({ ...s, cart: [...s.cart, UPSELL] })} data-testid="upsell-add">Add</Btn>}
          </div>
        </Card>
      );
    },
    confirmRows: (order) => [
      ...(order.extra?.giftMessage ? [{ k: "Gift message", v: order.extra.giftMessage, testId: "confirm-gift" }] : []),
      ...(order.extra?.instructions ? [{ k: "Delivery instructions", v: order.extra.instructions, testId: "confirm-instructions" }] : []),
    ],
  },
};
export default function Flow({ flow }) {
  return <StoreCheckout flow={flow} config={CONFIG} />;
}
