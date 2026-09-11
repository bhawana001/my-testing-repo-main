"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { TradeShell, Change } from "@/app/components/engines/TradeShell";
import { Card, Input, Btn, Segment, Field, Alert, Table, Badge, Modal } from "@/app/components/eval/ui";
import { NSE } from "@/lib/seed/markets";
import { money, round2 } from "@/lib/seed";

const seed = () => ({ orders: [], margin: 25000 });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [win, setWin] = useState(null); const [product, setProduct] = useState("MIS"); const [type, setType] = useState("LIMIT"); const [qty, setQty] = useState("5"); const [price, setPrice] = useState(""); const [err, setErr] = useState(null);
  const sc = win ? NSE.find((x) => x.sym === win) : null;
  function open(sym) { const x = NSE.find((y) => y.sym === sym); setWin(sym); setPrice(String(x.ltp)); setErr(null); }
  function submit() {
    const n = Number(qty), p = Number(price);
    if (!Number.isInteger(n) || n < 1) { setErr("Quantity must be a whole number."); return; }
    if (type === "LIMIT" && (p < sc.lower || p > sc.upper)) { setErr(`Price outside circuit limits (${money(sc.lower, "INR")} – ${money(sc.upper, "INR")}). Order rejected.`); return; }
    const req = round2(n * (type === "LIMIT" ? p : sc.ltp) * (product === "MIS" ? 0.2 : 1));
    if (req > s.margin) { setErr("Insufficient margin."); return; }
    const o = { id: "2609140000" + String(s.orders.length + 11), time: "10:05:" + String(10 + s.orders.length).padStart(2, "0"), sym: sc.sym, side: "BUY", product, type, qty: n, price: type === "LIMIT" ? p : sc.ltp, status: type === "LIMIT" && p < sc.ltp ? "OPEN" : "COMPLETE" };
    set({ ...s, orders: [o, ...s.orders], margin: round2(s.margin - req) }); setWin(null);
  }
  return (
    <TradeShell flow={flow} nav={["Dashboard", "Orders", "Holdings", "Positions", "Funds"]} active="Orders" wide right={<span className="ee-small">Margin available <b data-testid="margin">{money(s.margin, "INR")}</b></span>}>
      <div className="ee-split ee-split--sidebar-left">
        <Card tight title="Marketwatch" data-testid="marketwatch">
          {NSE.map((x) => (
            <div key={x.sym} className="ee-row ee-row--between ee-small" style={{ padding: "6px 0", borderBottom: "1px solid var(--ee-border)" }} data-testid={`mw-${x.sym}`}>
              <span><b>{x.sym}</b><div className="ee-tiny"><Change value={x.ltp} prev={x.prev} /></div></span>
              <span className="ee-row" style={{ gap: 4 }}><span className="ee-num">{x.ltp.toFixed(2)}</span><Btn size="sm" style={{ background: "#387ed1" }} onClick={() => open(x.sym)} data-testid={`buy-${x.sym}`}>B</Btn></span>
            </div>
          ))}
        </Card>
        <Card title="Orders" data-testid="orderbook">
          <Table cols={[{ key: "time", label: "Time" }, { key: "side", label: "Type", render: (r) => <Badge tone="info">{r.side}</Badge> }, { key: "sym", label: "Instrument" }, { key: "product", label: "Product" }, { key: "type", label: "Order" }, { key: "qty", label: "Qty", align: "right" }, { key: "price", label: "Price", align: "right", render: (r) => r.price.toFixed(2) }, { key: "status", label: "Status", render: (r) => <Badge tone={r.status === "OPEN" ? "warn" : "ok"} data-testid={`order-status-${r.sym}`}>{r.status}</Badge> }]} rows={s.orders} rowKey={(r) => r.id} empty="You haven't placed any orders today" />
        </Card>
      </div>
      <Modal open={!!sc} title={sc ? `Buy ${sc.sym} · NSE · LTP ${sc.ltp.toFixed(2)}` : ""} onClose={() => setWin(null)}>
        {sc && <div className="ee-stack" data-testid="order-window">
          <Segment options={[{ value: "MIS", label: "Intraday MIS" }, { value: "CNC", label: "Longterm CNC" }]} value={product} onChange={setProduct} />
          <div className="ee-grid ee-grid--2" style={{ gap: 10 }}>
            <Field label="Qty" htmlFor="kt-qty"><Input id="kt-qty" inputMode="numeric" value={qty} onChange={(e) => setQty(e.target.value)} /></Field>
            <Field label="Price" htmlFor="kt-price"><Input id="kt-price" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} disabled={type === "MARKET"} /></Field>
          </div>
          <Segment options={["MARKET", "LIMIT"]} value={type} onChange={setType} />
          <div className="ee-tiny ee-muted">Circuit {money(sc.lower, "INR")} – {money(sc.upper, "INR")} · Margin required {money(round2((Number(qty) || 0) * (type === "LIMIT" ? Number(price) || 0 : sc.ltp) * (product === "MIS" ? 0.2 : 1)), "INR")}</div>
          {err && <Alert tone="err" data-testid="order-error">{err}</Alert>}
          <div className="ee-row ee-row--end"><Btn variant="secondary" onClick={() => setWin(null)}>Cancel</Btn><Btn style={{ background: "#387ed1" }} onClick={submit} data-testid="order-submit">Buy</Btn></div>
        </div>}
      </Modal>
    </TradeShell>
  );
}
