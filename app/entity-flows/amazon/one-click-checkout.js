"use client";
import StoreCheckout from "@/app/components/engines/Store";
import { findProduct } from "@/lib/seed/products";

const P = findProduct("p-earbuds-1");
const CONFIG = {
  nav: ["Today's Deals", "Electronics", "Fashion", "Home"], active: "Electronics",
  title: "Buy now with 1-Click",
  labels: { cart: "Your item", proceed: "Buy now", oneClick: "Place your order (1-Click)", subtotal: "Item" },
  seedCart: [{ id: P.id, name: P.name, price: P.price, qty: 1, emoji: "🎧", variant: { color: "Black" } }],
  readonlyCart: true, oneClick: true, orderPrefix: "112", eta: "Tuesday, September 15, 2026",
  primaryStyle: { background: "#ffd814", color: "#0f1111" },
  extras: {
    cartTop: () => (
      <div className="ee-card ee-card--flat ee-card--tight ee-small" data-testid="pdp-price-note">
        Product page price: <b data-testid="pdp-price">$129.00</b> · Free delivery with saved address and payment on file.
      </div>
    ),
  },
};
export default function Flow({ flow }) {
  return <StoreCheckout flow={flow} config={CONFIG} />;
}
