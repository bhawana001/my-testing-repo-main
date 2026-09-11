"use client";
import StoreCheckout from "@/app/components/engines/Store";
import { Card, Btn } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";
import { computeTotals } from "@/lib/engines/checkout-math";

const TIPS = [0, 2, 5, 10];
function TipEditor({ s, set }) {
  const o = s.order;
  const change = (tip) => set({ ...s, order: { ...o, tip, total: computeTotals(o.lines, { shipping: 3.99, fees: [{ label: "Service fee", amount: 1.5 }], tip }).total } });
  return (
    <Card title="Shopper tip" data-testid="tip-editor" style={{ marginTop: 14 }}>
      <div className="ee-small ee-muted" style={{ marginBottom: 8 }}>You can change your tip up to 24 hours after delivery. 100% goes to your shopper.</div>
      <div className="ee-row">
        {TIPS.map((t) => <button key={t} type="button" className="ee-chip" data-active={o.tip === t ? "true" : "false"} aria-pressed={o.tip === t} onClick={() => change(t)} data-testid={`tip-${t}`}>{t === 0 ? "No tip" : money(t)}</button>)}
      </div>
      <div className="ee-kv ee-kv--total" style={{ marginTop: 10 }}><span className="ee-kv__k">Updated order total</span><span className="ee-kv__v" data-testid="updated-total">{money(o.total)}</span></div>
      <div className="ee-small ee-muted" data-testid="tip-line">Tip included: {money(o.tip)}</div>
    </Card>
  );
}
const CONFIG = {
  nav: ["Stores", "Orders"], active: "Orders", light: true,
  title: "Checkout",
  seedCart: [{ id: "p-milk-1", name: "Organic Whole Milk 1L", price: 3.49, qty: 2, emoji: "🥛" }, { id: "p-bread-1", name: "Sourdough Loaf", price: 4.99, qty: 1, emoji: "🍞" }],
  shippingOptions: [{ id: "del", label: "Delivery", price: 3.99, eta: "Today, 4:00–6:00 PM" }],
  fees: () => [{ label: "Service fee", amount: 1.5 }],
  tips: { options: TIPS, default: 2 },
  taxRate: 0, orderPrefix: "IC", primaryStyle: { background: "#0aad0a", color: "#fff", borderRadius: 999 },
  payment: { methods: ["card"], allow3ds: false },
  labels: { shipping: "Delivery fee", fees: "Fees", thanks: "Order placed. Your shopper is on the way" },
  extras: { confirmChildren: (ctx) => <TipEditor {...ctx} /> },
};
export default function Flow({ flow }) {
  return <StoreCheckout flow={flow} config={CONFIG} />;
}
