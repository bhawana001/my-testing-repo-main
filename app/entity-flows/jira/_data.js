export const ISSUES = [
  { key: "WEB-121", summary: "Checkout button misaligned on Safari", type: "Bug", priority: "High", status: "To Do", component: "Frontend", assignee: "Demo User" },
  { key: "WEB-122", summary: "Add CSV export to reports", type: "Story", priority: "Medium", status: "In Progress", component: "Reports", assignee: "Priya Nair" },
  { key: "WEB-123", summary: "Payment webhook retries", type: "Bug", priority: "Highest", status: "In Review", component: "Payments", assignee: "Tom Alvarez" },
  { key: "WEB-124", summary: "Update onboarding copy", type: "Task", priority: "Low", status: "Done", component: "Frontend", assignee: "Demo User" },
  { key: "WEB-125", summary: "Rate-limit login endpoint", type: "Bug", priority: "High", status: "In Progress", component: "Auth", assignee: "Tom Alvarez" },
  { key: "API-17", summary: "Deprecate v1 endpoints", type: "Task", priority: "High", status: "To Do", component: "API", assignee: "Priya Nair" },
];
// Minimal JQL: clauses joined by AND; each `field = value`, `field != value`, or `field in (a, b)`.
export function runJql(q, rows) {
  const clauses = q.split(/\s+AND\s+/i).map((c) => c.trim()).filter(Boolean);
  const parsed = [];
  for (const c of clauses) {
    let m = c.match(/^(\w+)\s*(!=|=)\s*"?([^"]+?)"?$/i);
    if (m) { parsed.push({ f: m[1].toLowerCase(), op: m[2], v: [m[3].trim()] }); continue; }
    m = c.match(/^(\w+)\s+in\s*\(([^)]+)\)$/i);
    if (m) { parsed.push({ f: m[1].toLowerCase(), op: "in", v: m[2].split(",").map((x) => x.trim().replace(/^"|"$/g, "")) }); continue; }
    return { error: `Error in the JQL query: unable to parse “${c}”.` };
  }
  const FIELDS = { project: (r) => r.key.split("-")[0], priority: (r) => r.priority, status: (r) => r.status, type: (r) => r.type, issuetype: (r) => r.type, component: (r) => r.component, assignee: (r) => r.assignee };
  for (const p of parsed) if (!FIELDS[p.f]) return { error: `Field '${p.f}' does not exist or you do not have permission to view it.` };
  const res = rows.filter((r) => parsed.every((p) => { const val = String(FIELDS[p.f](r)).toLowerCase(); const vs = p.v.map((x) => x.toLowerCase()); return p.op === "!=" ? !vs.includes(val) : vs.includes(val); }));
  return { rows: res };
}
