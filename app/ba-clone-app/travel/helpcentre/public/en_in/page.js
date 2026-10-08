"use client";
import { useState } from "react";
import Link from "next/link";
import { Header, Footer } from "../../../../ui";
import { R, HELP, useStore } from "../../../../shared";

export default function Help() {
  useStore();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);
  const t = q.trim().toLowerCase();
  const list = HELP.filter((h) => !t || (h.q + " " + h.a).toLowerCase().includes(t));
  return (
    <>
      <Header />
      <div className="bx-wrap bx-page">
        <div className="bx-crumb"><Link href={R.home}>Home</Link> › Help</div>
        <h1 className="bx-h1">How can we help?</h1>
        <div className="bx-f" style={{ maxWidth: 520, margin: "14px 0 20px" }}>
          <label htmlFor="helpq">Search help topics</label>
          <input id="helpq" type="search" className="bx-in" placeholder="e.g. baggage, check-in, meals" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="bx-card">
          {list.length === 0 && <p className="bx-muted">No help topics match "{q}".</p>}
          {list.map((h) => (
            <div className="bx-acc" key={h.q}>
              <button aria-expanded={open === h.q} onClick={() => setOpen(open === h.q ? null : h.q)}>{h.q}<span>{open === h.q ? "−" : "+"}</span></button>
              {open === h.q && <p>{h.a}</p>}
            </div>
          ))}
        </div>
        <div className="bx-row"><Link className="bx-btn bx-btn--ghost" href={R.manage}>Manage booking</Link><Link className="bx-btn bx-btn--ghost" href={R.checkin}>Check in</Link><Link className="bx-btn bx-btn--ghost" href={R.status}>Flight status</Link></div>
      </div>
      <Footer />
    </>
  );
}
