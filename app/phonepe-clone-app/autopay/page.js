"use client";
// UPI autopay mandate (21.2). A mandate needs a max limit at or above the
// service amount, and it states when the first debit will happen.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input, Select, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, SERVICES, useStore, money } from "../shared";

const PIN = "4321";

export default function AutopayPage() {
  const [s, update] = useStore();
  const [serviceId, setServiceId] = useState(SERVICES[0].id);
  const [maxLimit, setMaxLimit] = useState(String(SERVICES[0].maxLimit));
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const [created, setCreated] = useState(null);

  const service = SERVICES.find((x) => x.id === serviceId);

  function create() {
    const lim = Number(maxLimit);
    if (!lim || lim < service.amount) {
      setErr(`The max limit must be at least ${money(service.amount)} for this service.`);
      return;
    }
    if (pin !== PIN) { setErr("Incorrect UPI PIN."); return; }
    setErr("");
    const id = "UM-" + (s.mandates.length + 1) + "0" + (s.counter + 1);
    const mandate = { id, service: service.name, amount: service.amount, frequency: service.frequency,
                      maxLimit: lim, status: "Active", firstDebit: "2026-10-15", createdAt: "2026-09-15" };
    update((st) => { st.mandates.unshift(mandate); st.counter += 1; return st; });
    setCreated(mandate);
    setPin("");
  }

  function pause(id) {
    update((st) => {
      const m = st.mandates.find((x) => x.id === id);
      if (m) m.status = m.status === "Active" ? "Paused" : "Active";
      return st;
    });
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/history`, label: "History" }]} />
      <Page title="UPI Autopay">
        {created && (
          <Banner tone="ok" title="Mandate created" testId="mandate-created">
            <strong data-testid="mandate-id">{created.id}</strong> for {created.service} —{" "}
            <strong data-testid="mandate-amount">{money(created.amount)}</strong> {created.frequency.toLowerCase()},
            first debit <strong data-testid="first-debit">{created.firstDebit}</strong>.
          </Banner>
        )}

        <div className="ck-split">
          <Card title="Set up a mandate" testId="mandate-form">
            <Field label="Service">
              <Select value={serviceId} aria-label="Service" data-testid="service"
                      onChange={(e) => { setServiceId(e.target.value); setMaxLimit(String(SERVICES.find((x) => x.id === e.target.value).maxLimit)); }}>
                {SERVICES.map((x) => <option key={x.id} value={x.id}>{x.name} · {money(x.amount)} {x.frequency.toLowerCase()}</option>)}
              </Select>
            </Field>
            <Row label="Debit amount" value={money(service.amount)} testId="debit-amount" />
            <Row label="Frequency" value={service.frequency} testId="frequency" />
            <Field label="Maximum limit per debit" error={err}
                   hint={`Must be at least ${money(service.amount)}`}>
              <Input value={maxLimit} onChange={(e) => setMaxLimit(e.target.value)} inputMode="decimal"
                     aria-label="Maximum limit" data-testid="max-limit" />
            </Field>
            <Field label="UPI PIN" hint="Demo PIN 4321">
              <Input type="password" value={pin} onChange={(e) => setPin(e.target.value)} inputMode="numeric"
                     maxLength={4} aria-label="UPI PIN" data-testid="upi-pin" />
            </Field>
            <Btn block onClick={create} data-testid="create-mandate">Approve mandate</Btn>
          </Card>

          <Card title={`Your mandates (${s.mandates.length})`} testId="mandate-list">
            {s.mandates.length === 0 ? <Empty>No mandates yet.</Empty> : s.mandates.map((m) => (
              <div key={m.id} data-testid={`mandate-${m.id}`}>
                <Row label={m.service} value={`${money(m.amount)} ${m.frequency.toLowerCase()}`} />
                <div className="ck-muted">Max {money(m.maxLimit)} · first debit {m.firstDebit}</div>
                <Badge tone={m.status === "Active" ? "ok" : "warn"} testId={`mandate-status-${m.id}`}>{m.status}</Badge>
                <Btn size="sm" variant="ghost" onClick={() => pause(m.id)} data-testid={`toggle-${m.id}`}>
                  {m.status === "Active" ? "Pause" : "Resume"}
                </Btn>
              </div>
            ))}
          </Card>
        </div>
      </Page>
    </Shell>
  );
}
