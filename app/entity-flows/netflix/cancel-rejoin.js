"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, Badge, KV, Alert } from "@/app/components/eval/ui";

const seed = () => ({ status: "active", step: "account" });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  return (
    <>
      <Topbar entity={ent} light={false} />
      <main className="ee-main ee-main--narrow">
        {s.step === "confirm" ? (
          <Card data-testid="cancel-confirm">
            <h1 style={{ fontSize: 22 }}>Cancel your membership?</h1>
            <p className="ee-small" style={{ margin: "8px 0" }}>Your membership will end on <b>October 14, 2026</b>. You can keep watching until then, and your profiles and history are kept for 10 months if you come back.</p>
            <div className="ee-row"><Btn variant="danger" onClick={() => set({ status: "cancelled", step: "account" })} data-testid="finish-cancel">Finish Cancellation</Btn><Btn variant="secondary" onClick={() => set({ ...s, step: "account" })}>Go back</Btn></div>
          </Card>
        ) : (
          <Card title="Account · Membership" data-testid="membership">
            <KV k="Plan" v="Standard · $15.49/month" />
            <KV k="Status" v={<Badge tone={s.status === "active" ? "ok" : "warn"} data-testid="membership-status">{s.status === "active" ? "Active" : "Cancelled · access until October 14, 2026"}</Badge>} />
            <KV k={s.status === "active" ? "Next billing date" : "Access ends"} v={<span data-testid="membership-date">October 14, 2026</span>} />
            <div className="ee-divider" />
            {s.status === "active" ? <Btn variant="secondary" onClick={() => set({ ...s, step: "confirm" })} data-testid="cancel-membership">Cancel Membership</Btn> : (<>
              <Alert tone="info" data-testid="access-until">You can still watch until October 14, 2026.</Alert>
              <Btn style={{ marginTop: 10, background: "#e50914" }} onClick={() => set({ status: "active", step: "account", restarted: true })} data-testid="restart-membership">Restart Membership</Btn>
            </>)}
            {s.restarted && s.status === "active" && <Alert tone="ok" data-testid="restarted">Welcome back! Your membership continues. Next billing date: October 14, 2026.</Alert>}
          </Card>
        )}
      </main>
    </>
  );
}
