"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { TradeShell, Change } from "@/app/components/engines/TradeShell";
import { Card, Input, Btn, KV, Badge, Field, Alert, Table, Select } from "@/app/components/eval/ui";
import { stock } from "@/lib/seed/markets";
import { money, round2 } from "@/lib/seed";

const st = stock("ACME");
const seed = () => ({ orders: [], bp: 2500, positions: { ACME: 0 } });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [qty, setQty] = useState("10"); const [limit, setLimit] = useState(""); const [tif, setTif] = useState("Good for day"); const [err, setErr] = useState(null); const [msg, setMsg] = useState(null);
  function place() {
    const n = Number(qty), l = Number(limit);
    if (!Number.isInteger(n) || n < 1) { setErr("Enter a whole number of shares."); return; }
    if (!(l > 0)) { setErr("Enter a limit price."); return; }
    if (round2(n * l) > s.bp) { setErr("Not enough buying power."); return; }
    setErr(null);
    const fills = l >= st.price;
    const o = { id: "LMT-" + (s.orders.length + 2001), sym: st.sym, qty: n, limit: l, tif, status: fills ? "Filled" : "Pending", fill: fills ? st.price : null };
    set({ ...s, orders: [o, ...s.orders], bp: round2(s.bp - n * (fills ? st.price : l)), positions: fills ? { ACME: s.positions.ACME + n } : s.positions });
    setMsg(fills ? `Limit ${money(l)} is at or above market, so the order filled at ${money(st.price)}.` : `Limit buy placed. It will fill if ${st.sym} drops to ${money(l)} or lower.`);
  }
  const cancel = (id) => set({ ...s, orders: s.orders.map((o) => (o.id === id ? { ...o, status: "Cancelled" } : o)), bp: round2(s.bp + (s.orders.find((o) => o.id === id).qty * s.orders.find((o) => o.id === id).limit)) });
  return (
    <TradeShell flow={flow} nav={["Investing", "Crypto", "Retirement"]} active="Investing" right={<span className="ee-small">Buying power <b data-testid="buying-power">{money(s.bp)}</b></span>}>
      <div className="ee-split">
        <div>
          <h1 className="ee-page-title">{st.name} ({st.sym})</h1>
          <div className="ee-price" style={{ fontSize: 30 }} data-testid="market-price">{money(st.price)}</div>
          <Change value={st.price} prev={st.prev} />
          <Card title="Open orders" style={{ marginTop: 16 }} data-testid="open-orders">
            <Table cols={[{ key: "id", label: "Order" }, { key: "qty", label: "Shares" }, { key: "limit", label: "Limit price", render: (r) => money(r.limit) }, { key: "tif", label: "Expires" }, { key: "status", label: "Status", render: (r) => <Badge tone={r.status === "Pending" ? "warn" : r.status === "Filled" ? "ok" : undefined}>{r.status}</Badge> }, { key: "x", label: "", render: (r) => r.status === "Pending" ? <Btn size="sm" variant="secondary" onClick={() => cancel(r.id)}>Cancel</Btn> : null }]} rows={s.orders} rowKey={(r) => r.id} empty="No orders yet" />
          </Card>
        </div>
        <Card title={`Limit buy ${st.sym}`} data-testid="limit-ticket">
          <div className="ee-stack">
            <Field label="Shares" htmlFor="lo-qty"><Input id="lo-qty" inputMode="numeric" value={qty} onChange={(e) => setQty(e.target.value)} /></Field>
            <Field label="Limit price" htmlFor="lo-limit" help={`Market is ${money(st.price)}`}><Input id="lo-limit" inputMode="decimal" value={limit} onChange={(e) => setLimit(e.target.value)} placeholder="0.00" /></Field>
            <Field label="Expires" htmlFor="lo-tif"><Select id="lo-tif" value={tif} onChange={(e) => setTif(e.target.value)}><option>Good for day</option><option>Good till cancelled</option></Select></Field>
            <KV k="Estimated cost" v={money((Number(qty) || 0) * (Number(limit) || 0))} total />
            {err && <Alert tone="err">{err}</Alert>}
            {msg && <Alert tone="ok" data-testid="limit-msg">{msg}</Alert>}
            <Btn block onClick={place} data-testid="place-limit">Place limit order</Btn>
          </div>
        </Card>
      </div>
    </TradeShell>
  );
}
