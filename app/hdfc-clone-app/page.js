"use client";
import Link from "next/link";
import { Shell, Page, Card, Row, Badge } from "../clones/kit/ui";
import Nav from "./Nav";
import { BRAND, BASE, CUSTOMER, useStore } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="NetBanking" sub="Secure access to your accounts">
        <Card title="Session">
          <Badge tone={s.loggedIn ? "ok" : "neutral"} testId="login-state">
            {s.loggedIn ? "Signed in" : "Not signed in"}
          </Badge>
          {s.loggedIn && <Row label="Customer" value={CUSTOMER.name} testId="customer-name" />}
          <div className="ck-card-actions">
            <Link href={`${BASE}/login`} className="ck-btn ck-btn--primary" data-testid="go-login">
              {s.loggedIn ? "Account summary" : "Log in"}
            </Link>
          </div>
        </Card>
        <Card title="Test credentials">
          <Row label="Customer id" value={CUSTOMER.id} testId="hint-customer-id" />
          <Row label="Password" value="Netbank@2026" testId="hint-password" />
          <Row label="OTP" value="481902" testId="hint-otp" />
        </Card>
      </Page>
    </Shell>
  );
}
