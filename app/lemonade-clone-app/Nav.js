"use client";
import { TopBar, Badge } from "../clones/kit/ui";
import { BRAND, BASE, useStore } from "./shared";

export default function Nav() {
  const [s] = useStore();
  return (
    <TopBar brand={BRAND} nav={[
      { href: `${BASE}/quote`, label: "Get a quote", testId: "nav-quote" },
      { href: `${BASE}/policy`, label: "My policy", testId: "nav-policy" },
      { href: `${BASE}/coverage`, label: "Coverage", testId: "nav-coverage" },
      { href: `${BASE}/claims`, label: "Claims", testId: "nav-claims" },
    ]}
    right={s.policy
      ? <Badge tone="ok" testId="policy-badge">Policy active</Badge>
      : <Badge tone="neutral" testId="policy-badge">No policy</Badge>} />
  );
}
