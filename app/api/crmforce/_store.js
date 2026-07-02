import fs from "fs";
import path from "path";
import crypto from "crypto";

// ---------------------------------------------------------------------------
// CRMforce data store
// ---------------------------------------------------------------------------
// A tiny file-backed JSON store so the app is genuinely full-stack (data
// survives across requests and dev-server restarts) without requiring an
// external database. Good enough for a demo / clone; swap for Supabase or
// Postgres in production by re-implementing the exported CRUD helpers.
// ---------------------------------------------------------------------------

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "crmforce.json");

export const COLLECTIONS = [
  "accounts",
  "contacts",
  "leads",
  "opportunities",
  "tasks",
  "activities",
];

// Collections that generate an activity-timeline entry on create/update.
const ACTIVITY_LOGGED = ["leads", "opportunities", "tasks", "contacts", "accounts"];

// Human-readable singular labels for activity messages.
const SINGULAR = {
  accounts: "account",
  contacts: "contact",
  leads: "lead",
  opportunities: "opportunity",
  tasks: "task",
};

export const OPPORTUNITY_STAGES = [
  "Prospecting",
  "Qualification",
  "Proposal",
  "Negotiation",
  "Closed Won",
  "Closed Lost",
];

export const LEAD_STATUSES = ["New", "Working", "Qualified", "Unqualified"];

function id(prefix) {
  return `${prefix}_${crypto.randomUUID().slice(0, 8)}`;
}

function nowISO() {
  return new Date().toISOString();
}

// ---------------------------------------------------------------------------
// Seed data — a believable slice of a B2B sales org.
// ---------------------------------------------------------------------------
function seed() {
  const acmeId = "acct_acme001";
  const globexId = "acct_glbx002";
  const initechId = "acct_init003";

  const accounts = [
    {
      id: acmeId,
      name: "Acme Corporation",
      industry: "Manufacturing",
      website: "acme.example.com",
      employees: 4200,
      billingCity: "San Francisco",
      createdAt: nowISO(),
    },
    {
      id: globexId,
      name: "Globex Industries",
      industry: "Energy",
      website: "globex.example.com",
      employees: 12800,
      billingCity: "Austin",
      createdAt: nowISO(),
    },
    {
      id: initechId,
      name: "Initech Software",
      industry: "Technology",
      website: "initech.example.com",
      employees: 340,
      billingCity: "Seattle",
      createdAt: nowISO(),
    },
  ];

  const contacts = [
    {
      id: "cont_001",
      firstName: "Jane",
      lastName: "Rivera",
      title: "VP of Operations",
      email: "jane.rivera@acme.example.com",
      phone: "+1 415-555-0142",
      accountId: acmeId,
      createdAt: nowISO(),
    },
    {
      id: "cont_002",
      firstName: "Marcus",
      lastName: "Cole",
      title: "Director of Procurement",
      email: "marcus.cole@globex.example.com",
      phone: "+1 512-555-0199",
      accountId: globexId,
      createdAt: nowISO(),
    },
    {
      id: "cont_003",
      firstName: "Priya",
      lastName: "Nair",
      title: "CTO",
      email: "priya.nair@initech.example.com",
      phone: "+1 206-555-0170",
      accountId: initechId,
      createdAt: nowISO(),
    },
  ];

  const leads = [
    {
      id: "lead_001",
      name: "Dana Whitfield",
      company: "Umbrella Labs",
      title: "Head of IT",
      email: "dana@umbrella.example.com",
      phone: "+1 303-555-0111",
      status: "New",
      source: "Web",
      createdAt: nowISO(),
    },
    {
      id: "lead_002",
      name: "Sam Okoro",
      company: "Wonka Logistics",
      title: "Operations Manager",
      email: "sam@wonka.example.com",
      phone: "+1 646-555-0133",
      status: "Working",
      source: "Referral",
      createdAt: nowISO(),
    },
    {
      id: "lead_003",
      name: "Lena Fischer",
      company: "Stark Retail",
      title: "CFO",
      email: "lena@stark.example.com",
      phone: "+1 212-555-0188",
      status: "Qualified",
      source: "Event",
      createdAt: nowISO(),
    },
  ];

  const opportunities = [
    {
      id: "oppo_001",
      name: "Acme — Platform Rollout",
      accountId: acmeId,
      amount: 120000,
      stage: "Proposal",
      probability: 60,
      closeDate: "2026-08-15",
      createdAt: nowISO(),
    },
    {
      id: "oppo_002",
      name: "Globex — Annual Renewal",
      accountId: globexId,
      amount: 88000,
      stage: "Negotiation",
      probability: 80,
      closeDate: "2026-07-30",
      createdAt: nowISO(),
    },
    {
      id: "oppo_003",
      name: "Initech — Pilot Expansion",
      accountId: initechId,
      amount: 45000,
      stage: "Qualification",
      probability: 35,
      closeDate: "2026-09-10",
      createdAt: nowISO(),
    },
    {
      id: "oppo_004",
      name: "Acme — Support Upgrade",
      accountId: acmeId,
      amount: 26000,
      stage: "Closed Won",
      probability: 100,
      closeDate: "2026-06-20",
      createdAt: nowISO(),
    },
  ];

  const tasks = [
    {
      id: "task_001",
      subject: "Follow up on proposal",
      relatedTo: "Acme — Platform Rollout",
      dueDate: "2026-07-05",
      priority: "High",
      status: "Open",
      createdAt: nowISO(),
    },
    {
      id: "task_002",
      subject: "Send renewal quote",
      relatedTo: "Globex — Annual Renewal",
      dueDate: "2026-07-03",
      priority: "High",
      status: "Open",
      createdAt: nowISO(),
    },
    {
      id: "task_003",
      subject: "Qualify Dana Whitfield",
      relatedTo: "Umbrella Labs",
      dueDate: "2026-07-08",
      priority: "Normal",
      status: "Open",
      createdAt: nowISO(),
    },
  ];

  const activities = [
    {
      id: "actv_001",
      type: "created",
      message: "Opportunity “Globex — Annual Renewal” moved to Negotiation",
      relatedId: "oppo_002",
      relatedCollection: "opportunities",
      createdAt: nowISO(),
    },
    {
      id: "actv_002",
      type: "created",
      message: "Lead “Lena Fischer” qualified",
      relatedId: "lead_003",
      relatedCollection: "leads",
      createdAt: nowISO(),
    },
    {
      id: "actv_003",
      type: "created",
      message: "Opportunity “Acme — Support Upgrade” marked Closed Won",
      relatedId: "oppo_004",
      relatedCollection: "opportunities",
      createdAt: nowISO(),
    },
  ];

  return { accounts, contacts, leads, opportunities, tasks, activities };
}

// Prepend an activity-timeline entry. Best-effort; never blocks the write.
function logActivity(data, { type, message, relatedId, relatedCollection }) {
  const entry = {
    id: id("actv"),
    type,
    message,
    relatedId: relatedId ?? null,
    relatedCollection: relatedCollection ?? null,
    createdAt: nowISO(),
  };
  data.activities = [entry, ...(data.activities ?? [])].slice(0, 200);
}

// Build a short label for a record used in activity messages.
function recordLabel(collection, record) {
  return (
    record.name ||
    record.subject ||
    [record.firstName, record.lastName].filter(Boolean).join(" ") ||
    record.id
  );
}

// ---------------------------------------------------------------------------
// Persistence
// ---------------------------------------------------------------------------
function ensureLoaded() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    const data = seed();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return data;
  }
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    const data = seed();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return data;
  }
}

function save(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ---------------------------------------------------------------------------
// CRUD helpers
// ---------------------------------------------------------------------------
export function isCollection(name) {
  return COLLECTIONS.includes(name);
}

export function list(collection) {
  const data = ensureLoaded();
  return data[collection] ?? [];
}

export function get(collection, recordId) {
  return list(collection).find((r) => r.id === recordId) ?? null;
}

export function create(collection, fields) {
  const data = ensureLoaded();
  const prefix = collection.slice(0, 4);
  const record = {
    id: id(prefix),
    ...fields,
    createdAt: nowISO(),
  };
  data[collection] = [record, ...(data[collection] ?? [])];
  if (ACTIVITY_LOGGED.includes(collection)) {
    logActivity(data, {
      type: "created",
      message: `New ${SINGULAR[collection]} “${recordLabel(collection, record)}” created`,
      relatedId: record.id,
      relatedCollection: collection,
    });
  }
  save(data);
  return record;
}

export function update(collection, recordId, fields) {
  const data = ensureLoaded();
  const items = data[collection] ?? [];
  const idx = items.findIndex((r) => r.id === recordId);
  if (idx === -1) return null;
  const { id: _ignore, createdAt, ...rest } = fields;
  const before = items[idx];
  items[idx] = { ...before, ...rest };
  data[collection] = items;
  if (ACTIVITY_LOGGED.includes(collection)) {
    const label = recordLabel(collection, items[idx]);
    let message = `${SINGULAR[collection]} “${label}” updated`;
    if (rest.stage && rest.stage !== before.stage) {
      message = `Opportunity “${label}” moved to ${rest.stage}`;
    } else if (rest.status && rest.status !== before.status) {
      message = `${SINGULAR[collection]} “${label}” → ${rest.status}`;
    }
    logActivity(data, {
      type: "updated",
      message: message.charAt(0).toUpperCase() + message.slice(1),
      relatedId: items[idx].id,
      relatedCollection: collection,
    });
  }
  save(data);
  return items[idx];
}

export function remove(collection, recordId) {
  const data = ensureLoaded();
  const items = data[collection] ?? [];
  const idx = items.findIndex((r) => r.id === recordId);
  if (idx === -1) return false;
  items.splice(idx, 1);
  data[collection] = items;
  save(data);
  return true;
}
