"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Modal, RadioCard, Badge, Alert, Check } from "@/app/components/eval/ui";
import { STATUS_TONE } from "@/lib/seed/helpdesk";

const seed = () => ({ tickets: [
  { id: 2044, subject: "Order #A-7731 not delivered", requester: "Maria Chen", status: "Open", thread: [{ who: "Maria Chen", text: "My order #A-7731 hasn't arrived." }] },
  { id: 2046, subject: "Where is my package?", requester: "Maria Chen", status: "Open", thread: [{ who: "Maria Chen", text: "Following up: tracking hasn't updated in 3 days." }] },
  { id: 2045, subject: "Invoice copy request", requester: "Ahmed Khan", status: "Pending", thread: [{ who: "Ahmed Khan", text: "Please resend my August invoice." }] },
], selected: [], view: null, msg: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [open, setOpen] = useState(false); const [primary, setPrimary] = useState(null);
  const sel = s.tickets.filter((t) => s.selected.includes(t.id));
  const sameRequester = sel.length >= 2 && sel.every((t) => t.requester === sel[0].requester);
  function merge() {
    const p = s.tickets.find((t) => t.id === primary); const others = sel.filter((t) => t.id !== primary);
    const tickets = s.tickets.map((t) => (t.id === primary ? { ...t, thread: [...t.thread, ...others.flatMap((o) => o.thread.map((m) => ({ ...m, from: o.id })))], mergedFrom: others.map((o) => o.id) } : others.some((o) => o.id === t.id) ? { ...t, status: "Closed", mergedInto: primary } : t));
    set({ ...s, tickets, selected: [], view: primary, msg: `Merged #${others.map((o) => o.id).join(", #")} into #${primary}.` }); setOpen(false);
  }
  const view = s.tickets.find((t) => t.id === s.view);
  return (
    <SaasShell flow={flow} nav={["Dashboard", "Tickets", "Contacts", "Admin"]} active="Tickets" title={view ? `#${view.id} · ${view.subject}` : "All tickets"}>
      {s.msg && <Alert tone="ok" data-testid="merge-msg">{s.msg}</Alert>}
      {!view ? (
        <Card data-testid="ticket-list">
          <div className="ee-row" style={{ marginBottom: 10 }}><Btn size="sm" disabled={!sameRequester} onClick={() => { setPrimary(sel[0].id); setOpen(true); }} data-testid="merge-btn">Merge</Btn><span className="ee-small ee-muted">{sel.length} selected{sel.length >= 2 && !sameRequester ? " · tickets must share a requester" : ""}</span></div>
          <div className="ee-stack">
            {s.tickets.map((t) => (
              <div key={t.id} className="ee-row ee-row--between ee-card ee-card--flat ee-card--tight" data-testid={`row-${t.id}`}>
                <span className="ee-row"><Check label="" checked={s.selected.includes(t.id)} onChange={(e) => set({ ...s, selected: e.target.checked ? [...s.selected, t.id] : s.selected.filter((x) => x !== t.id) })} aria-label={`Select ticket ${t.id}`} /><button className="ee-link" onClick={() => set({ ...s, view: t.id })}>#{t.id} · {t.subject}</button><span className="ee-small ee-muted">{t.requester}</span></span>
                <span className="ee-row">{t.mergedInto && <span className="ee-tiny ee-muted" data-testid={`merged-into-${t.id}`}>Merged into #{t.mergedInto}</span>}<Badge tone={STATUS_TONE[t.status]} data-testid={`status-${t.id}`}>{t.status}</Badge></span>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <Card data-testid="ticket-view">
          <button className="ee-link ee-small" onClick={() => set({ ...s, view: null })}>← All tickets</button>
          {view.mergedFrom && <div className="ee-small" style={{ margin: "8px 0" }}><Badge tone="info" data-testid="merged-from">Contains merged ticket #{view.mergedFrom.join(", #")}</Badge></div>}
          <div className="ee-stack" data-testid="merged-thread">{view.thread.map((m, i) => <div key={i} className="ee-card ee-card--flat ee-card--tight"><div className="ee-small ee-muted">{m.who}{m.from ? ` · from #${m.from}` : ""}</div><div>{m.text}</div></div>)}</div>
        </Card>
      )}
      <Modal open={open} title="Merge tickets" onClose={() => setOpen(false)}>
        <div className="ee-stack" data-testid="merge-modal">
          <div className="ee-small">Choose the primary ticket. The others will be closed and their conversations added to it.</div>
          {sel.map((t) => <RadioCard key={t.id} name="primary" value={t.id} checked={primary === t.id} onChange={setPrimary} title={`#${t.id} · ${t.subject}`} desc={t.requester} />)}
          <Btn onClick={merge} data-testid="merge-confirm">Merge</Btn>
        </div>
      </Modal>
    </SaasShell>
  );
}
