"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Table, Badge, Btn, Modal, Input, Field, Alert, KV } from "@/app/components/eval/ui";
import { money, round2 } from "@/lib/seed";

const seed = () => ({ balance: 1250, txs: [{ id: "sq_T301", when: "Sep 14, 10:02 AM", desc: "Bean There · Register 1", amount: 64.5, refunded: 0 }, { id: "sq_T300", when: "Sep 14, 9:15 AM", desc: "Online · Coffee subscription", amount: 35, refunded: 0 }, { id: "sq_T299", when: "Sep 13, 5:40 PM", desc: "Register 2", amount: 12.75, refunded: 0 }] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [open, setOpen] = useState(null); const [amt, setAmt] = useState(""); const [err, setErr] = useState(null); const [ok, setOk] = useState(null);
  const tx = s.txs.find((t) => t.id === open);
  function refund() { const n = Number(amt); const max = round2(tx.amount - tx.refunded); if (!(n > 0)) { setErr("Enter a refund amount."); return; } if (n > max) { setErr(`Refund can't exceed ${money(max)}.`); return; } setErr(null); set({ balance: round2(s.balance - n), txs: s.txs.map((t) => (t.id === tx.id ? { ...t, refunded: round2(t.refunded + n) } : t)) }); setOk({ id: tx.id, n }); setOpen(null); setAmt(""); }
  const status = (t) => (t.refunded === 0 ? "Completed" : t.refunded >= t.amount ? "Refunded" : `Partially refunded ${money(t.refunded)}`);
  return (
    <SaasShell flow={flow} nav={["Home", "Transactions", "Balance", "Customers"]} active="Transactions" title="Transactions" actions={<Badge tone="info">Balance <span data-testid="account-balance">{money(s.balance)}</span></Badge>}>
      {ok && <Alert tone="ok" data-testid="refund-ok">Refund of {money(ok.n)} issued for {ok.id}.</Alert>}
      <Card style={{ marginTop: 10 }} data-testid="transactions"><Table cols={[{ key: "when", label: "Date" }, { key: "desc", label: "Description" }, { key: "amount", label: "Amount", align: "right", render: (r) => money(r.amount) }, { key: "st", label: "Status", render: (r) => <Badge tone={r.refunded ? "warn" : "ok"} data-testid={`status-${r.id}`}>{status(r)}</Badge> }, { key: "x", label: "", render: (r) => <Btn size="sm" variant="secondary" disabled={r.refunded >= r.amount} onClick={() => { setErr(null); setOpen(r.id); }} data-testid={`refund-${r.id}`}>Issue refund</Btn> }]} rows={s.txs} rowKey={(r) => r.id} /></Card>
      <Modal open={!!tx} title={tx ? `Refund ${tx.id}` : ""} onClose={() => setOpen(null)}>
        {tx && <div className="ee-stack" data-testid="refund-modal"><KV k="Original amount" v={money(tx.amount)} /><KV k="Refundable" v={money(tx.amount - tx.refunded)} /><Field label="Refund amount" htmlFor="rf-amt"><Input id="rf-amt" inputMode="decimal" value={amt} onChange={(e) => setAmt(e.target.value)} /></Field>{err && <Alert tone="err">{err}</Alert>}<Btn onClick={refund} data-testid="refund-confirm">Refund</Btn></div>}
      </Modal>
    </SaasShell>
  );
}
