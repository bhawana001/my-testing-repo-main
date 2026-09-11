"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Select, Table, Badge, KV, Alert, Input } from "@/app/components/eval/ui";
import { money, round2 } from "@/lib/seed";

const PRODUCTS = [{ id: "p1", name: "Botanical Art Print A3", price: 35 }, { id: "p2", name: "Custom Name Ceramic Mug", price: 22 }, { id: "p3", name: "Everyday Cotton Tee", price: 18 }];
const CUSTOMERS = ["Maria Chen <maria@globex.test>", "Ahmed Khan <ahmed@initech.test>"];
const seed = () => ({ view: "orders", orders: [{ no: 1004, customer: "Sam Lee <sam@acme.test>", total: 57, payment: "Paid", fulfillment: "Fulfilled", date: "Sep 12" }], draft: { customer: "", lines: [] } });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [pick, setPick] = useState("p1"); const [qty, setQty] = useState("1"); const [err, setErr] = useState(null);
  const d = s.draft; const sub = round2(d.lines.reduce((a, l) => a + l.price * l.qty, 0)); const ship = d.lines.length ? 5 : 0; const total = round2(sub + ship);
  function addLine() { const p = PRODUCTS.find((x) => x.id === pick); const n = Number(qty) || 1; set({ ...s, draft: { ...d, lines: [...d.lines.filter((l) => l.id !== p.id), { ...p, qty: n }] } }); }
  function markPaid() {
    if (!d.customer) { setErr("Select a customer."); return; } if (!d.lines.length) { setErr("Add at least one product."); return; }
    setErr(null); const no = 1004 + s.orders.length;
    set({ view: "orders", orders: [{ no, customer: d.customer, total, payment: "Paid", fulfillment: "Unfulfilled", date: "Sep 14", draft: "D" + no }, ...s.orders], draft: { customer: "", lines: [] }, last: no });
  }
  return (
    <SaasShell flow={flow} nav={["Home", "Orders", "Products", "Customers", "Online Store"]} active="Orders" title={s.view === "orders" ? "Orders" : "Create order"} actions={s.view === "orders" && <Btn size="sm" onClick={() => set({ ...s, view: "draft" })} data-testid="create-order">Create order</Btn>}>
      {s.view === "orders" ? (<>
        {s.last && <Alert tone="ok" data-testid="order-created">Order #{s.last} created and marked as paid.</Alert>}
        <Card style={{ marginTop: 10 }} data-testid="orders"><Table cols={[{ key: "no", label: "Order", render: (r) => `#${r.no}` }, { key: "date", label: "Date" }, { key: "customer", label: "Customer" }, { key: "total", label: "Total", align: "right", render: (r) => money(r.total) }, { key: "payment", label: "Payment status", render: (r) => <Badge tone="ok" data-testid={`payment-${r.no}`}>{r.payment}</Badge> }, { key: "fulfillment", label: "Fulfillment", render: (r) => <Badge tone={r.fulfillment === "Fulfilled" ? undefined : "warn"}>{r.fulfillment}</Badge> }]} rows={s.orders} rowKey={(r) => r.no} /></Card>
      </>) : (
        <div className="ee-split">
          <Card title="Products" data-testid="draft-products">
            <div className="ee-row"><Select value={pick} onChange={(e) => setPick(e.target.value)} aria-label="Product" style={{ flex: 1 }}>{PRODUCTS.map((p) => <option key={p.id} value={p.id}>{p.name} · {money(p.price)}</option>)}</Select><Input value={qty} onChange={(e) => setQty(e.target.value)} aria-label="Quantity" style={{ width: 70 }} /><Btn size="sm" variant="secondary" onClick={addLine} data-testid="add-product">Add</Btn></div>
            {d.lines.map((l) => <KV key={l.id} k={`${l.name} × ${l.qty}`} v={money(l.price * l.qty)} />)}
            <div className="ee-divider" />
            <KV k="Subtotal" v={money(sub)} testId="draft-subtotal" /><KV k="Shipping" v={money(ship)} /><KV k="Total" v={money(total)} total testId="draft-total" />
          </Card>
          <Card title="Customer" data-testid="draft-customer">
            <Select value={d.customer} onChange={(e) => set({ ...s, draft: { ...d, customer: e.target.value } })} aria-label="Customer"><option value="">Search or create a customer</option>{CUSTOMERS.map((c) => <option key={c}>{c}</option>)}</Select>
            {err && <Alert tone="err">{err}</Alert>}
            <div className="ee-stack" style={{ marginTop: 12 }}><Btn variant="secondary">Send invoice</Btn><Btn onClick={markPaid} data-testid="mark-paid">Collect payment · Mark as paid</Btn></div>
          </Card>
        </div>
      )}
    </SaasShell>
  );
}
