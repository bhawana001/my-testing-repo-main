"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Select, Field, Check, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, INSURERS, COVERS, TERMS, useStore, inr, termPremium } from "../shared";

export default function Term() {
  const [s, update] = useStore();
  const [name, setName] = useState("");
  const [age, setAge] = useState("32");
  const [gender, setGender] = useState("Female");
  const [smoker, setSmoker] = useState(false);
  const [cover, setCover] = useState(10000000);
  const [term, setTerm] = useState(30);
  const [shown, setShown] = useState(false);
  const [error, setError] = useState(null);

  const ageNum = Number(age);

  function compare() {
    if (!name.trim()) { setError("Enter your name."); return; }
    if (!ageNum || ageNum < 18 || ageNum > 65) { setError("Age must be between 18 and 65."); return; }
    update((st) => {
      st.profile = { name: name.trim(), age: ageNum, gender, smoker, cover, term };
      return st;
    });
    setError(null);
    setShown(true);
  }

  const quotes = INSURERS.map((i) => ({
    insurer: i,
    annual: termPremium({ age: ageNum, cover, term, smoker, insurerFactor: i.factor }),
  })).sort((a, b) => a.annual - b.annual);

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Term life insurance" sub="Enter your details once and compare every insurer" wide>
        {error && <Banner tone="bad" testId="term-error">{error}</Banner>}

        <Card title="Your details">
          <Field label="Name">
            <Input value={name} placeholder="Priya Nair" data-testid="profile-name" aria-label="Name"
                   onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Age">
            <Input value={age} data-testid="profile-age" aria-label="Age" onChange={(e) => setAge(e.target.value)} />
          </Field>
          <Field label="Gender">
            <Select value={gender} data-testid="profile-gender" aria-label="Gender"
                    onChange={(e) => setGender(e.target.value)}>
              <option>Female</option><option>Male</option><option>Other</option>
            </Select>
          </Field>
          <Check checked={smoker} onChange={() => setSmoker((v) => !v)} label="I use tobacco"
                 detail="Tobacco use raises the premium on every plan" testId="profile-smoker" />
          <Field label="Life cover">
            <Select value={cover} data-testid="profile-cover" aria-label="Cover"
                    onChange={(e) => setCover(Number(e.target.value))}>
              {COVERS.map((c) => <option key={c} value={c}>{inr(c)}</option>)}
            </Select>
          </Field>
          <Field label="Policy term">
            <Select value={term} data-testid="profile-term" aria-label="Policy term"
                    onChange={(e) => setTerm(Number(e.target.value))}>
              {TERMS.map((t) => <option key={t} value={t}>{t} years</option>)}
            </Select>
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={compare} data-testid="compare-plans">Compare plans</Btn>
          </div>
        </Card>

        {shown && (
          <Card title="Plans for you" testId="comparison-table">
            <Row label="Profile"
                 value={`${s.profile.name}, ${s.profile.age}, ${s.profile.smoker ? "tobacco user" : "non-tobacco"}`}
                 testId="profile-summary" />
            <Row label="Cover" value={inr(cover)} testId="table-cover" />
            <Row label="Plans found" value={quotes.length} testId="plan-count" />
            {quotes.length === 0 && <Empty>No plans match.</Empty>}
            <table className="ck-table">
              <thead>
                <tr><th>Insurer</th><th>Cover</th><th>Term</th><th>Annual premium</th><th>Claims settled</th><th></th></tr>
              </thead>
              <tbody>
                {quotes.map((q, i) => (
                  <tr key={q.insurer.id} data-testid={`plan-${i}`}>
                    <td data-testid={`plan-insurer-${i}`}>{q.insurer.name}</td>
                    <td data-testid={`plan-cover-${i}`}>{inr(cover)}</td>
                    <td>{term} years</td>
                    <td data-testid={`plan-premium-${i}`}>{inr(q.annual)}</td>
                    <td><Badge tone="ok">{q.insurer.claimRatio}%</Badge></td>
                    <td>
                      <Link href={`${BASE}/callback`} className="ck-btn ck-btn--primary ck-btn--sm"
                            data-testid={`buy-${i}`}>Get a callback</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Row label="Cheapest" value={`${quotes[0].insurer.name} at ${inr(quotes[0].annual)}`}
                 strong testId="cheapest-plan" />
          </Card>
        )}
      </Page>
    </Shell>
  );
}
