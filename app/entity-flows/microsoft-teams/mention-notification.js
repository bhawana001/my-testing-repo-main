"use client";
import { useRef, useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Textarea, Segment, Badge } from "@/app/components/eval/ui";
import { Message, renderMentions } from "@/app/components/engines/Feed";

const PEOPLE = ["Priya Nair", "Tom Alvarez", "Sam Lee"];
const seed = () => ({ as: "Demo User", posts: [{ id: "p1", author: "Tom Alvarez", time: "9:20 AM", text: "Release notes draft is in Files." }], activity: { "Priya Nair": [], "Tom Alvarez": [], "Sam Lee": [] }, seq: 2 });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [text, setText] = useState("");
  const ta = useRef(null);
  const atIdx = text.lastIndexOf("@"); const partial = atIdx >= 0 && !text.slice(atIdx).includes(" ") ? text.slice(atIdx + 1).toLowerCase() : null;
  const picks = partial !== null ? PEOPLE.filter((p) => p.toLowerCase().replace(" ", "").startsWith(partial.replace(" ", "")) || p.toLowerCase().startsWith(partial)) : [];
  function post() {
    if (!text.trim()) return;
    const mentioned = PEOPLE.filter((p) => text.includes("@" + p.replace(" ", "")));
    const p = { id: "p" + s.seq, author: "Demo User", time: "10:0" + s.seq + " AM", text: text.trim() };
    const activity = { ...s.activity };
    mentioned.forEach((m) => { activity[m] = [{ id: p.id, text: `Demo User mentioned you in General: ${p.text}`, unread: true }, ...activity[m]]; });
    set({ ...s, seq: s.seq + 1, posts: [...s.posts, p], activity }); setText("");
  }
  const feed = s.activity[s.as] || [];
  return (
    <SaasShell flow={flow} nav={["Activity", "Chat", "Teams", "Calendar"]} active={s.as === "Demo User" ? "Teams" : "Activity"} title={s.as === "Demo User" ? "Product Team › General" : `Activity · signed in as ${s.as}`} actions={<Segment options={[{ value: "Demo User", label: "Me" }, { value: "Priya Nair", label: "Priya" }]} value={s.as} onChange={(v) => set({ ...s, as: v })} />}>
      {s.as === "Demo User" ? (
        <Card data-testid="channel">
          <div className="ee-feed">{s.posts.map((p) => <Message key={p.id} msg={p} testIdPrefix="post" />)}</div>
          <div className="ee-divider" />
          <div style={{ position: "relative" }}>
            <Textarea ref={ta} value={text} onChange={(e) => setText(e.target.value)} placeholder="Start a post. Type @ to mention someone" aria-label="New post" />
            {picks.length > 0 && <div className="ee-card ee-card--tight" style={{ position: "absolute", bottom: "100%", left: 0, zIndex: 5 }} data-testid="mention-picker">{picks.map((p) => <button key={p} type="button" className="ee-link" style={{ display: "block", padding: 4 }} onClick={() => { const next = text.slice(0, atIdx) + "@" + p.replace(" ", "") + " "; setText(next); requestAnimationFrame(() => { const el = ta.current; if (el) { el.focus(); el.setSelectionRange(next.length, next.length); } }); }} data-testid={`mention-${p.split(" ")[0].toLowerCase()}`}>{p}</button>)}</div>}
          </div>
          <div className="ee-row ee-row--end" style={{ marginTop: 8 }}><Btn onClick={post} disabled={!text.trim()} data-testid="post-btn">Post</Btn></div>
        </Card>
      ) : (
        <Card title={<span>Activity {feed.some((a) => a.unread) && <Badge tone="err" data-testid="unread-badge">{feed.filter((a) => a.unread).length}</Badge>}</span>} data-testid="activity-feed">
          {feed.length === 0 ? <div className="ee-empty">No new activity.</div> : feed.map((a) => <div key={a.id} className="ee-card ee-card--flat ee-card--tight" data-testid={`activity-${a.id}`}><span className="ee-strong">@mention</span> · {renderMentions(a.text)}</div>)}
        </Card>
      )}
    </SaasShell>
  );
}
