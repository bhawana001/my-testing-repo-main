"use client";
import { useState } from "react";
import { Shell, Page, Card, Input, Select, Field, Check, Row, Badge } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, INSURERS, COVERS, TERMS, inr, termPremium } from "../shared";

/**
 * The premium recalculates on every change — there is deliberately no Calculate
 * button, because "recalculates on each change" is the behaviour being checked.
 */
export default function Calculator() {
  const [age, setAge] = useState(30);
  const [cover, setCover] = useState(10000000);
  const [term, setTerm] = useState(30);
  const [smoker, setSmoker] = useState(false);
  const [insurerId, setInsurerId] = useState("ins_mer");

  const insurer = INSURERS.find((i) => i.id === insurerId);
  const annual = termPremium({ age, cover, term, smoker, insurerFactor: insurer.factor });
  const monthly = Math.round(annual / 12);

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Premium calculator" sub="Move any control and the number updates immediately">
        <Card title="Inputs">
          <Field label={`Age — ${age}`}>
            <Input type="range" min="18" max="65" value={age} data-testid="age-slider" aria-label="Age"
                   onChange={(e) => setAge(Number(e.target.value))} />
          </Field>
          <Field label="Age (exact)">
            <Input value={age} data-testid="age-input" aria-label="Age exact"
                   onChange={(e) => setAge(Number(e.target.value) || 0)} />
          </Field>
          <Field label="Life cover">
            <Select value={cover} data-testid="cover-select" aria-label="Cover"
                    onChange={(e) => setCover(Number(e.target.value))}>
              {COVERS.map((c) => <option key={c} value={c}>{inr(c)}</option>)}
            </Select>
          </Field>
          <Field label="Policy term">
            <Select value={term} data-testid="term-select" aria-label="Term"
                    onChange={(e) => setTerm(Number(e.target.value))}>
              {TERMS.map((t) => <option key={t} value={t}>{t} years</option>)}
            </Select>
          </Field>
          <Field label="Insurer">
            <Select value={insurerId} data-testid="insurer-select" aria-label="Insurer"
                    onChange={(e) => setInsurerId(e.target.value)}>
              {INSURERS.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
            </Select>
          </Field>
          <Check checked={smoker} onChange={() => setSmoker((v) => !v)} label="Tobacco user"
                 detail="Adds 55% to the premium" testId="smoker-toggle" />
        </Card>

        <Card title="Your premium" tone="ok" testId="premium-output">
          <Row label="Age used" value={age} testId="output-age" />
          <Row label="Cover" value={inr(cover)} testId="output-cover" />
          <Row label="Term" value={`${term} years`} testId="output-term" />
          <Row label="Insurer" value={insurer.name} testId="output-insurer" />
          <Row label="Annual premium" value={inr(annual)} strong testId="annual-premium" />
          <Row label="Monthly equivalent" value={inr(monthly)} testId="monthly-premium" />
          <Badge tone={smoker ? "warn" : "ok"} testId="risk-badge">
            {smoker ? "Tobacco loading applied" : "Non-tobacco rate"}
          </Badge>
        </Card>
      </Page>
    </Shell>
  );
}
