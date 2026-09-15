"use client";
import { TopBar } from "../clones/kit/ui";
import { BRAND, BASE } from "./shared";

export default function Nav() {
  return (
    <TopBar brand={BRAND} nav={[
      { href: BASE, label: "Pages", testId: "nav-pages" },
      { href: `${BASE}/database`, label: "Roadmap", testId: "nav-database" },
      { href: `${BASE}/templates`, label: "Templates", testId: "nav-templates" },
    ]} />
  );
}
