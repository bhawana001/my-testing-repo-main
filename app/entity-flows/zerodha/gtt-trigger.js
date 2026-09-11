"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { TradeShell } from "@/app/components/engines/TradeShell";
import { Card, Input, Btn, Field, Alert, Table, Badge, Select } from "@/app/components/eval/ui";
import { NSE } from "@/lib/seed/markets";
import { money } from "@/lib/seed";

const seed = () => ({ gtts: [] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [sym, setSym] = useState("RELX"); const [trigger, setTrigger] = useState(""); const [limit, setLimit] = useState(""); const [qty, setQty] = useState("2"); const [err, setErr] = useState(null);
  const sc = NSE.find((x) => x.sym === sym);
  function create() {
    const t = Number(trigger), l = Number(limit), n = Number(qty);
    if (!(t > 0) || !(l > 0) || !(n > 0)) { setErr("Enter trigger price, limit price and quantity."); return; }
    if (t >= sc.ltp) { setErr(`For a BUY GTT the trigger must be below the LTP (${sc.ltp.toFixed(2)}).`); return; }
    if (Math.abs(l - t) / t > 0.05) { setErr("Limit price must be within 5% of the trigger price."); return; }
    setErr(null);
    set({ gtts: [{ id: "GTT" + (1044 + s.gtts.length), sym, trigger: t, limit: l, qty: n, ltp: sc.ltp, status: "Active", created: "14 Sep 2026" }, ...s.gtts] });
    setTrigger(""); setLimit("");
  }
  return (
    <TradeShell flow={flow} nav={["Dashboard", "Orders", "GTT", "Holdings"]} active="GTT" wide>
      <div className="ee-split">
        <Card title="GTT orders" data-testid="gtt-list">
          <Table cols={[{ key: "id", label: "ID" }, { key: "sym", label: "Instrument" }, { key: "type", label: "Type", render: () => "Single · BUY" }, { key: "trigger", label: "Trigger", align: "right", render: (r) => r.trigger.toFixed(2) }, { key: "limit", label: "Limit", align: "right", render: (r) => r.limit.toFixed(2) }, { key: "qty", label: "Qty", align: "right" }, { key: "status", label: "Status", render: (r) => <Badge tone="ok" data-testid={`gtt-status-${r.id}`}>{r.status}</Badge> }]} rows={s.gtts} rowKey={(r) => r.id} empty="No GTT orders. Create one to buy automatically when the price hits your trigger." />
        </Card>
        <Card title="Create GTT" data-testid="gtt-form">
          <div className="ee-stack">
            <Field label="Instrument" htmlFor="gtt-sym"><Select id="gtt-sym" value={sym} onChange={(e) => setSym(e.target.value)}>{NSE.map((x) => <option key={x.sym} value={x.sym}>{x.sym} · LTP {x.ltp.toFixed(2)}</option>)}</Select></Field>
            <Field label="Trigger price" htmlFor="gtt-trigger" help={`LTP ${sc.ltp.toFixed(2)}`}><Input id="gtt-trigger" inputMode="decimal" value={trigger} onChange={(e) => setTrigger(e.target.value)} /></Field>
            <Field label="Limit price" htmlFor="gtt-limit"><Input id="gtt-limit" inputMode="decimal" value={limit} onChange={(e) => setLimit(e.target.value)} /></Field>
            <Field label="Quantity" htmlFor="gtt-qty"><Input id="gtt-qty" inputMode="numeric" value={qty} onChange={(e) => setQty(e.target.value)} /></Field>
            {err && <Alert tone="err" data-testid="gtt-error">{err}</Alert>}
            <Btn onClick={create} data-testid="gtt-create">Place GTT</Btn>
          </div>
        </Card>
      </div>
    </TradeShell>
  );
}
