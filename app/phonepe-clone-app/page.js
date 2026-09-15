"use client";
import { Shell, TopBar, Page, Card, Btn, Row, Badge } from "../clones/kit/ui";
import { BRAND, BASE, useStore, money } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[
        { href: `${BASE}/scan`, label: "Scan & pay", testId: "nav-scan" },
        { href: `${BASE}/autopay`, label: "Autopay", testId: "nav-autopay" },
        { href: `${BASE}/history`, label: "History", testId: "nav-history" },
        { href: `${BASE}/insurance`, label: "Insurance", testId: "nav-insurance" },
      ]} />
      <Page title="PhonePey" sub="UPI, bills and insurance">
        <Card title="Balance">
          <div style={{ fontSize: 30, fontWeight: 700 }} data-testid="balance">{money(s.balance)}</div>
        </Card>
        <div className="ck-grid ck-grid--2">
          <Card title="Scan any QR"><Btn as="link" href={`${BASE}/scan`} block data-testid="go-scan">Open scanner</Btn></Card>
          <Card title="Autopay"><Btn as="link" href={`${BASE}/autopay`} block data-testid="go-autopay">Manage mandates</Btn></Card>
        </div>
        <Badge tone="info" testId="mandate-count">{s.mandates.length} active mandate{s.mandates.length === 1 ? "" : "s"}</Badge>
      </Page>
    </Shell>
  );
}
