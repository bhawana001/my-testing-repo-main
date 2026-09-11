"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { MobileShell } from "@/app/components/engines/MobileShell";
import { Wizard, SEED_WIZARD } from "@/app/components/engines/Wizard";
import { Card, Badge, KV, Btn, RadioCard } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const STEPS = [
  { id: "bike", title: "Bike", heading: "Tell us about your bike", fields: [
    { name: "reg", label: "Registration number", required: true, placeholder: "KA01AB1234", validate: (v) => (/^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/i.test(v.replace(/\s/g, "")) ? null : "Enter a valid registration like KA01AB1234.") },
    { name: "model", label: "Make and model", type: "select", required: true, options: ["Hero-ish Splendor 100", "Honda-ish Activa 125", "Royal-ish Classic 350", "TVS-ish Apache 160"] },
    { name: "year", label: "Registration year", type: "select", required: true, options: ["2024", "2023", "2022", "2021", "2020", "2019"] },
  ] },
  { id: "cover", title: "Cover", heading: "What cover do you need?", fields: [{ name: "cover", label: "Cover type", type: "radio-cards", required: true, options: [{ value: "tp", label: "Third-party only", desc: "Mandatory minimum" }, { value: "comp", label: "Comprehensive", desc: "Own damage + third party" }] }] },
];
function premiums(v) {
  const base = v.model.includes("350") ? 1400 : v.model.includes("160") ? 1100 : 900;
  const age = 2026 - Number(v.year);
  const od = Math.round(base * (v.cover === "comp" ? 2.2 : 1) - age * 40);
  return [{ id: "basic", name: "Basic", premium: od, idv: v.cover === "comp" ? "IDV ₹52,000" : "Third-party liability" }, { id: "plus", name: "Plus", premium: od + 350, idv: "+ Zero depreciation" }, { id: "max", name: "Max", premium: od + 720, idv: "+ Zero dep + Roadside assistance" }];
}
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), () => ({ wiz: { ...SEED_WIZARD }, pick: null }));
  return (
    <MobileShell flow={flow} title="Bike insurance" nav={["Home", "Insurance"]}>
      <Wizard state={s.wiz} setState={(u) => set((st) => ({ ...st, wiz: typeof u === "function" ? u(st.wiz) : u }))} steps={STEPS} submitLabel="Get quotes" testIdPrefix="bike" showStepper={false}
        onSubmit={(v) => ({ plans: premiums(v), v })}
        result={(r) => (
          <div className="ee-stack" data-testid="quote-screen">
            <Badge tone="ok">Quotes for {r.v.reg.toUpperCase()} · {r.v.model}</Badge>
            <div role="radiogroup" aria-label="Plans" className="ee-stack">
              {r.plans.map((p) => <RadioCard key={p.id} name="plan" value={p.id} checked={s.pick === p.id} onChange={(v) => set({ ...s, pick: v })} title={`${p.name} · ${money(p.premium, "INR")}/year`} desc={p.idv} right={<span data-testid={`premium-${p.id}`}>{money(p.premium, "INR")}</span>} />)}
            </div>
            <Btn block disabled={!s.pick} data-testid="buy-plan">{s.pick ? `Buy ${r.plans.find((p) => p.id === s.pick).name} plan` : "Select a plan"}</Btn>
            <button className="ee-link ee-small" onClick={() => set({ ...s, wiz: { ...SEED_WIZARD, values: r.v }, pick: null })}>Edit details</button>
          </div>
        )} />
    </MobileShell>
  );
}
