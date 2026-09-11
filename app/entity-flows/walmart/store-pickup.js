"use client";
import StoreCheckout from "@/app/components/engines/Store";
import { findProduct } from "@/lib/seed/products";

const P = findProduct("p-tv-1");
const CONFIG = {
  nav: ["Departments", "Grocery", "Electronics", "Pickup & delivery"], active: "Electronics",
  title: "Checkout",
  seedCart: [{ id: P.id, name: P.name, price: P.price, qty: 1, emoji: "📺" }],
  shippingOptions: [{ id: "std", label: "Shipping", price: 9.99, eta: "Fri, Sep 18" }],
  pickup: {
    stores: [
      { id: "st-1", name: "Walmartly Supercenter, Market St", distance: "1.2 mi" },
      { id: "st-2", name: "Walmartly Neighborhood Market, Oak Ave", distance: "3.5 mi" },
    ],
    slots: ["Today 4:00–5:00 PM", "Today 6:00–7:00 PM", "Tomorrow 9:00–10:00 AM"],
  },
  taxRate: 0.0875, orderPrefix: "WM", primaryStyle: { background: "#0071dc", color: "#fff", borderRadius: 999 },
  payment: { methods: ["card"], allow3ds: false },
  labels: { toPayment: "Continue to payment" },
};
export default function Flow({ flow }) {
  return <StoreCheckout flow={flow} config={CONFIG} />;
}
