"use client";
import { Shell, TopBar, Page, Card, Btn, Row, Badge } from "../clones/kit/ui";
import { BRAND, BASE, useStore, slaFor } from "./shared";

export default function Home() {
  const [s] = useStore();
  const breached = s.tickets.filter((t) => slaFor(t).breached).length;
  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[
        { href: `${BASE}/widget`, label: "Contact us", testId: "nav-widget" },
        { href: `${BASE}/agent`, label: "Agent workspace", testId: "nav-agent" },
        { href: `${BASE}/help`, label: "Help centre", testId: "nav-help" },
      ]} />
      <Page title="Zendisk" sub="Support desk demo">
        <div className="ck-grid ck-grid--3">
          <Card title="Open tickets"><div style={{ fontSize: 28, fontWeight: 700 }} data-testid="open-count">{s.tickets.length}</div></Card>
          <Card title="SLA breached"><div style={{ fontSize: 28, fontWeight: 700 }} data-testid="breach-count">{breached}</div></Card>
          <Card title="Help articles"><div style={{ fontSize: 28, fontWeight: 700 }}>4</div></Card>
        </div>
        <Card title="Get started">
          <Btn as="link" href={`${BASE}/widget`} block data-testid="go-widget">Submit a ticket via the widget</Btn>
          <Btn as="link" href={`${BASE}/agent`} variant="secondary" block style={{ marginTop: 8 }} data-testid="go-agent">Open agent workspace</Btn>
        </Card>
      </Page>
    </Shell>
  );
}
