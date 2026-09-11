"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { MobileShell } from "@/app/components/engines/MobileShell";
import { Badge, KV, Btn } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";
import { schedule } from "./pay-in-4";

const ORDER = { id: "KL-ORD-2201", merchant: "Studio Lamps", item: "Arc floor lamp", amount: 180 };
const seed = () => ({ view: "list", paidFirst: true });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const sched = schedule(ORDER.amount);
  return (
    <MobileShell flow={flow} title="Purchases" nav={["Home", "Purchases", "Deals", "Wallet"]}>
      {s.view === "list" ? (
        <button type="button" className="ee-card ee-card--flat ee-card--tight" style={{ textAlign: "left", cursor: "pointer" }} onClick={() => set({ ...s, view: "detail" })} data-testid="order-row">
          <div className="ee-row ee-row--between"><span className="ee-strong">{ORDER.merchant}</span><Badge tone="info">Pay in 4</Badge></div>
          <div className="ee-small">{ORDER.item} · {money(ORDER.amount)}</div>
          <div className="ee-tiny ee-muted">Next payment {sched[1].date} · {money(sched[1].amount)}</div>
        </button>
      ) : (
        <div className="ee-stack" data-testid="order-detail">
          <button className="ee-link ee-small" onClick={() => set({ ...s, view: "list" })}>← Purchases</button>
          <div className="ee-strong">{ORDER.merchant} · {ORDER.item}</div>
          <KV k="Order" v={ORDER.id} /><KV k="Total" v={money(ORDER.amount)} testId="order-total" />
          <div className="ee-strong ee-small" style={{ marginTop: 6 }}>Payment schedule</div>
          {sched.map((p) => (
            <div key={p.n} className="ee-row ee-row--between ee-small" data-testid={`inst-${p.n}`}>
              <span>{p.n}. {p.date}</span>
              <span className="ee-row"><b className="ee-num">{money(p.amount)}</b>{p.n === 1 ? <Badge tone="ok">Paid</Badge> : <Badge>Upcoming</Badge>}</span>
            </div>
          ))}
          <KV k="Next payment" v={`${sched[1].date} · ${money(sched[1].amount)}`} total testId="next-payment" />
        </div>
      )}
    </MobileShell>
  );
}
