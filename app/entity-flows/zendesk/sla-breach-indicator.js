"use client";
import { useEffect, useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Badge, KV, Table } from "@/app/components/eval/ui";
import { PRIORITY_TONE } from "@/lib/seed/helpdesk";

// SLA policy: first reply target by priority. Remaining time starts from a fixed
// seeded value on load and counts down in real seconds (deterministic start).
export const POLICY = { Urgent: 60, High: 240, Normal: 480, Low: 1440 }; // minutes
const TICKETS = [
  { id: 1050, subject: "Production API returning 500s", priority: "Urgent", remaining: 42 * 60 + 10 },
  { id: 1049, subject: "SSO login loop for new users", priority: "High", remaining: -15 * 60 },
  { id: 1047, subject: "Question about invoice format", priority: "Normal", remaining: 5 * 3600 + 20 * 60 },
];
const fmt = (sec) => { const neg = sec < 0; const a = Math.abs(sec); const h = Math.floor(a / 3600), m = Math.floor((a % 3600) / 60), s2 = a % 60; return `${neg ? "−" : ""}${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s2).padStart(2, "0")}`; };
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), () => ({ open: 1050 }));
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => { const t = setInterval(() => setElapsed((e) => e + 1), 1000); return () => clearInterval(t); }, []);
  const rows = TICKETS.map((t) => ({ ...t, left: t.remaining - elapsed }));
  const cur = rows.find((r) => r.id === s.open);
  const target = POLICY[cur.priority];
  return (
    <SaasShell flow={flow} nav={["Views", "Tickets", "SLA policies"]} active="Tickets" title="Unsolved tickets · SLA" sub="Policy: Standard SLA (first reply time)">
      <div className="ee-split">
        <Card data-testid="sla-table">
          <Table cols={[{ key: "id", label: "ID", render: (r) => <button className="ee-link" onClick={() => set({ open: r.id })} data-testid={`sla-open-${r.id}`}>#{r.id}</button> }, { key: "subject", label: "Subject" }, { key: "priority", label: "Priority", render: (r) => <Badge tone={PRIORITY_TONE[r.priority]}>{r.priority}</Badge> }, { key: "left", label: "Next SLA breach", render: (r) => <Badge tone={r.left < 0 ? "err" : r.left < 3600 ? "warn" : "info"} data-testid={`sla-timer-${r.id}`}>{r.left < 0 ? `Breached ${fmt(r.left)}` : fmt(r.left)}</Badge> }]} rows={rows} rowKey={(r) => r.id} />
        </Card>
        <Card title={`#${cur.id} · ${cur.subject}`} data-testid="sla-detail">
          <KV k="Priority" v={<Badge tone={PRIORITY_TONE[cur.priority]} data-testid="sla-priority">{cur.priority}</Badge>} />
          <KV k="SLA metric" v="First reply time" />
          <KV k="Target" v={<span data-testid="sla-target">{target >= 60 ? `${target / 60} hour${target === 60 ? "" : "s"}` : `${target} min`}</span>} />
          <KV k="Time remaining" v={<span className="ee-mono" data-testid="sla-remaining">{cur.left < 0 ? `Breached by ${fmt(-cur.left)}` : fmt(cur.left)}</span>} />
          <KV k="Status" v={<Badge tone={cur.left < 0 ? "err" : "warn"} data-testid="sla-state">{cur.left < 0 ? "Breached" : "Active · counting down"}</Badge>} />
        </Card>
      </div>
    </SaasShell>
  );
}
