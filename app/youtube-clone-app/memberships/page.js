"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Field, Radio, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, TIERS, CHANNEL, ME, useStore } from "../shared";

export default function Memberships() {
  const [s, update] = useStore();
  const [tierId, setTierId] = useState("engineer");
  const [card, setCard] = useState("");
  const [error, setError] = useState(null);
  const [joined, setJoined] = useState(null);

  const tier = TIERS.find((t) => t.id === tierId);
  const active = s.memberships.find((m) => m.channel === CHANNEL.name) || null;

  function join() {
    if (card.replace(/\s/g, "").length < 15) {
      setError("Enter a card number — 4242 4242 4242 4242 works for testing.");
      return;
    }
    const membership = {
      id: `MEM-${6200 + s.memberships.length * 5}`,
      channel: CHANNEL.name, tier: tier.name, badge: tier.badge,
      price: tier.price, perks: tier.perks, since: "now",
      last4: card.replace(/\s/g, "").slice(-4),
    };
    update((st) => {
      st.memberships = st.memberships.filter((m) => m.channel !== CHANNEL.name);
      st.memberships.push(membership);
      st.payments.unshift({ id: membership.id, what: `${CHANNEL.name} — ${tier.name}`, amount: tier.price,
        last4: membership.last4, at: "now" });
      return st;
    });
    setError(null);
    setJoined(membership);
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Channel memberships" sub={CHANNEL.name}>
        {error && <Banner tone="bad" testId="membership-error">{error}</Banner>}
        {joined && (
          <Banner tone="ok" title="You are a member" testId="join-success">
            {joined.tier} active on {joined.channel} — charged ${joined.price.toFixed(2)} to •••• {joined.last4}.
          </Banner>
        )}

        {active && (
          <Card title="Your membership" tone="ok" testId="active-membership">
            <Row label="Channel" value={active.channel} testId="active-channel" />
            <Row label="Tier" value={active.tier} testId="active-tier" />
            <Row label="Monthly" value={`$${active.price.toFixed(2)}`} />
            <Badge tone="ok" testId="member-badge">{active.badge} {active.tier} member</Badge>
            <div data-testid="active-perks">
              {active.perks.map((p) => <Row key={p} label="Perk" value={p} testId={`perk-${p.slice(0, 8).replace(/\s+/g, "-").toLowerCase()}`} />)}
            </div>
            <div className="ck-card-actions">
              <Btn variant="ghost" data-testid="leave-membership"
                   onClick={() => { update((st) => { st.memberships = st.memberships.filter((m) => m.channel !== CHANNEL.name); return st; });
                                    setJoined(null); }}>
                Leave membership
              </Btn>
            </div>
          </Card>
        )}

        {!active && (
          <Card title="Choose a tier" testId="tier-list">
            {TIERS.map((t) => (
              <Radio key={t.id} name="tier" checked={tierId === t.id} label={`${t.badge} ${t.name} — $${t.price.toFixed(2)}/month`}
                     detail={t.perks.join(" · ")} testId={`tier-${t.id}`} onChange={() => setTierId(t.id)} />
            ))}
            <Field label="Card number" hint="Test card: 4242 4242 4242 4242">
              <Input value={card} placeholder="4242 4242 4242 4242" data-testid="card-number" aria-label="Card number"
                     onChange={(e) => setCard(e.target.value)} />
            </Field>
            <Row label="Total today" value={`$${tier.price.toFixed(2)}`} testId="join-total" />
            <div className="ck-card-actions">
              <Btn onClick={join} data-testid="join-membership">Join</Btn>
            </div>
          </Card>
        )}

        <Card title="Payments" testId="payments">
          {s.payments.length === 0 && <Empty>No payments yet.</Empty>}
          {s.payments.map((p) => (
            <Row key={p.id} label={p.id} value={`${p.what} · $${p.amount.toFixed(2)}`} testId={`payment-${p.id}`} />
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
