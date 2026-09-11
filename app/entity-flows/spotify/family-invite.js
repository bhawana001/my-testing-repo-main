"use client";
import { useState } from "react";
import { sendEmail } from "@/lib/inbox";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, Input, Alert, Badge, KV } from "@/app/components/eval/ui";
import { isValidEmail } from "@/lib/seed";

const seed = () => ({ members: [{ email: "demo@evals.dev", name: "Demo User", role: "Plan manager", status: "Active" }], emails: [] });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [email, setEmail] = useState(""); const [err, setErr] = useState(null);
  function invite() {
    const e = email.trim().toLowerCase();
    if (!isValidEmail(e)) { setErr("Enter a valid email address."); return; }
    if (s.members.some((m) => m.email === e)) { setErr("This person is already on your plan or invited."); return; }
    if (s.members.length >= 6) { setErr("Your Family plan is full (6 accounts)."); return; }
    setErr(null);
    sendEmail({ to: e, subject: "Demo User invited you to Spotifly Premium Family", body: "Join the family plan: spotifly.test/family/join/F8K2", from: "no-reply@spotifly.evals.dev", flow: "spotify/family-invite" });
    set({ members: [...s.members, { email: e, name: e.split("@")[0], role: "Member", status: "Pending" }], emails: [{ to: e, subject: "Demo User invited you to Spotifly Premium Family", link: "spotifly.test/family/join/F8K2" }, ...s.emails] }); setEmail("");
  }
  return (
    <>
      <Topbar entity={ent} light={false} right={<Badge tone="ok">Premium Family</Badge>} />
      <main className="ee-main">
        <div className="ee-split">
          <Card title={`Premium Family · ${s.members.length} of 6 accounts`} data-testid="family">
            {s.members.map((m) => <div key={m.email} className="ee-row ee-row--between" style={{ padding: "6px 0" }} data-testid={`member-${m.email}`}><span><b>{m.name}</b> <span className="ee-small ee-muted">{m.email} · {m.role}</span></span><Badge tone={m.status === "Active" ? "ok" : "warn"} data-testid={`status-${m.email}`}>{m.status === "Pending" ? "Invite sent · Pending" : m.status}</Badge></div>)}
            <div className="ee-divider" />
            <div className="ee-row"><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" aria-label="Invite email" style={{ flex: 1 }} /><Btn style={{ background: "#1db954" }} onClick={invite} data-testid="send-invite">Send invite</Btn></div>
            {err && <Alert tone="err">{err}</Alert>}
          </Card>
          <Card title="Sent emails (simulated)" data-testid="sent-emails">{s.emails.length === 0 ? <div className="ee-empty">No invites sent.</div> : s.emails.map((m, i) => <div key={i} className="ee-card ee-card--flat ee-card--tight" data-testid={`email-${i}`}><div className="ee-small ee-muted">To: {m.to}</div><div className="ee-strong">{m.subject}</div><div className="ee-mono ee-tiny">{m.link}</div></div>)}</Card>
        </div>
      </main>
    </>
  );
}
