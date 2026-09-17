"use client";
// Membership cancel and rejoin (47.5). Cancelling keeps access until a stated
// end date rather than cutting it off, and restarting clears that date.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Modal, Radio } from "../../clones/kit/ui";
import { PLANS, findPlan, useStore } from "../account-store";
import { BASE } from "../lib";
import StreamFooter from "../StreamFooter";

const BRAND = { name: "STREAMFLIX", slug: "netflix", footer: false, mark: "▶", home: BASE, accent: "#e50914", accentText: "#fff", bg: "#f5f5f5" };
const money = (n) => "$" + Number(n).toFixed(2);
const END_DATE = "October 9, 2026";

export default function AccountPage() {
  const [s, update] = useStore();
  const [confirm, setConfirm] = useState(false);
  const [planId, setPlanId] = useState("standard");
  const [notice, setNotice] = useState(null);

  const m = s.membership;
  const plan = m.planId ? findPlan(m.planId) : null;

  function cancel() {
    update((st) => { st.membership.status = "cancelled"; st.membership.endsOn = END_DATE; return st; });
    setConfirm(false);
    setNotice(`Membership cancelled. You keep access until ${END_DATE}.`);
  }
  function restart() {
    update((st) => {
      st.membership.status = "active";
      st.membership.endsOn = null;
      st.membership.planId = st.membership.planId || planId;
      return st;
    });
    setNotice("Membership restarted — welcome back.");
  }
  function join() {
    update((st) => {
      st.membership = { status: "active", planId, startedAt: "2026-09-15", endsOn: null, card: "Visa ending in 4242" };
      return st;
    });
    setNotice("Membership started.");
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Browse" }, { href: `${BASE}/profiles`, label: "Profiles" }]} />
      <Page title="Account" sub="Membership and billing">
        {notice && <Banner tone="ok" testId="account-notice" onClose={() => setNotice(null)}>{notice}</Banner>}

        <Card title="Membership" testId="membership-card">
          <Row label="Status" value={m.status === "none" ? "Not a member" : m.status} testId="membership-status" />
          {plan && <Row label="Plan" value={`${plan.name} · ${money(plan.price)}/month`} testId="membership-plan" />}
          {m.card && <Row label="Payment method" value={m.card} />}

          {m.status === "active" && (
            <>
              <Badge tone="ok" testId="status-badge">Active</Badge>
              <div className="ck-card-actions">
                <Btn variant="secondary" onClick={() => setConfirm(true)} data-testid="cancel-membership">
                  Cancel membership
                </Btn>
              </div>
            </>
          )}

          {m.status === "cancelled" && (
            <>
              <Badge tone="warn" testId="status-badge">Cancelled</Badge>
              <Banner tone="warn" title="Your membership is ending" testId="end-date-banner">
                You have access until <strong data-testid="access-until">{m.endsOn}</strong>.
              </Banner>
              <Btn onClick={restart} data-testid="restart-membership">Restart membership</Btn>
            </>
          )}

          {m.status === "none" && (
            <>
              <Badge tone="bad" testId="status-badge">No membership</Badge>
              <div style={{ marginTop: 10 }}>
                {PLANS.map((p) => (
                  <Radio key={p.id} name="joinplan" label={`${p.name} — ${money(p.price)}/month`} detail={p.quality}
                         testId={`join-plan-${p.id}`} checked={planId === p.id} onChange={() => setPlanId(p.id)} />
                ))}
                <Btn block onClick={join} data-testid="join-now">Start membership</Btn>
                <Btn as="link" href={`${BASE}/signup`} variant="ghost" block>Full signup flow</Btn>
              </div>
            </>
          )}
        </Card>

        <Modal open={confirm} title="Cancel your membership?" onClose={() => setConfirm(false)} testId="cancel-modal"
               actions={<>
                 <Btn variant="secondary" onClick={() => setConfirm(false)} data-testid="keep-membership">Keep membership</Btn>
                 <Btn variant="danger" onClick={cancel} data-testid="confirm-cancel">Cancel membership</Btn>
               </>}>
          <p>You'll keep access until <strong>{END_DATE}</strong>. After that your profiles and downloads are removed.</p>
        </Modal>
      </Page>
      <StreamFooter />
    </Shell>
  );
}
