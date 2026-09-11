"use client";
import StoreCheckout from "@/app/components/engines/Store";
import { Card, Btn, Badge } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const LISTING = { id: "lst-88213", name: "Vintage Film Camera · 35mm · Fully working", price: 185.0, emoji: "📷", seller: "retro_optics", condition: "Used · Excellent", ends: "4d 6h" };
const CONFIG = {
  nav: ["Electronics", "Collectibles", "Cameras"], active: "Cameras", light: true,
  startView: "listing", seedCart: [], showSeller: true,
  shippingOptions: [{ id: "std", label: "Economy shipping", price: 12.0, eta: "Sep 19–23" }],
  taxRate: 0, orderPrefix: "EB", primaryStyle: { background: "#3665f3", color: "#fff", borderRadius: 999 },
  payment: { methods: ["card"], savedCards: [{ id: "c1", brand: "Visa", last4: "4242", exp: "12/29", isDefault: true }], allow3ds: false },
  steps: ["cart", "payment", "done"],
  labels: { cart: "Review order", proceed: "Confirm and pay", thanks: "Thanks, your order is confirmed" },
  views: {
    listing: ({ s, set }) => (
      <div className="ee-split">
        <div className="ee-row" style={{ alignItems: "flex-start", gap: 24 }}>
          <div className="ee-product__img" style={{ width: 300, fontSize: 96, flex: "none" }} aria-hidden="true">📷</div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <h1 className="ee-page-title" data-testid="listing-title">{LISTING.name}</h1>
            <div className="ee-small ee-muted">Condition: {LISTING.condition} · Seller {LISTING.seller} (99.4% positive)</div>
          </div>
        </div>
        <Card data-testid="listing-buybox">
          <div className="ee-small ee-muted">Buy It Now price</div>
          <div className="ee-price" style={{ fontSize: 26 }} data-testid="listing-price">{money(LISTING.price)}</div>
          <div className="ee-small ee-muted" style={{ marginBottom: 12 }}>+ {money(12)} economy shipping · ends in {LISTING.ends}</div>
          <Btn block pill style={{ background: "#3665f3", color: "#fff" }} onClick={() => set({ ...s, cart: [{ id: LISTING.id, name: LISTING.name, price: LISTING.price, qty: 1, emoji: LISTING.emoji, seller: LISTING.seller }], view: "cart" })} data-testid="buy-it-now">Buy It Now</Btn>
          <Btn block pill variant="secondary" style={{ marginTop: 8 }}>Add to watchlist</Btn>
        </Card>
      </div>
    ),
  },
  readonlyCart: true,
};
export default function Flow({ flow }) {
  return <StoreCheckout flow={flow} config={CONFIG} />;
}
