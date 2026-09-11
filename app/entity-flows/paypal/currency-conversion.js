"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, Field, Input, Select, KV, Badge, Alert } from "@/app/components/eval/ui";
import { money, round2 } from "@/lib/seed";

// Mid-market 1 USD = 83.20 INR; PayPally applies a 2.0% conversion spread → 81.54.
const MID = 83.2, SPREAD = 0.02, RATE = round2(MID * (1 - SPREAD)), FEE = 4.99;
const seed = () => ({ stage: "form", amount: "200", sent: null });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [err, setErr] = useState(null);
  const n = Number(s.amount) || 0; const converted = round2(n * RATE);
  return (
    <>
      <Topbar entity={ent} light nav={["Home", "Send & Request", "Activity"]} active="Send & Request" />
      <main className="ee-main ee-main--narrow">
        <Card title="Send money internationally" data-testid="intl-send">
          {s.stage === "form" && (<div className="ee-stack">
            <Field label="To"><Input readOnly value="Asha Rao · asha@sandbox.in (India)" aria-label="Recipient" /></Field>
            <Field label="You send (USD)" htmlFor="cc-amt"><Input id="cc-amt" inputMode="decimal" value={s.amount} onChange={(e) => set({ ...s, amount: e.target.value })} /></Field>
            <Field label="Recipient gets"><Select value="INR" readOnly aria-label="Recipient currency"><option>INR · Indian Rupee</option></Select></Field>
            {err && <Alert tone="err">{err}</Alert>}
            <Btn onClick={() => { if (!(n >= 1)) { setErr("Enter at least $1.00."); return; } setErr(null); set({ ...s, stage: "review" }); }} data-testid="cc-continue">Continue</Btn>
          </div>)}
          {s.stage === "review" && (<div className="ee-stack" data-testid="cc-review">
            <Badge tone="info">Review before you send</Badge>
            <KV k="You send" v={money(n)} testId="cc-send" />
            <KV k="Exchange rate" v={<span data-testid="cc-rate">1 USD = {RATE.toFixed(2)} INR</span>} />
            <div className="ee-tiny ee-muted">Includes a {SPREAD * 100}% currency conversion spread on the mid-market rate of {MID.toFixed(2)}.</div>
            <KV k="Transfer fee" v={money(FEE)} testId="cc-fee" />
            <KV k="Total you pay" v={money(n + FEE)} testId="cc-total" />
            <KV k="Asha receives" v={money(converted, "INR")} total testId="cc-converted" />
            <div className="ee-row"><Btn variant="secondary" onClick={() => set({ ...s, stage: "form" })}>Back</Btn><Btn onClick={() => set({ ...s, stage: "done", sent: { n, converted } })} data-testid="cc-confirm">Send now</Btn></div>
          </div>)}
          {s.stage === "done" && s.sent && (<div className="ee-stack" data-testid="cc-done"><Badge tone="ok">Sent</Badge><div className="ee-strong">You sent {money(s.sent.n)} · Asha receives {money(s.sent.converted, "INR")}</div><KV k="Rate used" v={`1 USD = ${RATE.toFixed(2)} INR`} /><Btn variant="secondary" size="sm" onClick={() => set(seed())}>Send again</Btn></div>)}
        </Card>
      </main>
    </>
  );
}
