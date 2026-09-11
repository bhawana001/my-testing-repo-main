"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { MobileShell } from "@/app/components/engines/MobileShell";
import { Field, Input, Select, KV, Btn, Alert } from "@/app/components/eval/ui";
import { FX, money, round2 } from "@/lib/seed";

const RATES = { "USD>EUR": FX.USD_EUR, "EUR>USD": 1.087, "USD>GBP": FX.USD_GBP, "GBP>USD": 1.266, "EUR>GBP": FX.EUR_GBP, "GBP>EUR": 1.163 };
const seed = () => ({ pockets: { USD: 500, EUR: 120, GBP: 80 }, last: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [from, setFrom] = useState("USD"); const [to, setTo] = useState("EUR"); const [amt, setAmt] = useState("50"); const [err, setErr] = useState(null);
  const rate = RATES[`${from}>${to}`]; const n = Number(amt); const gets = rate ? round2(n * rate) : 0;
  function go() {
    if (from === to) { setErr("Pick two different pockets."); return; }
    if (!(n > 0) || n > s.pockets[from]) { setErr(`Enter an amount up to your ${from} balance.`); return; }
    setErr(null);
    set({ pockets: { ...s.pockets, [from]: round2(s.pockets[from] - n), [to]: round2(s.pockets[to] + gets) }, last: { from, to, n, gets, rate } });
  }
  return (
    <MobileShell flow={flow} title="Exchange" nav={["Home", "Cards", "Payments", "Wealth"]}>
      <div className="ee-grid ee-grid--3" style={{ gap: 8 }} data-testid="pockets">
        {["USD", "EUR", "GBP"].map((c) => <div key={c} className="ee-card ee-card--flat ee-card--tight"><div className="ee-tiny ee-muted">{c} pocket</div><div className="ee-strong ee-num" data-testid={`pocket-${c.toLowerCase()}`}>{money(s.pockets[c], c)}</div></div>)}
      </div>
      <div className="ee-grid ee-grid--2" style={{ gap: 8 }}>
        <Field label="From" htmlFor="ex-from"><Select id="ex-from" value={from} onChange={(e) => setFrom(e.target.value)}>{["USD", "EUR", "GBP"].map((c) => <option key={c}>{c}</option>)}</Select></Field>
        <Field label="To" htmlFor="ex-to"><Select id="ex-to" value={to} onChange={(e) => setTo(e.target.value)}>{["USD", "EUR", "GBP"].map((c) => <option key={c}>{c}</option>)}</Select></Field>
      </div>
      <Field label="Amount" htmlFor="ex-amt" error={err}><Input id="ex-amt" inputMode="decimal" value={amt} onChange={(e) => setAmt(e.target.value)} /></Field>
      <KV k="Quoted rate" v={rate ? `1 ${from} = ${rate} ${to}` : "—"} testId="ex-rate" />
      <KV k="You'll get" v={rate ? money(gets, to) : "—"} total testId="ex-gets" />
      <Btn block onClick={go} data-testid="ex-confirm">Exchange</Btn>
      {s.last && <Alert tone="ok" data-testid="ex-result">Exchanged {money(s.last.n, s.last.from)} → {money(s.last.gets, s.last.to)} at 1 {s.last.from} = {s.last.rate} {s.last.to}.</Alert>}
    </MobileShell>
  );
}
