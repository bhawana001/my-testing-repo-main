"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Wizard, SEED_WIZARD } from "@/app/components/engines/Wizard";
import { Card, Badge, KV, Btn } from "@/app/components/eval/ui";

const SLOTS = [{ value: "today-5", label: "Today, 5:00–6:00 PM" }, { value: "tmr-10", label: "Tomorrow, 10:00–11:00 AM" }, { value: "tmr-4", label: "Tomorrow, 4:00–5:00 PM" }];
const STEPS = [
  { id: "interest", title: "Interest", heading: "Talk to an insurance advisor", fields: [
    { name: "product", label: "I'm interested in", type: "radio-cards", required: true, options: [{ value: "term", label: "Term life insurance" }, { value: "health", label: "Health insurance" }, { value: "car", label: "Car insurance" }] },
    { name: "name", label: "Full name", required: true },
    { name: "mobile", label: "Mobile number", required: true, inputMode: "numeric", validate: (v) => (/^[6-9]\d{9}$/.test(v) ? null : "Enter a valid 10-digit Indian mobile number.") },
    { name: "consent", label: "I agree to receive a call from an advisor", type: "checkbox", required: true, requiredMessage: "Please agree to be contacted." },
  ] },
  { id: "slot", title: "Callback time", heading: "When should we call?", fields: [{ name: "slot", label: "Preferred time", type: "radio-cards", required: true, options: SLOTS }] },
];
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), () => ({ wiz: { ...SEED_WIZARD } }));
  return (
    <>
      <Topbar entity={ent} nav={["Term Life", "Health", "Car"]} light />
      <main className="ee-main ee-main--narrow">
        <Wizard state={s.wiz} setState={(u) => set((st) => ({ ...st, wiz: typeof u === "function" ? u(st.wiz) : u }))} steps={STEPS} submitLabel="Request callback" testIdPrefix="lead"
          onSubmit={(v) => ({ ref: "LD-" + v.mobile.slice(-4) + "-0914", slot: SLOTS.find((x) => x.value === v.slot).label, v })}
          result={(r) => (
            <Card data-testid="callback-confirmation">
              <Badge tone="ok" data-testid="callback-status">Callback scheduled</Badge>
              <h2 style={{ margin: "8px 0" }}>Thanks {r.v.name}! An advisor will call you.</h2>
              <KV k="We'll call" v={`+91 ${r.v.mobile}`} /><KV k="When" v={r.slot} testId="callback-slot" /><KV k="About" v={{ term: "Term life insurance", health: "Health insurance", car: "Car insurance" }[r.v.product]} /><KV k="Reference" v={<span className="ee-mono" data-testid="callback-ref">{r.ref}</span>} />
              <p className="ee-small ee-muted" style={{ marginTop: 8 }} data-testid="callback-promise">Our certified advisor will call you within your chosen slot. No spam, no obligation.</p>
              <Btn variant="secondary" size="sm" style={{ marginTop: 10 }} onClick={() => set({ wiz: { ...SEED_WIZARD } })}>Start over</Btn>
            </Card>
          )} />
      </main>
    </>
  );
}
