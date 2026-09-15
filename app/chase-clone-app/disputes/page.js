"use client";
// Credit card dispute (23.5): pick a charge, pick a reason, get a case
// reference. Only card charges are disputable, and a charge can't be disputed
// twice.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Field, Select, Textarea, Badge, Banner, Empty, Radio } from "../../clones/kit/ui";
import { BRAND, BASE, DISPUTE_REASONS, useStore, money, ref } from "../shared";

export default function DisputesPage() {
  const [s, update] = useStore();
  const [txnId, setTxnId] = useState("");
  const [reason, setReason] = useState("");
  const [detail, setDetail] = useState("");
  const [err, setErr] = useState("");
  const [filed, setFiled] = useState(null);

  const disputable = s.activity.filter((t) => t.disputable && t.amount < 0 && !s.disputes.some((d) => d.txnId === t.id));
  const txn = s.activity.find((t) => t.id === txnId);

  function file() {
    if (!txnId) { setErr("Choose the charge you want to dispute."); return; }
    if (!reason) { setErr("Choose a reason for the dispute."); return; }
    setErr("");
    const caseRef = ref("CASE-", s.counter + 1);
    const record = { id: caseRef, txnId, merchant: txn.merchant, amount: Math.abs(txn.amount),
                     reason, detail, at: "2026-09-15", status: "Under review" };
    update((st) => { st.disputes.unshift(record); st.counter += 1; return st; });
    setFiled(record);
    setTxnId(""); setReason(""); setDetail("");
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: `${BASE}/dashboard`, label: "Accounts" }]} />
      <Page title="Dispute a transaction">
        {filed && (
          <Banner tone="ok" title="Dispute submitted" testId="dispute-confirmation">
            Case <strong data-testid="case-reference">{filed.id}</strong> opened for {filed.merchant} — {money(filed.amount)}.
          </Banner>
        )}

        <div className="ck-split">
          <Card title="Choose a charge" testId="disputable-list">
            {disputable.length === 0 ? <Empty>No charges available to dispute.</Empty> : disputable.map((t) => (
              <Radio key={t.id} name="txn" testId={`txn-${t.id}`}
                     label={`${t.merchant} — ${money(Math.abs(t.amount))}`} detail={t.date}
                     checked={txnId === t.id} onChange={() => setTxnId(t.id)} />
            ))}
          </Card>

          <Card title="Tell us what happened">
            <Field label="Reason" error={err}>
              <Select value={reason} onChange={(e) => setReason(e.target.value)} aria-label="Dispute reason" data-testid="reason">
                <option value="">Choose a reason</option>
                {DISPUTE_REASONS.map((r) => <option key={r}>{r}</option>)}
              </Select>
            </Field>
            <Field label="Extra detail (optional)">
              <Textarea value={detail} onChange={(e) => setDetail(e.target.value)} aria-label="Extra detail" data-testid="detail" />
            </Field>
            {txn && <Row label="Disputing" value={`${txn.merchant} · ${money(Math.abs(txn.amount))}`} testId="selected-charge" />}
            <Btn block onClick={file} data-testid="submit-dispute">Submit dispute</Btn>
          </Card>
        </div>

        <Card title={`Your disputes (${s.disputes.length})`} testId="disputes-list">
          {s.disputes.length === 0 ? <Empty>No disputes filed.</Empty> : s.disputes.map((d) => (
            <div key={d.id} data-testid={`dispute-${d.id}`}>
              <Row label={`${d.id} · ${d.merchant}`} value={money(d.amount)} />
              <div className="ck-muted" data-testid={`dispute-reason-${d.id}`}>{d.reason}</div>
              <Badge tone="warn" testId={`dispute-status-${d.id}`}>{d.status}</Badge>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
