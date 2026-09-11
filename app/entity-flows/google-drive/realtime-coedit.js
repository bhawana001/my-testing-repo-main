"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Input, Badge } from "@/app/components/eval/ui";

// Two sessions share one document model (per-line ops), so concurrent inserts never conflict.
const COLORS = { A: "#1a73e8", B: "#e8710a" };
const seed = () => ({ lines: [{ id: "l0", text: "Offsite agenda", by: null }], cursors: { A: "l0", B: "l0" }, seq: 1, conflicts: 0 });
function Pane({ who, name, s, set }) {
  const [t, setT] = useState("");
  function add() { if (!t.trim()) return; set((st) => { const id = "l" + st.seq; return { ...st, seq: st.seq + 1, lines: [...st.lines, { id, text: t.trim(), by: who }], cursors: { ...st.cursors, [who]: id } }; }); setT(""); }
  const other = who === "A" ? "B" : "A";
  return (
    <Card title={<span>Session {who} · {name} <Badge style={{ background: COLORS[who], color: "#fff" }}>{name.split(" ")[0]}</Badge></span>} data-testid={`pane-${who}`}>
      <div className="ee-card ee-card--flat" style={{ minHeight: 180, fontFamily: "Georgia, serif" }}>
        {s.lines.map((l) => (
          <div key={l.id} style={{ position: "relative", padding: "2px 0", fontWeight: l.id === "l0" ? 800 : 400 }} data-testid={`pane-${who}-line-${l.id}`}>
            {l.text}{l.by && <span className="ee-tiny" style={{ color: COLORS[l.by], marginLeft: 6 }}>· {l.by === "A" ? "Demo" : "Priya"}</span>}
            {s.cursors[other] === l.id && <span style={{ background: COLORS[other], color: "#fff", fontSize: 10, padding: "1px 4px", borderRadius: 3, marginLeft: 8 }} data-testid={`pane-${who}-cursor-${other}`}>▏{other === "A" ? "Demo" : "Priya"}</span>}
          </div>
        ))}
      </div>
      <div className="ee-row" style={{ marginTop: 8 }}><Input value={t} onChange={(e) => setT(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} placeholder={`Type as ${name}`} aria-label={`Session ${who} input`} style={{ flex: 1 }} /><Btn size="sm" onClick={add} data-testid={`pane-${who}-add`}>Add line</Btn></div>
    </Card>
  );
}
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  return (
    <SaasShell flow={flow} nav={["My Drive", "Shared with me"]} active="Shared with me" title="📝 Offsite agenda · 2 people editing" actions={<Badge tone="ok" data-testid="sync-state">All changes saved · 0 conflicts</Badge>}>
      <div className="ee-split ee-split--even"><Pane who="A" name="Demo User" s={s} set={set} /><Pane who="B" name="Priya Nair" s={s} set={set} /></div>
    </SaasShell>
  );
}
