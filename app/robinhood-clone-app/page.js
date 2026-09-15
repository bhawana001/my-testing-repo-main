"use client";
import { Shell, TopBar, Page, Card, Btn, Row, Badge } from "../clones/kit/ui";
import { BRAND, BASE, INSTRUMENTS, useStore, money } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[
        { href: `${BASE}/trade`, label: "Trade", testId: "nav-trade" },
        { href: `${BASE}/portfolio`, label: "Portfolio", testId: "nav-portfolio" },
        { href: `${BASE}/transfers`, label: "Transfers", testId: "nav-transfers" },
        { href: `${BASE}/options`, label: "Options", testId: "nav-options" },
      ]} />
      <Page title="Markets" sub="Paper trading environment">
        <Card title="Buying power">
          <div style={{ fontSize: 30, fontWeight: 700 }} data-testid="buying-power">{money(s.buyingPower)}</div>
        </Card>
        <Card title="Watchlist" testId="watchlist">
          {INSTRUMENTS.map((i) => (
            <div key={i.symbol} className="ck-row" data-testid={`quote-${i.symbol}`}>
              <span><strong>{i.symbol}</strong> <span className="ck-muted">{i.name}</span></span>
              <span>
                {money(i.price)}{" "}
                <Badge tone={i.change >= 0 ? "ok" : "bad"}>{i.change >= 0 ? "+" : ""}{i.change}%</Badge>
              </span>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
