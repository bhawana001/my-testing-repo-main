"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { DataTable, StatusBadge } from "@/app/components/engines/Crud";
import { isValidEmail } from "@/lib/seed";

const FIELDS = [
  { name: "salutation", label: "Salutation", type: "select", options: ["Mr.", "Ms.", "Dr."] },
  { name: "firstName", label: "First Name" },
  { name: "lastName", label: "*Last Name", required: true },
  { name: "company", label: "*Company", required: true },
  { name: "email", label: "Email", type: "email", validate: (v) => (isValidEmail(v) ? null : "Enter a valid email address.") },
  { name: "status", label: "*Lead Status", type: "select", required: true, options: ["Open - Not Contacted", "Working - Contacted", "Closed - Converted"] },
  { name: "source", label: "Lead Source", type: "select", options: ["Web", "Phone Inquiry", "Partner Referral", "Trade Show"] },
];
const seed = () => ({ rows: [
  { id: "00Q-1", firstName: "Maria", lastName: "Chen", company: "Globex", email: "maria@globex.test", status: "Working - Contacted", source: "Web", owner: "Priya Nair" },
  { id: "00Q-2", firstName: "Ahmed", lastName: "Khan", company: "Initech", email: "ahmed@initech.test", status: "Open - Not Contacted", source: "Trade Show", owner: "Tom Alvarez" },
] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  return (
    <SaasShell flow={flow} nav={["Home", "Leads", "Accounts", "Contacts", "Opportunities", "Reports"]} active="Leads" title="Leads · All Open Leads" sub="Sales · Lightning Experience">
      <DataTable rows={s.rows} onChange={(rows) => set({ rows })} fields={FIELDS} idPrefix="00Q" createLabel="New Lead" defaults={{ status: "Open - Not Contacted", owner: "Demo User" }}
        transformNew={(r) => ({ ...r, owner: "Demo User" })} searchKeys={["firstName", "lastName", "company", "email"]} testIdPrefix="leads" canDelete={false}
        columns={[{ key: "name", label: "Name", render: (r) => <span className="ee-strong" style={{ color: "var(--ee-accent)" }}>{[r.salutation, r.firstName, r.lastName].filter(Boolean).join(" ")}</span> }, { key: "company", label: "Company", sortable: true }, { key: "email", label: "Email" }, { key: "status", label: "Lead Status", render: (r) => <StatusBadge value={r.status} /> }, { key: "owner", label: "Lead Owner", render: (r) => <span data-testid={`owner-${r.id}`}>{r.owner}</span> }]} />
    </SaasShell>
  );
}
