"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Badge, Table } from "@/app/components/eval/ui";
import { LoginForm, SEED_SESSION, SignedInBar } from "@/app/components/engines/Auth";
import { Message } from "@/app/components/engines/Feed";
import { STATUS_TONE } from "@/lib/seed/helpdesk";

const TICKETS = [
  { id: 2051, subject: "Can't log in to the mobile app", status: "Pending", updated: "Sep 14, 9:40 AM", thread: [{ id: "a", author: "Demo User", time: "Sep 13, 5:02 PM", text: "The mobile app says my password is wrong but web login works." }, { id: "b", author: "Priya Nair (Support)", time: "Sep 14, 9:40 AM", text: "Thanks Demo! Please update to app version 4.2.1 and try again. Let us know if it still fails." }] },
  { id: 2032, subject: "Change billing email", status: "Resolved", updated: "Sep 2, 11:15 AM", thread: [{ id: "c", author: "Demo User", time: "Sep 1", text: "Please change my billing email." }, { id: "d", author: "Tom Alvarez (Support)", time: "Sep 2", text: "Done! Invoices will now go to demo@evals.dev." }] },
];
const seed = () => ({ auth: { ...SEED_SESSION }, open: null });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const setAuth = (a) => set((st) => ({ ...st, auth: typeof a === "function" ? a(st.auth) : a }));
  const t = TICKETS.find((x) => x.id === s.open);
  return (
    <>
      <Topbar entity={ent} nav={["Home", "Solutions", "Tickets"]} active="Tickets" light />
      <main className="ee-main">
        {!s.auth.user ? (
          <div style={{ maxWidth: 420, margin: "20px auto" }}><LoginForm auth={s.auth} setAuth={setAuth} mode="password" title="Sign in to the support portal" subtitle="Acme Cloud customer portal" /></div>
        ) : (<>
          <SignedInBar user={s.auth.user} onSignOut={() => set(seed())} />
          {!t ? (
            <Card title="My tickets" data-testid="my-tickets">
              <Table cols={[{ key: "id", label: "Ticket", render: (r) => <button className="ee-link" onClick={() => set({ ...s, open: r.id })} data-testid={`open-${r.id}`}>#{r.id}</button> }, { key: "subject", label: "Subject" }, { key: "status", label: "Status", render: (r) => <Badge tone={r.status === "Resolved" ? "ok" : STATUS_TONE[r.status]} data-testid={`list-status-${r.id}`}>{r.status}</Badge> }, { key: "updated", label: "Last updated" }]} rows={TICKETS} rowKey={(r) => r.id} />
            </Card>
          ) : (
            <Card title={`#${t.id} · ${t.subject}`} right={<Badge tone={STATUS_TONE[t.status]} data-testid="ticket-status">{t.status === "Pending" ? "Pending · awaiting your reply" : t.status}</Badge>} data-testid="portal-ticket" style={{ maxWidth: 760 }}>
              <button className="ee-link ee-small" onClick={() => set({ ...s, open: null })}>← My tickets</button>
              <div className="ee-feed" style={{ marginTop: 10 }}>{t.thread.map((m) => <Message key={m.id} msg={m} testIdPrefix="portal" />)}</div>
            </Card>
          )}
        </>)}
      </main>
    </>
  );
}
