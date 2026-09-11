"use client";
import { useState } from "react";
import StoreCheckout from "@/app/components/engines/Store";
import { Btn, Modal, Badge, RadioCard } from "@/app/components/eval/ui";
import { findProduct } from "@/lib/seed/products";

function UpsellBanner({ s, set }) {
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState("monthly");
  return (
    <div className="ee-card ee-card--tight" style={{ background: "#ffc220", color: "#041e42", borderColor: "transparent" }} data-testid="wplus-banner">
      <div className="ee-row ee-row--between">
        <div>
          <div className="ee-strong">Walmartly+ members get free delivery on this order</div>
          <div className="ee-small">Save $7.95 today. Try it free for 30 days.</div>
        </div>
        <Btn size="sm" variant="dark" onClick={() => setOpen(true)} data-testid="wplus-open">Try Walmartly+ free</Btn>
      </div>
      <Modal open={open} title="Choose your Walmartly+ plan" onClose={() => setOpen(false)}>
        <div className="ee-stack" data-testid="wplus-modal">
          <RadioCard name="plan" value="monthly" checked={plan === "monthly"} onChange={setPlan} title="Monthly" desc="Billed monthly after your free trial" right="$12.95/mo" />
          <RadioCard name="plan" value="annual" checked={plan === "annual"} onChange={setPlan} title="Annual" desc="Save $57 vs monthly" right="$98/yr" />
          <div className="ee-small ee-muted">Free delivery, fuel discounts, video streaming included. Cancel anytime.</div>
          <div className="ee-row ee-row--end">
            <Btn variant="secondary" onClick={() => setOpen(false)} data-testid="wplus-close">No thanks</Btn>
            <Btn onClick={() => { set({ ...s, extra: { ...s.extra, member: plan } }); setOpen(false); }} data-testid="wplus-start">Start free trial</Btn>
          </div>
        </div>
      </Modal>
      {s.extra.member && <div style={{ marginTop: 8 }}><Badge tone="ok" data-testid="wplus-active">Walmartly+ trial active · {s.extra.member} plan</Badge></div>}
    </div>
  );
}
const P = findProduct("p-milk-1");
const CONFIG = {
  nav: ["Departments", "Grocery", "Walmartly+"], active: "Grocery",
  title: "Checkout",
  seedCart: [{ id: P.id, name: P.name, price: P.price, qty: 2, emoji: "🥛" }, { id: "p-bread-1", name: "Sourdough Loaf", price: 4.99, qty: 1, emoji: "🍞" }],
  shippingOptions: [{ id: "del", label: "Delivery", price: 7.95, eta: "Today, 5–6 PM" }],
  taxRate: 0, orderPrefix: "WM", primaryStyle: { background: "#0071dc", color: "#fff", borderRadius: 999 },
  payment: { methods: ["card"], allow3ds: false },
  fees: () => [],
  extras: {
    cartTop: (ctx) => <UpsellBanner {...ctx} />,
    paymentTop: (ctx) => <UpsellBanner {...ctx} />,
  },
};
export default function Flow({ flow }) {
  return <StoreCheckout flow={flow} config={CONFIG} />;
}
