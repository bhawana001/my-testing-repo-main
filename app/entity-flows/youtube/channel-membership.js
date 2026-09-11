"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, Badge, RadioCard, KV } from "@/app/components/eval/ui";
import { PaymentForm } from "@/app/components/engines/Checkout";
import { money } from "@/lib/seed";

const TIERS = { supporter: { name: "Supporter", price: 1.99, perks: ["Loyalty badge next to your name", "Custom emoji in chat"] }, insider: { name: "Insider", price: 4.99, perks: ["Loyalty badge next to your name", "Custom emoji in chat", "Members-only posts", "Early access to videos"] } };
const seed = () => ({ step: "channel", tier: "insider", member: null });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const t = TIERS[s.tier];
  return (
    <>
      <Topbar entity={ent} light />
      <main className="ee-main ee-main--narrow">
        <Card data-testid="channel">
          <div className="ee-row ee-row--between"><div className="ee-row"><span className="ee-avatar ee-avatar--round" style={{ width: 56, height: 56 }}>CK</span><div><div className="ee-strong" style={{ fontSize: 18 }}>Code Kitchen</div><div className="ee-small ee-muted">@codekitchen · 214K subscribers</div></div></div>{s.member ? <Badge tone="ok" data-testid="member-badge">🏅 Member · {s.member.tier}</Badge> : <Btn onClick={() => set({ ...s, step: "tiers" })} data-testid="join">Join</Btn>}</div>
        </Card>
        {s.step === "tiers" && !s.member && (<Card title="Join this channel" style={{ marginTop: 12 }} data-testid="tiers"><div className="ee-stack">{Object.entries(TIERS).map(([k, x]) => <RadioCard key={k} name="tier" value={k} checked={s.tier === k} onChange={(v) => set({ ...s, tier: v })} title={x.name} desc={x.perks.join(" · ")} right={`${money(x.price)}/mo`} />)}<Btn onClick={() => set({ ...s, step: "pay" })} data-testid="tier-continue">Continue</Btn></div></Card>)}
        {s.step === "pay" && !s.member && (<Card title={`${t.name} · ${money(t.price)}/month`} style={{ marginTop: 12 }} data-testid="payment"><PaymentForm amount={t.price} allow3ds={false} buttonLabel="Join" onSuccess={() => set({ ...s, step: "channel", member: { tier: t.name } })} /></Card>)}
        {s.member && (<Card title="Your perks" style={{ marginTop: 12 }} data-testid="perks">{TIERS[s.tier].perks.map((p) => <div key={p} className="ee-small">✓ {p}</div>)}<div className="ee-divider" /><div className="ee-small">Your comments now show: <b>Demo User</b> <Badge tone="ok" data-testid="comment-badge">🏅 New member</Badge></div><KV k="Billing" v={`${money(TIERS[s.tier].price)}/month · Visa •••• 4242`} /></Card>)}
      </main>
    </>
  );
}
