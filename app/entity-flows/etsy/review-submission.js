"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, Textarea, Badge, Alert, Segment } from "@/app/components/eval/ui";

const seed = () => ({ tab: "purchases", reviews: [{ id: "rv1", by: "Maria C.", stars: 5, text: "Beautiful glaze, arrived well packed.", photo: false }], reviewed: false });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [open, setOpen] = useState(false); const [stars, setStars] = useState(0); const [text, setText] = useState(""); const [photo, setPhoto] = useState(false); const [err, setErr] = useState(null);
  function submit() { if (!stars) { setErr("Choose a star rating."); return; } if (text.trim().length < 10) { setErr("Write at least 10 characters."); return; } setErr(null); set({ ...s, reviews: [{ id: "rv" + (s.reviews.length + 1), by: "Demo U.", stars, text: text.trim(), photo }, ...s.reviews], reviewed: true, tab: "listing" }); setOpen(false); }
  return (
    <>
      <Topbar entity={ent} light right={<Segment options={[{ value: "purchases", label: "Purchases" }, { value: "listing", label: "Listing page" }]} value={s.tab} onChange={(v) => set({ ...s, tab: v })} />} />
      <main className="ee-main ee-main--narrow">
        {s.tab === "purchases" ? (
          <Card title="Purchases" data-testid="purchases">
            <div className="ee-row ee-row--between"><span><b>Custom Name Ceramic Mug</b> · ClayWorks Studio<div className="ee-tiny ee-muted">Delivered Sep 9, 2026</div></span>{s.reviewed ? <Badge tone="ok">Reviewed</Badge> : <Btn size="sm" onClick={() => setOpen(true)} data-testid="leave-review">Leave a review</Btn>}</div>
            {open && (<div className="ee-stack" style={{ marginTop: 12 }} data-testid="review-form">
              <div className="ee-row" role="radiogroup" aria-label="Rating">{[1, 2, 3, 4, 5].map((n) => <button key={n} type="button" onClick={() => setStars(n)} aria-label={`${n} star${n > 1 ? "s" : ""}`} aria-pressed={stars >= n} style={{ fontSize: 26, border: 0, background: "none", cursor: "pointer", color: stars >= n ? "#f1641e" : "var(--ee-border)" }} data-testid={`star-${n}`}>★</button>)}</div>
              <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="What did you like about this item?" aria-label="Review text" />
              {photo ? <Badge tone="info" data-testid="photo-attached">📷 mug-photo.jpg attached</Badge> : <Btn size="sm" variant="secondary" onClick={() => setPhoto(true)} data-testid="add-photo">+ Add sample photo</Btn>}
              {err && <Alert tone="err">{err}</Alert>}
              <Btn onClick={submit} data-testid="post-review">Post review</Btn>
            </div>)}
          </Card>
        ) : (
          <Card title="Custom Name Ceramic Mug · Reviews" data-testid="listing-reviews">
            {s.reviews.map((r) => <div key={r.id} className="ee-card ee-card--flat ee-card--tight" data-testid={`review-${r.id}`}><div style={{ color: "#f1641e" }}>{"★".repeat(r.stars)}<span style={{ color: "var(--ee-border)" }}>{"★".repeat(5 - r.stars)}</span></div><div className="ee-small">{r.text}</div>{r.photo && <div style={{ width: 72, height: 72, borderRadius: 8, background: "linear-gradient(135deg,#f1641e,#ffd6b3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginTop: 6 }} data-testid={`review-photo-${r.id}`}>☕</div>}<div className="ee-tiny ee-muted">{r.by}</div></div>)}
          </Card>
        )}
      </main>
    </>
  );
}
