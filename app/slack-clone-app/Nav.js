"use client";
import { TopBar, Badge } from "../clones/kit/ui";
import { BRAND, BASE, useStore } from "./shared";

/** Shared chrome: carries the huddle indicator so it is visible from any page. */
export default function Nav() {
  const [s] = useStore();
  return (
    <TopBar
      brand={BRAND}
      nav={[
        { href: `${BASE}/channel/general`, label: "Channels", testId: "nav-channels" },
        { href: `${BASE}/search`, label: "Search", testId: "nav-search" },
        { href: `${BASE}/files`, label: "Files", testId: "nav-files" },
        { href: `${BASE}/huddle`, label: "Huddle", testId: "nav-huddle" },
        { href: `${BASE}/workflows`, label: "Workflows", testId: "nav-workflows" },
      ]}
      right={s.huddle ? (
        <Badge tone="ok" testId="huddle-indicator">🎧 Huddle active in #{s.huddle.channel}</Badge>
      ) : null}
    />
  );
}
