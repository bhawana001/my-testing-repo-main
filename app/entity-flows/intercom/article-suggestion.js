"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Input, Btn, Card } from "@/app/components/eval/ui";
import { MessengerFrame } from "@/app/components/engines/Messenger";
import { ARTICLES, searchArticles } from "../zendesk/help-center-search";

const suggest = (q) => { const words = q.toLowerCase().split(/\s+/).filter((w) => w.length > 2 && !["how", "the", "can", "what", "does", "and", "you", "for"].includes(w)); if (!words.length) return []; return ARTICLES.filter((a) => words.some((w) => (a.title + " " + a.kw).toLowerCase().includes(w))).slice(0, 3); };
const seed = () => ({ open: true, article: null });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [q, setQ] = useState("");
  const hits = suggest(q);
  const art = ARTICLES.find((a) => a.id === s.article);
  return (
    <>
      <Topbar entity={ent} nav={["Product", "Pricing", "Docs"]} light />
      <main className="ee-main">
        <h1 className="ee-page-title">Acme Cloud · Settings</h1>
        <MessengerFrame open={s.open} onToggle={() => set({ ...s, open: !s.open })}>
          {art ? (
            <div data-testid="messenger-article">
              <button className="ee-link ee-small" onClick={() => set({ ...s, article: null })}>← Back</button>
              <div className="ee-small ee-muted" style={{ marginTop: 6 }}>{art.section}</div>
              <h3 style={{ margin: "4px 0 8px" }} data-testid="messenger-article-title">{art.title}</h3>
              <p className="ee-small">{art.body}</p>
            </div>
          ) : (<>
            <div className="ee-strong">Ask a question</div>
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type your question…" aria-label="Ask a question" />
            {q.trim() && (
              <div className="ee-stack" data-testid="suggestions">
                <div className="ee-tiny ee-muted">{hits.length ? "Suggested articles" : "No suggestions yet. Send it to the team instead."}</div>
                {hits.map((a) => <Card key={a.id} tight><button className="ee-link" onClick={() => set({ ...s, article: a.id })} data-testid={`suggest-${a.id}`}>{a.title}</button><div className="ee-tiny ee-muted">{a.section}</div></Card>)}
              </div>
            )}
            <Btn size="sm" variant="secondary" disabled={!q.trim()}>Send to the team</Btn>
          </>)}
        </MessengerFrame>
      </main>
    </>
  );
}
