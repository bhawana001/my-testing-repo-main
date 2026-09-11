"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import BackToEvals from "../BackToEvals";
import "../entity-evals.css";
import { readInbox, clearInbox } from "@/lib/inbox";

export default function Inbox() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(null);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("reset") === "true") clearInbox();
    setItems(readInbox());
  }, []);
  const msg = items.find((m) => m.id === open);
  return (
    <div className="ee" data-mode="light" style={{ "--ee-accent": "#2563eb", "--ee-accent2": "#0f172a" }}>
      <BackToEvals />
      <main className="ee-main">
        <div className="ee-row ee-row--between" style={{ marginBottom: 14 }}>
          <div><div className="ee-small ee-muted"><Link href="/">Real Evals</Link> / Inbox</div><h1 className="ee-page-title">Simulated inbox</h1><p className="ee-page-sub">Emails that Entity Evals flows “sent” in this browser. Nothing leaves the page.</p></div>
          <button type="button" className="ee-btn ee-btn--secondary ee-btn--sm" onClick={() => { clearInbox(); setItems([]); setOpen(null); }} data-testid="clear-inbox">Clear inbox</button>
        </div>
        <div className="ee-split ee-split--even">
          <section className="ee-card" data-testid="inbox-list">
            {items.length === 0 ? <div className="ee-empty">No emails yet. Complete a flow that sends email (for example DocuSigned envelope send or Spotifly family invite).</div> : items.map((m) => (
              <button key={m.id} type="button" onClick={() => setOpen(m.id)} className="ee-card ee-card--flat ee-card--tight" style={{ display: "block", width: "100%", textAlign: "left", cursor: "pointer", marginBottom: 8 }} data-testid={`inbox-${m.id}`}>
                <div className="ee-row ee-row--between"><span className="ee-strong">{m.subject}</span><span className="ee-tiny ee-muted">{m.at}</span></div>
                <div className="ee-small ee-muted">To {m.to} · from {m.from}{m.flow ? ` · ${m.flow}` : ""}</div>
              </button>
            ))}
          </section>
          <section className="ee-card" data-testid="inbox-message">
            {msg ? (<><h2 style={{ fontSize: 18 }}>{msg.subject}</h2><div className="ee-small ee-muted" style={{ margin: "4px 0 12px" }}>From {msg.from} to {msg.to} · {msg.at}</div><div style={{ whiteSpace: "pre-wrap" }}>{msg.body}</div>{msg.flow && <div style={{ marginTop: 12 }}><Link className="ee-link" href={"/" + msg.flow}>Open the flow that sent this</Link></div>}</>) : <div className="ee-empty">Select an email to read it.</div>}
          </section>
        </div>
      </main>
    </div>
  );
}
