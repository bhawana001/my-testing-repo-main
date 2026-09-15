"use client";
import { Shell, TopBar, Page, Card, Btn, Row, Badge } from "../clones/kit/ui";
import { BRAND, BASE, ASSETS, findAsset, useStore, money } from "./shared";

export default function Home() {
  const [s] = useStore();
  const total = Object.entries(s.holdings).reduce((n, [id, units]) => n + units * findAsset(id).price, 0);
  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[
        { href: `${BASE}/buy`, label: "Buy", testId: "nav-buy" },
        { href: `${BASE}/send`, label: "Send", testId: "nav-send" },
        { href: `${BASE}/alerts`, label: "Alerts", testId: "nav-alerts" },
      ]} />
      <Page title="Portfolio" sub="Your crypto balances">
        <Card testId="portfolio-card">
          <div style={{ fontSize: 32, fontWeight: 700 }} data-testid="portfolio-total">{money(total)}</div>
          <Row label="Cash balance" value={money(s.cashBalance)} testId="cash-balance" />
        </Card>
        <Card title="Assets" testId="assets">
          {ASSETS.map((a) => (
            <div key={a.id} className="ck-row" data-testid={`asset-${a.id}`}>
              <span><strong>{a.id}</strong> <span className="ck-muted">{a.name}</span>
                <div className="ck-muted" data-testid={`holding-${a.id}`}>{s.holdings[a.id] || 0} {a.id}</div>
              </span>
              <span>{money(a.price)} <Badge tone={a.change >= 0 ? "ok" : "bad"}>{a.change >= 0 ? "+" : ""}{a.change}%</Badge></span>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
