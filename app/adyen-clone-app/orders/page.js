"use client";
// Merchant order page and webhook parity (13.4). The UI status is derived from
// the payment, the notification list shows what the webhook said, and the page
// states plainly whether they agree.
import { Shell, TopBar, Page, Card, Row, Badge, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, ORDER, useStore } from "../shared";

export default function OrdersPage() {
  const [s] = useStore();
  const latest = s.payments[0] || null;
  const hook = latest ? s.webhooks.find((w) => w.pspReference === latest.pspReference) : null;
  const uiStatus = latest ? (latest.resultCode === "Authorised" ? "Authorised" : "Refused") : "Awaiting payment";
  const hookStatus = hook ? (hook.success ? "Authorised" : "Refused") : "No notification yet";
  const parity = latest && hook && uiStatus === hookStatus;

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Store" }, { href: `${BASE}/checkout`, label: "Checkout" }]} />
      <Page title="Merchant order" sub={ORDER.reference}>
        <Card title="Order status" testId="order-status-card">
          <Row label="Order reference" value={ORDER.reference} testId="merchant-order-ref" />
          <Row label="Amount" value={`€${ORDER.amount.toFixed(2)}`} />
          <Row label="Status shown to merchant" value={uiStatus} strong testId="ui-status" />
          {latest && <Row label="PSP reference" value={latest.pspReference} testId="merchant-psp" />}
          <Badge tone={uiStatus === "Authorised" ? "ok" : uiStatus === "Refused" ? "bad" : "neutral"} testId="ui-status-badge">
            {uiStatus}
          </Badge>
        </Card>

        <Card title="Webhook notifications" testId="webhooks">
          {s.webhooks.length === 0 ? <Empty>No notifications received yet.</Empty> : s.webhooks.map((w) => (
            <div key={w.pspReference} data-testid={`webhook-${w.pspReference}`}>
              <Row label={`${w.eventCode} · ${w.orderRef}`} value={w.success ? "success: true" : "success: false"} testId="webhook-success" />
              <div className="ck-muted">{w.pspReference} · {w.at}</div>
            </div>
          ))}
        </Card>

        <Card title="Status parity" tone={parity ? "ok" : "warn"} testId="parity-card">
          <Row label="UI status" value={uiStatus} testId="parity-ui" />
          <Row label="Notification status" value={hookStatus} testId="parity-webhook" />
          <Badge tone={parity ? "ok" : "warn"} testId="parity-state">
            {parity ? "UI status matches the notification" : "Waiting for a payment and its notification"}
          </Badge>
        </Card>
      </Page>
    </Shell>
  );
}
