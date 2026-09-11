"use client";
import StoreCheckout from "@/app/components/engines/Store";
import { Card, Btn, Badge } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const HISTORY = [
  { number: "WM-104466", placed: "September 3, 2026", total: 19.25, lines: [{ id: "p-milk-1", name: "Organic Whole Milk 1L", price: 3.49, qty: 2, emoji: "🥛" }, { id: "p-banana-1", name: "Bananas (bunch)", price: 1.29, qty: 1, emoji: "🍌" }, { id: "p-bread-1", name: "Sourdough Loaf", price: 4.99, qty: 2, emoji: "🍞" }] },
  { number: "WM-103980", placed: "August 21, 2026", total: 449.0, lines: [{ id: "p-tv-1", name: 'Vista 55" 4K TV', price: 449, qty: 1, emoji: "📺" }] },
];
const CONFIG = {
  nav: ["Departments", "Grocery", "Purchase history"], active: "Purchase history",
  startView: "history",
  seedCart: [],
  shippingOptions: [{ id: "del", label: "Delivery", price: 7.95, eta: "Today, 5–6 PM" }],
  taxRate: 0, orderPrefix: "WM", primaryStyle: { background: "#0071dc", color: "#fff", borderRadius: 999 },
  payment: { methods: ["card"], allow3ds: false },
  views: {
    history: ({ s, set }) => (
      <div style={{ maxWidth: 760 }}>
        <h1 className="ee-page-title">Purchase history</h1>
        <p className="ee-page-sub">Reorder any past purchase in two clicks.</p>
        <div className="ee-stack" data-testid="history-list">
          {HISTORY.map((o, i) => (
            <Card key={o.number} tight data-testid={`history-${i}`}>
              <div className="ee-row ee-row--between">
                <div>
                  <div className="ee-strong">Order {o.number} <Badge tone="ok">Delivered</Badge></div>
                  <div className="ee-small ee-muted">{o.placed} · {o.lines.length} item{o.lines.length === 1 ? "" : "s"} · {money(o.total)}</div>
                  <div className="ee-small">{o.lines.map((l) => `${l.qty}× ${l.name}`).join(", ")}</div>
                </div>
                <Btn onClick={() => set({ ...s, cart: o.lines.map((l) => ({ ...l })), view: "cart", extra: { reordered: o.number } })} data-testid={`reorder-${i}`}>Reorder</Btn>
              </div>
            </Card>
          ))}
        </div>
      </div>
    ),
  },
  extras: {
    cartTop: ({ s }) => s.extra.reordered ? <div className="ee-alert ee-alert--ok" data-testid="reorder-banner">Cart prefilled from order {s.extra.reordered}. Review and check out.</div> : null,
    cartRight: ({ go }) => <button className="ee-link" onClick={() => go("history")}>Purchase history</button>,
  },
};
export default function Flow({ flow }) {
  return <StoreCheckout flow={flow} config={CONFIG} />;
}
