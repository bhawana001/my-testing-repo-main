"use client";
import StoreCheckout from "@/app/components/engines/Store";
import { findProduct } from "@/lib/seed/products";

const P = findProduct("p-mug-1");
const CONFIG = {
  nav: ["Catalog", "Home", "Sale"], active: "Sale", light: true,
  title: "Checkout", coupons: true,
  seedCart: [{ id: P.id, name: P.name, price: P.price, qty: 2, emoji: "☕" }, { id: "p-print-1", name: "Botanical Art Print A3", price: 35, qty: 1, emoji: "🖼️" }],
  shippingOptions: [{ id: "std", label: "Standard shipping", price: 6.0, eta: "3–5 business days" }],
  taxRate: 0, orderPrefix: "SF",
  labels: { discount: "Discount", total: "Total" },
  payment: { methods: ["card"], allow3ds: false },
  extras: {
    cartAside: () => (
      <div className="ee-card ee-card--flat ee-card--tight ee-small" data-testid="promo-hint">
        Codes: <b>SAVE10</b> (10% off), <b>SAVE20</b> (20% off), <b>FLAT15</b> ($15 off), <b>FREESHIP</b>.
      </div>
    ),
  },
};
export default function Flow({ flow }) {
  return <StoreCheckout flow={flow} config={CONFIG} />;
}
