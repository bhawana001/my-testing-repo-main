"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { BankShell } from "@/app/components/engines/BankShell";
import { LoginForm, SEED_SESSION, SignedInBar } from "@/app/components/engines/Auth";
import { Card, Table } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const ACCOUNTS = [{ id: "sav", name: "Savings Account", mask: "•••• 7712", balance: 184250.4, currency: "INR" }, { id: "cur", name: "Current Account", mask: "•••• 3301", balance: 52110.0, currency: "INR" }, { id: "fd", name: "Fixed Deposit", mask: "FD •••• 0088", balance: 500000, currency: "INR", sub: "Matures 12 Mar 2027" }];
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), () => ({ auth: { ...SEED_SESSION } }));
  const setAuth = (a) => set((st) => ({ ...st, auth: typeof a === "function" ? a(st.auth) : a }));
  if (!s.auth.user) {
    return (
      <BankShell entity={ent} nav={["NetBanking", "Cards", "Loans", "Deposits"]} active="NetBanking" right={<span className="ee-small ee-muted">🔒 Secure login</span>}>
        <div style={{ maxWidth: 440, margin: "20px auto" }}>
          <LoginForm auth={s.auth} setAuth={setAuth} mode="customerid+otp" title="NetBanking login" subtitle="Enter your Customer ID and IPIN, then the OTP sent to your registered mobile." idLabel="Customer ID / User ID" />
        </div>
      </BankShell>
    );
  }
  return (
    <BankShell entity={ent} nav={["NetBanking", "Accounts", "Fund transfer", "Cards"]} active="Accounts" accounts={ACCOUNTS} title="Account summary" sub="Balances as of 14 Sep 2026, 10:00 AM">
      <SignedInBar user={s.auth.user} onSignOut={() => set({ auth: { ...SEED_SESSION } })} />
      <Card title="Accounts" data-testid="account-summary">
        <Table cols={[{ key: "name", label: "Account" }, { key: "mask", label: "Number" }, { key: "balance", label: "Available balance", align: "right", render: (r) => money(r.balance, "INR") }]} rows={ACCOUNTS} rowKey={(r) => r.id} />
      </Card>
    </BankShell>
  );
}
