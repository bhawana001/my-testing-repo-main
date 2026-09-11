"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { MobileShell } from "@/app/components/engines/MobileShell";
import { Btn, Badge, Check, KV, Alert } from "@/app/components/eval/ui";
import { money, round2 } from "@/lib/seed";

const TX = { id: "tx-9", merchant: "Trattoria Roma", amount: 84.0, when: "Yesterday 8:12 PM" };
const CONTACTS = ["Priya Nair", "Tom Alvarez", "Sam Lee"];
const seed = () => ({ requests: [], view: "tx" });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [picked, setPicked] = useState([]);
  const people = picked.length + 1;
  const share = round2(TX.amount / people);
  function split() {
    const reqs = picked.map((c) => ({ id: "req-" + c.split(" ")[0].toLowerCase(), to: c, amount: share, status: "Requested" }));
    set({ ...s, requests: reqs, view: "done" });
  }
  return (
    <MobileShell flow={flow} title="Transactions" nav={["Home", "Cards", "Payments", "Wealth"]}>
      <div className="ee-card ee-card--flat ee-card--tight" data-testid="transaction">
        <div className="ee-row ee-row--between"><span className="ee-strong">{TX.merchant}</span><span className="ee-strong ee-num">−{money(TX.amount)}</span></div>
        <div className="ee-tiny ee-muted">{TX.when} · Restaurants</div>
      </div>
      {s.view === "tx" && (
        <>
          <div className="ee-strong ee-small">Split bill with</div>
          {CONTACTS.map((c) => <Check key={c} label={c} checked={picked.includes(c)} onChange={(e) => setPicked(e.target.checked ? [...picked, c] : picked.filter((x) => x !== c))} />)}
          <KV k={`Split ${people} ways`} v={`${money(share)} each`} testId="split-share" />
          <Btn block disabled={!picked.length} onClick={split} data-testid="split-confirm">Request {picked.length ? money(share) : ""} from {picked.length || 0} {picked.length === 1 ? "person" : "people"}</Btn>
        </>
      )}
      {s.view === "done" && (
        <div className="ee-stack" data-testid="split-requests">
          <Alert tone="ok">Requests sent. You'll be notified when they pay.</Alert>
          {s.requests.map((r) => <div key={r.id} className="ee-row ee-row--between ee-small" data-testid={r.id}><span>{r.to}</span><span className="ee-row"><b className="ee-num">{money(r.amount)}</b><Badge tone="warn">{r.status}</Badge></span></div>)}
          <Btn variant="secondary" size="sm" onClick={() => { setPicked([]); set(seed()); }}>Split another</Btn>
        </div>
      )}
    </MobileShell>
  );
}
