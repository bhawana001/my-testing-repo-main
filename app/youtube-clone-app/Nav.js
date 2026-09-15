"use client";
import { TopBar, Badge } from "../clones/kit/ui";
import { BRAND, BASE, useStore } from "./shared";

export default function Nav() {
  const [s] = useStore();
  return (
    <TopBar brand={BRAND} nav={[
      { href: BASE, label: "Home", testId: "nav-home" },
      { href: `${BASE}/upload`, label: "Upload", testId: "nav-upload" },
      { href: `${BASE}/premium`, label: "Premium", testId: "nav-premium" },
      { href: `${BASE}/memberships`, label: "Memberships", testId: "nav-memberships" },
    ]}
    right={s.premium ? <Badge tone="ok" testId="premium-badge">Premium</Badge> : null} />
  );
}
