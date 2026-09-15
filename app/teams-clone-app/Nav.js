"use client";
import { TopBar, Badge } from "../clones/kit/ui";
import { BRAND, BASE, ME, useStore } from "./shared";

export default function Nav() {
  const [s] = useStore();
  const unread = s.activity.filter((a) => a.to === ME.name && !a.read).length;
  return (
    <TopBar
      brand={BRAND}
      nav={[
        { href: `${BASE}/calendar`, label: "Calendar", testId: "nav-calendar" },
        { href: `${BASE}/channel/eng`, label: "Teams", testId: "nav-teams" },
        { href: `${BASE}/activity`, label: "Activity", testId: "nav-activity" },
        { href: `${BASE}/files`, label: "Files", testId: "nav-files" },
        { href: `${BASE}/tabs`, label: "Apps", testId: "nav-apps" },
      ]}
      right={unread ? <Badge tone="bad" testId="activity-badge">{unread}</Badge> : null}
    />
  );
}
