"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { money } from "@/lib/seed";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Badge, KV } from "@/app/components/eval/ui";
import { LoginForm, SEED_SESSION, SignedInBar } from "@/app/components/engines/Auth";

const ACCOUNTS = [
  { name: "Total Checking", mask: "•••• 4821", balance: 4210.55 },
  { name: "Premier Savings", mask: "•••• 9930", balance: 15800.0 },
  { name: "Freedom Credit Card", mask: "•••• 1177", balance: -642.19, credit: true },
];
const seed = () => ({ auth: { ...SEED_SESSION } });

export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const setAuth = (auth) => set((st) => ({ ...st, auth: typeof auth === "function" ? auth(st.auth) : auth }));
  const user = s.auth.user;
  return (
    <>
      <Topbar entity={ent} nav={["Checking", "Savings", "Credit cards", "Auto", "Business"]} light right={user ? <Badge tone="ok">Secure session</Badge> : <span className="ee-small ee-muted">🔒 Secure sign in</span>} />
      <main className="ee-main ee-main--narrow">
        {!user ? (
          <div style={{ maxWidth: 420, margin: "30px auto" }}>
            <LoginForm auth={s.auth} setAuth={setAuth} mode="password+otp" title="Sign in to Chaise Online" subtitle="Use your username and password. We'll then verify with a one-time code." />
          </div>
        ) : (
          <div data-testid="dashboard">
            <SignedInBar user={user} onSignOut={() => set(seed())} />
            <h1 className="ee-page-title">Welcome back, {user.firstName}</h1>
            <p className="ee-page-sub">Last sign in: Monday, September 14, 2026 · 10:00 AM</p>
            <div className="ee-stack">
              {ACCOUNTS.map((a) => (
                <Card key={a.mask} tight data-testid="account-card">
                  <div className="ee-row ee-row--between">
                    <div>
                      <div className="ee-strong">{a.name} <span className="ee-muted ee-mono" data-testid="account-mask">({a.mask})</span></div>
                      <div className="ee-small ee-muted">{a.credit ? "Current balance" : "Available balance"}</div>
                    </div>
                    <div className="ee-price ee-num">{money(a.credit ? Math.abs(a.balance) : a.balance)}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
