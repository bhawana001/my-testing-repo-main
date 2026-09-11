"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Kanban } from "@/app/components/engines/Crud";
import { Badge, Alert } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

export const STAGES = [{ id: "Prospecting", label: "Prospecting", p: 10 }, { id: "Qualification", label: "Qualification", p: 20 }, { id: "Proposal", label: "Proposal", p: 50 }, { id: "Negotiation", label: "Negotiation", p: 75 }, { id: "Closed Won", label: "Closed Won", p: 100 }];
const prob = (st) => STAGES.find((x) => x.id === st).p;
const seed = () => ({ cards: [
  { id: "006-1", title: "Globex · 200 seats", amount: 48000, stage: "Qualification", probability: 20 },
  { id: "006-2", title: "Initech · Renewal", amount: 22000, stage: "Proposal", probability: 50 },
  { id: "006-3", title: "Umbrella · Pilot", amount: 9500, stage: "Prospecting", probability: 10 },
], log: [] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const move = (id, stage) => set((st) => { const c = st.cards.find((x) => x.id === id); if (c.stage === stage) return st; return { cards: st.cards.map((x) => (x.id === id ? { ...x, stage, probability: prob(stage) } : x)), log: [{ id, title: c.title, from: c.stage, to: stage, p: prob(stage) }, ...st.log] }; });
  const last = s.log[0];
  return (
    <SaasShell flow={flow} nav={["Home", "Leads", "Accounts", "Opportunities", "Reports"]} active="Opportunities" title="Opportunities · Kanban" sub={`Pipeline total ${money(s.cards.reduce((a, c) => a + c.amount, 0))}`}>
      {last && <Alert tone="ok" data-testid="stage-change">{last.title} moved from {last.from} to {last.to}. Probability is now {last.p}%.</Alert>}
      <div style={{ height: 10 }} />
      <Kanban columns={STAGES} cards={s.cards} onMove={move} testIdPrefix="opps" renderCard={(c) => (<div data-testid={`opp-${c.id}`}><div className="ee-strong">{c.title}</div><div className="ee-small">{money(c.amount)}</div><Badge tone="info" data-testid={`opp-${c.id}-prob`}>{c.probability}%</Badge></div>)} />
    </SaasShell>
  );
}
