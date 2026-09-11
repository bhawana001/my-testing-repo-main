"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Toggle, Btn, Badge } from "@/app/components/eval/ui";
import { TxFeed } from "@/app/components/engines/Feed";

const seed = () => ({ frozen: false, tx: [{ id: "t1", who: "Coffee Corner", note: "Card purchase", amount: 4.2, dir: "out", when: "Today 8:45 AM", tag: "Approved" }], seq: 2 });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  function purchase() {
    set((st) => ({ ...st, seq: st.seq + 1, tx: [{ id: `t${st.seq}`, who: "Metro Grocer", note: st.frozen ? "Declined · card frozen" : "Card purchase", amount: 23.5, dir: "out", when: `Today 9:${String(st.seq).padStart(2, "0")} AM`, tag: st.frozen ? "Declined" : "Approved" }, ...st.tx] }));
  }
  return (
    <>
      <Topbar entity={ent} nav={["Home", "Cards", "Payments", "Wealth"]} active="Cards" light={false} />
      <main className="ee-main ee-main--narrow">
        <div className="ee-mobile-note">mobile web equivalent</div>
        <div className="ee-phone">
          <div className="ee-phone__bar"><span>Revolute</span><span className="ee-small">Cards</span></div>
          <div className="ee-phone__body ee-stack">
            <div className="ee-card" style={{ background: s.frozen ? "linear-gradient(135deg,#5b6b7c,#2b3540)" : "linear-gradient(135deg,#4f55f1,#191c1f)", color: "#fff", minHeight: 150 }} data-testid="virtual-card" data-frozen={s.frozen ? "true" : "false"}>
              <div className="ee-row ee-row--between"><span className="ee-strong">Virtual card</span>{s.frozen ? <Badge tone="warn" data-testid="card-status">Frozen</Badge> : <Badge tone="ok" data-testid="card-status">Active</Badge>}</div>
              <div className="ee-mono" style={{ fontSize: 20, margin: "26px 0 8px" }}>•••• •••• •••• 8841</div>
              <div className="ee-small">DEMO USER · 09/29</div>
            </div>
            <div className="ee-row ee-row--between">
              <span className="ee-strong">Freeze card</span>
              <Toggle checked={s.frozen} label="Freeze card" onChange={(v) => set({ ...s, frozen: v })} data-testid="freeze-toggle" />
            </div>
            <div className="ee-small ee-muted" data-testid="freeze-help">{s.frozen ? "Card is frozen: all new purchases will be declined until you unfreeze." : "Card is active: purchases will be approved."}</div>
            <Btn variant="secondary" onClick={purchase} data-testid="simulate-purchase">Simulate a $23.50 purchase at Metro Grocer</Btn>
            <div className="ee-strong ee-small">Recent transactions</div>
            <TxFeed items={s.tx} testIdPrefix="tx" />
          </div>
        </div>
      </main>
    </>
  );
}
