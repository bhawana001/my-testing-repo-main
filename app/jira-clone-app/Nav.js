"use client";
import { TopBar } from "../clones/kit/ui";
import { BRAND, BASE } from "./shared";

export default function Nav() {
  return (
    <TopBar brand={BRAND} nav={[
      { href: `${BASE}/board`, label: "Board", testId: "nav-board" },
      { href: `${BASE}/create`, label: "Create", testId: "nav-create" },
      { href: `${BASE}/search`, label: "Filters", testId: "nav-search" },
    ]} />
  );
}
