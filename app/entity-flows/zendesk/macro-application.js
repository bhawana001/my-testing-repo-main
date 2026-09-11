"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Textarea, Select, Badge, KV, Alert } from "@/app/components/eval/ui";
import { Message } from "@/app/components/engines/Feed";
import { PRIORITY_TONE, STATUS_TONE } from "@/lib/seed/helpdesk";

const MACROS = {
  refund: { name: "Billing: Refund processed", fields: { type: "Question", priority: "Low", status: "Solved", tags: ["billing", "refund"] }, text: "Hi Maria,\n\nGood news: we've processed a refund of $49.00 to your original payment method. It should appear within 5–7 business days.\n\nBest,\nDemo User" },
  escalate: { name: "Escalate to Tier 2", fields: { type: "Incident", priority: "High", status: "Open", tags: ["tier2"] }, text: "Hi Maria,\n\nI've escalated this to our Tier 2 team, who will follow up within 4 hours.\n\nDemo User" },
};
const seed = () => ({ fields: { type: "-", priority: "Normal", status: "Open", tags: ["web"] }, reply: "", applied: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [pick, setPick] = useState("");
  function apply() { const m = MACROS[pick]; if (!m) return; set({ fields: { ...m.fields, tags: [...new Set([...s.fields.tags, ...m.fields.tags])] }, reply: m.text, applied: m.name }); }
  return (
    <SaasShell flow={flow} nav={["Views", "Tickets", "Macros", "Customers"]} active="Tickets" title="#1043 · Charged twice for September" sub="Maria Chen · maria@globex.test">
      <div className="ee-split">
        <Card data-testid="ticket">
          <Message msg={{ id: "m1", author: "Maria Chen", time: "8:40 AM", text: "I was charged twice ($49.00 each) for September. Please refund the duplicate." }} testIdPrefix="t" />
          <div className="ee-divider" />
          {s.applied && <Alert tone="ok" data-testid="macro-applied">Macro applied: {s.applied}</Alert>}
          <Textarea value={s.reply} onChange={(e) => set({ ...s, reply: e.target.value })} aria-label="Reply" placeholder="Write a public reply" style={{ minHeight: 160, marginTop: 8 }} data-testid="reply-box" />
          <div className="ee-row ee-row--between" style={{ marginTop: 8 }}>
            <div className="ee-row"><Select value={pick} onChange={(e) => setPick(e.target.value)} aria-label="Macro" style={{ width: "auto" }}><option value="">Apply macro…</option>{Object.entries(MACROS).map(([k, m]) => <option key={k} value={k}>{m.name}</option>)}</Select><Btn variant="secondary" size="sm" disabled={!pick} onClick={apply} data-testid="apply-macro">Apply</Btn></div>
            <Btn>Submit as {s.fields.status}</Btn>
          </div>
        </Card>
        <Card title="Ticket fields" data-testid="ticket-fields">
          <KV k="Type" v={<span data-testid="field-type">{s.fields.type}</span>} />
          <KV k="Priority" v={<Badge tone={PRIORITY_TONE[s.fields.priority]} data-testid="field-priority">{s.fields.priority}</Badge>} />
          <KV k="Status" v={<Badge tone={STATUS_TONE[s.fields.status]} data-testid="field-status">{s.fields.status}</Badge>} />
          <KV k="Tags" v={<span data-testid="field-tags">{s.fields.tags.join(", ")}</span>} />
        </Card>
      </div>
    </SaasShell>
  );
}
