"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { BankShell } from "@/app/components/engines/BankShell";
import { Wizard, SEED_WIZARD } from "@/app/components/engines/Wizard";
import { Card, Badge, KV, Btn } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const RATE = 0.006; // $ per point for statement credit
const OPTIONS = [{ value: "10000", label: "10,000 points", desc: "$60.00 statement credit", right: "$60.00" }, { value: "25000", label: "25,000 points", desc: "$150.00 statement credit", right: "$150.00" }, { value: "40000", label: "40,000 points", desc: "$240.00 statement credit", right: "$240.00" }];
const STEPS = [
  { id: "pick", title: "Choose", heading: "Redeem Membership Rewards for a statement credit", fields: [{ name: "points", label: "Points to redeem", type: "radio-cards", required: true, options: OPTIONS }] },
  { id: "review", title: "Confirm", heading: "Confirm redemption", summary: true, nextLabel: "Redeem points" },
];
const seed = () => ({ points: 48200, credits: [], wiz: { ...SEED_WIZARD } });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  return (
    <BankShell entity={ent} nav={["Account", "Rewards", "Offers", "Statements"]} active="Rewards" title="Membership Rewards" right={<Badge tone="ok">Points balance: <span data-testid="points-balance">{s.points.toLocaleString()}</span></Badge>}>
      <div className="ee-split">
        <Wizard state={s.wiz} setState={(u) => set((st) => ({ ...st, wiz: typeof u === "function" ? u(st.wiz) : u }))} steps={STEPS} submitLabel="Redeem points" testIdPrefix="redeem"
          onSubmit={(v) => { const pts = Number(v.points); const credit = pts * RATE; const rec = { id: "MR-" + pts, pts, credit, status: "Pending" }; set((st) => ({ ...st, points: st.points - pts, credits: [rec, ...st.credits] })); return rec; }}
          result={(r) => (
            <Card data-testid="redeem-confirmation">
              <Badge tone="ok">Redemption submitted</Badge>
              <h2 style={{ margin: "8px 0" }}>{r.pts.toLocaleString()} points redeemed</h2>
              <KV k="Statement credit" v={money(r.credit)} testId="redeem-credit" />
              <KV k="Status" v={<Badge tone="warn" data-testid="redeem-status">Pending · posts in 2–3 days</Badge>} />
              <KV k="Remaining points" v={s.points.toLocaleString()} testId="redeem-remaining" />
              <Btn variant="secondary" size="sm" style={{ marginTop: 10 }} onClick={() => set((st) => ({ ...st, wiz: { ...SEED_WIZARD } }))}>Redeem more</Btn>
            </Card>
          )} />
        <Card title="Points activity" data-testid="points-activity">
          <KV k="Available points" v={s.points.toLocaleString()} total testId="activity-points" />
          {s.credits.length === 0 ? <div className="ee-empty">No redemptions yet.</div> : s.credits.map((c) => <KV key={c.id} k={`${c.pts.toLocaleString()} pts → ${money(c.credit)} credit`} v={<Badge tone="warn">{c.status}</Badge>} testId={`credit-${c.id}`} />)}
        </Card>
      </div>
    </BankShell>
  );
}
