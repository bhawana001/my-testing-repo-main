"use client";
import StoreCheckout from "@/app/components/engines/Store";
import { findProduct } from "@/lib/seed/products";

const P = findProduct("p-shoe-1");
const CONFIG = {
  nav: ["Mobiles", "Electronics", "Fashion", "Grocery"], active: "Fashion", light: true, currency: "INR",
  title: "Checkout",
  seedCart: [{ id: P.id, name: P.name, price: 2499, qty: 1, emoji: "👟", variant: { size: "9", color: "Black" } }],
  shippingOptions: [{ id: "std", label: "Standard delivery", price: 0, eta: "Thu, 17 Sep" }],
  fees: (s) => [], taxRate: 0, orderPrefix: "OD", primaryStyle: { background: "#fb641b", color: "#fff", borderRadius: 4 },
  labels: { shipping: "Delivery charges", total: "Total amount", pay: undefined },
  payment: { methods: ["upi", "card", "cod"], defaultMethod: "upi", allow3ds: false },
};
export default function Flow({ flow }) {
  return <StoreCheckout flow={flow} config={CONFIG} />;
}
