"use client";
// Order history with one-click reorder (4.4): "Reorder" fills the cart with the
// exact previous lines and sends you straight to checkout -- two clicks total.
import { useRouter } from "next/navigation";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Empty, useToast } from "../../clones/kit/ui";
import { BRAND, BASE, STORES, useStore, money } from "../shared";

export default function OrdersPage() {
  const [s, update] = useStore();
  const [toast, showToast] = useToast();
  const router = useRouter();

  function reorder(order) {
    update((st) => {
      st.cart = order.items.map((l) => ({ ...l }));
      return st;
    });
    showToast(`${order.items.length} items added from ${order.id}`);
    router.push(BASE);
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Shop" }, { href: `${BASE}/checkout`, label: "Cart" }]} />
      <Page title="Purchase history" sub="Reorder what you buy often">
        {s.orders.length === 0 ? <Empty>No past orders.</Empty> : s.orders.map((o) => {
          const store = STORES.find((x) => x.id === o.storeId);
          return (
            <Card key={o.id} testId={`order-${o.id}`}
                  title={`${o.id} · ${o.placedAt}`}
                  actions={
                    <Btn onClick={() => reorder(o)} data-testid={`reorder-${o.id}`}>
                      Reorder ({o.items.length} item{o.items.length === 1 ? "" : "s"})
                    </Btn>
                  }>
              <Badge tone={o.status === "Delivered" || o.status === "Picked up" ? "ok" : "warn"} testId={`status-${o.id}`}>
                {o.status}
              </Badge>
              <div className="ck-muted" style={{ margin: "6px 0" }}>
                {o.fulfilment === "pickup" ? `Pickup — ${store ? store.name : "store"}` : "Delivered to home"} · {o.slot}
              </div>
              {o.items.map((l) => (
                <Row key={l.id} label={`${l.title} × ${l.qty}`} value={money(l.price * l.qty)} testId={`item-${o.id}-${l.id}`} />
              ))}
              <Row label="Order total" value={money(o.total)} strong testId={`total-${o.id}`} />
            </Card>
          );
        })}
      </Page>
      {toast}
    </Shell>
  );
}
