"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { PaymentForm } from "@/app/components/engines/Checkout";
import { PaymentSuccess } from "@/app/components/engines/PaymentPage";
import { Btn, Card, Badge, KV } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const INV = { number: "INV-2026-0142", from: "Harbor Landscaping", amount: 480.0, due: "September 20, 2026", items: [{ name: "Lawn care · September", price: 320 }, { name: "Hedge trimming", price: 160 }] };
const seed = () => ({ view: "inbox", paid: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const status = s.paid ? "Paid" : "Unpaid";
  return (
    <main className="ee-main ee-main--narrow">
      {s.view === "inbox" ? (
        <Card title="Inbox · demo@evals.dev" data-testid="inbox">
          <div className="ee-stack">
            <button type="button" className="ee-card ee-card--flat ee-card--tight" style={{ textAlign: "left", cursor: "pointer" }} onClick={() => set({ ...s, view: "invoice" })} data-testid="inbox-invoice">
              <div className="ee-row ee-row--between"><span className="ee-strong">{INV.from} via Squarely</span><Badge tone={s.paid ? "ok" : "warn"} data-testid="inbox-status">{status}</Badge></div>
              <div className="ee-small">Invoice {INV.number} for {money(INV.amount)} · due {INV.due}</div>
              <div className="ee-small ee-muted">Hi Demo, your invoice is ready. Click to view and pay online.</div>
            </button>
            <div className="ee-card ee-card--flat ee-card--tight ee-muted ee-small">Newsletter · Weekly gardening tips</div>
          </div>
        </Card>
      ) : (
        <Card data-testid="invoice">
          <button className="ee-link ee-small" onClick={() => set({ ...s, view: "inbox" })}>← Back to inbox</button>
          <div className="ee-row ee-row--between" style={{ margin: "10px 0" }}>
            <h1 style={{ fontSize: 22 }}>Invoice {INV.number}</h1>
            <Badge tone={s.paid ? "ok" : "warn"} data-testid="invoice-status">{status}</Badge>
          </div>
          <KV k="From" v={INV.from} />
          <KV k="Due" v={INV.due} />
          {INV.items.map((it) => <KV key={it.name} k={it.name} v={money(it.price)} />)}
          <KV k="Amount due" v={money(s.paid ? 0 : INV.amount)} total testId="invoice-due" />
          <div className="ee-divider" />
          {s.paid ? (
            <PaymentSuccess title="Invoice paid" amount={INV.amount} id={s.paid.id} method={`${s.paid.brand} •••• ${s.paid.last4}`} rows={[{ k: "Paid on", v: "September 14, 2026", testId: "paid-on" }]} />
          ) : (
            <PaymentForm amount={INV.amount} allow3ds={false} onSuccess={(p) => set({ ...s, paid: { ...p, id: "sq_inv_0142" } })} buttonLabel={`Pay ${money(INV.amount)} now`} />
          )}
        </Card>
      )}
    </main>
  );
}
