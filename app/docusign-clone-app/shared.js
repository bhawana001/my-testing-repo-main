"use client";
// DocuSine (DocuSign) clone: envelopes carry fields a recipient must complete,
// a signing ceremony that adopts a signature, templates that prefill fields,
// and a decline path that tells the sender why.
import { createStore } from "../clones/kit/store";

export const BRAND = { name: "DocuSine", slug: "docusign", mark: "✍",
  home: "/docusign-clone-app", accent: "#1b4f9c", accentText: "#fff", bg: "#f4f6fa" };
export const BASE = "/docusign-clone-app";

export const FIELD_TYPES = [
  { id: "signature", label: "Signature" },
  { id: "date", label: "Date signed" },
  { id: "text", label: "Text" },
  { id: "initials", label: "Initials" },
];

export const TEMPLATES = [
  { id: "tpl_nda", name: "Mutual NDA", subject: "Please sign: Mutual NDA",
    message: "Standard two-way NDA — no changes from our usual terms.",
    fields: [
      { type: "signature", label: "Signature" },
      { type: "date", label: "Date signed" },
      { type: "text", label: "Company name" },
    ] },
  { id: "tpl_offer", name: "Employment offer", subject: "Please sign: Employment offer",
    message: "Your offer letter is attached. Reach out with any questions before signing.",
    fields: [
      { type: "signature", label: "Signature" },
      { type: "date", label: "Start date" },
      { type: "initials", label: "Initials — page 2" },
    ] },
];

export const DECLINE_REASONS = [
  "I am not the correct signer",
  "The terms need to change",
  "I did not expect this document",
  "The document contains an error",
];

const SEED = {
  envelopes: [
    { id: "ENV-7741", subject: "Please sign: Supplier agreement", recipient: "marco@example.com",
      recipientName: "Marco Oduya", status: "completed", sentAt: "2026-09-04", completedAt: "2026-09-05",
      fields: [{ type: "signature", label: "Signature", value: "Marco Oduya" },
               { type: "date", label: "Date signed", value: "2026-09-05" }],
      fromTemplate: null, sealed: true },
  ],
  counter: 7741,
};

export const { useStore, reset } = createStore("docusign", SEED);
export const nextEnvelopeId = (n) => "ENV-" + (n + 1);
