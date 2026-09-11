"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { AsanaShell } from "./_shell";
import { Card, Btn, Input, Select, Alert, Badge, Check } from "@/app/components/eval/ui";

const seed = () => ({ tasks: [{ id: "T-41", name: "Launch campaign", done: false, blockedBy: null, subtasks: [] }, { id: "T-42", name: "Finalize ad copy", done: false, blockedBy: null, subtasks: [] }], msg: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [sub, setSub] = useState(""); const [dep, setDep] = useState("");
  const main = s.tasks[0];
  const blocker = main.blockedBy ? s.tasks.find((t) => t.id === main.blockedBy) : null;
  const upd = (id, patch) => set((st) => ({ ...st, tasks: st.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)) }));
  function complete(t) {
    if (t.id === main.id && blocker && !blocker.done) { set({ ...s, msg: { tone: "err", text: `“${main.name}” is blocked by “${blocker.name}”. Complete it first.` } }); return; }
    upd(t.id, { done: !t.done }); set((st) => ({ ...st, msg: t.done ? null : { tone: "ok", text: `“${t.name}” marked complete.` } }));
  }
  return (
    <AsanaShell flow={flow} active="Projects · Website launch" title="Launch campaign">
      {s.msg && <Alert tone={s.msg.tone} data-testid="task-msg">{s.msg.text}</Alert>}
      <div className="ee-split" style={{ marginTop: 10 }}>
        <Card data-testid="main-task">
          <div className="ee-row ee-row--between"><span className="ee-strong" style={{ fontSize: 18 }}>{main.done ? "✅ " : ""}{main.name}</span><Btn size="sm" variant={main.done ? "ok" : "secondary"} onClick={() => complete(main)} data-testid="complete-main">{main.done ? "Completed" : "Mark complete"}</Btn></div>
          <div className="ee-small" style={{ margin: "8px 0" }} data-testid="dependency">{blocker ? <Badge tone={blocker.done ? "ok" : "warn"}>Blocked by: {blocker.name}{blocker.done ? " (done)" : ""}</Badge> : <span className="ee-muted">No dependencies</span>}</div>
          <div className="ee-strong ee-small" style={{ marginTop: 10 }}>Subtasks</div>
          <div data-testid="subtasks">{main.subtasks.map((x, i) => <Check key={i} label={x.name} checked={x.done} onChange={(e) => upd(main.id, { subtasks: main.subtasks.map((y, j) => (j === i ? { ...y, done: e.target.checked } : y)) })} />)}{main.subtasks.length === 0 && <div className="ee-tiny ee-muted">No subtasks</div>}</div>
          <div className="ee-row" style={{ marginTop: 8 }}><Input value={sub} onChange={(e) => setSub(e.target.value)} placeholder="Add subtask" aria-label="Add subtask" style={{ flex: 1 }} /><Btn size="sm" variant="secondary" onClick={() => { if (sub.trim()) { upd(main.id, { subtasks: [...main.subtasks, { name: sub.trim(), done: false }] }); setSub(""); } }} data-testid="add-subtask">Add</Btn></div>
          <div className="ee-row" style={{ marginTop: 10 }}><Select value={dep} onChange={(e) => setDep(e.target.value)} aria-label="Blocked by" style={{ flex: 1 }}><option value="">Mark as blocked by…</option>{s.tasks.filter((t) => t.id !== main.id).map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}</Select><Btn size="sm" variant="secondary" disabled={!dep} onClick={() => upd(main.id, { blockedBy: dep })} data-testid="set-dependency">Set dependency</Btn></div>
        </Card>
        <Card title="Other tasks" data-testid="other-tasks">
          {s.tasks.slice(1).map((t) => <div key={t.id} className="ee-row ee-row--between"><span>{t.done ? "✅ " : ""}{t.name}</span><Btn size="sm" variant={t.done ? "ok" : "secondary"} onClick={() => complete(t)} data-testid={`complete-${t.id}`}>{t.done ? "Completed" : "Mark complete"}</Btn></div>)}
        </Card>
      </div>
    </AsanaShell>
  );
}
