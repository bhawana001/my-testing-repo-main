"use client";
// Hubsprout (HubSpot) clone: a landing form whose fields land on the contact
// record, a pipeline where dragging a deal changes only its stage and never its
// amount, sequence enrolment written onto the contact's timeline, and a meeting
// link a prospect can book without an account.
import { createStore, money } from "../clones/kit/store";

export const BRAND = { name: "Hubsprout", slug: "hubspot", mark: "❋", home: "/hubspot-clone-app",
  accent: "#ff7a59", accentText: "#fff", bg: "#fff7f4" };
export const BASE = "/hubspot-clone-app";
export { money };

export const OWNER = "Priya Nair";
export const STAGES = ["Appointment scheduled", "Qualified to buy", "Presentation scheduled",
  "Decision maker bought in", "Closed won"];

export const SEQUENCES = [
  { id: "seq_intro", name: "New lead nurture", steps: 4, days: 12 },
  { id: "seq_demo", name: "Post-demo follow up", steps: 3, days: 7 },
];

export const MEETING_SLOTS = ["2026-09-18 10:00", "2026-09-18 14:30", "2026-09-19 11:00", "2026-09-19 16:00"];

const SEED = {
  contacts: [
    { id: "c1", firstName: "Mira", lastName: "Shah", email: "mira@northgate.test",
      company: "Northgate Supply", phone: "555 0142", source: "Manual entry",
      timeline: [{ at: "2026-09-08", text: "Contact created manually" }] },
  ],
  deals: [
    { id: "d1", name: "Northgate Supply — annual", amount: 24000, stage: "Qualified to buy",
      contactId: "c1", owner: "Priya Nair",
      history: [{ at: "2026-09-08", text: "Deal created in Appointment scheduled at $24,000.00" }] },
    { id: "d2", name: "Riverfield — pilot", amount: 7500, stage: "Appointment scheduled",
      contactId: "c1", owner: "Priya Nair",
      history: [{ at: "2026-09-10", text: "Deal created in Appointment scheduled at $7,500.00" }] },
  ],
  enrolments: [],
  meetings: [],
  counter: 100,
};

export const { useStore, reset } = createStore("hubspot", SEED);
export const nextId = (p, n) => `${p}${n}`;
export const meetingRef = (n) => `MTG-${String(20410 + n * 9)}`;
