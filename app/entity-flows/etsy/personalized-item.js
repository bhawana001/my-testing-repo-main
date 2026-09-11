"use client";
import { useState } from "react";
import StoreCheckout from "@/app/components/engines/Store";
import { Card, Btn, Field, Input, Alert } from "@/app/components/eval/ui";
import { findProduct } from "@/lib/seed/products";
import { money } from "@/lib/seed";

const P = findProduct("p-mug-1");
function Pdp({ s, set, go }) {
  const [text, setText] = useState("");
  const [err, setErr] = useState(null);
  function add() {
    if (!text.trim()) { setErr("Personalization is required for this item."); return; }
    if (text.length > 20) { setErr("Keep it to 20 characters or fewer."); return; }
    set({ ...s, cart: [{ id: P.id + ":" + text, name: P.name, price: P.price, qty: 1, emoji: "☕", seller: P.shop, personalization: text.trim() }], view: "cart" });
  }
  return (
    <div className="ee-split">
      <div className="ee-row" style={{ alignItems: "flex-start", gap: 24 }}>
        <div className="ee-product__img" style={{ width: 280, fontSize: 90, flex: "none" }} aria-hidden="true">☕</div>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div className="ee-small ee-muted">{P.shop} · ★ 4.9 ({P.reviews})</div>
          <h1 className="ee-page-title">{P.name}</h1>
          <div className="ee-price" style={{ fontSize: 24 }}>{money(P.price)}</div>
          <p className="ee-small ee-muted" style={{ margin: "8px 0 14px" }}>Hand-thrown stoneware, dishwasher safe. Add the name you'd like printed.</p>
        </div>
      </div>
      <Card data-testid="personalization-card">
        <Field label="Add your personalization (required)" help={`${text.length}/20 characters`} error={err} htmlFor="pers">
          <Input id="pers" value={text} onChange={(e) => { setText(e.target.value); setErr(null); }} placeholder="e.g. Grandma Jo" maxLength={40} />
        </Field>
        <Btn block pill style={{ marginTop: 12, background: "#222", color: "#fff" }} onClick={add} data-testid="add-to-cart">Add to cart</Btn>
      </Card>
    </div>
  );
}
const CONFIG = {
  nav: ["Home & Living", "Gifts", "Jewellery"], active: "Gifts", light: true,
  startView: "pdp", seedCart: [], showSeller: true,
  shippingOptions: [{ id: "std", label: "Standard shipping", price: 4.5, eta: "Sep 21–24" }],
  taxRate: 0, orderPrefix: "ET", primaryStyle: { background: "#222", color: "#fff" },
  payment: { methods: ["card"], allow3ds: false },
  views: { pdp: (ctx) => <Pdp {...ctx} /> },
  extras: {
    confirmLine: (l) => <div className="ee-small" data-testid="confirm-personalization">Personalization: <b>“{l.personalization}”</b></div>,
    confirmRows: (order) => [{ k: "Personalization", v: order.lines[0]?.personalization, testId: "confirm-personalization-row" }],
  },
};
export default function Flow({ flow }) {
  return <StoreCheckout flow={flow} config={CONFIG} />;
}
