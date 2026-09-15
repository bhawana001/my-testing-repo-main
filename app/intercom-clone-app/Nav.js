"use client";
import { TopBar, Badge } from "../clones/kit/ui";
import { BRAND, BASE, useStore } from "./shared";

export default function Nav() {
  const [s] = useStore();
  const open = s.conversations.filter((c) => c.state !== "Closed").length;
  return (
    <TopBar brand={BRAND} nav={[
      { href: `${BASE}/messenger`, label: "Messenger", testId: "nav-messenger" },
      { href: `${BASE}/inbox`, label: "Inbox", testId: "nav-inbox" },
      { href: `${BASE}/outbound`, label: "Outbound", testId: "nav-outbound" },
      { href: `${BASE}/help`, label: "Help centre", testId: "nav-help" },
    ]}
    right={<Badge tone={open ? "warn" : "neutral"} testId="open-count">{open} open</Badge>} />
  );
}
