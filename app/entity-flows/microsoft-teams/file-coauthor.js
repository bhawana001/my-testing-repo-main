"use client";
import { useEffect, useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Badge, Btn } from "@/app/components/eval/ui";

const BASE = ["Q3 plan", "1. Ship self-serve onboarding", "2. Launch usage-based billing"];
const seed = () => ({ lines: BASE, saved: true, opened: false });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [draft, setDraft] = useState(""); const [saving, setSaving] = useState(false);
  useEffect(() => { if (!saving) return; const t = setTimeout(() => { setSaving(false); set((st) => ({ ...st, saved: true })); }, 600); return () => clearTimeout(t); }, [saving, set]);
  function addLine() { if (!draft.trim()) return; set({ ...s, lines: [...s.lines, draft.trim()], saved: false }); setDraft(""); setSaving(true); }
  return (
    <SaasShell flow={flow} nav={["Activity", "Chat", "Teams", "Files"]} active="Teams" title="Product Team › General › Files">
      {!s.opened ? (
        <Card data-testid="files-tab"><div className="ee-row ee-row--between"><span>📄 <b>Q3 plan.docx</b> <span className="ee-small ee-muted">· Modified Sep 13 by Priya Nair</span></span><Btn size="sm" onClick={() => set({ ...s, opened: true })} data-testid="open-doc">Open in Teamz</Btn></div></Card>
      ) : (
        <Card data-testid="doc-editor">
          <div className="ee-row ee-row--between" style={{ marginBottom: 10 }}>
            <span className="ee-strong">Q3 plan.docx</span>
            <span className="ee-row" data-testid="presence"><span className="ee-avatar ee-avatar--round" style={{ background: "#e01e5a" }} title="Priya Nair">PN</span><span className="ee-small">Priya Nair is editing</span><span className="ee-avatar ee-avatar--round" title="Demo User">DU</span><Badge tone={s.saved ? "ok" : "warn"} data-testid="save-state">{saving || !s.saved ? "Saving…" : "Saved"}</Badge></span>
          </div>
          <div className="ee-card ee-card--flat" style={{ minHeight: 200, fontFamily: "Georgia, serif" }} data-testid="doc-body">
            {s.lines.map((l, i) => <p key={i} style={{ margin: "4px 0", fontWeight: i === 0 ? 800 : 400, fontSize: i === 0 ? 20 : 15 }} data-testid={`line-${i}`}>{l}</p>)}
            <div className="ee-row" style={{ marginTop: 10 }}><input className="ee-input" value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addLine()} placeholder="Type a new line and press Enter" aria-label="New line" style={{ flex: 1 }} /><Btn size="sm" onClick={addLine} data-testid="add-line">Add line</Btn></div>
          </div>
          <div className="ee-tiny ee-muted" style={{ marginTop: 6 }}>Priya's cursor is on line 2.</div>
        </Card>
      )}
    </SaasShell>
  );
}
