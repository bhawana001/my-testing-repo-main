"use client";
import { TopBar, Badge } from "../clones/kit/ui";
import { BRAND, BASE, useStore } from "./shared";

export default function Nav() {
  const [s] = useStore();
  return (
    <TopBar brand={BRAND} nav={[
      { href: `${BASE}/rewards`, label: "Rewards", testId: "nav-rewards" },
      { href: `${BASE}/payments`, label: "Payments", testId: "nav-payments" },
      { href: `${BASE}/disputes`, label: "Disputes", testId: "nav-disputes" },
      { href: `${BASE}/offers`, label: "Offers", testId: "nav-offers" },
    ]}
    right={<Badge tone="info" testId="points-badge">{s.points.toLocaleString()} points</Badge>} />
  );
}
