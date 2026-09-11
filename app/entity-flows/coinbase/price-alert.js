"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { TradeShell } from "@/app/components/engines/TradeShell";
import { Card, Input, Btn, Field, Alert, Table, Badge, Segment } from "@/app/components/eval/ui";
import { CRYPTO } from "@/lib/seed/markets";
import { money } from "@/lib/seed";

const ETH = CRYPTO[1];
const seed = () => ({ alerts: [] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [dir, setDir] = useState("above"); const [target, setTarget] = useState(""); const [err, setErr] = useState(null);
  function save() {
    const t = Number(target);
    if (!(t > 0)) { setErr("Enter a target price."); return; }
    if (dir === "above" && t <= ETH.price) { setErr(`An “above” alert needs a target higher than the current price ${money(ETH.price)}.`); return; }
    if (dir === "below" && t >= ETH.price) { setErr(`A “below” alert needs a target lower than the current price ${money(ETH.price)}.`); return; }
    setErr(null);
    set({ alerts: [{ id: "AL-" + (s.alerts.length + 1), asset: "ETH", dir, target: t, status: "Active", created: "Sep 14, 2026" }, ...s.alerts] }); setTarget("");
  }
  return (
    <TradeShell flow={flow} nav={["Home", "Trade", "Alerts"]} active="Alerts" right={<span />}>
      <div className="ee-split">
        <Card title="Price alerts" data-testid="alerts">
          <Table cols={[{ key: "asset", label: "Asset" }, { key: "dir", label: "When price goes", render: (r) => (r.dir === "above" ? "Above" : "Below") }, { key: "target", label: "Target", align: "right", render: (r) => <span data-testid={`alert-target-${r.id}`}>{money(r.target)}</span> }, { key: "status", label: "Status", render: (r) => <Badge tone="ok">{r.status}</Badge> }, { key: "x", label: "", render: (r) => <Btn size="sm" variant="secondary" onClick={() => set({ alerts: s.alerts.filter((a) => a.id !== r.id) })}>Delete</Btn> }]} rows={s.alerts} rowKey={(r) => r.id} empty="No alerts yet" />
        </Card>
        <Card title="New alert · Ethereum" data-testid="alert-form">
          <div className="ee-stack">
            <div className="ee-price" data-testid="eth-price">{money(ETH.price)}</div>
            <Segment options={[{ value: "above", label: "Price rises above" }, { value: "below", label: "Price drops below" }]} value={dir} onChange={setDir} />
            <Field label="Target price (USD)" htmlFor="al-target"><Input id="al-target" inputMode="decimal" value={target} onChange={(e) => setTarget(e.target.value)} /></Field>
            {err && <Alert tone="err">{err}</Alert>}
            <Btn onClick={save} data-testid="al-save">Save alert</Btn>
          </div>
        </Card>
      </div>
    </TradeShell>
  );
}
