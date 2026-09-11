"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, KV, Segment, Field } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

// Annual premium = ₹12 per ₹1L cover × age factor (1.035^(age-25)) × smoker factor.
export function calc(age, coverLakh, smoker) {
  return Math.round(12 * coverLakh * Math.pow(1.035, Math.max(0, age - 25)) * (smoker ? 1.5 : 1));
}
const seed = () => ({ age: 30, cover: 100, smoker: false, history: [] });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const premium = calc(s.age, s.cover, s.smoker);
  const change = (patch) => set((st) => { const n = { ...st, ...patch }; return { ...n, history: [...st.history.slice(-4), { age: n.age, cover: n.cover, smoker: n.smoker, premium: calc(n.age, n.cover, n.smoker) }] }; });
  return (
    <>
      <Topbar entity={ent} nav={["Term Life", "Health", "Calculators"]} active="Calculators" light />
      <main className="ee-main">
        <h1 className="ee-page-title">Term insurance premium calculator</h1>
        <div className="ee-split">
          <Card data-testid="calculator">
            <div className="ee-stack">
              <Field label={`Age: ${s.age} years`} htmlFor="pc-age"><input id="pc-age" type="range" min="18" max="65" value={s.age} onChange={(e) => change({ age: Number(e.target.value) })} aria-label="Age" data-testid="age-slider" /></Field>
              <div className="ee-row"><button className="ee-btn ee-btn--secondary ee-btn--sm" onClick={() => change({ age: Math.max(18, s.age - 1) })} data-testid="age-minus">− Age</button><span className="ee-strong" data-testid="age-value">{s.age}</span><button className="ee-btn ee-btn--secondary ee-btn--sm" onClick={() => change({ age: Math.min(65, s.age + 1) })} data-testid="age-plus">+ Age</button></div>
              <Field label="Life cover"><Segment options={[{ value: 50, label: "₹50L" }, { value: 100, label: "₹1Cr" }, { value: 150, label: "₹1.5Cr" }, { value: 200, label: "₹2Cr" }]} value={s.cover} onChange={(v) => change({ cover: v })} /></Field>
              <Field label="Tobacco user"><Segment options={[{ value: false, label: "No" }, { value: true, label: "Yes" }]} value={s.smoker} onChange={(v) => change({ smoker: v })} /></Field>
            </div>
          </Card>
          <Card title="Your estimate" data-testid="estimate">
            <div className="ee-price" style={{ fontSize: 32 }} data-testid="premium">{money(premium, "INR")}</div>
            <div className="ee-small ee-muted">per year · {money(Math.round(premium / 12), "INR")} per month</div>
            <KV k="Age" v={`${s.age} years`} /><KV k="Cover" v={money(s.cover * 100000, "INR")} testId="cover-value" /><KV k="Tobacco" v={s.smoker ? "Yes" : "No"} />
            <div className="ee-strong ee-small" style={{ marginTop: 10 }}>Recent recalculations</div>
            <div data-testid="recalc-log">{s.history.length === 0 ? <div className="ee-tiny ee-muted">Adjust age or cover to recalculate.</div> : s.history.map((h, i) => <div key={i} className="ee-tiny">Age {h.age}, cover ₹{h.cover}L{h.smoker ? ", tobacco" : ""} → {money(h.premium, "INR")}</div>)}</div>
          </Card>
        </div>
      </main>
    </>
  );
}
