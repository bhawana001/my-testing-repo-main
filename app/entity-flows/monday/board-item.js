"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { MondayShell, StatusPill, STATUS } from "./_shell";
import { Card, Input, Select, Btn, Alert } from "@/app/components/eval/ui";

const seed = () => ({ items: [{ id: "i1", name: "Write press release", status: "Done", person: "Tom Alvarez", date: "2026-09-10" }, { id: "i2", name: "Book venue", status: "Working on it", person: "Priya Nair", date: "2026-09-18" }] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [f, setF] = useState({ name: "", status: "Not started", person: "", date: "" }); const [err, setErr] = useState(null);
  function add() { if (!f.name.trim()) { setErr("Item name is required."); return; } setErr(null); set({ items: [...s.items, { id: "i" + (s.items.length + 1), ...f, name: f.name.trim() }] }); setF({ name: "", status: "Not started", person: "", date: "" }); }
  const upd = (id, patch) => set({ items: s.items.map((i) => (i.id === id ? { ...i, ...patch } : i)) });
  return (
    <MondayShell flow={flow} title="Marketing plan · Main table">
      <Card data-testid="board">
        <div className="ee-strong" style={{ color: "#579bfc", marginBottom: 8 }}>This month</div>
        <div className="ee-table-wrap"><table className="ee-table"><thead><tr><th>Item</th><th>Person</th><th>Status</th><th>Date</th></tr></thead><tbody>
          {s.items.map((i) => (
            <tr key={i.id} data-testid={`item-${i.id}`}>
              <td className="ee-strong">{i.name}</td>
              <td><Select value={i.person} onChange={(e) => upd(i.id, { person: e.target.value })} aria-label={`Person for ${i.name}`} style={{ width: "auto" }}><option value="">—</option>{["Demo User", "Priya Nair", "Tom Alvarez"].map((p) => <option key={p}>{p}</option>)}</Select></td>
              <td><Select value={i.status} onChange={(e) => upd(i.id, { status: e.target.value })} aria-label={`Status for ${i.name}`} style={{ width: "auto", background: STATUS[i.status], color: "#fff", fontWeight: 700 }}>{Object.keys(STATUS).map((x) => <option key={x}>{x}</option>)}</Select></td>
              <td>{i.date || "—"}</td>
            </tr>
          ))}
          <tr data-testid="add-row"><td><Input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="+ Add item" aria-label="New item name" /></td><td><Select value={f.person} onChange={(e) => setF({ ...f, person: e.target.value })} aria-label="New item person"><option value="">Person…</option>{["Demo User", "Priya Nair", "Tom Alvarez"].map((p) => <option key={p}>{p}</option>)}</Select></td><td><Select value={f.status} onChange={(e) => setF({ ...f, status: e.target.value })} aria-label="New item status">{Object.keys(STATUS).map((x) => <option key={x}>{x}</option>)}</Select></td><td><div className="ee-row"><Input type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} aria-label="New item date" /><Btn size="sm" onClick={add} data-testid="add-item">Add</Btn></div></td></tr>
        </tbody></table></div>
        {err && <Alert tone="err">{err}</Alert>}
      </Card>
    </MondayShell>
  );
}
