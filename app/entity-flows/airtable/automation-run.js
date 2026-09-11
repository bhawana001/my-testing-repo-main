"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Table, Select, Badge, KV } from "@/app/components/eval/ui";

const seed = () => ({ rows: [{ id: "rec-21", task: "Write release notes", status: "In progress", completed: "" }, { id: "rec-22", task: "Update pricing FAQ", status: "Todo", completed: "" }], runs: [] });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  function change(id, status) {
    set((st) => {
      const prev = st.rows.find((r) => r.id === id);
      let runs = st.runs;
      const rows = st.rows.map((r) => { if (r.id !== id) return r; if (status === "Done" && prev.status !== "Done") return { ...r, status, completed: "2026-09-14" }; return { ...r, status, completed: status === "Done" ? r.completed : "" }; });
      if (status === "Done" && prev.status !== "Done") runs = [{ n: st.runs.length + 1, id, task: prev.task, result: "Succeeded", actions: [`Set “Completed” = 2026-09-14 on ${id}`, `Sent message to #launch: “✅ ${prev.task} is done”`] }, ...st.runs];
      return { ...st, rows, runs };
    });
  }
  return (
    <>
      <Topbar entity={ent} nav={["Grid view", "Automations"]} active="Grid view" light />
      <main className="ee-main">
        <Card title="Automation · When Status becomes Done" data-testid="automation"><KV k="Trigger" v="When a record matches conditions: Status is Done" /><KV k="Actions" v="Update record (Completed = today) · Send message to #launch" /><KV k="State" v={<Badge tone="ok">On</Badge>} /></Card>
        <div style={{ height: 14 }} />
        <Card title="Tasks · Grid view" data-testid="grid">
          <Table cols={[{ key: "task", label: "Task" }, { key: "status", label: "Status", render: (r) => <Select value={r.status} onChange={(e) => change(r.id, e.target.value)} aria-label={`Status for ${r.task}`} style={{ width: "auto" }}>{["Todo", "In progress", "Done"].map((x) => <option key={x}>{x}</option>)}</Select> }, { key: "completed", label: "Completed", render: (r) => <span data-testid={`completed-${r.id}`}>{r.completed || "—"}</span> }]} rows={s.rows} rowKey={(r) => r.id} />
        </Card>
        <Card title="Run history" style={{ marginTop: 14 }} data-testid="run-history">
          {s.runs.length === 0 ? <div className="ee-tiny ee-muted">No runs yet.</div> : s.runs.map((r) => <div key={r.n} className="ee-card ee-card--flat ee-card--tight" data-testid={`run-${r.n}`}><div className="ee-row ee-row--between"><b>Run #{r.n} · {r.task}</b><Badge tone="ok">{r.result}</Badge></div>{r.actions.map((a, i) => <div key={i} className="ee-small">✓ {a}</div>)}</div>)}
        </Card>
      </main>
    </>
  );
}
