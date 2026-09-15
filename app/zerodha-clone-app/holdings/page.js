"use client";
// Holdings P&L (17.3). Every line shows invested, current value and P&L with
// its percentage, so one position's maths can be checked in isolation.
import { Shell, TopBar, Page, Card, Row, Badge, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, findStock, useStore, money } from "../shared";

export default function HoldingsPage() {
  const [s] = useStore();
  const rows = s.holdings.map((h) => {
    const st = findStock(h.symbol);
    const invested = +(h.qty * h.avg).toFixed(2);
    const current = +(h.qty * st.ltp).toFixed(2);
    const pnl = +(current - invested).toFixed(2);
    const pct = +((pnl / invested) * 100).toFixed(2);
    return { ...h, ltp: st.ltp, invested, current, pnl, pct };
  });
  const invested = +rows.reduce((n, r) => n + r.invested, 0).toFixed(2);
  const current = +rows.reduce((n, r) => n + r.current, 0).toFixed(2);
  const pnl = +(current - invested).toFixed(2);

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Dashboard" }, { href: `${BASE}/orders`, label: "Orders" }]} />
      <Page title="Holdings" wide>
        <Card title="Summary" testId="holdings-summary">
          <Row label="Total investment" value={money(invested)} testId="total-invested" />
          <Row label="Current value" value={money(current)} testId="total-current" />
          <Row label="P&L" value={`${pnl >= 0 ? "+" : ""}${money(pnl)}`} strong testId="total-pnl" />
          <Badge tone={pnl >= 0 ? "ok" : "bad"}>{pnl >= 0 ? "Profit" : "Loss"}</Badge>
        </Card>

        <Card testId="holdings-table">
          {rows.length === 0 ? <Empty>No holdings.</Empty> : (
            <table className="ck-table">
              <thead><tr><th>Instrument</th><th>Qty</th><th>Avg cost</th><th>LTP</th><th>Invested</th><th>Current</th><th>P&L</th><th>Net chg</th></tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.symbol} data-testid={`holding-${r.symbol}`}>
                    <td className="ck-strong">{r.symbol}</td>
                    <td data-testid={`qty-${r.symbol}`}>{r.qty}</td>
                    <td data-testid={`avg-${r.symbol}`}>{money(r.avg)}</td>
                    <td data-testid={`ltp-${r.symbol}`}>{money(r.ltp)}</td>
                    <td data-testid={`invested-${r.symbol}`}>{money(r.invested)}</td>
                    <td data-testid={`current-${r.symbol}`}>{money(r.current)}</td>
                    <td data-testid={`pnl-${r.symbol}`}>{r.pnl >= 0 ? "+" : ""}{money(r.pnl)}</td>
                    <td><Badge tone={r.pct >= 0 ? "ok" : "bad"} testId={`pct-${r.symbol}`}>{r.pct >= 0 ? "+" : ""}{r.pct}%</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </Page>
    </Shell>
  );
}
