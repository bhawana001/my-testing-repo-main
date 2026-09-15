"use client";
import { TopBar, Badge } from "../clones/kit/ui";
import { BRAND, BASE, PLANS, useStore } from "./shared";

export default function Nav() {
  const [s] = useStore();
  return (
    <TopBar brand={BRAND} nav={[
      { href: BASE, label: "Player", testId: "nav-player" },
      { href: `${BASE}/playlists`, label: "Playlists", testId: "nav-playlists" },
      { href: `${BASE}/devices`, label: "Devices", testId: "nav-devices" },
      { href: `${BASE}/premium`, label: "Premium", testId: "nav-premium" },
      { href: `${BASE}/family`, label: "Family", testId: "nav-family" },
    ]}
    right={s.plan !== "free"
      ? <Badge tone="ok" testId="premium-badge">{PLANS[s.plan].label}</Badge>
      : <Badge tone="neutral" testId="free-badge">Free</Badge>} />
  );
}
