"use client";
import { TopBar } from "../clones/kit/ui";
import { BRAND, BASE } from "./shared";

export default function Nav() {
  return (
    <TopBar brand={BRAND} nav={[
      { href: `${BASE}/sports`, label: "Sports", testId: "nav-sports" },
      { href: `${BASE}/shows`, label: "Shows", testId: "nav-shows" },
    ]} />
  );
}
