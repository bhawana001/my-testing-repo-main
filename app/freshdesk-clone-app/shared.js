"use client";
// Freshdesc (Freshdesk) clone: an inbound email that becomes a ticket with the
// subject and requester carried over, canned responses whose placeholders are
// filled from the ticket rather than left as literal text, a merge that keeps
// both threads in order, and a customer portal that shows a requester only
// their own tickets and only the public replies.
import { createStore } from "../clones/kit/store";

export const BRAND = { name: "Freshdesc", slug: "freshdesk", mark: "◆", home: "/freshdesk-clone-app",
  accent: "#12344d", accentText: "#fff", bg: "#f4f7f9" };
export const BASE = "/freshdesk-clone-app";

export const SUPPORT_ADDRESS = "support@acmerobotics.test";
export const AGENT = { name: "Priya Nair", signature: "Priya from Acme Support" };

export const STATUSES = ["Open", "Pending", "Resolved", "Closed"];
export const PRIORITIES = ["Low", "Medium", "High", "Urgent"];

export const CANNED = [
  { id: "cr_ack", name: "Acknowledge receipt",
    body: "Hi {{requester_first_name}},\n\nThanks for getting in touch about “{{ticket_subject}}”. Your ticket is {{ticket_id}} and I am looking into it now.\n\n{{agent_signature}}" },
  { id: "cr_info", name: "Ask for more detail",
    body: "Hi {{requester_first_name}},\n\nCould you send the exact time this happened on ticket {{ticket_id}}? That will let me find it in the logs.\n\n{{agent_signature}}" },
  { id: "cr_resolved", name: "Confirm resolution",
    body: "Hi {{requester_first_name}},\n\nI have fixed “{{ticket_subject}}”. I will close {{ticket_id}} in 48 hours unless you tell me otherwise.\n\n{{agent_signature}}" },
];

const SEED = {
  tickets: [
    { id: "#1041", subject: "Cannot export my report", requester: "Sam Rivera",
      email: "sam@riverfield.test", status: "Open", priority: "Medium", source: "Portal",
      mergedFrom: [],
      thread: [{ from: "Sam Rivera", type: "public", text: "The export button spins and nothing downloads.", at: "2026-09-14 09:12" }] },
    { id: "#1042", subject: "Export still failing", requester: "Sam Rivera",
      email: "sam@riverfield.test", status: "Open", priority: "Medium", source: "Email",
      mergedFrom: [],
      thread: [{ from: "Sam Rivera", type: "public", text: "Tried again this morning, same thing.", at: "2026-09-15 08:40" }] },
    { id: "#1043", subject: "Invoice address is wrong", requester: "Ana Okonkwo",
      email: "ana@kestrel.test", status: "Pending", priority: "Low", source: "Email",
      mergedFrom: [],
      thread: [{ from: "Ana Okonkwo", type: "public", text: "Our billing address changed last month.", at: "2026-09-13 15:02" }] },
  ],
  counter: 1044,
};

export const { useStore, reset } = createStore("freshdesk", SEED);

/** Fills the placeholders a canned response carries, from the ticket itself. */
export function resolvePlaceholders(body, ticket) {
  const map = {
    "{{requester_first_name}}": String(ticket.requester || "").split(" ")[0],
    "{{requester_name}}": ticket.requester,
    "{{ticket_id}}": ticket.id,
    "{{ticket_subject}}": ticket.subject,
    "{{agent_name}}": AGENT.name,
    "{{agent_signature}}": AGENT.signature,
  };
  return Object.entries(map).reduce((text, [k, v]) => text.split(k).join(v), body);
}

/** Merge keeps both transcripts, ordered by time, on the target ticket. */
export function mergeThreads(target, source) {
  return [...target.thread, ...source.thread]
    .slice()
    .sort((a, b) => String(a.at).localeCompare(String(b.at)));
}
