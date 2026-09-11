"use client";
import { useRef, useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { NotionShell } from "./_shell";
import { Btn, Card, Badge, Segment, Input } from "@/app/components/eval/ui";
import { renderMentions } from "@/app/components/engines/Feed";

const BLOCKS = [{ id: "b1", text: "Revenue target: $1.2M ARR by end of Q3" }, { id: "b2", text: "Hire 2 support engineers" }, { id: "b3", text: "Launch EU region" }];
const seed = () => ({ as: "Demo User", comments: {}, inbox: { "Priya Nair": [] }, commenting: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [text, setText] = useState("");
  const inp = useRef(null);
  const showPick = /@\w*$/.test(text) && !text.endsWith("@PriyaNair");
  function save(blockId) {
    if (!text.trim()) return;
    const c = { author: "Demo User", text: text.trim(), time: "Sep 14, 10:05 AM" };
    const inbox = { ...s.inbox };
    if (text.includes("@PriyaNair")) inbox["Priya Nair"] = [{ id: blockId + (s.comments[blockId]?.length || 0), text: `Demo User mentioned you in a comment on Q3 plan: “${c.text}”`, block: BLOCKS.find((b) => b.id === blockId).text }, ...inbox["Priya Nair"]];
    set({ ...s, comments: { ...s.comments, [blockId]: [...(s.comments[blockId] || []), c] }, inbox, commenting: null }); setText("");
  }
  const notes = s.inbox["Priya Nair"];
  return (
    <NotionShell flow={flow} pages={[{ id: "q3", title: "Q3 plan", icon: "📈" }]} active="q3" topRight={<Segment options={[{ value: "Demo User", label: "Me" }, { value: "Priya Nair", label: "Priya" }]} value={s.as} onChange={(v) => set({ ...s, as: v })} />}>
      {s.as === "Demo User" ? (<>
        <h1 style={{ fontSize: 32, marginBottom: 12 }}>📈 Q3 plan</h1>
        <div className="ee-stack" data-testid="page-blocks">
          {BLOCKS.map((b) => (
            <div key={b.id} data-testid={`block-${b.id}`}>
              <div className="ee-row ee-row--between"><span>{b.text}</span><Btn size="sm" variant="ghost" onClick={() => set({ ...s, commenting: b.id })} data-testid={`comment-${b.id}`}>💬 Comment</Btn></div>
              {(s.comments[b.id] || []).map((c, i) => <div key={i} className="ee-card ee-card--flat ee-card--tight ee-small" style={{ marginLeft: 16 }} data-testid={`thread-${b.id}-${i}`}><b>{c.author}</b> · {c.time}<div>{renderMentions(c.text)}</div></div>)}
              {s.commenting === b.id && (
                <div style={{ marginLeft: 16, position: "relative" }} className="ee-row">
                  <Input ref={inp} value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a comment… type @ to mention" aria-label="Comment" style={{ flex: 1 }} />
                  <Btn size="sm" onClick={() => save(b.id)} data-testid="save-comment">Comment</Btn>
                  {showPick && <div className="ee-card ee-card--tight" style={{ position: "absolute", top: "100%", left: 0, zIndex: 5 }} data-testid="mention-picker"><button type="button" className="ee-link" onClick={() => { const next = text.replace(/@\w*$/, "@PriyaNair "); setText(next); }} onMouseDown={(e) => e.preventDefault()} data-testid="mention-priya">Priya Nair</button></div>}
                </div>
              )}
            </div>
          ))}
        </div>
      </>) : (
        <Card title={<span>Inbox {notes.length > 0 && <Badge tone="err" data-testid="inbox-badge">{notes.length}</Badge>}</span>} data-testid="priya-inbox">
          {notes.length === 0 ? <div className="ee-empty">You're all caught up.</div> : notes.map((n) => <div key={n.id} className="ee-card ee-card--flat ee-card--tight" data-testid={`note-${n.id}`}><div className="ee-small">{n.text}</div><div className="ee-tiny ee-muted">On block: {n.block}</div></div>)}
        </Card>
      )}
    </NotionShell>
  );
}
