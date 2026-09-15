"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Field, Radio, Badge, Banner, Row } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, PLANS, ME, useStore } from "../shared";

export default function Premium() {
  const [s, update] = useStore();
  const [planId, setPlanId] = useState("premium");
  const [card, setCard] = useState("");
  const [error, setError] = useState(null);
  const [done, setDone] = useState(null);

  const plan = PLANS[planId];

  function upgrade() {
    if (card.replace(/\s/g, "").length < 15) {
      setError("Enter a card number — 4242 4242 4242 4242 works for testing.");
      return;
    }
    const receipt = {
      id: `SPF-${7300 + s.payments.length * 11}`,
      plan: plan.label, amount: plan.price, last4: card.replace(/\s/g, "").slice(-4), at: "now",
    };
    update((st) => {
      st.plan = planId;
      st.payments.unshift(receipt);
      if (planId === "family" && !st.family.members.length) {
        st.family.members.push({ email: ME.email, name: ME.name, status: "Owner" });
      }
      return st;
    });
    setError(null);
    setDone(receipt);
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Premium" sub={`You are on ${PLANS[s.plan].label}`}>
        {error && <Banner tone="bad" testId="upgrade-error">{error}</Banner>}
        {done && (
          <Banner tone="ok" title="Welcome to Premium" testId="upgrade-success">
            {done.plan} active — charged ${done.amount.toFixed(2)} to •••• {done.last4}, receipt {done.id}.
          </Banner>
        )}

        <Card title="Current plan" testId="plan-card">
          <Row label="Plan" value={PLANS[s.plan].label} testId="active-plan" />
          <Row label="Ads" value={PLANS[s.plan].ads ? "Ad-supported" : "No ads"} testId="ads-state" />
          <Badge tone={s.plan === "free" ? "neutral" : "ok"} testId="plan-badge">
            {s.plan === "free" ? "Free account" : "Premium active"}
          </Badge>
        </Card>

        {s.plan === "free" && (
          <Card title="Upgrade">
            <Radio name="plan" checked={planId === "premium"} label={PLANS.premium.label}
                   detail={`$${PLANS.premium.price.toFixed(2)} a month · no ads`}
                   testId="plan-premium" onChange={() => setPlanId("premium")} />
            <Radio name="plan" checked={planId === "family"} label={PLANS.family.label}
                   detail={`$${PLANS.family.price.toFixed(2)} a month · up to ${PLANS.family.seats} people`}
                   testId="plan-family" onChange={() => setPlanId("family")} />
            <Field label="Card number" hint="Test card: 4242 4242 4242 4242">
              <Input value={card} placeholder="4242 4242 4242 4242" data-testid="card-number"
                     aria-label="Card number" onChange={(e) => setCard(e.target.value)} />
            </Field>
            <Row label="Total today" value={`$${plan.price.toFixed(2)}`} testId="upgrade-total" />
            <div className="ck-card-actions">
              <Btn onClick={upgrade} data-testid="confirm-upgrade">Start Premium</Btn>
            </div>
          </Card>
        )}

        {s.plan !== "free" && (
          <Card title="What changed" testId="premium-benefits">
            <Row label="Ads" value="Removed" testId="benefit-ads" />
            <Row label="Downloads" value="Available offline" />
            <Row label="Audio" value="Very high quality" />
            <div className="ck-card-actions">
              <Btn variant="ghost" data-testid="cancel-premium"
                   onClick={() => update((st) => { st.plan = "free"; return st; })}>
                Back to Free
              </Btn>
            </div>
          </Card>
        )}

        <Card title="Receipts" testId="receipts">
          {s.payments.map((p) => (
            <Row key={p.id} label={p.id} value={`${p.plan} · $${p.amount.toFixed(2)} · •••• ${p.last4}`}
                 testId={`receipt-${p.id}`} />
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
