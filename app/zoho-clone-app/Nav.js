"use client";
import { TopBar } from "../clones/kit/ui";
import { BRAND, BASE } from "./shared";

export default function Nav() {
  return (
    <TopBar brand={BRAND} nav={[
      { href: `${BASE}/leads`, label: "Leads", testId: "nav-leads" },
      { href: `${BASE}/import`, label: "Import", testId: "nav-import" },
      { href: `${BASE}/workflows`, label: "Workflow rules", testId: "nav-workflows" },
      { href: `${BASE}/blueprint`, label: "Blueprint", testId: "nav-blueprint" },
      { href: `${BASE}/dashboard`, label: "Dashboard", testId: "nav-dashboard" },
    ]} />
  );
}
