"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, Chips, Alert, Badge, Modal, KV } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const seed = () => ({ entry: null });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [size, setSize] = useState(null); const [err, setErr] = useState(null); const [confirm, setConfirm] = useState(false);
  return (
    <>
      <Topbar entity={ent} nav={["SNKRZ", "Upcoming", "In Stock"]} active="Upcoming" light right={<Badge tone="ok">Member · Demo</Badge>} />
      <main className="ee-main">
        <div className="ee-split">
          <div className="ee-product__img" style={{ fontSize: 120, maxWidth: 520 }} aria-hidden="true">👟</div>
          <Card data-testid="launch">
            <Badge tone="accent">Draw · Launches Sep 18</Badge>
            <h1 className="ee-page-title" style={{ marginTop: 8 }}>Air Stride '26 “Volt”</h1>
            <div className="ee-price">{money(180)}</div>
            <div className="ee-small ee-muted" style={{ margin: "6px 0 12px" }}>Draw open until Sep 16, 10:00 AM · Results Sep 16, 10:30 AM · You'll only be charged if you win.</div>
            {s.entry ? (
              <div className="ee-stack" data-testid="entry-confirmed">
                <Badge tone="ok" data-testid="entry-status">You're in the draw</Badge>
                <KV k="Size" v={s.entry.size} testId="entry-size" /><KV k="Entry ID" v={<span className="ee-mono">{s.entry.id}</span>} /><KV k="Results" v="Sep 16, 10:30 AM" />
                <Btn block pill disabled data-testid="entered-btn">Entered</Btn>
              </div>
            ) : (<>
              <div className="ee-strong ee-small">Select size</div>
              <Chips options={["US 8", "US 9", "US 10", "US 11"]} value={size} onChange={(v) => { setSize(v); setErr(null); }} />
              {err && <Alert tone="err">{err}</Alert>}
              <Btn block pill size="lg" style={{ background: "#111", marginTop: 12 }} onClick={() => (size ? setConfirm(true) : setErr("Select a size to enter the draw."))} data-testid="enter-draw">Enter Draw</Btn>
            </>)}
          </Card>
        </div>
      </main>
      <Modal open={confirm} title="Confirm your entry" onClose={() => setConfirm(false)}>
        <div className="ee-stack" data-testid="confirm-modal">
          <KV k="Product" v="Air Stride '26 “Volt”" /><KV k="Size" v={size} /><KV k="Payment (charged only if you win)" v="Visa •••• 4242" /><KV k="Ship to" v="Demo User, 1200 Market St" />
          <Btn onClick={() => { set({ entry: { size, id: "DRAW-0918-" + size.replace(/\D/g, "") } }); setConfirm(false); }} data-testid="submit-entry">Submit entry</Btn>
        </div>
      </Modal>
    </>
  );
}
