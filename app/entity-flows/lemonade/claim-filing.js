"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Wizard, SEED_WIZARD } from "@/app/components/engines/Wizard";
import { Card, Badge, KV, Btn } from "@/app/components/eval/ui";

const STEPS = [
  { id: "what", title: "What happened", heading: "I'm Jim, I'll handle your claim. What happened?", fields: [
    { name: "type", label: "Type of incident", type: "radio-cards", required: true, options: [{ value: "theft", label: "Theft" }, { value: "water", label: "Water damage" }, { value: "fire", label: "Fire or smoke" }, { value: "other", label: "Something else" }] },
    { name: "date", label: "When did it happen?", type: "date", required: true, validate: (v) => (v <= "2026-09-14" ? null : "The incident date can't be in the future.") },
  ] },
  { id: "details", title: "Details", heading: "Tell me about it", fields: [
    { name: "description", label: "Describe the incident", type: "textarea", required: true, validate: (v) => (v.trim().length >= 20 ? null : "Please add a bit more detail (at least 20 characters).") },
    { name: "amount", label: "Estimated loss (USD)", required: true, inputMode: "decimal", validate: (v) => (Number(v) > 0 ? null : "Enter an estimated amount.") },
    { name: "police", label: "I filed a police report (required for theft)", type: "checkbox", when: (v) => v.type === "theft" },
  ], validate: (v) => (v.type === "theft" && !v.police ? { police: "A police report is required for theft claims." } : null) },
  { id: "video", title: "Video", heading: "Record a quick video statement", description: "In the app you'd record a short video. Here, confirm your statement to continue.", fields: [{ name: "honesty", label: "I confirm the information I provided is true", type: "checkbox", required: true, requiredMessage: "Please confirm your statement." }] },
  { id: "review", title: "Review", heading: "Review your claim", summary: true, nextLabel: "Submit claim" },
];
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), () => ({ wiz: { ...SEED_WIZARD } }));
  return (
    <>
      <Topbar entity={ent} nav={["Policy", "Claims", "Coverage"]} active="Claims" light />
      <main className="ee-main ee-main--narrow">
        <p className="ee-page-sub">Policy LP-2201-0915 · Renters</p>
        <Wizard state={s.wiz} setState={(u) => set((st) => ({ ...st, wiz: typeof u === "function" ? u(st.wiz) : u }))} steps={STEPS} submitLabel="Submit claim" testIdPrefix="claim"
          onSubmit={(v) => ({ id: "CLM-" + v.date.replace(/-/g, "").slice(2) + "-" + v.type.toUpperCase().slice(0, 3), amount: Number(v.amount), type: v.type })}
          result={(r) => (
            <Card data-testid="claim-submitted">
              <Badge tone="ok">Claim submitted</Badge>
              <h2 style={{ margin: "8px 0" }}>Got it. Your claim is in.</h2>
              <KV k="Claim ID" v={<span className="ee-mono" data-testid="claim-id">{r.id}</span>} />
              <KV k="Status" v="Under review" /><KV k="Estimated loss" v={`$${r.amount.toFixed(2)}`} />
              <Btn variant="secondary" size="sm" style={{ marginTop: 10 }} onClick={() => set({ wiz: { ...SEED_WIZARD } })}>File another claim</Btn>
            </Card>
          )} />
      </main>
    </>
  );
}
