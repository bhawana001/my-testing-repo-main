"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Select, Textarea, Field, Badge, Banner, Row, Empty, Timeline } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, useStore, money, claimNumber } from "../shared";

const TYPES = ["Theft", "Water damage", "Fire", "Accidental damage", "Lost item"];
const STEPS = ["What happened", "Record your statement", "Submitted"];

export default function Claims() {
  const [s, update] = useStore();
  const [step, setStep] = useState(0);
  const [type, setType] = useState(TYPES[0]);
  const [amount, setAmount] = useState("850");
  const [detail, setDetail] = useState("");
  const [recorded, setRecorded] = useState(false);
  const [error, setError] = useState(null);
  const [filed, setFiled] = useState(null);

  if (!s.policy) {
    return (
      <Shell brand={BRAND}><Nav />
        <Page title="File a claim">
          <Empty>
            You need an active policy to file a claim.{" "}
            <Link href={`${BASE}/quote`} data-testid="go-quote">Get a quote</Link>.
          </Empty>
        </Page>
      </Shell>
    );
  }

  function next() {
    if (!detail.trim() || Number(amount) <= 0) {
      setError("Tell us what happened and roughly what it is worth.");
      return;
    }
    setError(null);
    setStep(1);
  }

  function submit() {
    if (!recorded) { setError("Record your statement before submitting — it is how claims are paid fast."); return; }
    const value = Number(amount);
    const payout = Math.max(0, Math.round((value - s.policy.deductible) * 100) / 100);
    const claim = {
      id: claimNumber(s.claims.length), type, amount: value, detail: detail.trim(),
      deductible: s.policy.deductible, payout, status: "Submitted", filedOn: "2026-09-16",
      statement: "Video statement recorded",
    };
    update((st) => { st.claims.unshift(claim); return st; });
    setError(null);
    setFiled(claim);
    setStep(2);
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="File a claim" sub={`Policy ${s.policy.number}`}>
        {error && <Banner tone="bad" testId="claim-error">{error}</Banner>}
        <Timeline steps={STEPS} current={step} testId="claim-steps" />

        {step === 0 && (
          <Card title="What happened?" testId="claim-step-1">
            <Field label="Type of claim">
              <Select value={type} data-testid="claim-type" aria-label="Claim type"
                      onChange={(e) => setType(e.target.value)}>
                {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </Select>
            </Field>
            <Field label="Roughly what is it worth">
              <Input value={amount} data-testid="claim-amount" aria-label="Amount"
                     onChange={(e) => setAmount(e.target.value)} />
            </Field>
            <Field label="Tell us in your own words">
              <Textarea value={detail} data-testid="claim-detail" aria-label="What happened"
                        onChange={(e) => setDetail(e.target.value)} />
            </Field>
            <div className="ck-card-actions">
              <Btn onClick={next} data-testid="claim-next">Next</Btn>
            </div>
          </Card>
        )}

        {step === 1 && (
          <Card title="Record a short statement" testId="claim-step-2">
            <p className="ck-muted">
              Say what happened in your own words. This is the step that lets most claims pay out in minutes.
            </p>
            <div className="ck-tile" data-testid="recorder"
                 style={{ minHeight: 140, display: "grid", placeItems: "center", background: "#111", color: "#fff" }}>
              <span style={{ fontSize: 34 }}>{recorded ? "✅" : "⏺"}</span>
              <strong data-testid="recorder-state">{recorded ? "Statement recorded" : "Ready to record"}</strong>
            </div>
            <div className="ck-card-actions">
              <Btn variant={recorded ? "secondary" : "primary"} data-testid="record-statement"
                   onClick={() => setRecorded(true)}>
                {recorded ? "Record again" : "Record statement"}
              </Btn>
              <Btn onClick={submit} data-testid="submit-claim">Submit the claim</Btn>
              <Btn variant="ghost" onClick={() => setStep(0)}>Back</Btn>
            </div>
          </Card>
        )}

        {step === 2 && filed && (
          <Card title="Claim submitted" tone="ok" testId="claim-confirmation">
            <Row label="Claim id" value={filed.id} testId="claim-id" />
            <Row label="Type" value={filed.type} testId="claim-type-value" />
            <Row label="Claimed" value={money(filed.amount)} testId="claim-amount-value" />
            <Row label="Deductible" value={money(filed.deductible)} testId="claim-deductible" />
            <Row label="Expected payout" value={money(filed.payout)} strong testId="claim-payout" />
            <Badge tone="info" testId="claim-status">{filed.status}</Badge>
            <div className="ck-card-actions">
              <Btn variant="ghost" data-testid="file-another"
                   onClick={() => { setStep(0); setFiled(null); setRecorded(false); setDetail(""); }}>
                File another
              </Btn>
            </div>
          </Card>
        )}

        <Card title="Your claims" testId="claim-list">
          <Row label="Claims filed" value={s.claims.length} testId="claim-count" />
          {s.claims.length === 0 && <Empty>No claims filed.</Empty>}
          {s.claims.map((c) => (
            <div key={c.id} className="ck-row" data-testid={`claim-${c.id}`}>
              <span>
                <strong>{c.id}</strong>
                <div className="ck-muted">{c.type} · {money(c.amount)} · filed {c.filedOn}</div>
              </span>
              <Badge tone="info" testId={`status-${c.id}`}>{c.status}</Badge>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
