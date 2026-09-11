"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Input, Btn, Alert } from "@/app/components/eval/ui";
import { highlightText } from "@/app/components/engines/Feed";

export const ARTICLES = [
  { id: "a1", title: "How to reset your password", section: "Account & login", body: "If you forgot your password, click “Forgot password” on the sign-in page, enter your email and follow the link we send. Reset links expire after 30 minutes.", kw: "reset password forgot login sign in" },
  { id: "a2", title: "Exporting your data to CSV", section: "Data", body: "Go to Settings → Data → Export. Choose the objects to include and click Export CSV. Large exports are emailed to you.", kw: "export data csv download" },
  { id: "a3", title: "Updating your billing address", section: "Billing", body: "Open Billing → Payment details, edit the address and save. Future invoices will use the new address.", kw: "billing address invoice update" },
  { id: "a4", title: "Setting up two-factor authentication", section: "Account & login", body: "Enable 2FA from Security settings. You can use an authenticator app or SMS codes.", kw: "2fa two-factor security login" },
];
export function searchArticles(q) { const t = q.toLowerCase().split(/\s+/).filter(Boolean); return ARTICLES.filter((a) => t.every((w) => (a.title + " " + a.kw + " " + a.body).toLowerCase().includes(w))); }
const seed = () => ({ q: "", ran: "", open: null, feedback: {} });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [q, setQ] = useState(s.q);
  const results = s.ran ? searchArticles(s.ran) : [];
  const art = ARTICLES.find((a) => a.id === s.open);
  return (
    <>
      <Topbar entity={ent} nav={["Help Center", "Community", "Submit a request"]} active="Help Center" light />
      <main className="ee-main ee-main--narrow">
        {!art ? (<>
          <h1 className="ee-page-title">How can we help?</h1>
          <form className="ee-row" onSubmit={(e) => { e.preventDefault(); set({ ...s, q, ran: q.trim(), open: null }); }} style={{ marginBottom: 16 }}>
            <Input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the help center" aria-label="Search the help center" style={{ flex: 1 }} />
            <Btn type="submit" data-testid="hc-search">Search</Btn>
          </form>
          {s.ran && <div className="ee-small ee-muted" data-testid="hc-count">{results.length} result{results.length === 1 ? "" : "s"} for “{s.ran}”</div>}
          <div className="ee-stack" style={{ marginTop: 10 }} data-testid="hc-results">
            {results.map((a) => <Card key={a.id} tight><button className="ee-link" style={{ fontSize: 16 }} onClick={() => set({ ...s, open: a.id })} data-testid={`hc-result-${a.id}`}>{highlightText(a.title, s.ran.split(" ")[0])}</button><div className="ee-small ee-muted">{a.section}</div></Card>)}
            {s.ran && results.length === 0 && <div className="ee-empty">No articles match. Try different words or submit a request.</div>}
          </div>
        </>) : (
          <Card data-testid="article">
            <button className="ee-link ee-small" onClick={() => set({ ...s, open: null })}>← Back to results</button>
            <div className="ee-small ee-muted" style={{ marginTop: 8 }}>{art.section}</div>
            <h1 style={{ fontSize: 24, margin: "4px 0 12px" }} data-testid="article-title">{art.title}</h1>
            <p>{art.body}</p>
            <div className="ee-divider" />
            <div data-testid="feedback-widget">
              {s.feedback[art.id] ? <Alert tone="ok" data-testid="feedback-thanks">Thanks for your feedback!</Alert> : (
                <div className="ee-row"><span className="ee-strong">Was this article helpful?</span><Btn size="sm" variant="secondary" onClick={() => set({ ...s, feedback: { ...s.feedback, [art.id]: "yes" } })} data-testid="feedback-yes">Yes</Btn><Btn size="sm" variant="secondary" onClick={() => set({ ...s, feedback: { ...s.feedback, [art.id]: "no" } })} data-testid="feedback-no">No</Btn></div>
              )}
            </div>
          </Card>
        )}
      </main>
    </>
  );
}
