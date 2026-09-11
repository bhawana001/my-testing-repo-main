"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Input, Btn, Alert, Badge } from "@/app/components/eval/ui";

const KB = [
  { id: "KB0010021", title: "Connect to the corporate VPN", cat: "Network", views: 1840, body: "Install the VPN client from Software Center, sign in with your SSO account and choose the nearest gateway. If the connection drops, update to client 5.4 or later.", kw: "vpn remote network connect" },
  { id: "KB0010035", title: "Reset your Windows password", cat: "Accounts", views: 3120, body: "Press Ctrl+Alt+Del, choose Change a password, or use the self-service reset portal with MFA.", kw: "password reset windows account" },
  { id: "KB0010050", title: "Request new software", cat: "Software", views: 640, body: "Open the Service Catalog, search for the application and submit a request. Licensed software needs manager approval.", kw: "software install request catalog" },
];
const seed = () => ({ ran: "", open: null, votes: {} });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [q, setQ] = useState("");
  const results = s.ran ? KB.filter((a) => s.ran.toLowerCase().split(/\s+/).every((w) => (a.title + " " + a.kw).toLowerCase().includes(w))) : [];
  const a = KB.find((x) => x.id === s.open);
  return (
    <SaasShell flow={flow} nav={["Self-Service", "Knowledge", "Incident"]} active="Knowledge" title="Knowledge Base">
      {!a ? (<>
        <form className="ee-row" onSubmit={(e) => { e.preventDefault(); set({ ...s, ran: q.trim() }); }} style={{ maxWidth: 600, marginBottom: 12 }}><Input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search knowledge" aria-label="Search knowledge" style={{ flex: 1 }} /><Btn type="submit" data-testid="kb-search">Search</Btn></form>
        {s.ran && <div className="ee-small ee-muted" data-testid="kb-count">{results.length} article{results.length === 1 ? "" : "s"} found</div>}
        <div className="ee-stack" style={{ marginTop: 8, maxWidth: 760 }}>{results.map((x) => <Card key={x.id} tight><button className="ee-link" onClick={() => set({ ...s, open: x.id })} data-testid={`kb-${x.id}`}>{x.title}</button><div className="ee-tiny ee-muted">{x.id} · {x.cat} · {x.views} views</div></Card>)}</div>
      </>) : (
        <Card style={{ maxWidth: 760 }} data-testid="kb-article">
          <button className="ee-link ee-small" onClick={() => set({ ...s, open: null })}>← Results</button>
          <div className="ee-tiny ee-muted" style={{ marginTop: 6 }}>{a.id} · {a.cat}</div>
          <h2 style={{ margin: "4px 0 10px" }} data-testid="kb-title">{a.title}</h2>
          <p>{a.body}</p>
          <div className="ee-divider" />
          <div data-testid="helpful-widget">{s.votes[a.id] ? <Alert tone="ok" data-testid="vote-thanks">Thanks! You rated this article {s.votes[a.id] === "yes" ? "helpful" : "not helpful"}.</Alert> : <div className="ee-row"><span className="ee-strong">Helpful?</span><Btn size="sm" variant="secondary" onClick={() => set({ ...s, votes: { ...s.votes, [a.id]: "yes" } })} data-testid="vote-yes">Yes</Btn><Btn size="sm" variant="secondary" onClick={() => set({ ...s, votes: { ...s.votes, [a.id]: "no" } })} data-testid="vote-no">No</Btn></div>}</div>
        </Card>
      )}
    </SaasShell>
  );
}
