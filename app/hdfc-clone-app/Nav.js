"use client";
import { TopBar, Badge } from "../clones/kit/ui";
import { BRAND, BASE, CUSTOMER, useStore } from "./shared";

export default function Nav() {
  const [s] = useStore();
  return (
    <TopBar brand={BRAND} nav={[
      { href: `${BASE}/accounts`, label: "Accounts", testId: "nav-accounts" },
      { href: `${BASE}/transfer`, label: "Transfer", testId: "nav-transfer" },
      { href: `${BASE}/deposits`, label: "Deposits", testId: "nav-deposits" },
      { href: `${BASE}/cards`, label: "Cards", testId: "nav-cards" },
    ]}
    right={s.loggedIn
      ? <Badge tone="ok" testId="session-badge">{CUSTOMER.name}</Badge>
      : <Badge tone="neutral" testId="session-badge">Signed out</Badge>} />
  );
}
