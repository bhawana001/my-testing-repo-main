"use client";
import { TopBar } from "../clones/kit/ui";
import { BRAND, BASE } from "./shared";

export default function Nav() {
  return (
    <TopBar brand={BRAND} nav={[
      { href: `${BASE}/term`, label: "Term life", testId: "nav-term" },
      { href: `${BASE}/health`, label: "Health", testId: "nav-health" },
      { href: `${BASE}/calculator`, label: "Calculator", testId: "nav-calculator" },
      { href: `${BASE}/callback`, label: "Talk to an advisor", testId: "nav-callback" },
    ]} />
  );
}
