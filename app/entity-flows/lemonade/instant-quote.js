"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { money, round2 } from "@/lib/seed";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, KV, Btn } from "@/app/components/eval/ui";
import { Wizard, SEED_WIZARD } from "@/app/components/engines/Wizard";

// Deterministic renters premium: base $5 + property coverage + liability + deductible adj + extras.
export function quote(v) {
  const property = Number(v.property || 0);
  const liability = Number(v.liability || 0);
  let monthly = 5 + (property / 10000) * 4 + (liability / 100000) * 2;
  if (v.deductible === "250") monthly += 2;
  if (v.deductible === "1000") monthly -= 1.5;
  if (v.extras === "yes") monthly += 3;
  if (v.pets === "yes") monthly += 1;
  return round2(Math.max(5, monthly));
}
const STEPS = [
  { id: "home", title: "Home", heading: "Hi! I'm Maya. Where do you live?", description: "Tell me about your place and I'll build a quote in seconds.",
    fields: [
      { name: "address", label: "Street address", required: true, placeholder: "1200 Market St" },
      { name: "zip", label: "ZIP code", required: true, inputMode: "numeric", validate: (v) => (/^\d{5}$/.test(v) ? null : "Enter a 5-digit ZIP code.") },
      { name: "homeType", label: "What kind of home?", type: "radio-cards", required: true, options: [{ value: "apartment", label: "Apartment", desc: "In a building with other units" }, { value: "house", label: "House", desc: "Renting a whole house" }] },
    ] },
  { id: "stuff", title: "Your stuff", heading: "How much are your belongings worth?", fields: [
      { name: "property", label: "Personal property coverage", type: "select", required: true, options: [{ value: "10000", label: "$10,000" }, { value: "20000", label: "$20,000" }, { value: "30000", label: "$30,000" }, { value: "50000", label: "$50,000" }] },
      { name: "liability", label: "Personal liability", type: "select", required: true, options: [{ value: "100000", label: "$100,000" }, { value: "300000", label: "$300,000" }, { value: "500000", label: "$500,000" }] },
      { name: "deductible", label: "Deductible", type: "radio-cards", required: true, options: [{ value: "250", label: "$250", desc: "Higher premium" }, { value: "500", label: "$500", desc: "Most popular" }, { value: "1000", label: "$1,000", desc: "Lower premium" }] },
    ] },
  { id: "about", title: "About you", heading: "A couple more things", fields: [
      { name: "firstName", label: "First name", required: true },
      { name: "lastName", label: "Last name", required: true },
      { name: "email", label: "Email", type: "email", required: true, validate: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : "Enter a valid email.") },
      { name: "pets", label: "Any pets?", type: "radio-cards", required: true, options: [{ value: "no", label: "No pets" }, { value: "yes", label: "Yes", desc: "Adds pet damage liability" }] },
      { name: "extras", label: "Extra coverage for valuables (jewellery, cameras, bikes)?", type: "radio-cards", required: true, options: [{ value: "no", label: "No thanks" }, { value: "yes", label: "Yes, add extras", desc: "+$3.00 / month" }] },
    ] },
  { id: "review", title: "Review", heading: "Here's what you told me", summary: true, nextLabel: "Get my price" },
];

export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), () => ({ wiz: { ...SEED_WIZARD } }));
  const setWiz = (u) => set((st) => ({ ...st, wiz: typeof u === "function" ? u(st.wiz) : u }));
  return (
    <>
      <Topbar entity={ent} nav={["Renters", "Homeowners", "Pet", "Car"]} active="Renters" light />
      <main className="ee-main ee-main--narrow">
        <h1 className="ee-page-title">Renters insurance, in about 90 seconds</h1>
        <p className="ee-page-sub">Chat with Maya, our quote bot, and get a price instantly.</p>
        <Wizard state={s.wiz} setState={setWiz} steps={STEPS} submitLabel="Get my price" testIdPrefix="quote"
          onSubmit={(v) => ({ monthly: quote(v), values: v })}
          result={(res, v) => (
            <Card data-testid="quote-result">
              <div className="ee-badge ee-badge--ok">Your quote is ready</div>
              <h2 style={{ fontSize: 34, margin: "10px 0 2px" }} data-testid="quote-premium">{money(res.monthly)}<span className="ee-muted" style={{ fontSize: 16 }}>/month</span></h2>
              <p className="ee-muted ee-small" style={{ marginBottom: 14 }}>for {v.firstName} {v.lastName} at {v.address}, {v.zip}</p>
              <div data-testid="coverage-summary">
                <div className="ee-strong" style={{ marginBottom: 4 }}>Coverage summary</div>
                <KV k="Personal property" v={money(Number(v.property))} testId="cov-property" />
                <KV k="Personal liability" v={money(Number(v.liability))} testId="cov-liability" />
                <KV k="Deductible" v={money(Number(v.deductible))} testId="cov-deductible" />
                <KV k="Loss of use" v={money(Number(v.property) * 0.2)} testId="cov-lossofuse" />
                <KV k="Valuables extra" v={v.extras === "yes" ? "Included" : "Not included"} testId="cov-extras" />
                <KV k="Pet damage liability" v={v.pets === "yes" ? "Included" : "Not included"} testId="cov-pets" />
                <KV k="Monthly premium" v={money(res.monthly)} total testId="cov-total" />
              </div>
              <div className="ee-row" style={{ marginTop: 16 }}>
                <Btn data-testid="quote-buy">Buy this policy</Btn>
                <Btn variant="secondary" onClick={() => setWiz({ ...SEED_WIZARD, values: v })}>Adjust answers</Btn>
              </div>
            </Card>
          )} />
      </main>
    </>
  );
}
