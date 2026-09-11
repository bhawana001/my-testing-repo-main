"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { AsanaShell } from "./_shell";
import { Kanban } from "@/app/components/engines/Crud";
import { Modal, KV, Badge } from "@/app/components/eval/ui";

const COLS = [{ id: "To do", label: "To do" }, { id: "Doing", label: "Doing" }, { id: "Done", label: "Done" }];
const seed = () => ({ cards: [{ id: "T-31", title: "Draft homepage copy", stage: "To do", history: [{ text: "Demo User created this task", when: "Sep 10" }] }, { id: "T-32", title: "Pick hero image", stage: "Doing", history: [{ text: "Priya Nair created this task", when: "Sep 11" }] }], open: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const move = (id, to) => set((st) => ({ ...st, cards: st.cards.map((c) => (c.id === id && c.stage !== to ? { ...c, stage: to, history: [{ text: `Demo User moved this task from ${c.stage} to ${to}`, when: "just now" }, ...c.history] } : c)) }));
  const rec = s.cards.find((c) => c.id === s.open);
  return (
    <AsanaShell flow={flow} active="Projects · Website launch" title="Website launch · Board">
      <Kanban columns={COLS} cards={s.cards} onMove={move} onCardClick={(c) => set({ ...s, open: c.id })} testIdPrefix="board" renderCard={(c) => <div data-testid={`task-${c.id}`}><div className="ee-strong">{c.title}</div></div>} />
      <Modal open={!!rec} title={rec?.title} onClose={() => set({ ...s, open: null })}>
        {rec && <div data-testid="task-detail"><KV k="Section" v={<Badge tone="info" data-testid="task-section">{rec.stage}</Badge>} /><div className="ee-strong ee-small" style={{ marginTop: 10 }}>Activity</div><div data-testid="task-history">{rec.history.map((h, i) => <div key={i} className="ee-small">{h.text} · <span className="ee-muted">{h.when}</span></div>)}</div></div>}
      </Modal>
    </AsanaShell>
  );
}
