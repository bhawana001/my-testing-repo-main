"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, Input, Badge } from "@/app/components/eval/ui";
import { Message } from "@/app/components/engines/Feed";

const seed = () => ({ comments: [{ id: "c1", author: "Maria Chen", time: "2 days ago", text: "This fixed my build in 5 minutes, thank you!" }, { id: "c2", author: "Sam Lee", time: "1 day ago", text: "Could you do a follow-up on caching?" }, { id: "c3", author: "Ahmed Khan", time: "5 hours ago", text: "Timestamps: 0:42 setup, 3:10 deploy" }], pinned: null, seq: 4 });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [t, setT] = useState("");
  const ordered = s.pinned ? [s.comments.find((c) => c.id === s.pinned), ...s.comments.filter((c) => c.id !== s.pinned)] : s.comments;
  return (
    <>
      <Topbar entity={ent} light />
      <main className="ee-main ee-main--narrow">
        <div className="ee-player" style={{ marginBottom: 12 }}><div style={{ fontSize: 56 }}>▶️</div></div>
        <h1 style={{ fontSize: 20 }}>Deploying Next.js to the edge in 10 minutes</h1>
        <div className="ee-small ee-muted" style={{ marginBottom: 14 }}>Demo Channel · 12K views · You are the creator</div>
        <Card title={`${s.comments.length} Comments`} data-testid="comments">
          <div className="ee-row" style={{ marginBottom: 12 }}><Input value={t} onChange={(e) => setT(e.target.value)} placeholder="Add a comment…" aria-label="Add a comment" style={{ flex: 1 }} /><Btn size="sm" disabled={!t.trim()} onClick={() => { set({ ...s, seq: s.seq + 1, comments: [{ id: "c" + s.seq, author: "Demo Channel", time: "just now", text: t.trim(), creator: true }, ...s.comments] }); setT(""); }} data-testid="post-comment">Comment</Btn></div>
          <div className="ee-feed" data-testid="comment-list">
            {ordered.map((c, i) => (
              <div key={c.id} data-testid={`comment-pos-${i}`}>
                {s.pinned === c.id && <div className="ee-tiny ee-muted" data-testid="pinned-label">📌 Pinned by Demo Channel</div>}
                <Message msg={{ ...c, author: c.author + (c.creator ? " ✓" : "") }} testIdPrefix="comment" />
                <div className="ee-row ee-tiny" style={{ marginLeft: 44 }}>{s.pinned === c.id ? <button className="ee-link" onClick={() => set({ ...s, pinned: null })} data-testid={`unpin-${c.id}`}>Unpin</button> : <button className="ee-link" onClick={() => set({ ...s, pinned: c.id })} data-testid={`pin-${c.id}`}>📌 Pin</button>}</div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </>
  );
}
