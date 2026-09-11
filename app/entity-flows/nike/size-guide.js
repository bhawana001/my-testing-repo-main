"use client";
import { useState } from "react";
import StoreCheckout from "@/app/components/engines/Store";
import { Card, Btn, Modal, Chips, Alert } from "@/app/components/eval/ui";
import { findProduct } from "@/lib/seed/products";
import { money } from "@/lib/seed";

const P = findProduct("p-shoe-1");
const GUIDE = [["US 7", "UK 6", "EU 40", "25 cm"], ["US 8", "UK 7", "EU 41", "26 cm"], ["US 9", "UK 8", "EU 42.5", "27 cm"], ["US 10", "UK 9", "EU 44", "28 cm"], ["US 11", "UK 10", "EU 45", "29 cm"]];
function Pdp({ s, set }) {
  const [size, setSize] = useState(null); const [open, setOpen] = useState(false); const [err, setErr] = useState(null);
  function add() {
    if (!size) { setErr("Please select a size."); return; }
    set({ ...s, cart: [{ id: P.id + ":" + size, name: P.name, price: P.price, qty: 1, emoji: "👟", variant: { size, color: "Black" } }], view: "cart" });
  }
  return (
    <div className="ee-split">
      <div className="ee-product__img" style={{ fontSize: 120, maxWidth: 520 }} aria-hidden="true">👟</div>
      <div className="ee-stack">
        <div className="ee-small ee-muted">Men's Road Running Shoes</div>
        <h1 className="ee-page-title">{P.name}</h1>
        <div className="ee-price" style={{ fontSize: 22 }}>{money(P.price)}</div>
        <div className="ee-row ee-row--between"><span className="ee-strong">Select size <span data-testid="selected-size">{size || ""}</span></span><button className="ee-link" onClick={() => setOpen(true)} data-testid="open-size-guide">Size guide</button></div>
        <Chips options={GUIDE.map((g) => g[0])} value={size} onChange={(v) => { setSize(v); setErr(null); }} />
        {err && <Alert tone="err">{err}</Alert>}
        <Btn block pill size="lg" style={{ background: "#111" }} onClick={add} data-testid="add-to-bag">Add to Bag</Btn>
      </div>
      <Modal open={open} title="Size guide · Men's shoes" onClose={() => setOpen(false)} wide>
        <div className="ee-stack" data-testid="size-guide">
          <div className="ee-table-wrap"><table className="ee-table"><thead><tr><th>US</th><th>UK</th><th>EU</th><th>Foot length</th><th></th></tr></thead><tbody>
            {GUIDE.map((g) => <tr key={g[0]}><td>{g[0]}</td><td>{g[1]}</td><td>{g[2]}</td><td>{g[3]}</td><td className="ee-right"><Btn size="sm" variant="secondary" onClick={() => { setSize(g[0]); setOpen(false); }} data-testid={`guide-pick-${g[0].replace(" ", "")}`}>Select {g[0]}</Btn></td></tr>)}
          </tbody></table></div>
          <div className="ee-small ee-muted">Tip: measure your foot from heel to longest toe and pick the size whose foot length is equal or slightly larger.</div>
        </div>
      </Modal>
    </div>
  );
}
const CONFIG = {
  nav: ["New", "Men", "Women", "Kids"], active: "Men", light: true, startView: "pdp", seedCart: [],
  shippingOptions: [{ id: "std", label: "Standard", price: 0, eta: "Arrives Thu, Sep 17" }], taxRate: 0, orderPrefix: "C",
  primaryStyle: { background: "#111", color: "#fff", borderRadius: 999 }, payment: { methods: ["card"], allow3ds: false },
  labels: { cart: "Bag", proceed: "Checkout" },
  views: { pdp: (ctx) => <Pdp {...ctx} /> },
};
export default function Flow({ flow }) { return <StoreCheckout flow={flow} config={CONFIG} />; }
