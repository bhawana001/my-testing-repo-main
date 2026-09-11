"use client";
// Feed / messaging engine: channels, messages, threads, reactions, attachments,
// mentions, plus a transaction-feed variant used by payment skins.
import { useState } from "react";
import { Badge, Btn, Textarea } from "../eval/ui";

export function fmtClock(i) {
  // Deterministic timestamps: base 10:00, +i minutes.
  const m = 0 + i;
  const h = 10 + Math.floor(m / 60);
  return `${h}:${String(m % 60).padStart(2, "0")} AM`;
}

export function Avatar({ name, round }) {
  const initials = name.split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase();
  return <span className={"ee-avatar" + (round ? " ee-avatar--round" : "")} aria-hidden="true">{initials}</span>;
}

/** Message row with optional reply/react/attachment display and nested thread count. */
export function Message({ msg, onReply, onReact, onOpenThread, onPin, pinned, replies = 0, me = "Demo User", highlight, testIdPrefix = "msg" }) {
  return (
    <div className="ee-msg" data-testid={`${testIdPrefix}-${msg.id}`} style={pinned ? { background: "color-mix(in srgb, var(--ee-accent) 8%, transparent)", borderRadius: 10, padding: 8 } : undefined}>
      <Avatar name={msg.author} />
      <div className="ee-msg__body">
        <div className="ee-msg__meta">
          <b>{msg.author}</b>
          <span>{msg.time}</span>
          {pinned && <Badge tone="accent" data-testid={`${testIdPrefix}-${msg.id}-pinned`}>Pinned</Badge>}
          {msg.edited && <span>(edited)</span>}
        </div>
        <div className="ee-msg__text">
          {highlight ? highlightText(msg.text, highlight) : renderMentions(msg.text)}
        </div>
        {msg.attachment && (
          <div className="ee-card ee-card--flat ee-card--tight" style={{ marginTop: 6, display: "inline-flex", gap: 10, alignItems: "center" }} data-testid={`${testIdPrefix}-${msg.id}-attachment`}>
            <span style={{ fontSize: 28 }} aria-hidden="true">{msg.attachment.kind === "image" ? "🖼️" : "📄"}</span>
            <span className="ee-small">
              <div className="ee-strong">{msg.attachment.name}</div>
              <div className="ee-muted">{msg.attachment.size} · <button className="ee-link" onClick={() => msg.attachment.onDownload?.()}>Download</button></div>
            </span>
          </div>
        )}
        {msg.reactions && Object.keys(msg.reactions).length > 0 && (
          <div className="ee-row" style={{ gap: 6, marginTop: 6 }}>
            {Object.entries(msg.reactions).map(([emoji, n]) => (
              <button key={emoji} type="button" className="ee-chip" onClick={() => onReact?.(msg.id, emoji)} aria-label={`${emoji} ${n}`} style={{ padding: "2px 8px" }}>{emoji} {n}</button>
            ))}
          </div>
        )}
        <div className="ee-row ee-tiny" style={{ gap: 10, marginTop: 4 }}>
          {onReply && <button className="ee-link" onClick={() => onReply(msg)}>Reply in thread</button>}
          {replies > 0 && <button className="ee-link" onClick={() => onOpenThread?.(msg)} data-testid={`${testIdPrefix}-${msg.id}-replies`}>{replies} {replies === 1 ? "reply" : "replies"}</button>}
          {onReact && <button className="ee-link" onClick={() => onReact(msg.id, "👍")}>👍</button>}
          {onPin && <button className="ee-link" onClick={() => onPin(msg)}>{pinned ? "Unpin" : "Pin"}</button>}
        </div>
      </div>
    </div>
  );
}

export function renderMentions(text) {
  const parts = String(text).split(/(@[A-Za-z][\w.-]*)/g);
  return parts.map((p, i) => (p.startsWith("@") ? <span key={i} style={{ color: "var(--ee-accent)", fontWeight: 700, background: "color-mix(in srgb, var(--ee-accent) 12%, transparent)", borderRadius: 4, padding: "0 3px" }}>{p}</span> : p));
}
export function highlightText(text, term) {
  if (!term) return text;
  const parts = String(text).split(new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"));
  return parts.map((p, i) => (p.toLowerCase() === term.toLowerCase() ? <mark key={i}>{p}</mark> : p));
}

/** Composer with optional attachment and send. */
export function Composer({ onSend, placeholder = "Message", allowAttach, sendLabel = "Send", testIdPrefix = "composer", disabled }) {
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState(null);
  function send() {
    if (!text.trim() && !attachment) return;
    onSend({ text: text.trim(), attachment });
    setText("");
    setAttachment(null);
  }
  return (
    <div className="ee-composer" data-testid={testIdPrefix}>
      <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={placeholder} aria-label={placeholder} rows={1} disabled={disabled}
        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} />
      {allowAttach && (
        <label className="ee-btn ee-btn--secondary ee-btn--sm" style={{ cursor: "pointer" }}>
          📎 {attachment ? attachment.name : "Attach"}
          <input type="file" className="ee-sr" onChange={(e) => { const f = e.target.files?.[0]; if (f) setAttachment({ name: f.name, size: `${Math.max(1, Math.round(f.size / 1024))} KB`, kind: f.type.startsWith("image/") ? "image" : "file" }); }} aria-label="Attach file" />
        </label>
      )}
      <Btn size="sm" onClick={send} disabled={disabled || (!text.trim() && !attachment)} data-testid={`${testIdPrefix}-send`} aria-label={sendLabel}>{sendLabel}</Btn>
    </div>
  );
}

export function ChannelList({ channels, active, onSelect, unread = {} }) {
  return (
    <div className="ee-stack" style={{ gap: 2 }}>
      {channels.map((c) => (
        <button key={c} type="button" className="ee-btn ee-btn--ghost ee-btn--sm" style={{ justifyContent: "space-between", fontWeight: c === active ? 800 : 500, color: "inherit", background: c === active ? "rgba(255,255,255,.14)" : "transparent" }} onClick={() => onSelect(c)} aria-current={c === active ? "true" : undefined}>
          <span># {c}</span>
          {unread[c] ? <Badge tone="accent">{unread[c]}</Badge> : null}
        </button>
      ))}
    </div>
  );
}

/** Transaction feed (payments apps). items: [{id, who, note, amount, dir: "in"|"out", privacy, tag, when}] */
export function TxFeed({ items, currency = "$", testIdPrefix = "tx", onSelect }) {
  return (
    <div className="ee-feed" data-testid={testIdPrefix}>
      {items.length === 0 && <div className="ee-empty">No transactions yet.</div>}
      {items.map((t) => (
        <div key={t.id} className="ee-msg" data-testid={`${testIdPrefix}-${t.id}`} onClick={() => onSelect?.(t)} style={onSelect ? { cursor: "pointer" } : undefined}>
          <Avatar name={t.who} round />
          <div className="ee-msg__body">
            <div className="ee-msg__meta"><b>{t.dir === "out" ? `You paid ${t.who}` : `${t.who} paid you`}</b><span>{t.when}</span>{t.privacy && <Badge>{t.privacy}</Badge>}{t.tag && <Badge tone="ok">{t.tag}</Badge>}</div>
            <div className="ee-msg__text">{t.note}</div>
          </div>
          <div className="ee-strong ee-num" style={{ color: t.dir === "out" ? "var(--ee-err)" : "var(--ee-ok)" }} data-testid={`${testIdPrefix}-${t.id}-amount`}>
            {t.dir === "out" ? "−" : "+"}{currency}{Number(t.amount).toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}
