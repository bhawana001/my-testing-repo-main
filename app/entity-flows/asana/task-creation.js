"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { AsanaShell } from "./_shell";
import { Card, Input, Select, Btn, Alert, Table, Segment, Badge } from "@/app/components/eval/ui";

const seed = () => ({ as: "Demo User", tasks: [{ id: "t1", name: "Draft homepage copy", assignee: "Demo User", due: "2026-09-16" }], inbox: { "Priya Nair": [] } });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [f, setF] = useState({ name: "", assignee: "", due: "" }); const [err, setErr] = useState(null);
  function add() {
    if (!f.name.trim()) { setErr("Task name is required."); return; }
    setErr(null);
    const t = { id: "t" + (s.tasks.length + 1), name: f.name.trim(), assignee: f.assignee || "Unassigned", due: f.due };
    const inbox = { ...s.inbox };
    if (f.assignee && f.assignee !== "Demo User") inbox[f.assignee] = [{ id: t.id, text: `Demo User assigned you a task: ${t.name}`, due: t.due }, ...(inbox[f.assignee] || [])];
    set({ ...s, tasks: [...s.tasks, t], inbox }); setF({ name: "", assignee: "", due: "" });
  }
  const notes = s.inbox["Priya Nair"] || [];
  return (
    <AsanaShell flow={flow} active={s.as === "Demo User" ? "Projects · Website launch" : "Inbox"} title={s.as === "Demo User" ? "Website launch · List" : "Inbox · Priya Nair"} actions={<Segment options={[{ value: "Demo User", label: "Me" }, { value: "Priya Nair", label: "Priya" }]} value={s.as} onChange={(v) => set({ ...s, as: v })} />}>
      {s.as === "Demo User" ? (<>
        <Card title="Add task" data-testid="add-task">
          <div className="ee-grid ee-grid--3">
            <Input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Task name" aria-label="Task name" />
            <Select value={f.assignee} onChange={(e) => setF({ ...f, assignee: e.target.value })} aria-label="Assignee"><option value="">Assignee…</option>{["Demo User", "Priya Nair", "Tom Alvarez"].map((a) => <option key={a}>{a}</option>)}</Select>
            <Input type="date" value={f.due} onChange={(e) => setF({ ...f, due: e.target.value })} aria-label="Due date" />
          </div>
          {err && <Alert tone="err">{err}</Alert>}
          <Btn style={{ marginTop: 10 }} onClick={add} data-testid="add-task-btn">Add task</Btn>
        </Card>
        <Card title="Tasks" style={{ marginTop: 14 }} data-testid="task-list"><Table cols={[{ key: "name", label: "Task name" }, { key: "assignee", label: "Assignee", render: (r) => <span data-testid={`assignee-${r.id}`}>{r.assignee}</span> }, { key: "due", label: "Due date", render: (r) => <span data-testid={`due-${r.id}`}>{r.due || "—"}</span> }]} rows={s.tasks} rowKey={(r) => r.id} /></Card>
      </>) : (
        <Card title={<span>Inbox {notes.length > 0 && <Badge tone="err" data-testid="inbox-count">{notes.length}</Badge>}</span>} data-testid="inbox">
          {notes.length === 0 ? <div className="ee-empty">No notifications.</div> : notes.map((n) => <div key={n.id} className="ee-card ee-card--flat ee-card--tight" data-testid={`notify-${n.id}`}><div>{n.text}</div><div className="ee-tiny ee-muted">Due {n.due || "no date"} · Website launch</div></div>)}
        </Card>
      )}
    </AsanaShell>
  );
}
