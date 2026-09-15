"use client";
// Dashboard with masked accounts (23.1's assertion) and the activity feed every
// other feature writes into.
import Link from "next/link";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, useStore, money } from "../shared";

export default function Dashboard() {
  const [s] = useStore();

  if (!s.authed) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} />
        <Page title="Dashboard">
          <Banner tone="warn" title="Please sign in" testId="auth-required">
            Your session isn't verified. <Link href={BASE}>Sign in with two-step verification</Link>.
          </Banner>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[
        { href: `${BASE}/zelle`, label: "Zelly", testId: "nav-zelle" },
        { href: `${BASE}/billpay`, label: "Bill pay", testId: "nav-billpay" },
        { href: `${BASE}/statements`, label: "Statements", testId: "nav-statements" },
        { href: `${BASE}/disputes`, label: "Disputes", testId: "nav-disputes" },
      ]} />
      <Page title="Good afternoon, Priya" sub="Accounts overview">
        <Badge tone="ok" testId="signed-in">Signed in with two-step verification</Badge>

        <Card title="Your accounts" testId="accounts">
          {s.accounts.map((a) => (
            <Row key={a.id} label={`${a.name} ${a.mask}`} value={money(a.balance)} testId={`account-${a.id}`} />
          ))}
        </Card>

        <Card title="Recent activity" testId="activity">
          {s.activity.length === 0 ? <Empty>No recent activity.</Empty> : s.activity.map((t) => (
            <Row key={t.id} label={`${t.date} · ${t.merchant}`} value={money(t.amount)} testId={`txn-${t.id}`} />
          ))}
        </Card>

        <div className="ck-grid ck-grid--2">
          <Card title="Zelly">
            <div className="ck-muted">{s.zellePayments.length} payment{s.zellePayments.length === 1 ? "" : "s"} sent</div>
            <Btn as="link" href={`${BASE}/zelle`} block data-testid="go-zelle">Send money</Btn>
          </Card>
          <Card title="Scheduled payments">
            <div className="ck-muted" data-testid="scheduled-count">{s.scheduledPayments.length} scheduled</div>
            <Btn as="link" href={`${BASE}/billpay`} block data-testid="go-billpay">Pay a bill</Btn>
          </Card>
        </div>
      </Page>
    </Shell>
  );
}
