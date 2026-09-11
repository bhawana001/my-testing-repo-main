"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Wizard, SEED_WIZARD } from "@/app/components/engines/Wizard";
import { Card, Badge, KV, Btn } from "@/app/components/eval/ui";

const STEPS = [
  { id: "item", title: "Item", heading: "Standard Laptop · Service Catalog", description: "Delivered in 5 business days. Requires manager approval over $1,500.", fields: [
    { name: "model", label: "Model", type: "radio-cards", required: true, options: [{ value: "13", label: "13-inch Ultrabook", desc: "16 GB RAM, 512 GB SSD", right: "$1,299" }, { value: "15", label: "15-inch Performance", desc: "32 GB RAM, 1 TB SSD", right: "$1,899" }] },
    { name: "os", label: "Operating system", type: "select", required: true, options: ["Windows 11", "macOS", "Ubuntu 24.04"] },
    { name: "accessories", label: "Include docking station", type: "checkbox" },
  ] },
  { id: "delivery", title: "Delivery", heading: "Who is it for?", fields: [
    { name: "requestedFor", label: "Requested for", required: true },
    { name: "location", label: "Delivery location", type: "select", required: true, options: ["HQ · Floor 3", "HQ · Floor 7", "Remote (ship to home)"] },
    { name: "justification", label: "Business justification", type: "textarea", required: true },
  ] },
  { id: "review", title: "Review", heading: "Review your request", summary: true, nextLabel: "Order Now" },
];
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), () => ({ wiz: { ...SEED_WIZARD, values: { requestedFor: "Demo User" } } }));
  return (
    <SaasShell flow={flow} nav={["Self-Service", "Service Catalog", "Requests"]} active="Service Catalog" title="Service Catalog · Hardware">
      <div style={{ maxWidth: 680 }}>
        <Wizard state={s.wiz} setState={(u) => set((st) => ({ ...st, wiz: typeof u === "function" ? u(st.wiz) : u }))} steps={STEPS} submitLabel="Order Now" testIdPrefix="catalog"
          onSubmit={(v) => ({ req: "REQ0010088", ritm: "RITM0010133", price: v.model === "15" ? 1899 : 1299, approval: v.model === "15" ? "Manager approval requested" : "Auto-approved", v })}
          result={(r) => (
            <Card data-testid="order-status">
              <Badge tone="ok">Thank you, your request has been submitted</Badge>
              <h2 style={{ margin: "8px 0" }}>Order status</h2>
              <KV k="Request number" v={<span className="ee-mono" data-testid="req-number">{r.req}</span>} />
              <KV k="Requested item" v={<span className="ee-mono" data-testid="ritm-number">{r.ritm}</span>} />
              <KV k="Item" v={`Standard Laptop · ${r.v.model === "15" ? "15-inch Performance" : "13-inch Ultrabook"} · ${r.v.os}${r.v.accessories ? " + dock" : ""}`} testId="ritm-variables" />
              <KV k="Requested for" v={r.v.requestedFor} /><KV k="Deliver to" v={r.v.location} />
              <KV k="Approval" v={r.approval} testId="ritm-approval" />
              <Btn variant="secondary" size="sm" style={{ marginTop: 10 }} onClick={() => set({ wiz: { ...SEED_WIZARD, values: { requestedFor: "Demo User" } } })}>Order another</Btn>
            </Card>
          )} />
      </div>
    </SaasShell>
  );
}
