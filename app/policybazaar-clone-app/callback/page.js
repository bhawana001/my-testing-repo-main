"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Select, Field, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, useStore, leadId } from "../shared";

const SLOTS = ["Today 18:00 – 19:00", "Tomorrow 10:00 – 11:00", "Tomorrow 16:00 – 17:00"];
const INTERESTS = ["Term life insurance", "Health insurance", "Motor insurance", "Investment plans"];

export default function Callback() {
  const [s, update] = useStore();
  const [name, setName] = useState(s.profile ? s.profile.name : "");
  const [mobile, setMobile] = useState("");
  const [interest, setInterest] = useState(INTERESTS[0]);
  const [slot, setSlot] = useState(SLOTS[0]);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(null);

  function submit() {
    if (!name.trim()) { setError("Enter your name."); return; }
    if (!/^\d{10}$/.test(mobile.trim())) { setError("Enter a 10 digit mobile number."); return; }
    const lead = {
      id: leadId(s.callbacks.length), name: name.trim(), mobile: mobile.trim(),
      interest, slot, advisor: "Rhea Menon", status: "Callback scheduled", at: "now",
    };
    update((st) => { st.callbacks.unshift(lead); return st; });
    setError(null);
    setDone(lead);
    setMobile("");
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Talk to an advisor" sub="Tell us when suits and we will call">
        {error && <Banner tone="bad" testId="lead-error">{error}</Banner>}

        {done && (
          <Card title="Callback scheduled" tone="ok" testId="callback-confirmation">
            <Row label="Reference" value={done.id} testId="lead-reference" />
            <Row label="We will call" value={done.mobile} testId="lead-mobile" />
            <Row label="Window" value={done.slot} testId="lead-slot" />
            <Row label="Advisor" value={done.advisor} testId="lead-advisor" />
            <Row label="About" value={done.interest} testId="lead-interest" />
            <Badge tone="ok" testId="lead-status">{done.status}</Badge>
          </Card>
        )}

        <Card title="Your details">
          <Field label="Name">
            <Input value={name} data-testid="lead-name" aria-label="Name" onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Mobile number" hint="10 digits">
            <Input value={mobile} placeholder="9876543210" data-testid="lead-mobile-input" aria-label="Mobile number"
                   onChange={(e) => setMobile(e.target.value)} />
          </Field>
          <Field label="I am interested in">
            <Select value={interest} data-testid="lead-interest-select" aria-label="Interest"
                    onChange={(e) => setInterest(e.target.value)}>
              {INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
            </Select>
          </Field>
          <Field label="Call me">
            <Select value={slot} data-testid="lead-slot-select" aria-label="Callback slot"
                    onChange={(e) => setSlot(e.target.value)}>
              {SLOTS.map((x) => <option key={x} value={x}>{x}</option>)}
            </Select>
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={submit} data-testid="request-callback">Request a callback</Btn>
          </div>
        </Card>

        <Card title="Your requests" testId="callback-list">
          <Row label="Callbacks requested" value={s.callbacks.length} testId="callback-count" />
          {s.callbacks.length === 0 && <Empty>Nothing requested yet.</Empty>}
          {s.callbacks.map((c) => (
            <div key={c.id} className="ck-row" data-testid={`callback-${c.id}`}>
              <span>
                <strong>{c.id}</strong>
                <div className="ck-muted">{c.interest} · {c.slot} · {c.advisor}</div>
              </span>
              <Badge tone="ok" testId={`callback-status-${c.id}`}>{c.status}</Badge>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
