"use client";
import StoreCheckout from "@/app/components/engines/Store";
import { Select, Badge } from "@/app/components/eval/ui";
import { findProduct } from "@/lib/seed/products";
import { money } from "@/lib/seed";

const P = findProduct("p-phone-1");
const OLD_PHONES = [{ id: "none", label: "No exchange", value: 0 }, { id: "nova-x1", label: "Nova X1 (64GB) · good condition", value: 4500 }, { id: "nova-x1-128", label: "Nova X1 (128GB) · good condition", value: 6500 }, { id: "other", label: "Other brand · working", value: 2000 }];
const CONFIG = {
  nav: ["Mobiles", "Electronics", "Fashion", "Grocery"], active: "Mobiles", light: true, currency: "INR",
  title: "My Cart",
  seedCart: [{ id: P.id, name: P.name, price: P.price, qty: 1, emoji: "📱", exchange: 0, exchangeId: "none" }],
  shippingOptions: [{ id: "std", label: "Standard delivery", price: 40, eta: "Thu, 17 Sep" }],
  taxRate: 0, orderPrefix: "OD", primaryStyle: { background: "#fb641b", color: "#fff", borderRadius: 4 },
  labels: { subtotal: "Price (1 item)", shipping: "Delivery charges", total: "Total amount", proceed: "Place order" },
  payment: { methods: ["upi", "card", "cod"], allow3ds: false },
  extras: {
    cartLine: (l, { s, set }) => (
      <div className="ee-stack ee-small" style={{ marginTop: 8 }} data-testid="exchange-picker">
        <div className="ee-row"><Badge tone="ok">Exchange offer</Badge> <span className="ee-muted">up to {money(P.exchange.maxValue, "INR")} off</span></div>
        <Select value={l.exchangeId} aria-label="Old phone for exchange" style={{ maxWidth: 360 }} onChange={(e) => {
          const o = OLD_PHONES.find((x) => x.id === e.target.value);
          set({ ...s, cart: s.cart.map((x) => (x.id === l.id ? { ...x, exchangeId: o.id, exchange: o.value } : x)) });
        }}>
          {OLD_PHONES.map((o) => <option key={o.id} value={o.id}>{o.label}{o.value ? ` · ${money(o.value, "INR")} off` : ""}</option>)}
        </Select>
        {l.exchange > 0 && <div data-testid="exchange-value">Exchange value: <b>{money(l.exchange, "INR")}</b> · you pay <b>{money(l.price - l.exchange, "INR")}</b> for this item</div>}
      </div>
    ),
  },
};
export default function Flow({ flow }) {
  return <StoreCheckout flow={flow} config={CONFIG} />;
}
