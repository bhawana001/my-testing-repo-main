"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { BankShell } from "@/app/components/engines/BankShell";
import { TrackerTimeline, TrackerHeader, ScriptedAdvance } from "@/app/components/engines/Tracker";
import { Card, Btn, KV } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const STEPS = [
  { id: "setup", title: "Transfer set up", at: "Mon, Sep 14 · 10:02 AM" },
  { id: "received", title: "We received your USD", at: "Mon, Sep 14 · 10:40 AM", meta: "Bank debit confirmed" },
  { id: "processing", title: "Your money's being processed", at: "Mon, Sep 14 · 11:15 AM", meta: "Converted at 1 USD = 83.20 INR" },
  { id: "sent", title: "Sent to Asha's bank", at: "Mon, Sep 14 · 2:05 PM", meta: "IMPS · ref WYS-20260914-7A" },
  { id: "done", title: "Asha received the money", at: "Mon, Sep 14 · 2:07 PM" },
];
const TRANSFERS = [{ id: "t-88112", to: "Asha Rao", amount: 1000, gets: 82740.64 }];
const seed = () => ({ selected: null, idx: 2 });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const t = TRANSFERS[0];
  const label = s.idx >= STEPS.length - 1 ? "Complete" : s.idx === 3 ? "Sent" : "In progress";
  return (
    <BankShell entity={ent} nav={["Home", "Send", "Recipients", "Cards"]} active="Home" title="Activity">
      {!s.selected ? (
        <Card tight data-testid="activity-list">
          <button type="button" className="ee-row" style={{ width: "100%", background: "none", border: 0, cursor: "pointer", textAlign: "left", padding: 4 }} onClick={() => set({ ...s, selected: t.id })} data-testid="transfer-row">
            <span className="ee-avatar ee-avatar--round">AR</span>
            <span style={{ flex: 1 }}><div className="ee-strong">To {t.to}</div><div className="ee-small ee-muted" data-testid="transfer-row-status">{label} · {money(t.gets, "INR")}</div></span>
            <span className="ee-strong ee-num">−{money(t.amount)}</span>
          </button>
        </Card>
      ) : (
        <Card data-testid="transfer-detail">
          <button className="ee-link ee-small" onClick={() => set({ ...s, selected: null })}>← Activity</button>
          <div style={{ height: 8 }} />
          <TrackerHeader title={`${money(t.amount)} to ${t.to}`} subtitle={`Transfer #${t.id} · ${t.to} gets ${money(t.gets, "INR")}`} status={label} tone={label === "Complete" ? "ok" : "info"} />
          <TrackerTimeline steps={STEPS} currentIndex={s.idx} />
          <div className="ee-small ee-muted" data-testid="current-step">Current step: {s.idx >= STEPS.length ? "Complete" : STEPS[s.idx].title}</div>
          <ScriptedAdvance steps={STEPS} currentIndex={s.idx} onAdvance={() => set({ ...s, idx: Math.min(STEPS.length - 1, s.idx + 1) })} label="Simulate next update" />
        </Card>
      )}
    </BankShell>
  );
}
