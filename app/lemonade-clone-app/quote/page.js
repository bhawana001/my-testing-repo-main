"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Select, Field, Check, Badge, Banner, Row, Timeline } from "../../clones/kit/ui";
import Nav from "../Nav";
import {
  BRAND, BASE, CITIES, DEDUCTIBLES, PROPERTY_STEPS, LIABILITY_STEPS,
  useStore, money, monthlyPremium,
} from "../shared";

const STEPS = ["About you", "Your place", "Coverage", "Your price"];

/** Maya asks one thing at a time, the way the real quote flow does. */
export default function Quote() {
  const [s, update] = useStore();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [cityId, setCityId] = useState("portside");
  const [hasPet, setHasPet] = useState(false);
  const [property, setProperty] = useState(20000);
  const [liability, setLiability] = useState(100000);
  const [deductible, setDeductible] = useState(500);
  const [error, setError] = useState(null);

  const monthly = monthlyPremium({ property, liability, deductible, cityId, hasPet });

  function next() {
    if (step === 0 && !name.trim()) { setError("Maya needs your name first."); return; }
    setError(null);
    setStep((x) => Math.min(STEPS.length - 1, x + 1));
    if (step === 2) {
      update((st) => {
        st.quote = {
          name: name.trim(), cityId, hasPet, property, liability, deductible,
          monthly: monthlyPremium({ property, liability, deductible, cityId, hasPet }),
        };
        return st;
      });
    }
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Let's get you covered" sub="Maya asks a few questions and prices it instantly">
        {error && <Banner tone="bad" testId="quote-error">{error}</Banner>}
        <Timeline steps={STEPS} current={step} testId="quote-steps" />

        {step === 0 && (
          <Card title="Hi — I'm Maya. What should I call you?" testId="step-about">
            <Field label="Your name">
              <Input value={name} placeholder="Priya" data-testid="quote-name" aria-label="Your name"
                     onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && next()} />
            </Field>
            <div className="ck-card-actions"><Btn onClick={next} data-testid="quote-next-1">Next</Btn></div>
          </Card>
        )}

        {step === 1 && (
          <Card title={`Nice to meet you, ${name}. Where do you rent?`} testId="step-place">
            <Field label="City">
              <Select value={cityId} data-testid="quote-city" aria-label="City"
                      onChange={(e) => setCityId(e.target.value)}>
                {CITIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
            </Field>
            <Check checked={hasPet} onChange={() => setHasPet((v) => !v)} label="I have a pet"
                   detail="Pets add a little to liability risk" testId="quote-pet" />
            <div className="ck-card-actions">
              <Btn onClick={next} data-testid="quote-next-2">Next</Btn>
              <Btn variant="ghost" onClick={() => setStep(0)}>Back</Btn>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card title="How much cover do you want?" testId="step-coverage">
            <Field label="Personal property">
              <Select value={property} data-testid="quote-property" aria-label="Personal property"
                      onChange={(e) => setProperty(Number(e.target.value))}>
                {PROPERTY_STEPS.map((p) => <option key={p} value={p}>{money(p)}</option>)}
              </Select>
            </Field>
            <Field label="Personal liability">
              <Select value={liability} data-testid="quote-liability" aria-label="Personal liability"
                      onChange={(e) => setLiability(Number(e.target.value))}>
                {LIABILITY_STEPS.map((l) => <option key={l} value={l}>{money(l)}</option>)}
              </Select>
            </Field>
            <Field label="Deductible">
              <Select value={deductible} data-testid="quote-deductible" aria-label="Deductible"
                      onChange={(e) => setDeductible(Number(e.target.value))}>
                {DEDUCTIBLES.map((d) => <option key={d.value} value={d.value}>{money(d.value)}</option>)}
              </Select>
            </Field>
            <Row label="Running price" value={`${money(monthly)} a month`} testId="running-price" />
            <div className="ck-card-actions">
              <Btn onClick={next} data-testid="quote-next-3">See my price</Btn>
              <Btn variant="ghost" onClick={() => setStep(1)}>Back</Btn>
            </div>
          </Card>
        )}

        {step === 3 && s.quote && (
          <Card title={`${s.quote.name}, here's your price`} tone="ok" testId="quote-result">
            <Row label="Monthly premium" value={money(s.quote.monthly)} strong testId="quote-premium" />
            <Row label="Annual" value={money(Math.round(s.quote.monthly * 12 * 100) / 100)} testId="quote-annual" />
            <Badge tone="ok" testId="quote-badge">Quote ready</Badge>
            <h3>Coverage summary</h3>
            <Row label="Personal property" value={money(s.quote.property)} testId="summary-property" />
            <Row label="Personal liability" value={money(s.quote.liability)} testId="summary-liability" />
            <Row label="Deductible" value={money(s.quote.deductible)} testId="summary-deductible" />
            <Row label="Loss of use" value={money(Math.round(s.quote.property * 0.3))} testId="summary-loss-of-use" />
            <Row label="City" value={CITIES.find((c) => c.id === s.quote.cityId).name} testId="summary-city" />
            <Row label="Pet in the home" value={s.quote.hasPet ? "Yes" : "No"} testId="summary-pet" />
            <div className="ck-card-actions">
              <Link href={`${BASE}/policy`} className="ck-btn ck-btn--primary" data-testid="go-buy">
                Buy this policy
              </Link>
              <Btn variant="ghost" onClick={() => setStep(2)} data-testid="change-coverage">Change the cover</Btn>
            </div>
          </Card>
        )}
      </Page>
    </Shell>
  );
}
