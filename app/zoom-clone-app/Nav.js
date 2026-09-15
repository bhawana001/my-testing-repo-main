"use client";
import { TopBar } from "../clones/kit/ui";
import { BRAND, BASE } from "./shared";

export default function Nav() {
  return (
    <TopBar brand={BRAND} nav={[
      { href: `${BASE}/schedule`, label: "Schedule", testId: "nav-schedule" },
      { href: BASE, label: "Meetings", testId: "nav-meetings" },
      { href: `${BASE}/recordings`, label: "Recordings", testId: "nav-recordings" },
    ]} />
  );
}
