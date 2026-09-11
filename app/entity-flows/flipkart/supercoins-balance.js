"use client";
import { useEffect, useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, Skeleton, Alert, Table, Badge } from "@/app/components/eval/ui";

// Balance comes from a fixed ledger. ?chaos=true makes the first load fail so the retry path can be tested.
const LEDGER = [{ id: 1, d: "Sep 12", t: "Order OD-104472", c: 25 }, { id: 2, d: "Sep 5", t: "Order OD-103118", c: 60 }, { id: 3, d: "Aug 28", t: "Redeemed on Movie tickets", c: -100 }, { id: 4, d: "Aug 20", t: "Opening balance", c: 1265 }];
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  useFlowState(storageKey(flow.entitySlug, flow.slug), () => ({}));
  const [state, setState] = useState("loading"); const [attempt, setAttempt] = useState(0);
  useEffect(() => { setState("loading"); const chaos = new URLSearchParams(window.location.search).get("chaos") === "true"; const t = setTimeout(() => setState(chaos && attempt === 0 ? "error" : "ready"), 800); return () => clearTimeout(t); }, [attempt]);
  const bal = LEDGER.reduce((a, r) => a + r.c, 0);
  return (
    <>
      <Topbar entity={ent} light nav={["My Account", "SuperCoin Zone", "Orders"]} active="SuperCoin Zone" />
      <main className="ee-main ee-main--narrow">
        <Card data-testid="supercoins" style={{ background: "linear-gradient(135deg,#2874f0,#0b4fc4)", color: "#fff" }}>
          <div className="ee-small">🪙 SuperCoin balance</div>
          {state === "loading" && <Skeleton h={36} w="40%" style={{ marginTop: 6 }} />}
          {state === "ready" && <div className="ee-price" style={{ fontSize: 40, color: "#ffe11b" }} data-testid="coin-balance" data-state="ready">{bal.toLocaleString("en-IN")}</div>}
          {state === "error" && <div data-testid="coin-error" data-state="error"><Alert tone="err">We couldn't load your SuperCoins right now.</Alert><Btn size="sm" variant="secondary" style={{ marginTop: 8 }} onClick={() => setAttempt(attempt + 1)} data-testid="coin-retry">Retry</Btn></div>}
          <div className="ee-tiny" style={{ opacity: 0.85, marginTop: 4 }}>1 SuperCoin = ₹1 on eligible purchases</div>
        </Card>
        {state === "ready" && <Card title="Coin history" style={{ marginTop: 14 }} data-testid="coin-history"><Table cols={[{ key: "d", label: "Date" }, { key: "t", label: "Details" }, { key: "c", label: "Coins", align: "right", render: (r) => <Badge tone={r.c > 0 ? "ok" : "err"}>{r.c > 0 ? "+" : ""}{r.c}</Badge> }]} rows={LEDGER} rowKey={(r) => r.id} /></Card>}
      </main>
    </>
  );
}
