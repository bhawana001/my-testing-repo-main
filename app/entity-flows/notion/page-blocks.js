"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { NotionShell } from "./_shell";
import { Btn, Badge } from "@/app/components/eval/ui";
import { useState } from "react";

const seed = () => ({ title: "", blocks: [], seq: 1 });
const newBlock = (type, id) => type === "heading" ? { id, type, text: "" } : type === "todo" ? { id, type, text: "", done: false } : type === "table" ? { id, type, rows: [["", ""], ["", ""]] } : { id, type: "text", text: "" };
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [menu, setMenu] = useState(false);
  const upd = (id, patch) => set((st) => ({ ...st, blocks: st.blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)) }));
  const add = (type) => { set((st) => ({ ...st, seq: st.seq + 1, blocks: [...st.blocks, newBlock(type, "b" + st.seq)] })); setMenu(false); };
  const inputStyle = { border: 0, outline: "none", background: "transparent", width: "100%", font: "inherit" };
  return (
    <NotionShell flow={flow} pages={[{ id: "p", title: s.title || "Untitled" }]} active="p" topRight={<Badge tone="ok" data-testid="autosave">Saved</Badge>}>
      <input value={s.title} onChange={(e) => set({ ...s, title: e.target.value })} placeholder="Untitled" aria-label="Page title" style={{ ...inputStyle, fontSize: 36, fontWeight: 800, marginBottom: 12 }} data-testid="page-title-input" />
      <div className="ee-stack" data-testid="blocks">
        {s.blocks.map((b) => (
          <div key={b.id} data-testid={`block-${b.type}-${b.id}`}>
            {b.type === "heading" && <input value={b.text} onChange={(e) => upd(b.id, { text: e.target.value })} placeholder="Heading 1" aria-label="Heading block" style={{ ...inputStyle, fontSize: 26, fontWeight: 800 }} />}
            {b.type === "text" && <input value={b.text} onChange={(e) => upd(b.id, { text: e.target.value })} placeholder="Type something" aria-label="Text block" style={inputStyle} />}
            {b.type === "todo" && <label className="ee-row" style={{ gap: 8 }}><input type="checkbox" checked={b.done} onChange={(e) => upd(b.id, { done: e.target.checked })} aria-label="To-do done" /><input value={b.text} onChange={(e) => upd(b.id, { text: e.target.value })} placeholder="To-do" aria-label="To-do block" style={{ ...inputStyle, textDecoration: b.done ? "line-through" : "none" }} /></label>}
            {b.type === "table" && <div className="ee-table-wrap"><table className="ee-table"><tbody>{b.rows.map((r, ri) => <tr key={ri}>{r.map((c, ci) => <td key={ci}><input value={c} onChange={(e) => upd(b.id, { rows: b.rows.map((rr, i) => (i === ri ? rr.map((cc, j) => (j === ci ? e.target.value : cc)) : rr)) })} aria-label={`Table cell ${ri + 1}-${ci + 1}`} style={inputStyle} /></td>)}</tr>)}</tbody></table></div>}
          </div>
        ))}
        {s.blocks.length === 0 && <div className="ee-muted ee-small">Press “+ Add block” to start writing.</div>}
      </div>
      <div style={{ position: "relative", marginTop: 14 }}>
        <Btn size="sm" variant="secondary" onClick={() => setMenu(!menu)} data-testid="add-block">+ Add block</Btn>
        {menu && <div className="ee-card ee-card--tight" style={{ position: "absolute", top: "110%", left: 0, zIndex: 10, minWidth: 200 }} data-testid="block-menu">{[["heading", "Heading 1"], ["todo", "To-do list"], ["table", "Table"], ["text", "Text"]].map(([t, l]) => <button key={t} type="button" className="ee-link" style={{ display: "block", padding: 6, color: "var(--ee-text)" }} onClick={() => add(t)} data-testid={`menu-${t}`}>{l}</button>)}</div>}
      </div>
    </NotionShell>
  );
}
