"use client";
import StoreCheckout from "@/app/components/engines/Store";

const CONFIG = {
  nav: ["Stores", "Orders"], active: "Stores", light: true,
  title: "Checkout",
  seedCart: [
    { id: "p-milk-1", name: "Organic Whole Milk 1L", price: 3.49, qty: 2, emoji: "🥛" },
    { id: "p-bread-1", name: "Sourdough Loaf", price: 4.99, qty: 1, emoji: "🍞" },
    { id: "p-banana-1", name: "Bananas (bunch)", price: 1.29, qty: 1, emoji: "🍌" },
  ],
  shippingOptions: [{ id: "del", label: "Delivery", price: 3.99, eta: "Chosen window" }],
  slots: [
    { id: "priority", label: "Priority", window: "Today, within 60 minutes (2:00–3:00 PM)", fee: 2.99 },
    { id: "standard", label: "Standard", window: "Today, 4:00–6:00 PM", fee: 0 },
    { id: "tomorrow", label: "Tomorrow morning", window: "Tomorrow, 8:00–10:00 AM", fee: 0 },
  ],
  fees: () => [{ label: "Service fee", amount: 1.5 }],
  taxRate: 0, orderPrefix: "IC", primaryStyle: { background: "#0aad0a", color: "#fff", borderRadius: 999 },
  payment: { methods: ["card"], allow3ds: false },
  labels: { shipping: "Delivery fee", fees: "Fees", slots: "Choose a delivery window" },
};
export default function Flow({ flow }) {
  return <StoreCheckout flow={flow} config={CONFIG} />;
}
