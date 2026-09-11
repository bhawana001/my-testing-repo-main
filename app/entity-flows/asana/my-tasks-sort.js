"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { AsanaShell } from "./_shell";
import { Card, Segment, Badge } from "@/app/components/eval/ui";

// Today = Monday 2026-09-14. This week = through Sunday 2026-09-20.
const TODAY = "2026-09-14", WEEK_END = "2026-09-20";
const TASKS = [
  { id: 1, name: "Send invoice to Globex", due: "2026-09-11" }, { id: 2, name: "Review PR #482", due: "2026-09-14" }, { id: 3, name: "1:1 prep with Priya", due: "2026-09-14" },
  { id: 4, name: "Draft Q4 OKRs", due: "2026-09-17" }, { id: 5, name: "Renew SSL certificate", due: "2026-09-29" }, { id: 6, name: "Read design doc", due: "" },
];
export function bucket(d) { if (!d) return "No due date"; if (d < TODAY) return "Overdue"; if (d === TODAY) return "Today"; if (d <= WEEK_END) return "This week"; return "Later"; }
const ORDER = ["Overdue", "Today", "This week", "Later", "No due date"];
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), () => ({ group: "due" }));
  const sections = s.group === "due" ? ORDER.map((b) => ({ b, items: TASKS.filter((t) => bucket(t.due) === b).sort((x, y) => x.due.localeCompare(y.due)) })) : [{ b: "All tasks", items: TASKS }];
  return (
    <AsanaShell flow={flow} active="My tasks" title="My tasks" actions={<Segment options={[{ value: "due", label: "Group: Due date" }, { value: "none", label: "No grouping" }]} value={s.group} onChange={(v) => set({ group: v })} />}>
      <div className="ee-small ee-muted" style={{ marginBottom: 10 }}>Today is Monday, September 14, 2026</div>
      <div className="ee-stack" data-testid="my-tasks">
        {sections.map(({ b, items }) => (
          <Card key={b} tight data-testid={`section-${b.replace(/\s+/g, "-").toLowerCase()}`}>
            <div className="ee-row ee-row--between"><span className="ee-strong">{b}</span><Badge tone={b === "Overdue" ? "err" : undefined}>{items.length}</Badge></div>
            {items.map((t) => <div key={t.id} className="ee-row ee-row--between ee-small" style={{ padding: "4px 0" }} data-testid={`task-${t.id}`}><span>○ {t.name}</span><span className={b === "Overdue" ? "" : "ee-muted"} style={b === "Overdue" ? { color: "var(--ee-err)" } : undefined}>{t.due || "—"}</span></div>)}
            {items.length === 0 && <div className="ee-tiny ee-muted">Nothing here</div>}
          </Card>
        ))}
      </div>
    </AsanaShell>
  );
}
