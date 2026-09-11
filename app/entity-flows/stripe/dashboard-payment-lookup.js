"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Table, Badge, KV, Input, Segment, Timeline } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const PAYMENTS = [
  { id: "pi_3Q9zLatest4242", amount: 79.0, status: "Succeeded", customer: "demo@evals.dev", date: "Sep 14, 2026, 10:04 AM", card: "Visa •••• 4242", desc: "Pro plan + 2 seats" },
  { id: "pi_3Q9yDecl0002", amount: 64.5, status: "Failed", customer: "sam@acme.test", date: "Sep 14, 2026, 9:40 AM", card: "Visa •••• 0002", desc: "Bouquet order" },
  { id: "pi_3Q9x3ds3220", amount: 120.0, status: "Succeeded", customer: "maria@globex.test", date: "Sep 13, 2026, 6:12 PM", card: "Visa •••• 3220", desc: "Airport transfer" },
  { id: "pi_3Q9wRefund", amount: 35.0, status: "Refunded", customer: "ahmed@initech.test", date: "Sep 12, 2026, 2:30 PM", card: "Mastercard •••• 4444", desc: "Coffee subscription" },
];
const TONE = { Succeeded: "ok", Failed: "err", Refunded: undefined };
const seed = () => ({ filter: "All", open: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [q, setQ] = useState("");
  const rows = PAYMENTS.filter((p) => (s.filter === "All" || p.status === s.filter) && (!q || (p.id + p.customer + p.desc).toLowerCase().includes(q.toLowerCase())));
  const p = PAYMENTS.find((x) => x.id === s.open);
  return (
    <SaasShell flow={flow} nav={["Home", "Payments", "Balances", "Customers", "Developers"]} active="Payments" title={p ? money(p.amount) + " USD" : "Payments"} sub={p ? p.id : "Test mode"}>
      {!p ? (<>
        <div className="ee-row" style={{ marginBottom: 10 }}><Segment options={["All", "Succeeded", "Refunded", "Failed"]} value={s.filter} onChange={(v) => set({ ...s, filter: v })} /><Input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search payments" aria-label="Search payments" style={{ maxWidth: 260 }} /></div>
        <Card data-testid="payments-list"><Table cols={[{ key: "amount", label: "Amount", render: (r) => <button className="ee-link" onClick={() => set({ ...s, open: r.id })} data-testid={`open-${r.id}`}>{money(r.amount)} USD</button> }, { key: "status", label: "Status", render: (r) => <Badge tone={TONE[r.status]}>{r.status}</Badge> }, { key: "desc", label: "Description" }, { key: "customer", label: "Customer" }, { key: "date", label: "Date" }]} rows={rows} rowKey={(r) => r.id} /></Card>
      </>) : (
        <div className="ee-split" data-testid="payment-detail">
          <Card>
            <button className="ee-link ee-small" onClick={() => set({ ...s, open: null })}>← Payments</button>
            <div className="ee-row" style={{ margin: "8px 0" }}><span className="ee-price" style={{ fontSize: 28 }} data-testid="detail-amount">{money(p.amount)} USD</span><Badge tone={TONE[p.status]} data-testid="detail-status">{p.status === "Succeeded" ? "Succeeded · Paid" : p.status}</Badge></div>
            <KV k="Payment ID" v={<span className="ee-mono">{p.id}</span>} /><KV k="Description" v={p.desc} /><KV k="Customer" v={p.customer} /><KV k="Payment method" v={p.card} /><KV k="Date" v={p.date} />
          </Card>
          <Card title="Timeline"><Timeline items={[{ title: "Payment started", meta: p.date, state: "done" }, { title: p.status === "Failed" ? "Payment failed · card_declined" : "Payment succeeded", meta: p.date, state: "done" }, ...(p.status === "Refunded" ? [{ title: "Refunded", meta: "Sep 13, 2026", state: "done" }] : [])]} /></Card>
        </div>
      )}
    </SaasShell>
  );
}
