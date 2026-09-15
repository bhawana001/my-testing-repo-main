"use client";
import { TopBar, Badge } from "../clones/kit/ui";
import { BRAND, BASE, useStore } from "./shared";

export default function Nav() {
  const [s] = useStore();
  return (
    <TopBar brand={BRAND} nav={[
      { href: `${BASE}/tickets`, label: "Tickets", testId: "nav-tickets" },
      { href: `${BASE}/inbound`, label: "Inbound email", testId: "nav-inbound" },
      { href: `${BASE}/portal`, label: "Customer portal", testId: "nav-portal" },
    ]}
    right={<Badge tone="info" testId="ticket-badge">{s.tickets.length} tickets</Badge>} />
  );
}
