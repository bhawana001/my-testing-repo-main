"use client";
// Transfer status tracking (15.3). The timeline shows which step the transfer
// is actually on, and advancing it moves the marker.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Timeline, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, TRANSFER_STEPS, useStore, fmt } from "../shared";

export default function TransfersPage() {
  const [s, update] = useStore();
  const [open, setOpen] = useState(null);

  const t = open ? s.transfers.find((x) => x.id === open) : null;

  function advance(id) {
    update((st) => {
      const tr = st.transfers.find((x) => x.id === id);
      if (tr && tr.step < TRANSFER_STEPS.length - 1) tr.step += 1;
      return st;
    });
  }

  if (t) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/send`, label: "Send money" }]} />
        <Page title={`Transfer ${t.id}`} sub={`To ${t.to}`}>
          <Btn variant="ghost" onClick={() => setOpen(null)} data-testid="back">← All transfers</Btn>
          <Card title="Status" testId="transfer-status">
            <Row label="You sent" value={fmt(t.sending, t.from)} testId="detail-sending" />
            <Row label="They receive" value={fmt(t.converted, t.toCurrency)} testId="detail-converted" />
            <Row label="Fee" value={fmt(t.fee, t.from)} testId="detail-fee" />
            <Row label="Estimated arrival" value={t.arrival} testId="detail-arrival" />
            <Timeline steps={TRANSFER_STEPS} current={t.step} testId="transfer-timeline" />
            <Badge tone={t.step === TRANSFER_STEPS.length - 1 ? "ok" : "warn"} testId="current-step">
              Current step: {TRANSFER_STEPS[t.step]}
            </Badge>
            {t.step < TRANSFER_STEPS.length - 1 && (
              <Btn style={{ marginTop: 10 }} onClick={() => advance(t.id)} data-testid="advance-step">
                Simulate next step
              </Btn>
            )}
          </Card>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/send`, label: "Send money" }]} />
      <Page title="Transfers" wide>
        <Card testId="transfer-list">
          {s.transfers.length === 0 ? <Empty>No transfers yet.</Empty> : s.transfers.map((x) => (
            <div key={x.id} className="ck-row" data-testid={`transfer-${x.id}`}>
              <span>
                <strong>{x.id}</strong> <span className="ck-muted">· to {x.to} · {x.createdAt}</span>
                <div><Badge tone="info" testId={`step-${x.id}`}>{TRANSFER_STEPS[x.step]}</Badge></div>
              </span>
              <span>
                {fmt(x.sending, x.from)} → {fmt(x.converted, x.toCurrency)}
                <div><Btn size="sm" variant="secondary" onClick={() => setOpen(x.id)} data-testid={`open-${x.id}`}>Track</Btn></div>
              </span>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
