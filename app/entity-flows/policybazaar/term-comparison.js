"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Wizard, SEED_WIZARD } from "@/app/components/engines/Wizard";
import { Card, Table, Badge, Btn } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const INSURERS = [{ name: "Max Lifeline", base: 9.2, csr: "99.5%" }, { name: "HDFB Life", base: 9.8, csr: "99.4%" }, { name: "Tata AIAish", base: 8.9, csr: "99.1%" }, { name: "ICICI Prudent", base: 10.1, csr: "98.6%" }];
// Annual premium per ₹1L cover, adjusted by age, smoker, tenure. Deterministic.
export function termPremium(ins, v) {
  const cover = Number(v.cover); const age = 2026 - Number(v.dob.slice(0, 4));
  const f = 1 + Math.max(0, age - 25) * 0.045 + (v.smoker === "yes" ? 0.6 : 0) + (Number(v.tenure) - 30) * 0.01;
  return Math.round(ins.base * (cover / 100000) * f);
}
const STEPS = [
  { id: "profile", title: "Profile", heading: "Find the right term plan", fields: [
    { name: "name", label: "Full name", required: true },
    { name: "dob", label: "Date of birth", type: "date", required: true, validate: (v) => { const a = 2026 - Number(v.slice(0, 4)); return a >= 18 && a <= 65 ? null : "Age must be between 18 and 65."; } },
    { name: "gender", label: "Gender", type: "radio-cards", required: true, options: [{ value: "m", label: "Male" }, { value: "f", label: "Female" }] },
    { name: "smoker", label: "Do you smoke or chew tobacco?", type: "radio-cards", required: true, options: [{ value: "no", label: "No" }, { value: "yes", label: "Yes" }] },
    { name: "income", label: "Annual income", type: "select", required: true, options: ["₹5–10 lakh", "₹10–15 lakh", "₹15 lakh+"] },
  ] },
  { id: "cover", title: "Cover", heading: "How much cover?", fields: [
    { name: "cover", label: "Life cover", type: "select", required: true, options: [{ value: "5000000", label: "₹50 lakh" }, { value: "10000000", label: "₹1 crore" }, { value: "20000000", label: "₹2 crore" }] },
    { name: "tenure", label: "Cover till age", type: "select", required: true, options: [{ value: "30", label: "30 years" }, { value: "35", label: "35 years" }, { value: "40", label: "40 years" }] },
  ] },
];
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), () => ({ wiz: { ...SEED_WIZARD } }));
  return (
    <>
      <Topbar entity={ent} nav={["Term Life", "Health", "Car", "Investment"]} active="Term Life" light />
      <main className="ee-main">
        <Wizard state={s.wiz} setState={(u) => set((st) => ({ ...st, wiz: typeof u === "function" ? u(st.wiz) : u }))} steps={STEPS} submitLabel="View plans" testIdPrefix="term"
          onSubmit={(v) => ({ v })}
          result={({ v }) => {
            const rows = INSURERS.map((i) => ({ ...i, premium: termPremium(i, v), cover: Number(v.cover) })).sort((a, b) => a.premium - b.premium);
            return (
              <Card data-testid="plans-table">
                <div className="ee-row ee-row--between" style={{ marginBottom: 10 }}><h2 style={{ fontSize: 18 }}>{rows.length} term plans for {v.name}</h2><Badge tone="info">Cover {money(Number(v.cover), "INR")} till {v.tenure} yrs</Badge></div>
                <Table cols={[{ key: "name", label: "Insurer" }, { key: "cover", label: "Life cover", render: (r) => money(r.cover, "INR") }, { key: "csr", label: "Claim settled" }, { key: "premium", label: "Premium / year", align: "right", render: (r) => <span data-testid={`premium-${r.name.split(" ")[0].toLowerCase()}`}>{money(r.premium, "INR")}</span> }, { key: "x", label: "", render: () => <Btn size="sm">Buy</Btn> }]} rows={rows} rowKey={(r) => r.name} />
                <button className="ee-link ee-small" style={{ marginTop: 10 }} onClick={() => set({ wiz: { ...SEED_WIZARD, values: v } })}>Edit details</button>
              </Card>
            );
          }} />
      </main>
    </>
  );
}
