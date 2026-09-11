"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Card, Btn } from "@/app/components/eval/ui";
import { Message, Composer, ChannelList, fmtClock } from "@/app/components/engines/Feed";

const CHANNELS = ["general", "design", "release-train"];
const seed = () => ({
  channel: "general",
  messages: [
    { id: "m1", channel: "general", author: "Priya Nair", time: "9:41 AM", text: "Morning all, standup notes are in the doc." },
    { id: "m2", channel: "general", author: "Tom Alvarez", time: "9:52 AM", text: "Reminder: release freeze starts Thursday." },
    { id: "m3", channel: "design", author: "Priya Nair", time: "9:55 AM", text: "New icon set is ready for review." },
  ],
  replies: {}, // messageId -> [{id, author, time, text}]
  openThread: null,
  seq: 4,
});

export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const msgs = s.messages.filter((m) => m.channel === s.channel);
  const thread = s.openThread ? s.messages.find((m) => m.id === s.openThread) : null;
  const replies = thread ? s.replies[thread.id] || [] : [];

  function send({ text }) {
    set((st) => ({ ...st, seq: st.seq + 1, messages: [...st.messages, { id: `m${st.seq}`, channel: st.channel, author: "Demo User", time: fmtClock(st.seq), text }] }));
  }
  function reply({ text }) {
    set((st) => ({ ...st, seq: st.seq + 1, replies: { ...st.replies, [thread.id]: [...(st.replies[thread.id] || []), { id: `r${st.seq}`, author: "Demo User", time: fmtClock(st.seq), text }] } }));
  }

  return (
    <div className="ee-shell" style={{ minHeight: "calc(100vh - 41px)" }}>
      <aside className="ee-sidenav" style={{ background: ent.accent }}>
        <div className="ee-sidenav__brand">Slacky · Acme Inc</div>
        <div className="ee-tiny" style={{ opacity: 0.7, padding: "0 10px 4px" }}>Channels</div>
        <ChannelList channels={CHANNELS} active={s.channel} onSelect={(c) => set({ ...s, channel: c, openThread: null })} />
      </aside>
      <section className="ee-content" style={{ display: "grid", gridTemplateColumns: thread ? "minmax(0,1fr) 340px" : "1fr", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 18, marginBottom: 12 }} data-testid="channel-title"># {s.channel}</h1>
          <div className="ee-feed" data-testid="message-list">
            {msgs.map((m) => (
              <Message key={m.id} msg={m} replies={(s.replies[m.id] || []).length} onReply={(mm) => set({ ...s, openThread: mm.id })} onOpenThread={(mm) => set({ ...s, openThread: mm.id })} />
            ))}
          </div>
          <div style={{ marginTop: 14 }}>
            <Composer onSend={send} placeholder={`Message #${s.channel}`} testIdPrefix="channel-composer" />
          </div>
        </div>
        {thread && (
          <Card tight data-testid="thread-panel" style={{ alignSelf: "start" }}>
            <div className="ee-row ee-row--between" style={{ marginBottom: 8 }}>
              <span className="ee-strong">Thread</span>
              <button className="ee-link ee-small" onClick={() => set({ ...s, openThread: null })} aria-label="Close thread">✕</button>
            </div>
            <Message msg={thread} testIdPrefix="thread-root" />
            <div className="ee-divider" />
            <div className="ee-tiny ee-muted" style={{ marginBottom: 6 }} data-testid="thread-reply-count">{replies.length} {replies.length === 1 ? "reply" : "replies"}</div>
            <div className="ee-feed" data-testid="thread-replies" style={{ paddingLeft: 12, borderLeft: "2px solid var(--ee-border)" }}>
              {replies.map((r) => <Message key={r.id} msg={r} testIdPrefix="thread-reply" />)}
            </div>
            <div style={{ marginTop: 10 }}>
              <Composer onSend={reply} placeholder="Reply in thread" testIdPrefix="thread-composer" sendLabel="Reply" />
            </div>
          </Card>
        )}
      </section>
    </div>
  );
}
