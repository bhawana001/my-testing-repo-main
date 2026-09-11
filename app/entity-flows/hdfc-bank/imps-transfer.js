"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { BankShell } from "@/app/components/engines/BankShell";
import { Card, Field, Input, Select, Btn, Badge, Alert, KV } from "@/app/components/eval/ui";
import { money, OTP } from "@/lib/seed";

const seed = () => ({ beneficiaries: [{ id: "b1", name: "Meera Iyer", account: "50100223344556", ifsc: "SBIN0001234", status: "active" }], transfer: null, balance: 184250.4 });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [b, setB] = useState({ name: "", account: "", ifsc: "" }); const [bErr, setBErr] = useState(null);
  const [to, setTo] = useState(""); const [amt, setAmt] = useState(""); const [otp, setOtp] = useState(""); const [tErr, setTErr] = useState(null); const [stage, setStage] = useState("form");
  function addBeneficiary() {
    if (!b.name.trim() || !/^\d{9,18}$/.test(b.account) || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(b.ifsc.toUpperCase())) { setBErr("Enter name, a 9–18 digit account number and a valid IFSC (e.g. HDFC0001234)."); return; }
    setBErr(null);
    const id = "b" + (s.beneficiaries.length + 1);
    set({ ...s, beneficiaries: [...s.beneficiaries, { id, name: b.name.trim(), account: b.account, ifsc: b.ifsc.toUpperCase(), status: "cooling" }] });
    setB({ name: "", account: "", ifsc: "" });
  }
  const activate = (id) => set({ ...s, beneficiaries: s.beneficiaries.map((x) => (x.id === id ? { ...x, status: "active" } : x)) });
  const ben = s.beneficiaries.find((x) => x.id === to);
  function initiate() {
    if (!ben) { setTErr("Select a beneficiary."); return; }
    if (ben.status !== "active") { setTErr("This beneficiary is in the 30-minute cooling period. IMPS is not allowed yet."); return; }
    if (!(Number(amt) > 0) || Number(amt) > s.balance) { setTErr("Enter a valid amount within your balance."); return; }
    setTErr(null); setStage("otp");
  }
  function confirm() {
    if (otp !== OTP) { setTErr("Incorrect OTP."); return; }
    const ref = "IMPS" + String(1000000 + Math.round(Number(amt))).slice(-9) + "14";
    set({ ...s, balance: s.balance - Number(amt), transfer: { ref, to: ben.name, amount: Number(amt) } }); setStage("done"); setTErr(null);
  }
  return (
    <BankShell entity={ent} nav={["NetBanking", "Accounts", "Fund transfer", "Cards"]} active="Fund transfer" accounts={[{ id: "sav", name: "Savings Account", mask: "•••• 7712", balance: s.balance, currency: "INR" }]} title="IMPS fund transfer">
      <div className="ee-split">
        <div className="ee-stack">
          <Card title="Add beneficiary" data-testid="add-beneficiary">
            <div className="ee-stack">
              <Field label="Beneficiary name" htmlFor="bn-name"><Input id="bn-name" value={b.name} onChange={(e) => setB({ ...b, name: e.target.value })} /></Field>
              <Field label="Account number" htmlFor="bn-acct"><Input id="bn-acct" inputMode="numeric" value={b.account} onChange={(e) => setB({ ...b, account: e.target.value })} /></Field>
              <Field label="IFSC" htmlFor="bn-ifsc" error={bErr}><Input id="bn-ifsc" value={b.ifsc} onChange={(e) => setB({ ...b, ifsc: e.target.value })} placeholder="HDFC0001234" /></Field>
              <Btn variant="secondary" onClick={addBeneficiary} data-testid="bn-add">Add beneficiary</Btn>
            </div>
          </Card>
          <Card title="Beneficiaries" data-testid="beneficiary-list">
            <div className="ee-stack">
              {s.beneficiaries.map((x) => (
                <div key={x.id} className="ee-row ee-row--between ee-small" data-testid={`ben-${x.id}`}>
                  <span><b>{x.name}</b> · {x.account} · {x.ifsc}</span>
                  {x.status === "active" ? <Badge tone="ok">Active</Badge> : <span className="ee-row"><Badge tone="warn" data-testid={`ben-${x.id}-cooling`}>Cooling period · 30 min</Badge><Btn size="sm" variant="secondary" onClick={() => activate(x.id)} data-testid={`ben-${x.id}-simulate`}>Simulate 30 min elapsed</Btn></span>}
                </div>
              ))}
            </div>
          </Card>
        </div>
        <Card title="Send via IMPS" data-testid="imps-form">
          {stage === "done" && s.transfer ? (
            <div className="ee-stack" data-testid="imps-success">
              <Alert tone="ok" title="Transfer successful">{money(s.transfer.amount, "INR")} sent to {s.transfer.to} via IMPS.</Alert>
              <KV k="Reference ID" v={<span className="ee-mono" data-testid="imps-ref">{s.transfer.ref}</span>} />
              <Btn variant="secondary" size="sm" onClick={() => { setStage("form"); setAmt(""); setOtp(""); }}>New transfer</Btn>
            </div>
          ) : (
            <div className="ee-stack">
              <Field label="To beneficiary" htmlFor="tr-to"><Select id="tr-to" value={to} onChange={(e) => setTo(e.target.value)}><option value="">Select…</option>{s.beneficiaries.map((x) => <option key={x.id} value={x.id}>{x.name} · {x.account.slice(-4)}{x.status !== "active" ? " (cooling)" : ""}</option>)}</Select></Field>
              <Field label="Amount (INR)" htmlFor="tr-amt"><Input id="tr-amt" inputMode="decimal" value={amt} onChange={(e) => setAmt(e.target.value)} disabled={stage === "otp"} /></Field>
              {stage === "otp" && <Field label="OTP sent to +91 •••• 0123" htmlFor="tr-otp"><Input id="tr-otp" inputMode="numeric" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit OTP" /></Field>}
              {tErr && <Alert tone="err" data-testid="imps-error">{tErr}</Alert>}
              {stage === "form" ? <Btn onClick={initiate} data-testid="imps-continue">Continue</Btn> : <Btn onClick={confirm} data-testid="imps-confirm">Confirm transfer</Btn>}
            </div>
          )}
        </Card>
      </div>
    </BankShell>
  );
}
