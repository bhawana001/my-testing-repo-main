"use client";
import StoreCheckout from "@/app/components/engines/Store";
import { findProduct } from "@/lib/seed/products";

const M = findProduct("p-mug-1"), PR = findProduct("p-print-1");
const CONFIG = {
  nav: ["Home & Living", "Art", "Gifts"], active: "Art", light: true,
  title: "Your cart", showSeller: true,
  seedCart: [
    { id: M.id, name: M.name, price: M.price, qty: 1, emoji: "☕", seller: "ClayWorks Studio", personalization: "Maya" },
    { id: PR.id, name: PR.name, price: PR.price, qty: 1, emoji: "🖼️", seller: "Fernhouse Prints" },
  ],
  shippingBySeller: { "ClayWorks Studio": 4.5, "Fernhouse Prints": 6.25 },
  taxRate: 0, orderPrefix: "ET", primaryStyle: { background: "#222", color: "#fff" },
  payment: { methods: ["card"], allow3ds: false },
};
export default function Flow({ flow }) {
  return <StoreCheckout flow={flow} config={CONFIG} />;
}
