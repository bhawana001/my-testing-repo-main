"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { TradeShell } from "@/app/components/engines/TradeShell";
import { Card, Table, KV, Btn } from "@/app/components/eval/ui";
import { STOCKS, TICK_SCRIPT } from "@/lib/seed/markets";
import { money, round2 } from "@/lib/seed";

const HOLD = { NOVA: 6, ACME: 20, ORBT: 40, HLIX: 2 };
const seed = () => ({ tick: -1 });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const priceOf = (sym) => (s.tick >= 0 ? TICK_SCRIPT[s.tick][sym] : STOCKS.find((x) => x.sym === sym).price);
  const rows = Object.entries(HOLD).map(([sym, qty]) => ({ sym, name: STOCKS.find((x) => x.sym === sym).name, qty, price: priceOf(sym), value: round2(qty * priceOf(sym)) }));
  const total = round2(rows.reduce((a, r) => a + r.value, 0));
  return (
    <TradeShell flow={flow} nav={["Investing", "Crypto", "Retirement"]} active="Investing">
      <div className="ee-small ee-muted">Investing</div>
      <div className="ee-price" style={{ fontSize: 38 }} data-testid="portfolio-total">{money(total)}</div>
      <div className="ee-small ee-muted" style={{ marginBottom: 16 }} data-testid="price-snapshot">Prices: {s.tick < 0 ? "market open snapshot" : `scripted update ${s.tick + 1} of ${TICK_SCRIPT.length}`}</div>
      <div className="ee-split">
        <Card title="Positions" data-testid="positions">
          <Table cols={[{ key: "sym", label: "Symbol" }, { key: "name", label: "Name" }, { key: "qty", label: "Shares", align: "right" }, { key: "price", label: "Price", align: "right", render: (r) => money(r.price) }, { key: "value", label: "Market value", align: "right", render: (r) => <span data-testid={`value-${r.sym}`}>{money(r.value)}</span> }]} rows={rows} rowKey={(r) => r.sym} />
          <div className="ee-kv ee-kv--total"><span className="ee-kv__k">Sum of positions</span><span className="ee-kv__v" data-testid="positions-sum">{money(total)}</span></div>
        </Card>
        <Card title="Breakdown" data-testid="breakdown">
          {rows.map((r) => <KV key={r.sym} k={`${r.sym}: ${r.qty} × ${money(r.price)}`} v={money(r.value)} />)}
          <KV k="Total" v={money(total)} total />
          <Btn variant="secondary" size="sm" style={{ marginTop: 10 }} disabled={s.tick >= TICK_SCRIPT.length - 1} onClick={() => set({ tick: s.tick + 1 })} data-testid="next-tick">Simulate next price update</Btn>
        </Card>
      </div>
    </TradeShell>
  );
}
