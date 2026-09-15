"use client";
import { TopBar } from "../clones/kit/ui";
import { BRAND, BASE } from "./shared";

export default function Nav() {
  return (
    <TopBar brand={BRAND} nav={[
      { href: `${BASE}/contacts`, label: "Contacts", testId: "nav-contacts" },
      { href: `${BASE}/deals`, label: "Deals", testId: "nav-deals" },
      { href: `${BASE}/sequences`, label: "Sequences", testId: "nav-sequences" },
      { href: `${BASE}/landing`, label: "Landing page", testId: "nav-landing" },
      { href: `${BASE}/meetings`, label: "Meeting link", testId: "nav-meetings" },
    ]} />
  );
}
