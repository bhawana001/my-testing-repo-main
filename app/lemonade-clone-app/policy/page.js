"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Field, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, CITIES, useStore, money, policyNumber } from "../shared";

export default function Policy() {
  const [s, update] = useStore();
  const [card, setCard] = useState("");
  const [error, setError] = useState(null);
  const [showDoc, setShowDoc] = useState(false);

  function buy() {
    if (!s.quote) { setError("Get a quote first."); return; }
    if (card.replace(/\s/g, "").length < 15) {
      setError("Enter a card number — 4242 4242 4242 4242 works for testing.");
      return;
    }
    const policy = {
      number: policyNumber(0), status: "Active",
      holder: s.quote.name, cityId: s.quote.cityId,
      property: s.quote.property, liability: s.quote.liability, deductible: s.quote.deductible,
      hasPet: s.quote.hasPet, monthly: s.quote.monthly,
      startsOn: "2026-09-16", renewsOn: "2027-09-16",
      last4: card.replace(/\s/g, "").slice(-4),
      history: [{ at: "2026-09-16", text: `Policy issued at ${money(s.quote.monthly)} a month` }],
    };
    update((st) => { st.policy = policy; return st; });
    setError(null);
  }

  if (!s.policy) {
    return (
      <Shell brand={BRAND}><Nav />
        <Page title="Buy your policy">
          {error && <Banner tone="bad" testId="buy-error">{error}</Banner>}
          {!s.quote && (
            <Empty>
              No quote yet. <Link href={`${BASE}/quote`} data-testid="go-quote">Get a quote</Link> first.
            </Empty>
          )}
          {s.quote && (
            <Card title="Confirm and pay" testId="buy-form">
              <Row label="Monthly premium" value={money(s.quote.monthly)} strong testId="buy-premium" />
              <Row label="Personal property" value={money(s.quote.property)} />
              <Row label="Personal liability" value={money(s.quote.liability)} />
              <Field label="Card number" hint="Test card: 4242 4242 4242 4242">
                <Input value={card} placeholder="4242 4242 4242 4242" data-testid="card-number"
                       aria-label="Card number" onChange={(e) => setCard(e.target.value)} />
              </Field>
              <div className="ck-card-actions">
                <Btn onClick={buy} data-testid="buy-policy">Activate my policy</Btn>
              </div>
            </Card>
          )}
        </Page>
      </Shell>
    );
  }

  const p = s.policy;

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Your policy" sub={`${p.number} · ${p.status}`}>
        <Card title="Policy" tone="ok" testId="policy-card">
          <Badge tone="ok" testId="policy-status">{p.status}</Badge>
          <Row label="Policy number" value={p.number} testId="policy-number" />
          <Row label="Policy holder" value={p.holder} testId="policy-holder" />
          <Row label="Monthly premium" value={money(p.monthly)} strong testId="policy-premium" />
          <Row label="Personal property" value={money(p.property)} testId="policy-property" />
          <Row label="Personal liability" value={money(p.liability)} testId="policy-liability" />
          <Row label="Deductible" value={money(p.deductible)} testId="policy-deductible" />
          <Row label="Starts" value={p.startsOn} />
          <Row label="Renews" value={p.renewsOn} />
          <Row label="Card on file" value={`•••• ${p.last4}`} />
          <div className="ck-card-actions">
            <Btn variant="secondary" data-testid="view-document" onClick={() => setShowDoc((v) => !v)}>
              {showDoc ? "Hide policy document" : "View policy document"}
            </Btn>
            <Link href={`${BASE}/coverage`} className="ck-btn ck-btn--ghost" data-testid="go-coverage">
              Adjust coverage
            </Link>
          </div>
        </Card>

        {showDoc && (
          <Card title="Policy document" testId="policy-document">
            <pre style={{ whiteSpace: "pre-wrap" }} data-testid="document-body">{
`LIMONADE RENTERS POLICY
Policy number: ${p.number}
Named insured: ${p.holder}
Location: ${CITIES.find((c) => c.id === p.cityId).name}
Period: ${p.startsOn} to ${p.renewsOn}

COVERAGE
  Personal property .......... ${money(p.property)}
  Personal liability ......... ${money(p.liability)}
  Loss of use ................ ${money(Math.round(p.property * 0.3))}
  Deductible ................. ${money(p.deductible)}

PREMIUM
  Monthly .................... ${money(p.monthly)}
  Annual ..................... ${money(Math.round(p.monthly * 12 * 100) / 100)}`
            }</pre>
            <a className="ck-btn ck-btn--secondary" data-testid="download-document"
               download={`${p.number}.txt`}
               href={`data:text/plain;charset=utf-8,${encodeURIComponent(`Limonade policy ${p.number} for ${p.holder}`)}`}>
              Download
            </a>
          </Card>
        )}

        <Card title="History" testId="policy-history">
          {p.history.map((h, i) => <Row key={i} label={h.at} value={h.text} testId={`history-${i}`} />)}
        </Card>
      </Page>
    </Shell>
  );
}
