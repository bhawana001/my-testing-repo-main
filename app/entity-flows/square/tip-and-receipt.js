"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { Btn, Card, Field, Input, KV, Badge } from "@/app/components/eval/ui";
import { money, round2 } from "@/lib/seed";

const SUBTOTAL = 24.0;
const TIPS = [{ label: "15%", pct: 15 }, { label: "20%", pct: 20 }, { label: "25%", pct: 25 }];
const seed = () => ({ stage: "tip", tip: null, receipt: null, paid: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [custom, setCustom] = useState("");
  const [email, setEmail] = useState("");
  const total = round2(SUBTOTAL + (s.tip || 0));
  return (
    <main className="ee-main ee-main--narrow">
      <Card data-testid="pos">
        <div className="ee-row ee-row--between"><span className="ee-strong">Bean There Coffee · Register 1</span><Badge>Web POS</Badge></div>
        <div className="ee-divider" />
        <KV k="2 × Flat white" v={money(9)} /><KV k="Almond croissant" v={money(4.5)} /><KV k="Bag of beans 250g" v={money(10.5)} />
        <KV k="Subtotal" v={money(SUBTOTAL)} testId="pos-subtotal" />
        {s.stage === "tip" && (
          <div className="ee-stack" style={{ marginTop: 14 }} data-testid="tip-screen">
            <h2 style={{ fontSize: 20 }}>Add a tip?</h2>
            <div className="ee-grid ee-grid--4" style={{ gap: 8 }}>
              {TIPS.map((t) => { const v = round2((SUBTOTAL * t.pct) / 100); return <button key={t.pct} type="button" className="ee-slot" data-selected={s.tip === v ? "true" : "false"} aria-pressed={s.tip === v} onClick={() => set({ ...s, tip: v })} data-testid={`tip-${t.pct}`}>{t.label}<br /><span className="ee-small">{money(v)}</span></button>; })}
              <button type="button" className="ee-slot" data-selected={s.tip === 0 ? "true" : "false"} aria-pressed={s.tip === 0} onClick={() => set({ ...s, tip: 0 })} data-testid="tip-none">No tip</button>
            </div>
            <div className="ee-row"><Input placeholder="Custom amount" inputMode="decimal" value={custom} onChange={(e) => setCustom(e.target.value)} aria-label="Custom tip" style={{ maxWidth: 160 }} /><Btn variant="secondary" size="sm" onClick={() => { const v = Number(custom); if (!isNaN(v) && v >= 0) set({ ...s, tip: round2(v) }); }}>Apply</Btn></div>
            <KV k="Tip" v={s.tip == null ? "—" : money(s.tip)} testId="pos-tip" />
            <KV k="Total" v={money(total)} total testId="pos-total" />
            <Btn block size="lg" disabled={s.tip == null} onClick={() => set({ ...s, stage: "receipt", paid: { id: "sq_pos_" + Math.round(total * 100), total } })} data-testid="pos-pay">Charge {money(total)}</Btn>
          </div>
        )}
        {s.stage === "receipt" && (
          <div className="ee-stack" style={{ marginTop: 14 }} data-testid="receipt-screen">
            <div className="ee-alert ee-alert--ok">Payment of <b data-testid="charged-total">{money(s.paid.total)}</b> approved (includes {money(s.tip)} tip).</div>
            <h2 style={{ fontSize: 20 }}>How would you like your receipt?</h2>
            <div className="ee-row"><Input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Receipt email" style={{ flex: 1 }} /><Btn onClick={() => set({ ...s, stage: "done", receipt: { kind: "email", to: email || "demo@evals.dev" } })} data-testid="receipt-email">Email</Btn></div>
            <div className="ee-row"><Btn variant="secondary" onClick={() => set({ ...s, stage: "done", receipt: { kind: "sms", to: "+1 555 010 0123" } })} data-testid="receipt-sms">Text message</Btn><Btn variant="secondary" onClick={() => set({ ...s, stage: "done", receipt: { kind: "none" } })} data-testid="receipt-none">No receipt</Btn></div>
          </div>
        )}
        {s.stage === "done" && (
          <div className="ee-stack" style={{ marginTop: 14 }} data-testid="done-screen">
            <div className="ee-badge ee-badge--ok">Transaction complete</div>
            <KV k="Total charged" v={money(s.paid.total)} testId="done-total" />
            <KV k="Tip" v={money(s.tip)} testId="done-tip" />
            <KV k="Receipt" v={s.receipt.kind === "none" ? "Not sent" : `${s.receipt.kind === "email" ? "Emailed" : "Texted"} to ${s.receipt.to}`} testId="done-receipt" />
            <Btn variant="secondary" onClick={() => set(seed())}>New sale</Btn>
          </div>
        )}
      </Card>
    </main>
  );
}
