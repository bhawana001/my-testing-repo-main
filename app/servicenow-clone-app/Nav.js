"use client";
import { TopBar } from "../clones/kit/ui";
import { BRAND, BASE } from "./shared";

export default function Nav() {
  return (
    <TopBar brand={BRAND} nav={[
      { href: `${BASE}/incidents`, label: "Incidents", testId: "nav-incidents" },
      { href: `${BASE}/changes`, label: "Changes", testId: "nav-changes" },
      { href: `${BASE}/catalog`, label: "Service catalog", testId: "nav-catalog" },
      { href: `${BASE}/knowledge`, label: "Knowledge", testId: "nav-knowledge" },
    ]} />
  );
}
