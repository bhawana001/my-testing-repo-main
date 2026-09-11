"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { TradeShell } from "@/app/components/engines/TradeShell";
import { Card, Input, Btn, Field, Alert, KV, Badge, Select, Check } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const KNOWN = ["0x8ba1f109551bd432803012645ac136ddd64dba72"];
export function validateAddress(asset, a) {
  const addr = a.trim();
  if (!addr) return { level: "error", msg: "Enter a recipient address." };
  if (asset === "ETH") {
    if (/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,62}$/.test(addr)) return { level: "error", msg: "This looks like a Bitcoin address. Sending ETH to it would lose your funds." };
    if (!/^0x[0-9a-fA-F]{40}$/.test(addr)) return { level: "error", msg: "Invalid Ethereum address. It must start with 0x followed by 40 hex characters." };
    if (!KNOWN.includes(addr.toLowerCase())) return { level: "warn", msg: "You've never sent to this address before. Double-check it: crypto sends can't be reversed." };
    return { level: "ok", msg: "Address verified · previously used" };
  }
  return { level: "error", msg: "Unsupported asset." };
}
const seed = () => ({ eth: 1.25, sent: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [addr, setAddr] = useState(""); const [amt, setAmt] = useState(""); const [v, setV] = useState(null); const [ack, setAck] = useState(false); const [review, setReview] = useState(false); const [err, setErr] = useState(null);
  function check() {
    const res = validateAddress("ETH", addr); setV(res); setAck(false);
    if (res.level === "error") { setReview(false); return; }
    if (!(Number(amt) > 0) || Number(amt) > s.eth) { setErr(`Enter an amount up to ${s.eth} ETH.`); return; }
    setErr(null);
  }
  const canReview = v && v.level !== "error" && (v.level === "ok" || ack) && Number(amt) > 0 && Number(amt) <= s.eth;
  return (
    <TradeShell flow={flow} nav={["Home", "Trade", "Send & receive"]} active="Send & receive" right={<span className="ee-small">ETH balance <b data-testid="eth-balance">{s.eth} ETH</b></span>}>
      <Card title="Send Ethereum" style={{ maxWidth: 620 }} data-testid="send-form">
        {s.sent ? (<div className="ee-stack" data-testid="send-done"><Badge tone="ok">Sent</Badge><KV k="Amount" v={`${s.sent.amt} ETH`} /><KV k="To" v={<span className="ee-mono">{s.sent.addr}</span>} /><KV k="Network fee" v="0.00042 ETH" /><Btn variant="secondary" size="sm" onClick={() => set({ ...s, sent: null })}>Send again</Btn></div>) : (
        <div className="ee-stack">
          <Field label="Asset"><Select value="ETH" readOnly aria-label="Asset"><option>ETH · Ethereum network</option></Select></Field>
          <Field label="To (address)" htmlFor="snd-addr"><Input id="snd-addr" value={addr} onChange={(e) => { setAddr(e.target.value); setV(null); setReview(false); }} placeholder="0x…" className="ee-mono" /></Field>
          <Field label="Amount (ETH)" htmlFor="snd-amt" error={err}><Input id="snd-amt" inputMode="decimal" value={amt} onChange={(e) => { setAmt(e.target.value); setReview(false); }} /></Field>
          <Btn variant="secondary" onClick={check} data-testid="snd-check">Check address</Btn>
          {v && <Alert tone={v.level === "error" ? "err" : v.level === "warn" ? "warn" : "ok"} data-testid={`addr-${v.level}`}>{v.msg}</Alert>}
          {v && v.level === "warn" && <Check label="I've checked the address and understand sends can't be reversed" checked={ack} onChange={(e) => setAck(e.target.checked)} />}
          {!review ? <Btn block disabled={!canReview} onClick={() => setReview(true)} data-testid="snd-continue">Continue</Btn> : (<>
            <KV k="Send" v={`${amt} ETH (${money(Number(amt) * 3120)})`} /><KV k="To" v={<span className="ee-mono">{addr.slice(0, 10)}…{addr.slice(-6)}</span>} /><KV k="Network fee" v="0.00042 ETH" />
            <Btn block onClick={() => set({ eth: Math.round((s.eth - Number(amt) - 0.00042) * 1e5) / 1e5, sent: { addr, amt } })} data-testid="snd-confirm">Send now</Btn>
          </>)}
          <div className="ee-tiny ee-muted">Known address for testing: 0x8ba1f109551bd432803012645ac136ddd64dba72</div>
        </div>)}
      </Card>
    </TradeShell>
  );
}
