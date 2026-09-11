"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, Badge, KV } from "@/app/components/eval/ui";
import { PaymentForm } from "@/app/components/engines/Checkout";
import { normalizeCard } from "@/lib/seed";

const brandOf = (n) => (normalizeCard(n).startsWith("5") ? "Mastercard" : "Visa");
const seed = () => ({ methods: [{ id: "pm_1", brand: "Visa", last4: "4242", exp: "12/29", default: true }], adding: false });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const makeDefault = (id) => set({ ...s, methods: s.methods.map((m) => ({ ...m, default: m.id === id })) });
  return (
    <>
      <Topbar entity={ent} light right={<span className="ee-small ee-muted">Acme Cloud · customer portal</span>} />
      <main className="ee-main ee-main--narrow">
        <Card title="Current plan"><KV k="Pro plan" v="$49.00 per month" /><KV k="Renews" v="October 14, 2026" /></Card>
        <Card title="Payment methods" data-testid="payment-methods">
          {s.methods.map((m) => <div key={m.id} className="ee-row ee-row--between" style={{ padding: "6px 0" }} data-testid={`pm-${m.last4}`}><span>💳 {m.brand} •••• {m.last4} <span className="ee-tiny ee-muted">Expires {m.exp}</span></span><span className="ee-row">{m.default ? <Badge tone="ok" data-testid={`default-${m.last4}`}>Default</Badge> : <Btn size="sm" variant="secondary" onClick={() => makeDefault(m.id)} data-testid={`make-default-${m.last4}`}>Make default</Btn>}</span></div>)}
          {!s.adding ? <Btn size="sm" variant="secondary" style={{ marginTop: 8 }} onClick={() => set({ ...s, adding: true })} data-testid="add-pm">+ Add payment method</Btn> : (
            <div style={{ marginTop: 10 }} data-testid="add-pm-form"><PaymentForm amount={0} allow3ds={false} buttonLabel="Add and set as default" onSuccess={(p) => { const last4 = p.last4; set({ adding: false, methods: [...s.methods.map((m) => ({ ...m, default: false })), { id: "pm_" + (s.methods.length + 1), brand: last4 === "4444" ? "Mastercard" : p.brand, last4, exp: "12/29", default: true }] }); }} /></div>
          )}
        </Card>
      </main>
    </>
  );
}
