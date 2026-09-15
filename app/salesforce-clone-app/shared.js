"use client";
// Salesfource (Salesforce) clone: leads, an opportunity pipeline with stages
// that carry probabilities, filterable reports, editable account records and a
// branching screen flow that creates records.
import { createStore, money } from "../clones/kit/store";

export const BRAND = { name: "Salesfource", slug: "salesforce", mark: "☁",
  home: "/salesforce-clone-app", accent: "#0176d3", accentText: "#fff", bg: "#f3f3f3" };
export const BASE = "/salesforce-clone-app";
export { money };

export const USERS = ["Priya Nair", "Marco Oduya", "Dana Reyes"];
export const LEAD_SOURCES = ["Web", "Phone Enquiry", "Partner Referral", "Trade Show", "Advertisement"];
export const LEAD_STATUSES = ["Open — Not Contacted", "Working — Contacted", "Qualified", "Unqualified"];
export const INDUSTRIES = ["Technology", "Manufacturing", "Healthcare", "Finance", "Retail"];

// Stage drives probability — moving a deal forward changes the forecast.
export const STAGES = [
  { id: "prospecting", name: "Prospecting", probability: 10 },
  { id: "qualification", name: "Qualification", probability: 25 },
  { id: "proposal", name: "Proposal", probability: 50 },
  { id: "negotiation", name: "Negotiation", probability: 75 },
  { id: "closed_won", name: "Closed Won", probability: 100 },
];
export const stageIdx = (id) => STAGES.findIndex((s) => s.id === id);

const SEED = {
  leads: [
    { id: "00Q001", name: "Aditi Rao", company: "Northwind Labs", email: "aditi@northwind.example",
      source: "Web", status: "Working — Contacted", owner: "Priya Nair", createdAt: "2026-09-09" },
  ],
  opportunities: [
    { id: "006001", name: "Northwind — Platform Licence", account: "Northwind Labs", amount: 48000,
      stage: "qualification", probability: 25, closeDate: "2026-11-14", owner: "Priya Nair", quarter: "Q4" },
    { id: "006002", name: "Brightline — Renewal", account: "Brightline Electronics", amount: 22500,
      stage: "proposal", probability: 50, closeDate: "2026-10-02", owner: "Marco Oduya", quarter: "Q4" },
    { id: "006003", name: "Cedar Foods — Expansion", account: "Cedar Foods", amount: 15750,
      stage: "prospecting", probability: 10, closeDate: "2027-01-20", owner: "Dana Reyes", quarter: "Q1" },
    { id: "006004", name: "Harbour — Pilot", account: "Harbour Freight Co", amount: 9800,
      stage: "negotiation", probability: 75, closeDate: "2026-09-29", owner: "Priya Nair", quarter: "Q4" },
  ],
  accounts: [
    { id: "001001", name: "Northwind Labs", industry: "Technology", employees: 240,
      phone: "+1 512 555 0110", website: "northwind.example", owner: "Priya Nair" },
    { id: "001002", name: "Cedar Foods", industry: "Retail", employees: 1100,
      phone: "+1 512 555 0188", website: "cedarfoods.example", owner: "Dana Reyes" },
  ],
  cases: [],
  counter: 1,
};

export const { useStore, reset } = createStore("salesforce", SEED);
export const nextId = (prefix, n) => prefix + String(100 + n).padStart(3, "0");
