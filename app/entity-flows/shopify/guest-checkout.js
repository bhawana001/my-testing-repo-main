"use client";
import StoreCheckout from "@/app/components/engines/Store";
import { findProduct } from "@/lib/seed/products";

const P = findProduct("p-print-1");
const CONFIG = {
  nav: ["Catalog", "Prints", "About"], active: "Prints", light: true,
  title: "Checkout", guest: true,
  seedCart: [{ id: P.id, name: P.name, price: P.price, qty: 1, emoji: "🖼️" }],
  shippingOptions: [{ id: "std", label: "Standard shipping", price: 5.0, eta: "3–5 business days" }],
  taxRate: 0.08, orderPrefix: "#1001".replace("#1001", "SF"),
  labels: { thanks: "Thank you, Demo! Your order is confirmed", total: "Total", toPayment: "Continue to payment" },
  payment: { methods: ["card"], allow3ds: false },
};
export default function Flow({ flow }) {
  return <StoreCheckout flow={flow} config={CONFIG} />;
}
