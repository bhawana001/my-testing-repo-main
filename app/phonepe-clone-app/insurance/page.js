"use client";
// Bike insurance quote journey (21.4). Vehicle details drive the premium, the
// no-claim bonus reduces it, and GST is shown separately.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input, Select, Radio } from "../../clones/kit/ui";
import { BRAND, BASE, BIKE_BRANDS, BIKE_MODELS, COVERS, premiumFor, useStore, money } from "../shared";

const NCB = [0, 20, 25, 35, 45];

export default function InsurancePage() {
  const [s, update] = useStore();
  const [step, setStep] = useState(1);
  const [reg, setReg] = useState("");
  const [brand, setBrand] = useState(BIKE_BRANDS[0]);
  const [model, setModel] = useState(BIKE_MODELS[BIKE_BRANDS[0]][0]);
  const [cc, setCc] = useState("150");
  const [cover, setCover] = useState("comprehensive");
  const [ncb, setNcb] = useState(20);
  const [err, setErr] = useState("");
  const [saved, setSaved] = useState(null);

  const p = premiumFor(cover, Number(cc) || 0, ncb);

  function next() {
    if (!/^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/.test(reg.trim().toUpperCase())) {
      setErr("Enter a registration like KA01AB1234.");
      return;
    }
    setErr("");
    setStep(2);
  }

  function saveQuote() {
    const id = "QT-" + (s.quotes.length + 1) + (s.counter + 1);
    const q = { id, reg: reg.trim().toUpperCase(), brand, model, cc: Number(cc), cover,
                ncb, ...p, at: "2026-09-15" };
    update((st) => { st.quotes.unshift(q); st.counter += 1; return st; });
    setSaved(q);
    setStep(3);
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }]} />
      <Page title="Bike insurance" sub={`Step ${step} of 3`}>
        {step === 1 && (
          <Card title="Your bike" testId="step-vehicle">
            <Field label="Registration number" error={err} hint="For example KA01AB1234">
              <Input value={reg} onChange={(e) => setReg(e.target.value)} aria-label="Registration number" data-testid="registration" />
            </Field>
            <div className="ck-grid ck-grid--2">
              <Field label="Brand">
                <Select value={brand} aria-label="Brand" data-testid="brand"
                        onChange={(e) => { setBrand(e.target.value); setModel(BIKE_MODELS[e.target.value][0]); }}>
                  {BIKE_BRANDS.map((b) => <option key={b}>{b}</option>)}
                </Select>
              </Field>
              <Field label="Model">
                <Select value={model} onChange={(e) => setModel(e.target.value)} aria-label="Model" data-testid="model">
                  {BIKE_MODELS[brand].map((m) => <option key={m}>{m}</option>)}
                </Select>
              </Field>
            </div>
            <Field label="Engine capacity (cc)">
              <Input value={cc} onChange={(e) => setCc(e.target.value)} inputMode="numeric" aria-label="Engine capacity" data-testid="cc" />
            </Field>
            <Btn block onClick={next} data-testid="to-cover">Get quotes</Btn>
          </Card>
        )}

        {step === 2 && (
          <>
            <Card title="Choose your cover" testId="step-cover">
              {COVERS.map((c) => {
                const q = premiumFor(c.id, Number(cc) || 0, ncb);
                return (
                  <Radio key={c.id} name="cover" testId={`cover-${c.id}`}
                         label={`${c.label} — ${money(q.total)}`} detail={c.detail}
                         checked={cover === c.id} onChange={() => setCover(c.id)} />
                );
              })}
              <Field label="No-claim bonus">
                <Select value={ncb} onChange={(e) => setNcb(Number(e.target.value))} aria-label="No-claim bonus" data-testid="ncb">
                  {NCB.map((n) => <option key={n} value={n}>{n}%</option>)}
                </Select>
              </Field>
            </Card>

            <Card title="Premium breakdown" testId="premium-breakdown">
              <Row label="Base premium" value={money(p.gross)} testId="premium-gross" />
              <Row label={`No-claim bonus (${ncb}%)`} value={`−${money(p.ncb)}`} testId="premium-ncb" />
              <Row label="Net premium" value={money(p.net)} testId="premium-net" />
              <Row label="GST (18%)" value={money(p.gst)} testId="premium-gst" />
              <Row label="Total payable" value={money(p.total)} strong testId="premium-total" />
              <Btn block onClick={saveQuote} data-testid="save-quote">Continue with this quote</Btn>
            </Card>
          </>
        )}

        {step === 3 && saved && (
          <>
            <Banner tone="ok" title="Quote ready" testId="quote-ready">
              Quote <strong data-testid="quote-id">{saved.id}</strong> for {saved.brand} {saved.model} —{" "}
              <strong data-testid="quote-total">{money(saved.total)}</strong>.
            </Banner>
            <Card title="Quote summary" testId="quote-summary">
              <Row label="Registration" value={saved.reg} testId="summary-reg" />
              <Row label="Vehicle" value={`${saved.brand} ${saved.model} · ${saved.cc}cc`} testId="summary-vehicle" />
              <Row label="Cover" value={COVERS.find((c) => c.id === saved.cover).label} testId="summary-cover" />
              <Row label="Total payable" value={money(saved.total)} strong testId="summary-total" />
              <Badge tone="ok">Quote saved</Badge>
            </Card>
          </>
        )}
      </Page>
    </Shell>
  );
}
