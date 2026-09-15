"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Select, Field, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import {
  BRAND, BASE, DEDUCTIBLES, PROPERTY_STEPS, LIABILITY_STEPS, useStore, money, monthlyPremium,
} from "../shared";

export default function Coverage() {
  const [s, update] = useStore();
  const p = s.policy;
  const [property, setProperty] = useState(p ? p.property : 20000);
  const [liability, setLiability] = useState(p ? p.liability : 100000);
  const [deductible, setDeductible] = useState(p ? p.deductible : 500);
  const [notice, setNotice] = useState(null);

  if (!p) {
    return (
      <Shell brand={BRAND}><Nav />
        <Page title="Adjust coverage">
          <Empty>
            You do not have a policy yet.{" "}
            <Link href={`${BASE}/quote`} data-testid="go-quote">Get a quote</Link>.
          </Empty>
        </Page>
      </Shell>
    );
  }

  const proposed = monthlyPremium({ property, liability, deductible, cityId: p.cityId, hasPet: p.hasPet });
  const delta = Math.round((proposed - p.monthly) * 100) / 100;

  function apply() {
    update((st) => {
      const old = st.policy.monthly;
      st.policy.property = property;
      st.policy.liability = liability;
      st.policy.deductible = deductible;
      st.policy.monthly = proposed;
      st.policy.history.push({
        at: "2026-09-16",
        text: `Coverage changed — premium ${money(old)} → ${money(proposed)}`,
      });
      return st;
    });
    setNotice({
      tone: "ok",
      msg: `Coverage updated. Your premium is now ${money(proposed)} a month, ${
        delta >= 0 ? "up" : "down"} ${money(Math.abs(delta))}.`,
    });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Adjust your coverage" sub={`Policy ${p.number}`}>
        {notice && <Banner tone={notice.tone} testId="coverage-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Today" testId="current-coverage">
          <Row label="Personal property" value={money(p.property)} testId="current-property" />
          <Row label="Personal liability" value={money(p.liability)} testId="current-liability" />
          <Row label="Deductible" value={money(p.deductible)} testId="current-deductible" />
          <Row label="Monthly premium" value={money(p.monthly)} strong testId="current-premium" />
        </Card>

        <Card title="Change it">
          <Field label="Personal property">
            <Select value={property} data-testid="new-property" aria-label="Personal property"
                    onChange={(e) => setProperty(Number(e.target.value))}>
              {PROPERTY_STEPS.map((x) => <option key={x} value={x}>{money(x)}</option>)}
            </Select>
          </Field>
          <Field label="Personal liability">
            <Select value={liability} data-testid="new-liability" aria-label="Personal liability"
                    onChange={(e) => setLiability(Number(e.target.value))}>
              {LIABILITY_STEPS.map((x) => <option key={x} value={x}>{money(x)}</option>)}
            </Select>
          </Field>
          <Field label="Deductible">
            <Select value={deductible} data-testid="new-deductible" aria-label="Deductible"
                    onChange={(e) => setDeductible(Number(e.target.value))}>
              {DEDUCTIBLES.map((d) => <option key={d.value} value={d.value}>{money(d.value)}</option>)}
            </Select>
          </Field>
          <Row label="New monthly premium" value={money(proposed)} strong testId="new-premium" />
          <Row label="Change" value={`${delta >= 0 ? "+" : "−"}${money(Math.abs(delta))} a month`}
               testId="premium-delta" />
          <Badge tone={delta > 0 ? "warn" : delta < 0 ? "ok" : "neutral"} testId="delta-direction">
            {delta > 0 ? "Premium goes up" : delta < 0 ? "Premium goes down" : "No change"}
          </Badge>
          <div className="ck-card-actions">
            <Btn onClick={apply} disabled={delta === 0} data-testid="apply-coverage">Apply the change</Btn>
          </div>
        </Card>
      </Page>
    </Shell>
  );
}
