"use client";
import StoreCheckout from "@/app/components/engines/Store";
import { findProduct } from "@/lib/seed/products";

const P = findProduct("p-shoe-2");
const CONFIG = {
  nav: ["New", "Men", "Women", "Kids", "Sale"], active: "Men", light: true,
  title: "Checkout",
  seedCart: [{ id: P.id + ":10", name: P.name, price: P.price, qty: 1, emoji: "👟", variant: { size: "US 10", color: "Blue" } }],
  shippingOptions: [{ id: "std", label: "Standard", price: 0, eta: "Arrives Thu, Sep 17" }, { id: "exp", label: "Express", price: 15, eta: "Arrives Tue, Sep 15" }],
  taxRate: 0.0725, orderPrefix: "C", primaryStyle: { background: "#111", color: "#fff", borderRadius: 999 },
  payment: { methods: ["card"], savedCards: [{ id: "c1", brand: "Visa", last4: "4242", exp: "12/29", isDefault: true }, { id: "c2", brand: "Mastercard", last4: "4444", exp: "08/28" }], allow3ds: false },
  labels: { thanks: "Thanks for your order" },
};
export default function Flow({ flow }) {
  return <StoreCheckout flow={flow} config={CONFIG} />;
}
