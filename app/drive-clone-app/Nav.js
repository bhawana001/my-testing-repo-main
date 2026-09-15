"use client";
import { TopBar } from "../clones/kit/ui";
import { BRAND, BASE } from "./shared";

export default function Nav() {
  return (
    <TopBar brand={BRAND} nav={[
      { href: BASE, label: "My Drive", testId: "nav-drive" },
      { href: `${BASE}/search`, label: "Search", testId: "nav-search" },
      { href: `${BASE}/coedit`, label: "Co-edit", testId: "nav-coedit" },
      { href: `${BASE}/offline`, label: "Offline", testId: "nav-offline" },
    ]} />
  );
}
