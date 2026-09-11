"use client";
import { useState } from "react";
import StoreCheckout from "@/app/components/engines/Store";
import { Select, Badge, Modal, KV, Btn } from "@/app/components/eval/ui";

const OPTIONS = [{ v: "best", l: "Best match (shopper picks)" }, { v: "specific", l: "Specific replacement: Berry Farms Strawberries 1 lb" }, { v: "refund", l: "Don't replace, refund me" }];
function Detail({ l }) {
  const [open, setOpen] = useState(false);
  const o = OPTIONS.find((x) => x.v === (l.replacement || "best"));
  return (<>
    <button className="ee-link ee-small" onClick={() => setOpen(true)} data-testid={`detail-${l.id}`}>Item details</button>
    <Modal open={open} title={l.name} onClose={() => setOpen(false)}>
      <div className="ee-stack" data-testid="item-detail"><KV k="Quantity" v={l.qty} /><KV k="Price" v={`$${l.price.toFixed(2)}`} /><KV k="If out of stock" v={<span data-testid="detail-replacement">{o.l}</span>} /><Btn size="sm" variant="secondary" onClick={() => setOpen(false)}>Close</Btn></div>
    </Modal>
  </>);
}
const CONFIG = {
  nav: ["Stores", "Orders"], active: "Stores", light: true, title: "Your cart · Green Grocer",
  seedCart: [
    { id: "p-straw", name: "Organic Strawberries 1 lb", price: 5.99, qty: 1, emoji: "🍓", risk: true, replacement: "best" },
    { id: "p-milk-1", name: "Organic Whole Milk 1L", price: 3.49, qty: 1, emoji: "🥛", replacement: "best" },
  ],
  shippingOptions: [{ id: "del", label: "Delivery", price: 3.99, eta: "Today, 4–6 PM" }], taxRate: 0, orderPrefix: "IC",
  primaryStyle: { background: "#0aad0a", color: "#fff", borderRadius: 999 }, payment: { methods: ["card"], allow3ds: false },
  extras: {
    cartLine: (l, { s, set }) => (
      <div className="ee-stack ee-small" style={{ marginTop: 6, gap: 4 }} data-testid={`replace-${l.id}`}>
        {l.risk && <Badge tone="warn">Often out of stock</Badge>}
        <label className="ee-stack" style={{ gap: 4 }}><span className="ee-muted">If out of stock:</span>
          <Select value={l.replacement || "best"} onChange={(e) => set({ ...s, cart: s.cart.map((x) => (x.id === l.id ? { ...x, replacement: e.target.value } : x)) })} aria-label={`Replacement for ${l.name}`} style={{ width: "100%", maxWidth: 320 }}>{OPTIONS.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}</Select>
        </label>
        <Detail l={l} />
      </div>
    ),
  },
};
export default function Flow({ flow }) { return <StoreCheckout flow={flow} config={CONFIG} />; }
