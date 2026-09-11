"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Textarea, Modal, Input, Badge, Alert } from "@/app/components/eval/ui";
import { Message } from "@/app/components/engines/Feed";

const CANNED = [
  { id: "cr1", title: "Delivery delay apology", body: "Hi {{ticket.requester.first_name}},\n\nSorry that your order is running late. I've escalated ticket #{{ticket.id}} with our courier and will update you within 24 hours.\n\nRegards,\n{{agent.name}}" },
  { id: "cr2", title: "Refund confirmation", body: "Hi {{ticket.requester.first_name}},\n\nYour refund for ticket #{{ticket.id}} has been issued.\n\n{{agent.name}}" },
];
const CTX = { "ticket.requester.first_name": "Maria", "ticket.id": "2044", "agent.name": "Demo User" };
export const resolve = (t) => t.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, k) => CTX[k] ?? `{{${k}}}`);
const seed = () => ({ reply: "", inserted: null, sent: [] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [open, setOpen] = useState(false); const [q, setQ] = useState("");
  const list = CANNED.filter((c) => c.title.toLowerCase().includes(q.toLowerCase()));
  return (
    <SaasShell flow={flow} nav={["Dashboard", "Tickets", "Contacts", "Admin"]} active="Tickets" title="#2044 · Order #A-7731 not delivered" sub="Maria Chen · maria@globex.test">
      <Card data-testid="ticket">
        <Message msg={{ id: "m1", author: "Maria Chen", time: "Sep 13, 4:12 PM", text: "My order #A-7731 was due on Friday and still hasn't arrived." }} testIdPrefix="t" />
        {s.sent.map((m, i) => <Message key={i} msg={{ id: "r" + i, author: "Demo User", time: "Sep 14, 10:0" + i + " AM", text: m }} testIdPrefix="sent" />)}
        <div className="ee-divider" />
        {s.inserted && <Alert tone="ok" data-testid="canned-inserted">Inserted canned response: {s.inserted}</Alert>}
        <Textarea value={s.reply} onChange={(e) => set({ ...s, reply: e.target.value })} aria-label="Reply" style={{ minHeight: 170, marginTop: 8 }} data-testid="reply-box" />
        <div className="ee-row ee-row--between" style={{ marginTop: 8 }}>
          <Btn variant="secondary" size="sm" onClick={() => setOpen(true)} data-testid="open-canned">Insert canned response</Btn>
          <Btn disabled={!s.reply.trim()} onClick={() => set({ ...s, sent: [...s.sent, s.reply], reply: "", inserted: null })} data-testid="send-reply">Send</Btn>
        </div>
      </Card>
      <Modal open={open} title="Canned responses" onClose={() => setOpen(false)}>
        <div className="ee-stack" data-testid="canned-list">
          <Input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search canned responses" aria-label="Search canned responses" />
          {list.map((c) => <Card key={c.id} tight><div className="ee-row ee-row--between"><span className="ee-strong">{c.title}</span><Btn size="sm" onClick={() => { set({ ...s, reply: resolve(c.body), inserted: c.title }); setOpen(false); }} data-testid={`insert-${c.id}`}>Insert</Btn></div><div className="ee-tiny ee-muted" style={{ whiteSpace: "pre-wrap" }}>{c.body.slice(0, 90)}…</div></Card>)}
        </div>
      </Modal>
    </SaasShell>
  );
}
