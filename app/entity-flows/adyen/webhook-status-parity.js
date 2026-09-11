"use client";
import { useEffect } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Badge, KV } from "@/app/components/eval/ui";
import { PaymentForm } from "@/app/components/engines/Checkout";
import { TrackerTimeline } from "@/app/components/engines/Tracker";

const seed = () => ({ order: { ref: "NH-ORDER-5521", status: "Awaiting payment" }, events: [], pending: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  // The notification arrives ~1 s after the payment (deterministic delay), then the order page updates from it.
  useEffect(() => { if (!s.pending) return; const t = setTimeout(() => set((st) => { const ev = st.pending; return { ...st, pending: null, events: [ev, ...st.events], order: { ...st.order, status: ev.success ? "Authorised" : "Refused", psp: ev.pspReference } }; }), 1000); return () => clearTimeout(t); }, [s.pending, set]);
  const last = s.events[0];
  const parity = last && ((last.success && s.order.status === "Authorised") || (!last.success && s.order.status === "Refused"));
  return (
    <SaasShell flow={flow} nav={["Home", "Transactions", "Webhooks", "Orders"]} active="Orders" title={`Order ${s.order.ref}`} sub="Merchant back office · Nordic Home">
      <div className="ee-split ee-split--even">
        <Card title="Merchant order page" data-testid="order-page">
          <KV k="Order" v={s.order.ref} /><KV k="Amount" v="€210.00" />
          <KV k="Payment status" v={<Badge tone={s.order.status === "Authorised" ? "ok" : s.order.status === "Refused" ? "err" : "warn"} data-testid="order-status">{s.order.status}</Badge>} />
          {s.order.psp && <KV k="PSP reference" v={<span className="ee-mono">{s.order.psp}</span>} />}
          <TrackerTimeline steps={[{ id: "created", title: "Order created" }, { id: "paid", title: "Payment submitted" }, { id: "notified", title: "Notification received" }]} currentIndex={s.events.length ? 3 : s.pending ? 2 : 1} testIdPrefix="order" />
          {!s.events.length && !s.pending && <div style={{ marginTop: 10 }}><PaymentForm amount={210} currency="EUR" allow3ds={false} onSuccess={(p) => set({ ...s, pending: { eventCode: "AUTHORISATION", success: true, pspReference: "8836" + p.last4 + "5521", merchantReference: s.order.ref, amount: "EUR 210.00" } })} onDecline={() => set({ ...s, pending: { eventCode: "AUTHORISATION", success: false, pspReference: "8836000200025521", merchantReference: s.order.ref, amount: "EUR 210.00", reason: "Refused" } })} /></div>}
          {s.pending && <div className="ee-small ee-muted" style={{ marginTop: 8 }} data-testid="awaiting-webhook">Waiting for payment notification…</div>}
        </Card>
        <Card title="Webhook notifications" data-testid="webhook-log">
          {s.events.length === 0 ? <div className="ee-empty">No notifications yet.</div> : s.events.map((e, i) => <pre key={i} className="ee-mono ee-small" style={{ whiteSpace: "pre-wrap", background: "var(--ee-surface-2)", padding: 10, borderRadius: 8 }} data-testid={`webhook-${i}`}>{JSON.stringify({ eventCode: e.eventCode, success: String(e.success), pspReference: e.pspReference, merchantReference: e.merchantReference, amount: e.amount, ...(e.reason ? { reason: e.reason } : {}) }, null, 2)}</pre>)}
          {last && <div data-testid="parity"><Badge tone={parity ? "ok" : "err"}>{parity ? `In sync ✓ · UI status “${s.order.status}” = notification ${last.eventCode} success=${last.success}` : "Mismatch"}</Badge></div>}
        </Card>
      </div>
    </SaasShell>
  );
}
