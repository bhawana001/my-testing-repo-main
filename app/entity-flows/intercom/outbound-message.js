"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Segment, Btn, Badge, KV, Alert } from "@/app/components/eval/ui";

// Targeting rule: page URL contains /pricing AND visitor plan is Free.
const RULE = { page: "pricing", plan: "Free" };
const seed = () => ({ page: "home", plan: "Free", dismissed: false, cta: false });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const matches = s.page === RULE.page && s.plan === RULE.plan;
  const show = matches && !s.dismissed && !s.cta;
  return (
    <>
      <Topbar entity={ent} nav={["Product", "Pricing", "Docs"]} light />
      <main className="ee-main">
        <div className="ee-row ee-row--between" style={{ marginBottom: 14 }}>
          <div className="ee-row"><span className="ee-small ee-muted">Simulated page</span><Segment options={[{ value: "home", label: "/home" }, { value: "pricing", label: "/pricing" }, { value: "docs", label: "/docs" }]} value={s.page} onChange={(v) => set({ ...s, page: v, dismissed: false, cta: false })} /></div>
          <div className="ee-row"><span className="ee-small ee-muted">Visitor plan</span><Segment options={["Free", "Pro"]} value={s.plan} onChange={(v) => set({ ...s, plan: v, dismissed: false, cta: false })} /></div>
        </div>
        <Card title="Outbound message · Upgrade nudge" data-testid="rule-card"><KV k="Show when" v="Page URL contains /pricing AND plan is Free" /><KV k="Matches current visitor" v={<Badge tone={matches ? "ok" : undefined} data-testid="rule-match">{matches ? "Yes" : "No"}</Badge>} /></Card>
        <div style={{ height: 14 }} />
        {s.page === "pricing" ? (
          <div className="ee-grid ee-grid--3" data-testid="pricing-page" id="plans">
            {[{ n: "Free", p: "$0" }, { n: "Pro", p: "$29/mo" }, { n: "Business", p: "$99/mo" }].map((x) => <Card key={x.n} data-testid={`plan-${x.n.toLowerCase()}`} style={s.cta && x.n === "Pro" ? { outline: "3px solid var(--ee-accent)" } : undefined}><div className="ee-strong">{x.n}</div><div className="ee-price">{x.p}</div>{s.cta && x.n === "Pro" && <Badge tone="ok" data-testid="pro-highlight">20% discount applied: $23.20/mo</Badge>}</Card>)}
          </div>
        ) : <Card><div className="ee-empty">{s.page === "home" ? "Welcome to Acme Cloud." : "Documentation home."}</div></Card>}
        {s.cta && <Alert tone="ok" data-testid="cta-result">You followed the message's CTA. The Pro plan is highlighted with the 20% offer.</Alert>}
        {show && (
          <div style={{ position: "fixed", right: 20, bottom: 20, zIndex: 60, width: "min(340px, calc(100vw - 40px))" }}>
            <Card data-testid="outbound-message" style={{ boxShadow: "0 20px 50px rgba(0,0,0,.25)" }}>
              <div className="ee-row ee-row--between"><span className="ee-small ee-muted">Priya from Acme</span><button className="ee-link" onClick={() => set({ ...s, dismissed: true })} aria-label="Dismiss message">✕</button></div>
              <div className="ee-strong" style={{ margin: "6px 0" }}>Upgrade to Pro and save 20% 🎉</div>
              <div className="ee-small">You're on the Free plan. Unlock unlimited projects this week only.</div>
              <Btn block style={{ marginTop: 10 }} onClick={() => set({ ...s, cta: true })} data-testid="outbound-cta">See Pro plans</Btn>
            </Card>
          </div>
        )}
      </main>
    </>
  );
}
