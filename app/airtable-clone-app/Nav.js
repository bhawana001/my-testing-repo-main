"use client";
import { TopBar } from "../clones/kit/ui";
import { BRAND, BASE } from "./shared";

export default function Nav() {
  return (
    <TopBar brand={BRAND} nav={[
      { href: `${BASE}/grid`, label: "Grid", testId: "nav-grid" },
      { href: `${BASE}/kanban`, label: "Kanban", testId: "nav-kanban" },
      { href: `${BASE}/form`, label: "Form", testId: "nav-form" },
      { href: `${BASE}/automations`, label: "Automations", testId: "nav-automations" },
    ]} />
  );
}
