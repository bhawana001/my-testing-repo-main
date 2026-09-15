"use client";
// Zendisk (Zendesk) clone: the customer widget and the agent workspace write to
// one ticket store, so a ticket raised in the widget is the ticket the agent
// replies to, and the customer sees that reply.
import { createStore } from "../clones/kit/store";

export const BRAND = { name: "Zendisk", slug: "zendesk", mark: "◑",
  home: "/zendesk-clone-app", accent: "#03363d", accentText: "#fff", bg: "#f4f6f6" };
export const BASE = "/zendesk-clone-app";

export const PRIORITIES = ["Low", "Normal", "High", "Urgent"];
export const STATUSES = ["New", "Open", "Pending", "Solved", "Closed"];
export const TYPES = ["Question", "Incident", "Problem", "Task"];

// First-reply SLA targets in minutes, by priority.
export const SLA_TARGETS = { Urgent: 60, High: 240, Normal: 480, Low: 1440 };

// Macros bundle a canned reply with field updates, exactly like the real thing.
export const MACROS = [
  { id: "m_refund", title: "Refund — approved",
    reply: "Thanks for your patience. I've approved your refund and it will land back on your original payment method within 5 working days.",
    sets: { status: "Pending", priority: "Normal", type: "Question", tags: ["refund", "approved"] } },
  { id: "m_escalate", title: "Escalate to engineering",
    reply: "I've escalated this to our engineering team. They'll investigate and I'll update you as soon as I hear back.",
    sets: { status: "Open", priority: "High", type: "Problem", tags: ["escalated"] } },
  { id: "m_close", title: "Close — resolved",
    reply: "Glad that sorted it. I'm marking this as solved, but reply any time to reopen it.",
    sets: { status: "Solved", priority: "Low", type: "Question", tags: ["resolved"] } },
];

export const ARTICLES = [
  { id: "a_refund", title: "How refunds are processed", section: "Billing",
    body: "Refunds return to the original payment method. Card refunds take 5 working days to appear; bank transfers can take up to 10. You'll get an email when the refund is issued.",
    votes: { up: 128, down: 6 } },
  { id: "a_password", title: "Resetting your password", section: "Account",
    body: "Choose 'Forgot password' on the sign-in screen and we'll email a reset link. The link expires after 30 minutes. If it has expired, request a new one.",
    votes: { up: 342, down: 11 } },
  { id: "a_invoice", title: "Downloading past invoices", section: "Billing",
    body: "Open Billing then Invoices in your account settings. Every invoice can be downloaded as a PDF, and you can add a VAT number that appears on future invoices.",
    votes: { up: 89, down: 3 } },
  { id: "a_sso", title: "Setting up single sign-on", section: "Security",
    body: "SSO is available on Business plans and above. You'll need your identity provider's metadata URL. SAML 2.0 and OIDC are both supported.",
    votes: { up: 54, down: 8 } },
];

const SEED = {
  tickets: [
    { id: 4412, subject: "Payment taken twice for order #1188", requester: "dan.okafor@example.com",
      description: "I was charged twice for the same order this morning.", priority: "Urgent",
      status: "Open", type: "Incident", tags: ["billing"], createdAt: "2026-09-15 08:05",
      minutesOpen: 55, comments: [] },
    { id: 4409, subject: "Cannot download my August invoice", requester: "rhea@example.com",
      description: "The invoice download button does nothing.", priority: "Normal",
      status: "Open", type: "Problem", tags: ["billing"], createdAt: "2026-09-14 16:20",
      minutesOpen: 620, comments: [] },
  ],
  articleVotes: {},
  counter: 4412,
};

export const { useStore, reset } = createStore("zendesk", SEED);

/** Remaining minutes against the first-reply SLA; negative means breached. */
export function slaFor(ticket) {
  const target = SLA_TARGETS[ticket.priority];
  const remaining = target - ticket.minutesOpen;
  return {
    target,
    remaining,
    breached: remaining < 0,
    label: remaining < 0 ? `Breached by ${Math.abs(remaining)} min` : `${remaining} min remaining`,
  };
}
