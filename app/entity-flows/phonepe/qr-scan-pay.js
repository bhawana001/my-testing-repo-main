"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { MobileShell } from "@/app/components/engines/MobileShell";
import { Field, Input, Btn, KV, Badge } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const MERCHANT = { name: "Fresh Mart Groceries", vpa: "freshmart@ybl" };
const seed = () => ({ stage: "scan", amount: "", paid: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [pin, setPin] = useState(""); const [err, setErr] = useState(null);
  return (
    <MobileShell flow={flow} title="Scan & Pay" nav={["Home", "Scan", "History"]}>
      {s.stage === "scan" && (<>
        <div className="ee-card ee-card--flat" style={{ aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", background: "#111", color: "#fff", borderRadius: 16 }} data-testid="camera">
          <div className="ee-center"><div style={{ fontSize: 48 }}>▣</div><div className="ee-small">Point camera at a QR code</div></div>
        </div>
        <Btn block onClick={() => set({ ...s, stage: "amount" })} data-testid="simulate-scan">Simulate scan of merchant QR</Btn>
      </>)}
      {s.stage === "amount" && (<>
        <div className="ee-row"><span className="ee-avatar ee-avatar--round">FM</span><div><div className="ee-strong" data-testid="merchant-name">{MERCHANT.name}</div><div className="ee-tiny ee-muted">{MERCHANT.vpa} · Verified merchant</div></div></div>
        <Field label="Enter amount (₹)" htmlFor="qr-amt" error={err}><Input id="qr-amt" inputMode="decimal" value={s.amount} onChange={(e) => set({ ...s, amount: e.target.value })} style={{ fontSize: 24 }} /></Field>
        <Btn block onClick={() => { if (!(Number(s.amount) > 0)) { setErr("Enter an amount."); return; } setErr(null); set({ ...s, stage: "pin" }); }} data-testid="qr-pay">Pay</Btn>
      </>)}
      {s.stage === "pin" && (<>
        <KV k="Paying" v={MERCHANT.name} /><KV k="Amount" v={money(Number(s.amount), "INR")} />
        <Field label="UPI PIN" htmlFor="qr-pin" error={err} help="Demo PIN 1234"><Input id="qr-pin" type="password" inputMode="numeric" maxLength={4} value={pin} onChange={(e) => setPin(e.target.value)} /></Field>
        <Btn block onClick={() => { if (pin !== "1234") { setErr("Incorrect UPI PIN."); return; } set({ ...s, stage: "done", paid: { amount: Number(s.amount), ref: "T2609141005" + s.amount.replace(/\D/g, "").slice(0, 3) } }); }} data-testid="qr-confirm">Confirm</Btn>
      </>)}
      {s.stage === "done" && s.paid && (<div className="ee-stack" data-testid="qr-success">
        <div className="ee-center"><div style={{ fontSize: 40 }}>✅</div><div className="ee-strong" style={{ fontSize: 18 }}>Payment successful</div></div>
        <KV k="Paid to" v={MERCHANT.name} testId="success-merchant" /><KV k="Amount" v={money(s.paid.amount, "INR")} testId="success-amount" /><KV k="Transaction ID" v={<span className="ee-mono">{s.paid.ref}</span>} />
        <Badge tone="ok">Debited from HDFB Bank •••• 7712</Badge>
        <Btn variant="secondary" size="sm" onClick={() => { setPin(""); set(seed()); }}>Scan another</Btn>
      </div>)}
    </MobileShell>
  );
}
