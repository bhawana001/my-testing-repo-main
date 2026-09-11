"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Kanban } from "@/app/components/engines/Crud";
import { Card, Modal, KV, Badge } from "@/app/components/eval/ui";

const STAGES = [{ id: "Idea", label: "Idea" }, { id: "In progress", label: "In progress" }, { id: "Review", label: "Review" }, { id: "Shipped", label: "Shipped" }];
const seed = () => ({ cards: [{ id: "rec-11", title: "Dark mode", stage: "Idea", owner: "Priya" }, { id: "rec-12", title: "CSV export v2", stage: "In progress", owner: "Demo" }, { id: "rec-13", title: "SSO for teams", stage: "Review", owner: "Tom" }], open: null });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const rec = s.cards.find((c) => c.id === s.open);
  return (
    <>
      <Topbar entity={ent} nav={["Grid view", "Kanban", "Calendar"]} active="Kanban" light />
      <main className="ee-main ee-main--wide">
        <h1 className="ee-page-title">Roadmap · Kanban (grouped by Stage)</h1>
        <Kanban columns={STAGES} cards={s.cards} onMove={(id, stage) => set({ ...s, cards: s.cards.map((c) => (c.id === id ? { ...c, stage } : c)) })} onCardClick={(c) => set({ ...s, open: c.id })} testIdPrefix="roadmap" renderCard={(c) => <div data-testid={`card-${c.id}`}><div className="ee-strong">{c.title}</div><div className="ee-tiny ee-muted">Owner: {c.owner}</div></div>} />
        <Modal open={!!rec} title={rec ? rec.title : ""} onClose={() => set({ ...s, open: null })}>
          {rec && <div data-testid="record-detail"><KV k="Record ID" v={rec.id} /><KV k="Stage" v={<Badge tone="info" data-testid="record-stage">{rec.stage}</Badge>} /><KV k="Owner" v={rec.owner} /></div>}
        </Modal>
      </main>
    </>
  );
}
