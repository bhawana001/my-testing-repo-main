"use client";
import { TopBar } from "../clones/kit/ui";
import { BRAND, BASE } from "./shared";

export default function Nav() {
  return (
    <TopBar brand={BRAND} nav={[
      { href: `${BASE}/tasks`, label: "Tasks", testId: "nav-tasks" },
      { href: `${BASE}/board`, label: "Board", testId: "nav-board" },
      { href: `${BASE}/my-tasks`, label: "My Tasks", testId: "nav-my-tasks" },
    ]} />
  );
}
