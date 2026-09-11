"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { TradeShell } from "@/app/components/engines/TradeShell";
import { Card, Input, Btn, Field, Alert, KV, Badge, useDelay } from "@/app/components/eval/ui";
import { money, round2 } from "@/lib/seed";
import { PopupWindow } from "@/app/components/engines/PaymentPage";

const seed = () => ({ margin: 25000, log: [] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const delay = useDelay();
  const [amt, setAmt] = useState(""); const [vpa, setVpa] = useState(""); const [err, setErr] = useState(null); const [collect, setCollect] = useState(false); const [busy, setBusy] = useState(false); const [last, setLast] = useState(null);
  function start() {
    const n = Number(amt);
    if (!(n >= 100)) { setErr("Minimum ₹100."); return; }
    if (!/^[\w.\-]{2,}@[a-z]{2,}$/i.test(vpa)) { setErr("Enter a valid UPI ID."); return; }
    setErr(null); setCollect(true);
  }
  async function approve() {
    setBusy(true); await delay(700); setBusy(false);
    const n = Number(amt); const before = s.margin;
    set({ margin: round2(before + n), log: [{ id: "PAYIN-" + (s.log.length + 1), amount: n, vpa, before, after: round2(before + n) }, ...s.log] });
    setLast({ n, before, after: round2(before + n) }); setCollect(false); setAmt("");
  }
  return (
    <TradeShell flow={flow} nav={["Dashboard", "Orders", "Holdings", "Funds"]} active="Funds" right={<span />}>
      <div className="ee-split">
        <Card title="Equity" data-testid="funds">
          <KV k="Available margin" v={<span data-testid="available-margin">{money(s.margin, "INR")}</span>} total />
          <KV k="Used margin" v={money(0, "INR")} /><KV k="Opening balance" v={money(25000, "INR")} />
          {last && <Alert tone="ok" data-testid="funds-added">{money(last.n, "INR")} added via UPI. Available margin {money(last.before, "INR")} → {money(last.after, "INR")}.</Alert>}
        </Card>
        <Card title="Add funds" data-testid="add-funds">
          <div className="ee-stack">
            <Field label="Amount (₹)" htmlFor="af-amt"><Input id="af-amt" inputMode="numeric" value={amt} onChange={(e) => setAmt(e.target.value)} /></Field>
            <Field label="UPI ID" htmlFor="af-vpa" help="A collect request is sent to this UPI ID"><Input id="af-vpa" value={vpa} onChange={(e) => setVpa(e.target.value)} placeholder="name@bank" /></Field>
            {err && <Alert tone="err">{err}</Alert>}
            <Btn onClick={start} data-testid="af-continue">Continue</Btn>
          </div>
        </Card>
      </div>
      <PopupWindow open={collect} title="UPI collect request" url="upi://collect · Zerodhi Broking" onClose={() => setCollect(false)} testId="upi-collect">
        <div className="ee-stack" style={{ maxWidth: 360, margin: "0 auto" }}>
          <Badge tone="info">UPI app (simulated)</Badge>
          <div className="ee-strong">Zerodhi Broking is requesting {money(Number(amt) || 0, "INR")}</div>
          <div className="ee-small ee-muted">To: {vpa}</div>
          <Btn block loading={busy} onClick={approve} data-testid="upi-approve">Approve</Btn>
          <Btn block variant="secondary" onClick={() => { setCollect(false); setErr("Collect request declined."); }} data-testid="upi-decline">Decline</Btn>
        </div>
      </PopupWindow>
    </TradeShell>
  );
}
