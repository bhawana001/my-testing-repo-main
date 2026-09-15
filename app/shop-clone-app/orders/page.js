"use client";
// Your Orders (use case 1.4 order tracking, entry point for 1.5 returns).
// Orders come from the persistent account store, so an order placed with Buy Now
// on the product page shows up here immediately and stays across reloads.
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../Header";
import { useAccount, stageIndex, TIMELINE } from "../store";
import { findProduct } from "../data";
import { BASE, usd } from "../lib";

const TABS = [
  { id: "orders", label: "Orders" },
  { id: "notshipped", label: "Not yet shipped" },
  { id: "returns", label: "Returns" },
];

export default function OrdersPage() {
  const [account] = useAccount();
  const [tab, setTab] = useState("orders");
  const router = useRouter();

  const visible = account.orders.filter((o) => {
    if (tab === "notshipped") return o.status === "placed";
    if (tab === "returns") return Boolean(o.returnStatus);
    return true;
  });

  return (
    <>
      <Header onOpenCart={() => router.push(`${BASE}?cart=1`)} />
      <div className="ord">
        <h1 className="ord-h1">Your Orders</h1>

        <div className="ord-tabs" role="tablist">
          {TABS.map((t) => (
            <button key={t.id} role="tab" aria-selected={tab === t.id}
              className={"ord-tab" + (tab === t.id ? " is-active" : "")}
              onClick={() => setTab(t.id)} data-testid={`tab-${t.id}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="ord-count" data-testid="order-count">
          {visible.length} order{visible.length === 1 ? "" : "s"}
        </div>

        {visible.length === 0 && (
          <div className="ord-empty">No orders in this view.</div>
        )}

        {visible.map((o) => {
          const stage = stageIndex(o.status);
          return (
            <article className="ord-card" key={o.id} data-testid={`order-${o.id}`}>
              <header className="ord-card-head">
                <div><span className="ord-label">ORDER PLACED</span><span>{o.placedAt}</span></div>
                <div><span className="ord-label">TOTAL</span><span>{usd(o.total)}</span></div>
                <div><span className="ord-label">SHIP TO</span><span>{account.profile.name}</span></div>
                <div className="ord-card-id">
                  <span className="ord-label">ORDER #</span>
                  <span data-testid="order-id">{o.id}</span>
                </div>
              </header>

              <div className="ord-card-body">
                <div className="ord-status" data-testid="order-status">
                  {o.status === "delivered" ? `Delivered ${o.deliveredOn}` : `Arriving ${o.eta} · ${TIMELINE[stage]}`}
                </div>
                {o.returnStatus && (
                  <div className="ord-return-flag" data-testid="order-return-status">↩ {o.returnStatus}</div>
                )}

                {o.items.map((it) => {
                  const p = findProduct(it.productId);
                  return (
                    <div className="ord-item" key={it.productId + it.variant}>
                      <div className="ord-item-img" aria-hidden="true">{p ? p.emoji : "📦"}</div>
                      <div>
                        <Link href={`${BASE}/dp/${it.productId}`} className="ord-item-title">
                          {p ? p.title : it.productId}
                        </Link>
                        {it.variant && <div className="ord-muted">{it.variant}</div>}
                        <div className="ord-muted">Qty: {it.qty}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <footer className="ord-card-actions">
                <Link href={`${BASE}/orders/${o.id}`} className="ord-btn ord-btn--primary" data-testid="track-package">
                  Track package
                </Link>
                {o.returnable && (
                  <Link href={`${BASE}/orders/${o.id}#return`} className="ord-btn" data-testid="return-items">
                    Return or replace items
                  </Link>
                )}
                <Link href={`${BASE}/dp/${o.items[0].productId}`} className="ord-btn">Buy it again</Link>
              </footer>
            </article>
          );
        })}
      </div>
    </>
  );
}
