"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Input, Btn, Field, Alert, Badge, KV, Textarea, Modal } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const ASK = 240, FLOOR = 150;
const seed = () => ({ offers: [] });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [open, setOpen] = useState(false); const [amt, setAmt] = useState(""); const [msg, setMsg] = useState(""); const [err, setErr] = useState(null);
  const pending = s.offers.find((o) => o.status === "Pending");
  function send() {
    const n = Number(amt);
    if (!(n > 0)) { setErr("Enter an offer amount."); return; }
    if (n >= ASK) { setErr(`Your offer must be less than the Buy It Now price of ${money(ASK)}.`); return; }
    if (n < FLOOR) { setErr(`Offers below ${money(FLOOR)} are automatically declined by this seller.`); return; }
    setErr(null);
    set({ offers: [{ id: "OF-" + (s.offers.length + 1), amount: n, message: msg, status: "Pending", expires: "Sep 16, 2026" }, ...s.offers] });
    setOpen(false); setAmt(""); setMsg("");
  }
  return (
    <>
      <Topbar entity={ent} nav={["Electronics", "Cameras", "Audio"]} active="Audio" light />
      <main className="ee-main">
        <div className="ee-split">
          <div className="ee-row" style={{ alignItems: "flex-start", gap: 24 }}>
            <div className="ee-product__img" style={{ width: 280, fontSize: 90, flex: "none" }} aria-hidden="true">🎛️</div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <h1 className="ee-page-title">Analog Synthesizer · 37 keys · Boxed</h1>
              <div className="ee-small ee-muted">Condition: Used · Seller synthhaus (100% positive)</div>
            </div>
          </div>
          <Card data-testid="buy-box">
            <div className="ee-small ee-muted">Buy It Now</div>
            <div className="ee-price" style={{ fontSize: 26 }}>{money(ASK)}</div>
            <div className="ee-small" style={{ margin: "4px 0 12px" }}>or Best Offer</div>
            <Btn block pill style={{ background: "#3665f3" }}>Buy It Now</Btn>
            <Btn block pill variant="secondary" style={{ marginTop: 8 }} disabled={!!pending} onClick={() => setOpen(true)} data-testid="make-offer">{pending ? "Offer pending" : "Make offer"}</Btn>
            {pending && (
              <div className="ee-stack" style={{ marginTop: 12 }} data-testid="offer-status">
                <Alert tone="info">Offer sent. The seller has until {pending.expires} to respond.</Alert>
                <KV k="Your offer" v={money(pending.amount)} testId="offer-amount" />
                <KV k="Status" v={<Badge tone="warn" data-testid="offer-state">{pending.status}</Badge>} />
                <button className="ee-link ee-small" onClick={() => set({ offers: s.offers.map((o) => (o.id === pending.id ? { ...o, status: "Retracted" } : o)) })}>Retract offer</button>
              </div>
            )}
          </Card>
        </div>
      </main>
      <Modal open={open} title="Make an offer" onClose={() => setOpen(false)}>
        <div className="ee-stack" data-testid="offer-modal">
          <div className="ee-small ee-muted">Buy It Now price {money(ASK)}. The seller may accept, decline or counter.</div>
          <Field label="Your offer" htmlFor="of-amt" error={err}><Input id="of-amt" inputMode="decimal" value={amt} onChange={(e) => setAmt(e.target.value)} placeholder="$0.00" /></Field>
          <Field label="Message to seller (optional)" htmlFor="of-msg"><Textarea id="of-msg" value={msg} onChange={(e) => setMsg(e.target.value)} /></Field>
          <Btn block onClick={send} data-testid="send-offer">Send offer</Btn>
        </div>
      </Modal>
    </>
  );
}
