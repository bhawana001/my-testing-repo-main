"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { MobileShell } from "@/app/components/engines/MobileShell";
import { Field, Input, Btn, KV, Badge, Alert } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const seed = () => ({ wallet: 3250, transfers: [] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [amt, setAmt] = useState(""); const [err, setErr] = useState(null); const [last, setLast] = useState(null);
  function transfer() {
    const n = Number(amt);
    if (!(n > 0)) { setErr("Enter an amount."); return; }
    if (n > s.wallet) { setErr("Amount exceeds your wallet balance."); return; }
    setErr(null);
    const t = { id: "WB" + String(1000 + s.transfers.length), amount: n, status: "Initiated", eta: "Within 24 hours" };
    set({ wallet: s.wallet - n, transfers: [t, ...s.transfers] }); setLast(t); setAmt("");
  }
  return (
    <MobileShell flow={flow} title="Wallet" nav={["Home", "UPI", "Wallet", "Bills"]}>
      <div className="ee-card" style={{ background: "linear-gradient(135deg,#002e6e,#00b9f1)", color: "#fff" }}><div className="ee-small">Paytum Wallet balance</div><div className="ee-price" style={{ fontSize: 28 }} data-testid="wallet-balance">{money(s.wallet, "INR")}</div></div>
      <div className="ee-strong ee-small">Transfer to linked bank</div>
      <KV k="Bank" v="HDFB Bank •••• 7712" />
      <Field label="Amount (₹)" htmlFor="wb-amt" error={err}><Input id="wb-amt" inputMode="decimal" value={amt} onChange={(e) => setAmt(e.target.value)} /></Field>
      <Btn block onClick={transfer} data-testid="wb-transfer">Transfer to bank</Btn>
      {last && <Alert tone="ok" data-testid="wb-result">{money(last.amount, "INR")} transfer initiated to HDFB Bank •••• 7712. Ref {last.id}. Wallet debited.</Alert>}
      <div className="ee-strong ee-small">Transfers</div>
      {s.transfers.length === 0 ? <div className="ee-tiny ee-muted">No transfers yet.</div> : s.transfers.map((t) => <div key={t.id} className="ee-row ee-row--between ee-small" data-testid={`transfer-${t.id}`}><span>{t.id} · {t.eta}</span><span className="ee-row"><b>{money(t.amount, "INR")}</b><Badge tone="info" data-testid={`transfer-${t.id}-status`}>{t.status}</Badge></span></div>)}
    </MobileShell>
  );
}
