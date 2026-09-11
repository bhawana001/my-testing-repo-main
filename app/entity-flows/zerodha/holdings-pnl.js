"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { TradeShell } from "@/app/components/engines/TradeShell";
import { Card, Table, KV } from "@/app/components/eval/ui";
import { NSE } from "@/lib/seed/markets";
import { money, round2 } from "@/lib/seed";

const HOLD = [{ sym: "INFX", qty: 10, avg: 1420.0 }, { sym: "RELX", qty: 4, avg: 3050.0 }, { sym: "TCSX", qty: 3, avg: 3510.5 }];
const rowsOf = () => HOLD.map((h) => { const ltp = NSE.find((x) => x.sym === h.sym).ltp; const inv = round2(h.qty * h.avg); const cur = round2(h.qty * ltp); return { ...h, ltp, inv, cur, pnl: round2(cur - inv), pct: round2(((ltp - h.avg) / h.avg) * 100) }; });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), () => ({ selected: null }));
  const rows = rowsOf(); const sel = rows.find((r) => r.sym === s.selected);
  const pnlCell = (v) => <span style={{ color: v >= 0 ? "var(--ee-ok)" : "var(--ee-err)", fontWeight: 700 }}>{v >= 0 ? "+" : "−"}{money(Math.abs(v), "INR")}</span>;
  return (
    <TradeShell flow={flow} nav={["Dashboard", "Orders", "Holdings", "Positions"]} active="Holdings" wide right={<span />}>
      <div className="ee-split">
        <Card title={`Holdings (${rows.length})`} data-testid="holdings">
          <Table cols={[{ key: "sym", label: "Instrument", render: (r) => <button className="ee-link" onClick={() => set({ selected: r.sym })} data-testid={`holding-${r.sym}`}>{r.sym}</button> }, { key: "qty", label: "Qty.", align: "right" }, { key: "avg", label: "Avg. cost", align: "right", render: (r) => r.avg.toFixed(2) }, { key: "ltp", label: "LTP", align: "right", render: (r) => r.ltp.toFixed(2) }, { key: "cur", label: "Cur. val", align: "right", render: (r) => money(r.cur, "INR") }, { key: "pnl", label: "P&L", align: "right", render: (r) => <span data-testid={`pnl-${r.sym}`}>{pnlCell(r.pnl)}</span> }, { key: "pct", label: "Net chg.", align: "right", render: (r) => `${r.pct >= 0 ? "+" : ""}${r.pct.toFixed(2)}%` }]} rows={rows} rowKey={(r) => r.sym} />
          <div className="ee-kv ee-kv--total"><span className="ee-kv__k">Total P&L</span><span className="ee-kv__v" data-testid="total-pnl">{pnlCell(round2(rows.reduce((a, r) => a + r.pnl, 0)))}</span></div>
        </Card>
        <Card title="Position breakdown" data-testid="breakdown">
          {sel ? (<>
            <div className="ee-strong" style={{ marginBottom: 6 }}>{sel.sym}</div>
            <KV k="Quantity" v={sel.qty} /><KV k="Average cost" v={money(sel.avg, "INR")} /><KV k="LTP" v={money(sel.ltp, "INR")} /><KV k="Price delta (LTP − avg)" v={money(round2(sel.ltp - sel.avg), "INR")} testId="bd-delta" />
            <KV k="P&L = qty × delta" v={`${sel.qty} × ${money(round2(sel.ltp - sel.avg), "INR")} = ${money(sel.pnl, "INR")}`} total testId="bd-formula" />
          </>) : <div className="ee-empty">Click an instrument to see how its P&L is computed.</div>}
        </Card>
      </div>
    </TradeShell>
  );
}
