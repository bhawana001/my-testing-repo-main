"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, Badge, KV, RadioCard } from "@/app/components/eval/ui";
import { PaymentForm } from "@/app/components/engines/Checkout";
import { money } from "@/lib/seed";

const seed = () => ({ tier: "free", step: "home", plan: "individual" });
const PLANS = { individual: { name: "Individual", price: 10.99 }, duo: { name: "Duo", price: 14.99 }, family: { name: "Family", price: 16.99 } };
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const premium = s.tier === "premium";
  return (
    <>
      <Topbar entity={ent} light={false} right={<Badge tone={premium ? "ok" : undefined} data-testid="tier-badge">{premium ? `Premium ${PLANS[s.plan].name}` : "Free"}</Badge>} />
      <main className="ee-main">
        {!premium && <div className="ee-card ee-card--tight" style={{ background: "#2a2a2a", color: "#fff", marginBottom: 14 }} data-testid="ad-banner"><span className="ee-tiny" style={{ opacity: 0.7 }}>Advertisement</span> · 🥤 Fizzy Cola: Taste the sparkle. Listen ad-free with Premium.</div>}
        {s.step === "home" && (<Card title="Home" data-testid="home">
          <div className="ee-small">Now playing: Midnight Drive · The Lanterns</div>
          <KV k="Listening" v={premium ? "Ad-free ✓" : "With ads"} testId="ad-state" />
          {!premium && <Btn style={{ marginTop: 10, background: "#1db954" }} onClick={() => set({ ...s, step: "plans" })} data-testid="upgrade">Upgrade to Premium</Btn>}
        </Card>)}
        {s.step === "plans" && (<Card title="Pick your Premium" data-testid="plans"><div className="ee-stack">{Object.entries(PLANS).map(([k, p]) => <RadioCard key={k} name="plan" value={k} checked={s.plan === k} onChange={(v) => set({ ...s, plan: v })} title={p.name} right={`${money(p.price)}/mo`} />)}<Btn style={{ background: "#1db954" }} onClick={() => set({ ...s, step: "pay" })} data-testid="plan-continue">Continue</Btn></div></Card>)}
        {s.step === "pay" && (<Card title={`Premium ${PLANS[s.plan].name} · ${money(PLANS[s.plan].price)}/month`} data-testid="payment" style={{ maxWidth: 560 }}><PaymentForm amount={PLANS[s.plan].price} allow3ds={false} buttonLabel="Buy Premium" onSuccess={() => set({ ...s, tier: "premium", step: "home" })} /></Card>)}
      </main>
    </>
  );
}
