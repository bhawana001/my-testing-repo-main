"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Field, Badge, Banner, Row } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, PREMIUM_FEATURES, useStore, entitled } from "../shared";

export default function Premium() {
  const [s, update] = useStore();
  const [card, setCard] = useState("");
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  function subscribe() {
    if (card.replace(/\s/g, "").length < 15) {
      setError("Enter a card number — 4242 4242 4242 4242 works for testing.");
      return;
    }
    update((st) => {
      st.premium = true;
      st.payments.unshift({ id: `YTP-${5100 + st.payments.length * 9}`, what: "Yootube Premium", amount: 13.99,
        last4: card.replace(/\s/g, "").slice(-4), at: "now" });
      return st;
    });
    setError(null);
    setNotice({ tone: "ok", msg: "Premium is active — background play is now entitled." });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Yootube Premium" sub="Entitlements are checked per feature, not per page">
        {error && <Banner tone="bad" testId="premium-error">{error}</Banner>}
        {notice && <Banner tone={notice.tone} testId="premium-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Your account" testId="entitlement-card">
          <Row label="Premium" value={s.premium ? "Active" : "Not active"} testId="premium-state" />
          <Badge tone={s.premium ? "ok" : "neutral"} testId="premium-badge-inline">
            {s.premium ? "Premium member" : "Free account"}
          </Badge>
        </Card>

        <Card title="Feature entitlements" testId="entitlements">
          {PREMIUM_FEATURES.map((f) => (
            <div key={f.id} className="ck-row" data-testid={`feature-${f.id}`}>
              <span>
                <strong>{f.label}</strong>
                <div className="ck-muted">{f.premiumOnly ? "Premium only" : "Available to everyone"}</div>
              </span>
              <Badge tone={entitled(s, f.id) ? "ok" : "bad"} testId={`entitlement-${f.id}`}>
                {entitled(s, f.id) ? "Active" : "Not entitled"}
              </Badge>
            </div>
          ))}
          <Row label="Background play entitlement"
               value={entitled(s, "background") ? "true" : "false"} testId="background-flag" />
        </Card>

        {!s.premium ? (
          <Card title="Subscribe">
            <Field label="Card number" hint="Test card: 4242 4242 4242 4242">
              <Input value={card} placeholder="4242 4242 4242 4242" data-testid="card-number" aria-label="Card number"
                     onChange={(e) => setCard(e.target.value)} />
            </Field>
            <Row label="Monthly" value="$13.99" testId="premium-price" />
            <div className="ck-card-actions">
              <Btn onClick={subscribe} data-testid="subscribe">Start Premium</Btn>
            </div>
          </Card>
        ) : (
          <Card title="Manage">
            <div className="ck-card-actions">
              <Btn variant="ghost" data-testid="cancel-premium"
                   onClick={() => { update((st) => { st.premium = false; return st; });
                                    setNotice({ tone: "info", msg: "Premium cancelled — background play is no longer entitled." }); }}>
                Cancel Premium
              </Btn>
            </div>
          </Card>
        )}
      </Page>
    </Shell>
  );
}
