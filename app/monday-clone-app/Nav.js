"use client";
import { TopBar } from "../clones/kit/ui";
import { BRAND, BASE } from "./shared";

export default function Nav() {
  return (
    <TopBar brand={BRAND} nav={[
      { href: `${BASE}/board/launch`, label: "Boards", testId: "nav-boards" },
      { href: `${BASE}/automations`, label: "Automations", testId: "nav-automations" },
      { href: `${BASE}/dashboard`, label: "Dashboard", testId: "nav-dashboard" },
      { href: `${BASE}/sharing`, label: "Sharing", testId: "nav-sharing" },
    ]} />
  );
}
