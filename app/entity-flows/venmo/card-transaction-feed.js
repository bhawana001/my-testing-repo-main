"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { MobileShell } from "@/app/components/engines/MobileShell";
import { Btn, Badge } from "@/app/components/eval/ui";
import { TxFeed } from "@/app/components/engines/Feed";

const seed = () => ({ feed: [{ id: "c1", who: "Trailhead Outfitters", note: "Venmoo Debit Card", amount: 48.2, dir: "out", when: "Sep 12", tag: "3% cashback" }], seq: 2, cashback: 1.45 });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  function simulate() {
    const amount = 22.0; const cb = Math.round(amount * 0.03 * 100) / 100;
    set({ ...s, seq: s.seq + 1, cashback: Math.round((s.cashback + cb) * 100) / 100, feed: [{ id: "c" + s.seq, who: "Bean There Coffee", note: "Venmoo Debit Card", amount, dir: "out", when: "Just now", tag: "3% cashback" }, ...s.feed] });
  }
  return (
    <MobileShell flow={flow} title="Venmoo Debit Card" nav={["Feed", "Pay", "Cards"]}>
      <div className="ee-card" style={{ background: "linear-gradient(135deg,#008cff,#0074de)", color: "#fff" }}><div className="ee-small">Cashback earned this month</div><div className="ee-price" style={{ fontSize: 26 }} data-testid="cashback-total">${s.cashback.toFixed(2)}</div><div className="ee-tiny">3% back at select merchants</div></div>
      <Btn variant="secondary" onClick={simulate} data-testid="simulate-purchase">Simulate a $22.00 card purchase at Bean There Coffee</Btn>
      <div className="ee-strong ee-small">Card transactions</div>
      <TxFeed items={s.feed} testIdPrefix="card" />
    </MobileShell>
  );
}
