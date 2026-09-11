"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { money } from "@/lib/seed";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Btn, Card, Badge } from "@/app/components/eval/ui";
import { TrackerTimeline, TrackerHeader, ScriptedAdvance } from "@/app/components/engines/Tracker";

const ORDERS = [
  { number: "112-4471932-2010451", placed: "September 12, 2026", total: 129.0, item: "AuraBuds Pro Wireless Earbuds", emoji: "🎧", eta: "Tuesday, September 15, 2026",
    steps: [
      { id: "ordered", title: "Ordered", at: "Saturday, September 12, 2026 · 9:14 AM" },
      { id: "shipped", title: "Shipped", at: "Sunday, September 13, 2026 · 6:40 PM", meta: "Left the fulfilment centre" },
      { id: "out", title: "Out for delivery", at: "Tuesday, September 15, 2026 · 7:05 AM" },
      { id: "delivered", title: "Delivered", at: "Tuesday, September 15, 2026 · 2:22 PM", meta: "Handed to resident" },
    ] },
  { number: "112-3391020-7710233", placed: "September 2, 2026", total: 18.0, item: "Everyday Cotton Tee (M, Black)", emoji: "👕", eta: "Delivered September 5, 2026", steps: [
    { id: "ordered", title: "Ordered", at: "September 2, 2026" }, { id: "shipped", title: "Shipped", at: "September 3, 2026" }, { id: "delivered", title: "Delivered", at: "September 5, 2026" } ], doneIndex: 3 },
  { number: "112-0028811-4412207", placed: "August 20, 2026", total: 449.0, item: 'Vista 55" 4K TV', emoji: "📺", eta: "Delivered August 24, 2026", steps: [
    { id: "ordered", title: "Ordered", at: "August 20, 2026" }, { id: "shipped", title: "Shipped", at: "August 21, 2026" }, { id: "delivered", title: "Delivered", at: "August 24, 2026" } ], doneIndex: 3 },
];
const seed = () => ({ view: "list", selected: null, progress: { "112-4471932-2010451": 1 } });

export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const order = ORDERS.find((o) => o.number === s.selected);
  const idx = order ? (order.doneIndex ?? s.progress[order.number] ?? 0) : 0;
  const statusOf = (o) => {
    const i = o.doneIndex ?? s.progress[o.number] ?? 0;
    return i >= o.steps.length ? "Delivered" : o.steps[i].title === "Ordered" ? "Preparing" : o.steps[i].title;
  };
  return (
    <>
      <Topbar entity={ent} nav={["Returns & Orders", "Account", "Prime"]} active="Returns & Orders" />
      <main className="ee-main ee-main--narrow">
        <h1 className="ee-page-title">Your Orders</h1>
        {!order ? (
          <div className="ee-stack" data-testid="orders-list">
            {ORDERS.map((o, i) => (
              <Card key={o.number} tight data-testid={`order-${i === 0 ? "latest" : i}`}>
                <div className="ee-row ee-row--between ee-small ee-muted">
                  <span>Order placed <b>{o.placed}</b></span>
                  <span>Total <b>{money(o.total)}</b></span>
                  <span>Order # <span className="ee-mono">{o.number}</span></span>
                </div>
                <div className="ee-divider" />
                <div className="ee-row">
                  <div className="ee-product__img ee-product__img--sm" aria-hidden="true">{o.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div className="ee-strong">{statusOf(o) === "Delivered" ? "Delivered" : `Arriving ${o.eta}`}</div>
                    <div className="ee-small">{o.item}</div>
                  </div>
                  <Badge tone={statusOf(o) === "Delivered" ? "ok" : "info"}>{statusOf(o)}</Badge>
                  <Btn size="sm" variant="secondary" onClick={() => set({ ...s, selected: o.number })} data-testid={`track-${i === 0 ? "latest" : i}`}>Track package</Btn>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card data-testid="tracking">
            <button className="ee-link ee-small" onClick={() => set({ ...s, selected: null })}>← Back to orders</button>
            <div style={{ height: 10 }} />
            <TrackerHeader title={idx >= order.steps.length ? "Delivered" : `Arriving ${order.eta}`} subtitle={`Order # ${order.number} · ${order.item}`} status={statusOf(order)} tone={statusOf(order) === "Delivered" ? "ok" : "info"} />
            <TrackerTimeline steps={order.steps} currentIndex={idx} />
            {order.doneIndex == null && <ScriptedAdvance steps={order.steps} currentIndex={idx} onAdvance={() => set({ ...s, progress: { ...s.progress, [order.number]: Math.min(order.steps.length, idx + 1) } })} label="Simulate carrier update" />}
          </Card>
        )}
      </main>
    </>
  );
}
