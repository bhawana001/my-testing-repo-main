"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Kanban } from "@/app/components/engines/Crud";
import { Modal, KV, Badge } from "@/app/components/eval/ui";
import { ISSUES } from "./_data";

const COLS = [{ id: "To Do", label: "To Do" }, { id: "In Progress", label: "In Progress" }, { id: "In Review", label: "In Review" }, { id: "Done", label: "Done" }];
const seed = () => ({ cards: ISSUES.filter((i) => i.key.startsWith("WEB")).map((i) => ({ id: i.key, title: i.summary, stage: i.status, priority: i.priority, history: [] })), open: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const move = (id, to) => set((st) => ({ ...st, cards: st.cards.map((c) => (c.id === id && c.stage !== to ? { ...c, stage: to, history: [{ text: `Demo User changed the Status from ${c.stage} to ${to}`, when: "just now" }, ...c.history] } : c)) }));
  const rec = s.cards.find((c) => c.id === s.open);
  return (
    <SaasShell flow={flow} nav={["Your work", "Projects · Website", "Board", "Backlog"]} active="Board" title="WEB Sprint 14 · Board" sub="Sep 14 – Sep 25">
      <Kanban columns={COLS} cards={s.cards} onMove={move} onCardClick={(c) => set({ ...s, open: c.id })} testIdPrefix="sprint" renderCard={(c) => <div data-testid={`issue-${c.id}`}><div className="ee-small">{c.title}</div><div className="ee-row ee-tiny" style={{ marginTop: 4 }}><span className="ee-mono">{c.id}</span><Badge tone={c.priority.startsWith("High") ? "err" : undefined}>{c.priority}</Badge></div></div>} />
      <Modal open={!!rec} title={rec ? `${rec.id} · ${rec.title}` : ""} onClose={() => set({ ...s, open: null })}>
        {rec && <div data-testid="issue-detail"><KV k="Status" v={<Badge tone="info" data-testid="issue-status">{rec.stage}</Badge>} /><div className="ee-strong ee-small" style={{ marginTop: 10 }}>History</div><div data-testid="issue-history">{rec.history.length ? rec.history.map((h, i) => <div key={i} className="ee-small">{h.text} · <span className="ee-muted">{h.when}</span></div>) : <div className="ee-tiny ee-muted">No changes yet</div>}</div></div>}
      </Modal>
    </SaasShell>
  );
}
