"use client";

// Maps a status/stage/priority string to a coloured pill.
const MAP = {
  // Lead statuses
  New: "cf-badge-blue",
  Working: "cf-badge-amber",
  Qualified: "cf-badge-green",
  Unqualified: "cf-badge-gray",
  // Opportunity stages
  Prospecting: "cf-badge-gray",
  Qualification: "cf-badge-blue",
  Proposal: "cf-badge-amber",
  Negotiation: "cf-badge-purple",
  "Closed Won": "cf-badge-green",
  "Closed Lost": "cf-badge-red",
  // Task status / priority
  Open: "cf-badge-blue",
  Complete: "cf-badge-green",
  High: "cf-badge-red",
  Normal: "cf-badge-gray",
  Low: "cf-badge-gray",
};

export default function Badge({ value }) {
  if (!value) return null;
  const cls = MAP[value] || "cf-badge-gray";
  return <span className={`cf-badge ${cls}`}>{value}</span>;
}
