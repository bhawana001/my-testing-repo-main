"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { MobileShell } from "@/app/components/engines/MobileShell";
import { Field, Input, Btn, RadioCard, KV, Alert } from "@/app/components/eval/ui";
import { money, round2 } from "@/lib/seed";

export function instantFee(n) { return round2(Math.min(25, Math.max(0.25, n * 0.0175))); }
const seed = () => ({ balance: 312.4, transfers: [] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [amt, setAmt] = useState("100"); const [speed, setSpeed] = useState("instant"); const [err, setErr] = useState(null); const [last, setLast] = useState(null);
  const n = Number(amt) || 0; const fee = speed === "instant" ? instantFee(n) : 0; const net = round2(n - fee);
  function go() {
    if (!(n > 0) || n > s.balance) { setErr("Enter an amount up to your balance."); return; }
    setErr(null);
    const t = { id: "CO" + (s.transfers.length + 1), amount: n, fee, net, speed, eta: speed === "instant" ? "In minutes" : "1–3 business days" };
    set({ balance: round2(s.balance - n), transfers: [t, ...s.transfers] }); setLast(t);
  }
  return (
    <MobileShell flow={flow} title="Transfer to bank" nav={["Feed", "Pay", "Wallet"]}>
      <KV k="Venmoo balance" v={money(s.balance)} total testId="balance" />
      <Field label="Amount" htmlFor="co-amt" error={err}><Input id="co-amt" inputMode="decimal" value={amt} onChange={(e) => setAmt(e.target.value)} /></Field>
      <div className="ee-stack" role="radiogroup" aria-label="Transfer speed">
        <RadioCard name="speed" value="instant" checked={speed === "instant"} onChange={setSpeed} title="Instant" desc="1.75% fee (min $0.25, max $25) · arrives in minutes" right={<span data-testid="instant-fee">{money(instantFee(n))} fee</span>} />
        <RadioCard name="speed" value="standard" checked={speed === "standard"} onChange={setSpeed} title="1–3 business days" desc="No fee" right="Free" />
      </div>
      <KV k="Fee" v={money(fee)} testId="fee" /><KV k="You'll receive" v={money(net)} total testId="net" /><KV k="Arrives" v={speed === "instant" ? "In minutes" : "1–3 business days"} testId="arrival" />
      <Btn block onClick={go} data-testid="co-transfer">Transfer {money(n)} to Chaise •••• 4821</Btn>
      {last && <Alert tone="ok" data-testid="co-result">Transfer {last.id}: {money(last.amount)} sent{last.fee ? ` with a ${money(last.fee)} instant fee` : ""}. You'll receive {money(last.net)} · {last.eta}.</Alert>}
    </MobileShell>
  );
}
