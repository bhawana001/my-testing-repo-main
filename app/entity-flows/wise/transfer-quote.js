"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { BankShell } from "@/app/components/engines/BankShell";
import { Card, Field, Input, Select, KV, Btn, Badge } from "@/app/components/eval/ui";
import { FX, money, round2 } from "@/lib/seed";

export function quoteUsdInr(amount) {
  const fixed = 1.2, pct = 0.0055;
  const fee = round2(fixed + amount * pct);
  const converted = round2((amount - fee) * FX.USD_INR);
  return { fee, rate: FX.USD_INR, converted, arrival: "Tuesday, September 15 by 6:00 PM IST", amountAfterFee: round2(amount - fee) };
}
const seed = () => ({ amount: "1000", quote: null });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [err, setErr] = useState(null);
  const amt = Number(s.amount);
  function getQuote() {
    if (!(amt >= 10)) { setErr("Enter at least $10.00."); return; }
    setErr(null);
    set({ ...s, quote: quoteUsdInr(amt) });
  }
  return (
    <BankShell entity={ent} nav={["Home", "Send", "Recipients", "Cards"]} active="Send" title="Send money" sub="Get a quote for an international transfer. Rates and fees are fixed in this sandbox.">
      <div className="ee-split">
        <Card data-testid="quote-form">
          <div className="ee-grid ee-grid--2">
            <Field label="You send" htmlFor="q-amount" error={err}><Input id="q-amount" inputMode="decimal" value={s.amount} onChange={(e) => set({ ...s, amount: e.target.value, quote: null })} /></Field>
            <Field label="From"><Select value="USD" readOnly aria-label="From currency"><option>USD</option></Select></Field>
            <Field label="Recipient gets"><Input readOnly value={s.quote ? s.quote.converted.toLocaleString("en-IN", { minimumFractionDigits: 2 }) : ""} placeholder="—" aria-label="Recipient gets" data-testid="q-recipient-gets" /></Field>
            <Field label="To"><Select value="INR" readOnly aria-label="To currency"><option>INR</option></Select></Field>
          </div>
          <Btn block style={{ marginTop: 14, background: "#9fe870", color: "#163300" }} onClick={getQuote} data-testid="get-quote">Get quote</Btn>
        </Card>
        <Card title="Fee breakdown" data-testid="fee-breakdown">
          {s.quote ? (
            <>
              <KV k="You send" v={money(amt)} testId="q-send" />
              <KV k="Wyse fee (1.20 + 0.55%)" v={"−" + money(s.quote.fee)} testId="q-fee" />
              <KV k="Amount we'll convert" v={money(s.quote.amountAfterFee)} testId="q-convert" />
              <KV k="Guaranteed rate (24h)" v={`1 USD = ${s.quote.rate.toFixed(2)} INR`} testId="q-rate" />
              <KV k="Recipient gets" v={money(s.quote.converted, "INR")} total testId="q-gets" />
              <div className="ee-row" style={{ marginTop: 10 }}><Badge tone="ok" data-testid="q-arrival">Should arrive {s.quote.arrival}</Badge></div>
              <Btn block variant="dark" style={{ marginTop: 14 }} data-testid="q-continue">Continue to recipient</Btn>
            </>
          ) : <div className="ee-empty">Enter an amount and get a quote to see fees, rate and arrival time.</div>}
        </Card>
      </div>
    </BankShell>
  );
}
