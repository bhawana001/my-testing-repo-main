"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { MobileShell } from "@/app/components/engines/MobileShell";
import { Field, Input, Select, Btn, KV, Badge, Alert } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const seed = () => ({ mandates: [{ id: "m1", service: "Spotifly Premium", cap: 119, freq: "Monthly", status: "Active" }] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [service, setService] = useState("Netflixy"); const [cap, setCap] = useState("649"); const [freq, setFreq] = useState("Monthly"); const [stage, setStage] = useState("form"); const [pin, setPin] = useState(""); const [err, setErr] = useState(null); const [last, setLast] = useState(null);
  function create() {
    if (pin !== "1234") { setErr("Incorrect UPI PIN."); return; }
    const m = { id: "m" + (s.mandates.length + 1), service, cap: Number(cap), freq, status: "Active", ref: "MND" + String(Number(cap)).padStart(5, "0") };
    set({ mandates: [m, ...s.mandates] }); setLast(m); setStage("form"); setPin(""); setErr(null);
  }
  return (
    <MobileShell flow={flow} title="AutoPay" nav={["Home", "Scan", "AutoPay"]}>
      {stage === "form" ? (<>
        <div className="ee-strong ee-small">Set up a new AutoPay mandate</div>
        <Field label="Service" htmlFor="ap-service"><Select id="ap-service" value={service} onChange={(e) => setService(e.target.value)}>{["Netflixy", "YouTubely Premium", "Airwave Postpaid", "SIP · Nova Mutual Fund"].map((x) => <option key={x}>{x}</option>)}</Select></Field>
        <Field label="Maximum amount per debit (₹)" htmlFor="ap-cap"><Input id="ap-cap" inputMode="numeric" value={cap} onChange={(e) => setCap(e.target.value)} /></Field>
        <Field label="Frequency" htmlFor="ap-freq"><Select id="ap-freq" value={freq} onChange={(e) => setFreq(e.target.value)}>{["Monthly", "Weekly", "Quarterly"].map((x) => <option key={x}>{x}</option>)}</Select></Field>
        <Btn block onClick={() => { if (!(Number(cap) > 0)) { setErr("Enter a cap amount."); return; } setErr(null); setStage("pin"); }} data-testid="ap-continue">Continue</Btn>
        {err && <Alert tone="err">{err}</Alert>}
        {last && <Alert tone="ok" data-testid="ap-created">AutoPay for {last.service} is active. Max {money(last.cap, "INR")} {last.freq.toLowerCase()}. Ref {last.ref}.</Alert>}
      </>) : (<>
        <KV k="Service" v={service} /><KV k="Cap" v={`${money(Number(cap), "INR")} · ${freq}`} />
        <Field label="UPI PIN" htmlFor="ap-pin" error={err} help="Demo PIN 1234"><Input id="ap-pin" type="password" inputMode="numeric" maxLength={4} value={pin} onChange={(e) => setPin(e.target.value)} /></Field>
        <Btn block onClick={create} data-testid="ap-authorise">Authorise mandate</Btn>
      </>)}
      <div className="ee-strong ee-small">Your mandates</div>
      {s.mandates.map((m) => <div key={m.id} className="ee-row ee-row--between ee-small" data-testid={`mandate-${m.id}`}><span><b>{m.service}</b><div className="ee-tiny ee-muted">Up to {money(m.cap, "INR")} · {m.freq}</div></span><Badge tone="ok" data-testid={`mandate-${m.id}-status`}>{m.status}</Badge></div>)}
    </MobileShell>
  );
}
