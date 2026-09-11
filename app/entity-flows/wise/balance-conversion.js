"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { BankShell } from "@/app/components/engines/BankShell";
import { Card, Field, Input, Select, KV, Btn, Alert } from "@/app/components/eval/ui";
import { FX, money, round2 } from "@/lib/seed";

const RATES = { "USD>EUR": FX.USD_EUR, "EUR>USD": round2(1 / FX.USD_EUR * 1000) / 1000, "USD>GBP": FX.USD_GBP, "GBP>USD": round2(1 / FX.USD_GBP * 1000) / 1000, "EUR>GBP": FX.EUR_GBP, "GBP>EUR": round2(1 / FX.EUR_GBP * 1000) / 1000 };
const seed = () => ({ balances: { USD: 1200, EUR: 300, GBP: 150 }, last: null });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [from, setFrom] = useState("USD"); const [to, setTo] = useState("EUR"); const [amt, setAmt] = useState("100"); const [err, setErr] = useState(null);
  const rate = RATES[`${from}>${to}`];
  const n = Number(amt);
  const gets = rate ? round2(n * rate) : 0;
  function convert() {
    if (from === to) { setErr("Choose two different currencies."); return; }
    if (!(n > 0)) { setErr("Enter an amount."); return; }
    if (n > s.balances[from]) { setErr(`Insufficient ${from} balance.`); return; }
    setErr(null);
    set({ balances: { ...s.balances, [from]: round2(s.balances[from] - n), [to]: round2(s.balances[to] + gets) }, last: { from, to, n, gets, rate } });
  }
  const accounts = ["USD", "EUR", "GBP"].map((c) => ({ id: c.toLowerCase(), name: `${c} balance`, balance: s.balances[c], currency: c }));
  return (
    <BankShell entity={ent} nav={["Home", "Send", "Recipients", "Cards"]} active="Home" accounts={accounts} title="Convert between balances">
      <div className="ee-split">
        <Card data-testid="convert-form">
          <div className="ee-grid ee-grid--2">
            <Field label="Amount" htmlFor="cv-amt" error={err}><Input id="cv-amt" inputMode="decimal" value={amt} onChange={(e) => setAmt(e.target.value)} /></Field>
            <Field label="From" htmlFor="cv-from"><Select id="cv-from" value={from} onChange={(e) => setFrom(e.target.value)}>{["USD", "EUR", "GBP"].map((c) => <option key={c}>{c}</option>)}</Select></Field>
            <Field label="To" htmlFor="cv-to"><Select id="cv-to" value={to} onChange={(e) => setTo(e.target.value)}>{["USD", "EUR", "GBP"].map((c) => <option key={c}>{c}</option>)}</Select></Field>
          </div>
          <KV k="Rate" v={rate ? `1 ${from} = ${rate} ${to}` : "—"} testId="cv-rate" />
          <KV k="You get" v={rate ? money(gets, to) : "—"} total testId="cv-gets" />
          <Btn block style={{ marginTop: 12, background: "#9fe870", color: "#163300" }} onClick={convert} data-testid="cv-convert">Convert</Btn>
        </Card>
        <Card title="Last conversion">
          {s.last ? <Alert tone="ok" data-testid="cv-result">Converted {money(s.last.n, s.last.from)} to {money(s.last.gets, s.last.to)} at 1 {s.last.from} = {s.last.rate} {s.last.to}. Balances updated.</Alert> : <div className="ee-empty">No conversions yet.</div>}
        </Card>
      </div>
    </BankShell>
  );
}
