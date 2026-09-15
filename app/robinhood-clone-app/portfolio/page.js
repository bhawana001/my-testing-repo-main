"use client";
// Portfolio value (16.3). The total is computed as the sum of position values
// plus cash, and each line shows its own market value so the sum is checkable.
import { Shell, TopBar, Page, Card, Row, Badge, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, findSym, useStore, money } from "../shared";

export default function PortfolioPage() {
  const [s] = useStore();
  const rows = s.positions.map((p) => {
    const inst = findSym(p.symbol);
    const value = +(p.shares * inst.price).toFixed(2);
    const cost = +(p.shares * p.avgCost).toFixed(2);
    return { ...p, price: inst.price, value, cost, pl: +(value - cost).toFixed(2) };
  });
  const positionsValue = +rows.reduce((n, r) => n + r.value, 0).toFixed(2);
  const total = +(positionsValue + s.cash).toFixed(2);
  const totalPl = +rows.reduce((n, r) => n + r.pl, 0).toFixed(2);

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Markets" }, { href: `${BASE}/trade`, label: "Trade" }]} />
      <Page title="Portfolio" wide>
        <Card title="Total value" testId="portfolio-total-card">
          <div style={{ fontSize: 32, fontWeight: 700 }} data-testid="portfolio-total">{money(total)}</div>
          <Row label="Positions value" value={money(positionsValue)} testId="positions-value" />
          <Row label="Cash" value={money(s.cash)} testId="cash-value" />
          <Badge tone={totalPl >= 0 ? "ok" : "bad"} testId="total-pl">
            {totalPl >= 0 ? "+" : ""}{money(totalPl)} all time
          </Badge>
        </Card>

        <Card title="Positions" testId="positions">
          {rows.length === 0 ? <Empty>No positions.</Empty> : (
            <table className="ck-table">
              <thead><tr><th>Symbol</th><th>Shares</th><th>Avg cost</th><th>Price</th><th>Market value</th><th>P/L</th></tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.symbol} data-testid={`position-${r.symbol}`}>
                    <td className="ck-strong">{r.symbol}</td>
                    <td data-testid={`shares-${r.symbol}`}>{r.shares}</td>
                    <td>{money(r.avgCost)}</td>
                    <td>{money(r.price)}</td>
                    <td data-testid={`value-${r.symbol}`}>{money(r.value)}</td>
                    <td><Badge tone={r.pl >= 0 ? "ok" : "bad"}>{r.pl >= 0 ? "+" : ""}{money(r.pl)}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <Row label="Sum of position values" value={money(positionsValue)} strong testId="sum-check" />
        </Card>
      </Page>
    </Shell>
  );
}
