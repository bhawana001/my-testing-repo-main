"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Select, Textarea, Field, Radio, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, useStore, money, caseNumber } from "../shared";

const REASONS = [
  { id: "not_received", label: "I did not receive the goods or services" },
  { id: "duplicate", label: "I was charged more than once" },
  { id: "unauthorised", label: "I did not authorise this charge" },
  { id: "amount", label: "The amount is wrong" },
];

export default function Disputes() {
  const [s, update] = useStore();
  const [chargeId, setChargeId] = useState("ch1");
  const [reason, setReason] = useState("not_received");
  const [detail, setDetail] = useState("");
  const [error, setError] = useState(null);
  const [opened, setOpened] = useState(null);

  const charge = s.charges.find((c) => c.id === chargeId) || null;

  function open() {
    if (!charge) { setError("Pick a charge to dispute."); return; }
    if (charge.disputed) { setError("That charge already has an open dispute."); return; }
    if (detail.trim().length < 10) { setError("Tell us what happened — at least a sentence."); return; }
    const record = {
      id: caseNumber(s.disputes.length), chargeId, merchant: charge.merchant, amount: charge.amount,
      reason: REASONS.find((r) => r.id === reason).label, detail: detail.trim(),
      status: "Under review", openedOn: "2026-09-16", decisionBy: "2026-10-16",
    };
    update((st) => {
      st.charges.find((c) => c.id === chargeId).disputed = true;
      st.disputes.unshift(record);
      return st;
    });
    setError(null);
    setOpened(record);
    setDetail("");
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Dispute a charge" sub="We will hold the amount while the case is reviewed">
        {error && <Banner tone="bad" testId="dispute-error">{error}</Banner>}
        {opened && (
          <Card title="Case opened" tone="ok" testId="dispute-confirmation">
            <Row label="Case number" value={opened.id} testId="case-number" />
            <Row label="Merchant" value={opened.merchant} testId="case-merchant" />
            <Row label="Amount" value={money(opened.amount)} testId="case-amount" />
            <Row label="Reason" value={opened.reason} testId="case-reason" />
            <Row label="Decision by" value={opened.decisionBy} testId="case-decision-by" />
            <Badge tone="warn" testId="case-status">{opened.status}</Badge>
          </Card>
        )}

        <Card title="Which charge">
          <Field label="Charge">
            <Select value={chargeId} data-testid="charge-select" aria-label="Charge"
                    onChange={(e) => setChargeId(e.target.value)}>
              {s.charges.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.at} — {c.merchant} — {money(c.amount)}{c.disputed ? " (disputed)" : ""}
                </option>
              ))}
            </Select>
          </Field>
          {charge && <Row label="Amount" value={money(charge.amount)} testId="selected-amount" />}
        </Card>

        <Card title="Why">
          {REASONS.map((r) => (
            <Radio key={r.id} name="reason" checked={reason === r.id} label={r.label}
                   testId={`reason-${r.id}`} onChange={() => setReason(r.id)} />
          ))}
          <Field label="What happened" hint="A sentence or two is enough">
            <Textarea value={detail} data-testid="dispute-detail" aria-label="What happened"
                      onChange={(e) => setDetail(e.target.value)} />
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={open} data-testid="submit-dispute">Open the dispute</Btn>
          </div>
        </Card>

        <Card title="Your cases" testId="dispute-list">
          {s.disputes.length === 0 && <Empty>No disputes.</Empty>}
          {s.disputes.map((d) => (
            <div key={d.id} className="ck-row" data-testid={`dispute-${d.id}`}>
              <span>
                <strong>{d.id}</strong>
                <div className="ck-muted">{d.merchant} · {money(d.amount)} · {d.reason}</div>
              </span>
              <Badge tone="warn" testId={`dispute-status-${d.id}`}>{d.status}</Badge>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
