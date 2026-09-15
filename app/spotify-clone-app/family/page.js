"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Field, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, PLANS, ME, useStore } from "../shared";

export default function Family() {
  const [s, update] = useStore();
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState(null);

  const seats = PLANS.family.seats;
  const used = s.family.members.length + s.family.invites.filter((i) => i.status === "Pending").length;

  function invite() {
    const to = email.trim();
    if (!to.includes("@")) { setNotice({ tone: "bad", msg: "Enter a valid email address." }); return; }
    if (used >= seats) { setNotice({ tone: "bad", msg: `The family plan is full — ${seats} of ${seats} seats used.` }); return; }
    if (s.family.invites.some((i) => i.email === to && i.status === "Pending")) {
      setNotice({ tone: "info", msg: "That person already has a pending invite." });
      return;
    }
    update((st) => {
      st.family.invites.unshift({ id: `inv_${st.counter++}`, email: to, status: "Pending", sentBy: ME.name, at: "now" });
      return st;
    });
    setEmail("");
    setNotice({ tone: "ok", msg: `Invite sent to ${to} — it stays pending until they accept.` });
  }

  function accept(id) {
    update((st) => {
      const inv = st.family.invites.find((i) => i.id === id);
      if (!inv) return st;
      inv.status = "Accepted";
      st.family.members.push({ email: inv.email, name: inv.email.split("@")[0], status: "Member" });
      return st;
    });
    setNotice({ tone: "ok", msg: "Invite accepted — they are on the plan." });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Premium Family" sub={`${used} of ${seats} seats used`}>
        {notice && <Banner tone={notice.tone} testId="family-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        {s.plan !== "family" && (
          <Banner tone="warn" testId="needs-family-plan">
            You are on {PLANS[s.plan].label}. Invites still work here for testing, but the seats only bill on{" "}
            <Link href="/spotify-clone-app/premium">Premium Family</Link>.
          </Banner>
        )}

        <Card title="Invite someone">
          <Field label="Email">
            <Input value={email} placeholder="sam@home.test" data-testid="invite-email" aria-label="Email"
                   onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && invite()} />
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={invite} data-testid="send-invite">Send invite</Btn>
          </div>
        </Card>

        <Card title="Invites" testId="invite-list">
          <Row label="Pending invites" value={s.family.invites.filter((i) => i.status === "Pending").length}
               testId="pending-count" />
          {s.family.invites.length === 0 && <Empty>No invites sent.</Empty>}
          {s.family.invites.map((i) => (
            <div key={i.id} className="ck-row" data-testid={`invite-${i.id}`}>
              <span>
                <strong data-testid={`invite-email-${i.id}`}>{i.email}</strong>
                <div className="ck-muted">Sent by {i.sentBy}</div>
              </span>
              <span>
                <Badge tone={i.status === "Pending" ? "warn" : "ok"} testId={`invite-status-${i.id}`}>{i.status}</Badge>{" "}
                {i.status === "Pending" && (
                  <Btn size="sm" variant="ghost" data-testid={`accept-${i.id}`} onClick={() => accept(i.id)}>
                    Accept as them
                  </Btn>
                )}
              </span>
            </div>
          ))}
        </Card>

        <Card title="Members" testId="member-list">
          <Row label="Members" value={s.family.members.length} testId="member-count" />
          {s.family.members.map((m) => (
            <Row key={m.email} label={m.name} value={`${m.email} · ${m.status}`} testId={`member-${m.email}`} />
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
