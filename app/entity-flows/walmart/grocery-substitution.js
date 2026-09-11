"use client";
import StoreCheckout from "@/app/components/engines/Store";
import { Toggle, Badge } from "@/app/components/eval/ui";
import { findProduct } from "@/lib/seed/products";

const items = ["p-milk-1", "p-banana-1", "p-bread-1"].map((id) => { const p = findProduct(id); return { id, name: p.name, price: p.price, qty: 1, emoji: id.includes("milk") ? "🥛" : id.includes("banana") ? "🍌" : "🍞", substitutions: false }; });
const CONFIG = {
  nav: ["Departments", "Grocery", "Pickup & delivery"], active: "Grocery",
  title: "Grocery checkout",
  seedCart: items,
  shippingOptions: [{ id: "del", label: "Delivery", price: 7.95, eta: "Today, 5–6 PM" }],
  taxRate: 0, orderPrefix: "WM", primaryStyle: { background: "#0071dc", color: "#fff", borderRadius: 999 },
  payment: { methods: ["card"], allow3ds: false },
  extras: {
    cartLine: (l, { s, set }) => (
      <div className="ee-row ee-small" style={{ marginTop: 6 }} data-testid={`subs-${l.id}`}>
        <Toggle checked={!!l.substitutions} label={`Allow substitutions for ${l.name}`} onChange={(v) => set({ ...s, cart: s.cart.map((x) => (x.id === l.id ? { ...x, substitutions: v } : x)) })} />
        <span>{l.substitutions ? <Badge tone="ok" data-testid={`subs-${l.id}-on`}>Substitutions allowed</Badge> : <span className="ee-muted">No substitutions</span>}</span>
      </div>
    ),
    confirmLine: (l) => <div className="ee-small" data-testid={`confirm-subs-${l.id}`}>{l.substitutions ? "✅ Substitutions allowed" : "— No substitutions"}</div>,
  },
};
export default function Flow({ flow }) {
  return <StoreCheckout flow={flow} config={CONFIG} />;
}
