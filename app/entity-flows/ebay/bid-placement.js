"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Input, Btn, Field, Alert, Badge, KV } from "@/app/components/eval/ui";
import { money, round2 } from "@/lib/seed";

// Proxy bidding: rival max is $125.00, increment $2.50.
const RIVAL_MAX = 125, INC = 2.5;
const seed = () => ({ price: 120, bids: 7, high: "k***r (212)", mine: null, history: [{ who: "k***r (212)", amt: 120, when: "Sep 13, 9:02 PM" }] });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [bid, setBid] = useState(""); const [err, setErr] = useState(null); const [msg, setMsg] = useState(null);
  const min = round2(s.price + INC);
  function place() {
    const b = Number(bid);
    if (!(b >= min)) { setErr(`Enter ${money(min)} or more.`); return; }
    setErr(null);
    if (b <= RIVAL_MAX) {
      const np = Math.min(RIVAL_MAX, round2(b + INC));
      set({ ...s, price: np, bids: s.bids + 2, history: [{ who: "k***r (212)", amt: np, when: "Just now (auto)" }, { who: "You", amt: b, when: "Just now" }, ...s.history] });
      setMsg({ tone: "err", text: `You've been outbid. Another bidder's maximum was higher. Current bid is ${money(np)}.` });
    } else {
      const np = round2(Math.min(b, RIVAL_MAX + INC));
      set({ ...s, price: np, bids: s.bids + 1, high: "You", mine: b, history: [{ who: "You", amt: np, when: "Just now" }, ...s.history] });
      setMsg({ tone: "ok", text: `You're the high bidder at ${money(np)}. Your maximum bid is ${money(b)}.` });
    }
    setBid("");
  }
  return (
    <>
      <Topbar entity={ent} nav={["Electronics", "Collectibles", "Watches"]} active="Watches" light />
      <main className="ee-main">
        <div className="ee-split">
          <div className="ee-row" style={{ alignItems: "flex-start", gap: 24 }}>
            <div className="ee-product__img" style={{ width: 280, fontSize: 90, flex: "none" }} aria-hidden="true">⌚</div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <h1 className="ee-page-title">Vintage Automatic Watch · 1974 · Serviced</h1>
              <div className="ee-small ee-muted">Condition: Used · Seller timekeeper_co (99.8% positive)</div>
              <Card title="Bid history" style={{ marginTop: 16 }} data-testid="bid-history">
                {s.history.map((h, i) => <KV key={i} k={`${h.who} · ${h.when}`} v={money(h.amt)} />)}
              </Card>
            </div>
          </div>
          <Card data-testid="bid-box">
            <div className="ee-small ee-muted">Current bid</div>
            <div className="ee-price" style={{ fontSize: 28 }} data-testid="current-bid">{money(s.price)}</div>
            <div className="ee-small" data-testid="bid-count">{s.bids} bids · Ends in 1d 4h</div>
            <div className="ee-small" style={{ margin: "8px 0" }} data-testid="high-bidder">High bidder: {s.high === "You" ? <Badge tone="ok">You</Badge> : s.high}</div>
            {msg && <Alert tone={msg.tone} data-testid="bid-result">{msg.text}</Alert>}
            <Field label="Your max bid" htmlFor="bid-amt" help={`Enter ${money(min)} or more`} error={err}><Input id="bid-amt" inputMode="decimal" value={bid} onChange={(e) => setBid(e.target.value)} /></Field>
            <Btn block pill style={{ marginTop: 10, background: "#3665f3" }} onClick={place} data-testid="place-bid">Place bid</Btn>
          </Card>
        </div>
      </main>
    </>
  );
}
