"use client";
import { Shell, TopBar, Page, Card, Btn, Row, Badge } from "../clones/kit/ui";
import { BRAND, BASE, useStore, money } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[
        { href: `${BASE}/pay`, label: "Pay", testId: "nav-pay" },
        { href: `${BASE}/requests`, label: "Requests", testId: "nav-requests" },
        { href: `${BASE}/cashout`, label: "Cash out", testId: "nav-cashout" },
        { href: `${BASE}/card`, label: "Card", testId: "nav-card" },
      ]} />
      <Page title="Venmoo" sub="Pay and get paid">
        <Card title="Balance">
          <div style={{ fontSize: 32, fontWeight: 700 }} data-testid="balance">{money(s.balance)}</div>
          <Row label="Linked bank" value={s.bank} />
        </Card>
        <Card title="Feed" testId="home-feed">
          {s.feed.map((f) => (
            <div key={f.id} data-testid={`feed-${f.id}`}>
              <Row label={`${f.from} paid ${f.to}`} value={money(f.amount)} />
              <div className="ck-muted">{f.note} · {f.at}</div>
              <Badge tone="neutral">{f.privacy}</Badge>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
