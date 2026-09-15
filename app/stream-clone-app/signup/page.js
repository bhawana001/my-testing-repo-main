"use client";
// Signup with plan selection (47.1). The chosen plan is what the account shows
// afterwards, and the test card must be valid before the membership activates.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Radio, Badge, Field, Input, Banner } from "../../clones/kit/ui";
import { PLANS, findPlan, useStore } from "../account-store";
import { BASE } from "../lib";

const BRAND = { name: "STREAMFLIX", slug: "netflix", mark: "▶", home: BASE, accent: "#e50914", accentText: "#fff", bg: "#f5f5f5" };
const money = (n) => "$" + Number(n).toFixed(2);

export default function SignupPage() {
  const [s, update] = useStore();
  const [planId, setPlanId] = useState("standard");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(null);

  const plan = findPlan(planId);

  function subscribe() {
    if (!email.includes("@")) { setErr("Enter a valid email address."); return; }
    if (card.replace(/\s/g, "").length < 15) { setErr("Enter a valid card. Test card 4242 4242 4242 4242."); return; }
    setErr("");
    const membership = {
      status: "active", planId, startedAt: "2026-09-15", endsOn: null,
      card: "Visa ending in " + card.replace(/\s/g, "").slice(-4), email,
    };
    update((st) => { st.membership = membership; return st; });
    setDone({ ...membership, plan });
  }

  if (done) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Start watching" }, { href: `${BASE}/account`, label: "Account" }]} />
        <Page>
          <Banner tone="ok" title="Membership active" testId="signup-success">
            Your StreamFlix membership is active on the <strong data-testid="active-plan">{done.plan.name}</strong> plan.
          </Banner>
          <Card title="Your plan" testId="plan-summary">
            <Row label="Plan" value={done.plan.name} testId="summary-plan" />
            <Row label="Monthly price" value={money(done.plan.price)} testId="summary-price" />
            <Row label="Video quality" value={done.plan.quality} testId="summary-quality" />
            <Row label="Screens at once" value={String(done.plan.screens)} testId="summary-screens" />
            <Row label="Billed to" value={done.card} testId="summary-card" />
            <Badge tone="ok" testId="membership-status">Active</Badge>
          </Card>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Browse" }]} />
      <Page title="Choose the plan that's right for you" sub="Change or cancel at any time">
        <div className="ck-split">
          <Card title="Plans" testId="plan-list">
            {PLANS.map((p) => (
              <Radio key={p.id} name="plan" testId={`plan-${p.id}`}
                     label={`${p.name} — ${money(p.price)}/month`}
                     detail={`${p.quality} · ${p.screens} screen${p.screens === 1 ? "" : "s"} · ${p.downloads} download device${p.downloads === 1 ? "" : "s"}`}
                     checked={planId === p.id} onChange={() => setPlanId(p.id)} />
            ))}
          </Card>
          <Card title="Set up your account">
            <Field label="Email">
              <Input value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" data-testid="signup-email" />
            </Field>
            <Field label="Card number" error={err} hint="Test card 4242 4242 4242 4242">
              <Input value={card} onChange={(e) => setCard(e.target.value)} inputMode="numeric"
                     aria-label="Card number" data-testid="signup-card" />
            </Field>
            <Row label="Selected plan" value={`${plan.name} · ${money(plan.price)}/mo`} strong testId="selected-plan" />
            <Btn block onClick={subscribe} data-testid="start-membership">Start membership</Btn>
          </Card>
        </div>
      </Page>
    </Shell>
  );
}
