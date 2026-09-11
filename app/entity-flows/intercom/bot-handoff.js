"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Segment, Badge, Btn, KV, Input } from "@/app/components/eval/ui";
import { MessengerFrame, Bubble } from "@/app/components/engines/Messenger";

const seed = () => ({ view: "site", open: true, stage: "start", topic: null, invoice: null, transcript: [{ from: "bot", text: "Hi! I'm Fin, the Acme bot. What can I help with?" }], assigned: null });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [inv, setInv] = useState("");
  const say = (st, from, text) => ({ ...st, transcript: [...st.transcript, { from, text }] });
  function pickTopic(t) {
    let n = say(s, "me", t);
    n = t === "Billing" ? say({ ...n, topic: t, stage: "invoice" }, "bot", "Sure. What's the invoice number? (e.g. INV-2231)") : say({ ...n, topic: t, stage: "offer" }, "bot", "Try restarting the integration from Settings → Integrations. Did that help?");
    set(n);
  }
  function submitInvoice() { if (!/^INV-\d{4}$/i.test(inv.trim())) return; let n = say(s, "me", inv.trim().toUpperCase()); n = say({ ...n, invoice: inv.trim().toUpperCase(), stage: "offer" }, "bot", "This article may help: “Why was I charged twice?”. Did that answer your question?"); set(n); }
  function human() { let n = say(s, "me", "Talk to a person"); n = say({ ...n, stage: "handoff", assigned: { inbox: s.topic === "Billing" ? "Billing" : "Technical support", at: "10:04 AM" } }, "bot", `Connecting you to the ${s.topic === "Billing" ? "Billing" : "Technical support"} team. They'll reply here soon.`); set(n); }
  return (
    <>
      <Topbar entity={ent} nav={["Product", "Pricing", "Docs"]} light right={<Segment options={[{ value: "site", label: "Website" }, { value: "inbox", label: "Team inbox" }]} value={s.view} onChange={(v) => set({ ...s, view: v })} />} />
      <main className="ee-main">
        {s.view === "site" ? (<>
          <h1 className="ee-page-title">Acme Cloud · Billing</h1>
          <MessengerFrame open={s.open} onToggle={() => set({ ...s, open: !s.open })} title="Fin · Acme bot">
            <div className="ee-feed" data-testid="bot-thread">{s.transcript.map((m, i) => <Bubble key={i} me={m.from === "me"}>{m.text}</Bubble>)}</div>
            {s.stage === "start" && <div className="ee-row">{["Billing", "Technical issue"].map((t) => <Btn key={t} size="sm" variant="secondary" pill onClick={() => pickTopic(t)} data-testid={`topic-${t.split(" ")[0].toLowerCase()}`}>{t}</Btn>)}</div>}
            {s.stage === "invoice" && <div className="ee-row"><Input value={inv} onChange={(e) => setInv(e.target.value)} placeholder="INV-2231" aria-label="Invoice number" style={{ flex: 1 }} /><Btn size="sm" onClick={submitInvoice} data-testid="send-invoice">Send</Btn></div>}
            {s.stage === "offer" && <div className="ee-row"><Btn size="sm" variant="secondary" pill onClick={() => set(say({ ...s, stage: "resolved" }, "bot", "Great, glad that helped!"))}>Yes, thanks</Btn><Btn size="sm" pill onClick={human} data-testid="talk-to-person">Talk to a person</Btn></div>}
            {s.stage === "handoff" && <Badge tone="info" data-testid="handoff-status">Waiting for the {s.assigned.inbox} team</Badge>}
          </MessengerFrame>
        </>) : (
          <div className="ee-split ee-split--sidebar-left">
            <Card title="Inboxes" data-testid="inboxes">
              {["Unassigned", "Billing", "Technical support"].map((b) => <KV key={b} k={b} v={s.assigned?.inbox === b ? 1 : 0} testId={`inbox-count-${b.split(" ")[0].toLowerCase()}`} />)}
            </Card>
            <Card title={s.assigned ? `${s.assigned.inbox} inbox` : "Inbox"} data-testid="assigned-conversation">
              {!s.assigned ? <div className="ee-empty">No conversations handed off yet.</div> : (<>
                <div className="ee-row ee-row--between"><span className="ee-strong">Demo User</span><Badge tone="warn">Assigned to {s.assigned.inbox}</Badge></div>
                <div className="ee-strong ee-small" style={{ marginTop: 10 }}>Context from bot</div>
                <KV k="Topic" v={s.topic} testId="ctx-topic" />{s.invoice && <KV k="Invoice" v={s.invoice} testId="ctx-invoice" />}<KV k="Handed off at" v={s.assigned.at} />
                <div className="ee-strong ee-small" style={{ marginTop: 10 }}>Transcript</div>
                <div className="ee-feed" data-testid="ctx-transcript">{s.transcript.map((m, i) => <div key={i} className="ee-small"><b>{m.from === "me" ? "Demo User" : "Fin"}:</b> {m.text}</div>)}</div>
              </>)}
            </Card>
          </div>
        )}
      </main>
    </>
  );
}
