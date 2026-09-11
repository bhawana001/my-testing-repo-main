"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Kanban } from "@/app/components/engines/Crud";
import { Alert } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const STAGES = [{ id: "appt", label: "Appointment scheduled" }, { id: "qualified", label: "Qualified to buy" }, { id: "presentation", label: "Presentation scheduled" }, { id: "decision", label: "Decision maker bought-in" }, { id: "won", label: "Closed won" }];
const seed = () => ({ cards: [
  { id: "D-101", title: "Globex · Marketing Hub", amount: 18000, stage: "qualified" },
  { id: "D-102", title: "Initech · Sales seats", amount: 7200, stage: "appt" },
  { id: "D-103", title: "Hooli · Enterprise", amount: 64000, stage: "presentation" },
], last: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const move = (id, stage) => set((st) => { const c = st.cards.find((x) => x.id === id); if (c.stage === stage) return st; return { cards: st.cards.map((x) => (x.id === id ? { ...x, stage } : x)), last: { title: c.title, amount: c.amount, from: STAGES.find((x) => x.id === c.stage).label, to: STAGES.find((x) => x.id === stage).label } }; });
  const totals = Object.fromEntries(STAGES.map((st) => [st.id, s.cards.filter((c) => c.stage === st.id).reduce((a, c) => a + c.amount, 0)]));
  return (
    <SaasShell flow={flow} nav={["Contacts", "Companies", "Deals", "Marketing"]} active="Deals" title="Deals · Sales Pipeline" sub={`Total ${money(s.cards.reduce((a, c) => a + c.amount, 0))}`}>
      {s.last && <Alert tone="ok" data-testid="deal-moved">{s.last.title} moved from “{s.last.from}” to “{s.last.to}”. Amount {money(s.last.amount)} unchanged.</Alert>}
      <div style={{ height: 10 }} />
      <Kanban columns={STAGES.map((st) => ({ ...st, label: `${st.label} · ${money(totals[st.id])}` }))} cards={s.cards} onMove={move} testIdPrefix="deals" renderCard={(c) => (<div data-testid={`deal-${c.id}`}><div className="ee-strong">{c.title}</div><div className="ee-small" data-testid={`deal-${c.id}-amount`}>Amount: {money(c.amount)}</div></div>)} />
    </SaasShell>
  );
}
