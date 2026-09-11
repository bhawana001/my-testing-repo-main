"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, Badge, Chips, Alert } from "@/app/components/eval/ui";
import { LoginForm, SEED_SESSION } from "@/app/components/engines/Auth";
import { money } from "@/lib/seed";
import { useState } from "react";

const seed = () => ({ auth: { ...SEED_SESSION }, showLogin: false, added: null });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [size, setSize] = useState(null);
  const member = !!s.auth.user;
  const setAuth = (a) => set((st) => ({ ...st, auth: typeof a === "function" ? a(st.auth) : a }));
  return (
    <>
      <Topbar entity={ent} nav={["New", "Men", "Women", "Member Shop"]} active="Member Shop" light right={member ? <Badge tone="ok" data-testid="member-badge">Member · Demo</Badge> : <Btn size="sm" variant="secondary" onClick={() => set({ ...s, showLogin: true })} data-testid="join-login">Sign in</Btn>} />
      <main className="ee-main">
        {s.showLogin && !member ? (
          <div style={{ maxWidth: 420, margin: "10px auto" }}>
            <LoginForm auth={s.auth} setAuth={setAuth} mode="password" title="Sign in to your Nyke Member profile" onSuccess={() => set((st) => ({ ...st, showLogin: false }))} />
          </div>
        ) : (
          <div className="ee-split">
            <div className="ee-product__img" style={{ fontSize: 120, maxWidth: 520, filter: member ? "none" : "blur(6px)" }} aria-hidden="true">👟</div>
            <div className="ee-stack" data-testid="member-product">
              <Badge tone="accent">Member Exclusive</Badge>
              <h1 className="ee-page-title">Stride Runner 3 · Member Edition</h1>
              <div className="ee-price" style={{ fontSize: 22 }}>{money(119)}</div>
              {!member ? (
                <Alert tone="info" data-testid="member-gate">This product is only available to Nyke Members. Sign in or join to unlock it.</Alert>
              ) : (
                <>
                  <div className="ee-strong">Select size</div>
                  <Chips options={["US 8", "US 9", "US 10"]} value={size} onChange={setSize} />
                </>
              )}
              <Btn block pill size="lg" style={{ background: "#111" }} disabled={!member || !size} onClick={() => set({ ...s, added: size })} data-testid="buy-button">{member ? "Add to Bag" : "Members only"}</Btn>
              {!member && <Btn block pill variant="secondary" onClick={() => set({ ...s, showLogin: true })} data-testid="gate-signin">Sign in to unlock</Btn>}
              {s.added && <Alert tone="ok" data-testid="added">Added Stride Runner 3 · Member Edition ({s.added}) to your bag.</Alert>}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
