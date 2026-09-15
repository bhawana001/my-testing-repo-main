"use client";
// Activity feed and dispute filing (10.4). Only completed payments to merchants
// can be disputed, and filing produces a case reference.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Empty, Field, Select, Textarea, Banner } from "../../clones/kit/ui";
import { BRAND, BASE, DISPUTE_REASONS, useStore, money } from "../shared";

export default function ActivityPage() {
  const [s, update] = useStore();
  const [open, setOpen] = useState(null);
  const [reason, setReason] = useState("");
  const [detail, setDetail] = useState("");
  const [err, setErr] = useState("");
  const [filed, setFiled] = useState(null);

  const tx = open ? s.activity.find((t) => t.id === open) : null;
  const existing = tx ? s.disputes.find((d) => d.txId === tx.id) : null;

  function file() {
    if (!reason) { setErr("Choose a reason for the dispute."); return; }
    setErr("");
    const caseId = "PP-D-" + (5500 + s.disputes.length * 7);
    const rec = { id: caseId, txId: tx.id, counterparty: tx.counterparty, amount: Math.abs(tx.amount),
                  reason, detail: detail.trim(), status: "Under review", at: "2026-09-15" };
    update((st) => { st.disputes.unshift(rec); return st; });
    setFiled(rec);
    setReason(""); setDetail("");
  }

  if (tx) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Wallet" }]} />
        <Page title="Transaction details">
          <Btn variant="ghost" onClick={() => { setOpen(null); setFiled(null); setErr(""); }} data-testid="back">← Back to activity</Btn>
          {filed && (
            <Banner tone="ok" title="Dispute filed" testId="dispute-filed">
              Case <strong data-testid="case-id">{filed.id}</strong> opened for {filed.counterparty} — {money(filed.amount)}.
            </Banner>
          )}
          <Card testId="tx-detail">
            <Row label="Transaction" value={tx.id} testId="detail-tx-id" />
            <Row label="Counterparty" value={tx.counterparty} testId="detail-counterparty" />
            <Row label="Amount" value={money(Math.abs(tx.amount))} strong testId="detail-amount" />
            <Row label="Date" value={tx.at} />
            <Badge tone="ok" testId="detail-status">{tx.status}</Badge>
          </Card>

          {existing || filed ? (
            <Card title="Dispute" tone="warn" testId="dispute-status-card">
              <Row label="Case reference" value={(existing || filed).id} testId="dispute-case" />
              <Row label="Reason" value={(existing || filed).reason} testId="dispute-reason" />
              <Badge tone="warn">{(existing || filed).status}</Badge>
            </Card>
          ) : tx.disputable ? (
            <Card title="Report a problem" testId="dispute-form">
              <Field label="What went wrong?" error={err}>
                <Select value={reason} onChange={(e) => setReason(e.target.value)} aria-label="Dispute reason" data-testid="dispute-reason-select">
                  <option value="">Choose a reason</option>
                  {DISPUTE_REASONS.map((r) => <option key={r}>{r}</option>)}
                </Select>
              </Field>
              <Field label="Tell us more (optional)">
                <Textarea value={detail} onChange={(e) => setDetail(e.target.value)} aria-label="Detail" data-testid="dispute-detail" />
              </Field>
              <Btn onClick={file} data-testid="file-dispute">File dispute</Btn>
            </Card>
          ) : (
            <Card><p className="ck-muted" data-testid="not-disputable">This transaction can't be disputed.</p></Card>
          )}
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Wallet" }, { href: `${BASE}/send`, label: "Send money" }]} />
      <Page title="Activity" wide>
        <Card testId="activity-list">
          {s.activity.length === 0 ? <Empty>No activity yet.</Empty> : s.activity.map((t) => (
            <div key={t.id} className="ck-row" data-testid={`tx-${t.id}`}>
              <span>
                <strong>{t.counterparty}</strong>
                <div className="ck-muted">{t.id} · {t.at}{t.note ? ` · “${t.note}”` : ""}</div>
                {s.disputes.some((d) => d.txId === t.id) && <Badge tone="warn" testId={`disputed-${t.id}`}>Dispute open</Badge>}
              </span>
              <span>
                <span className="ck-strong" data-testid={`amount-${t.id}`}>{t.amount < 0 ? "−" : "+"}{money(Math.abs(t.amount))}</span>
                <div><Btn size="sm" variant="secondary" onClick={() => setOpen(t.id)} data-testid={`open-${t.id}`}>Details</Btn></div>
              </span>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
