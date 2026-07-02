import { list } from "../_store";

// GET /api/crmforce/search?q=term
// Fans across the primary collections and returns typed hits for global search.
const SEARCHABLE = [
  { collection: "accounts", label: "Account", fields: ["name", "industry", "website", "billingCity"], display: (r) => r.name },
  { collection: "contacts", label: "Contact", fields: ["firstName", "lastName", "email", "title"], display: (r) => `${r.firstName} ${r.lastName}` },
  { collection: "leads", label: "Lead", fields: ["name", "company", "email", "title"], display: (r) => r.name },
  { collection: "opportunities", label: "Opportunity", fields: ["name", "stage"], display: (r) => r.name },
  { collection: "tasks", label: "Task", fields: ["subject", "relatedTo"], display: (r) => r.subject },
];

const HREF = {
  accounts: "/crmforce/accounts",
  contacts: "/crmforce/contacts",
  leads: "/crmforce/leads",
  opportunities: "/crmforce/opportunities",
  tasks: "/crmforce/tasks",
};

export async function GET(request) {
  const q = (new URL(request.url).searchParams.get("q") || "").trim().toLowerCase();
  if (!q) return Response.json({ data: [] });

  const hits = [];
  for (const spec of SEARCHABLE) {
    for (const record of list(spec.collection)) {
      const matched = spec.fields.some((f) =>
        String(record[f] ?? "").toLowerCase().includes(q)
      );
      if (matched) {
        hits.push({
          id: record.id,
          type: spec.label,
          collection: spec.collection,
          title: spec.display(record),
          href: HREF[spec.collection],
        });
      }
    }
    if (hits.length >= 20) break;
  }
  return Response.json({ data: hits.slice(0, 20) });
}
