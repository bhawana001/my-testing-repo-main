"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { PaymentSuccess } from "@/app/components/engines/PaymentPage";
import { RazorModal } from "./checkout-modal";
import { Btn, Card, Badge, KV } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const LINK = { id: "plink_Kx9Q2M7", amount: 2500, purpose: "Invoice #INV-0231 · Website design deposit", to: "Demo User", expires: "Sep 30, 2026" };
const seed = () => ({ open: false, paid: null, views: 0 });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  return (
    <main className="ee-main ee-main--narrow">
      <Card data-testid="payment-link">
        <div className="ee-row ee-row--between" style={{ marginBottom: 8 }}>
          <span className="ee-strong">Pixel Studio</span>
          <Badge tone={s.paid ? "ok" : "warn"} data-testid="link-status">{s.paid ? "Paid" : "Payment pending"}</Badge>
        </div>
        <div className="ee-muted ee-small">Payment link {LINK.id} · expires {LINK.expires}</div>
        <h1 style={{ fontSize: 22, margin: "10px 0" }}>{LINK.purpose}</h1>
        <KV k="Amount" v={money(LINK.amount, "INR")} testId="link-amount" />
        <KV k="Payable by" v={LINK.to} />
        <div className="ee-divider" />
        {s.paid ? (
          <div className="ee-stack">
            <PaymentSuccess title="This link has been paid" amount={LINK.amount} currency="INR" id={s.paid.id} method={`UPI · ${s.paid.vpa}`} />
            <div className="ee-alert ee-alert--info" data-testid="link-reuse-blocked">This payment link was already used and cannot be paid again. Reloading the page keeps it marked as paid.</div>
            <Btn block disabled data-testid="pay-link-disabled">Pay {money(LINK.amount, "INR")}</Btn>
          </div>
        ) : (
          <Btn block onClick={() => set({ ...s, open: true })} data-testid="pay-link">Pay {money(LINK.amount, "INR")}</Btn>
        )}
      </Card>
      <RazorModal amount={LINK.amount} merchant="Pixel Studio" open={s.open} onClose={() => set({ ...s, open: false })} onSuccess={(p) => set({ ...s, open: false, paid: p })} />
    </main>
  );
}
