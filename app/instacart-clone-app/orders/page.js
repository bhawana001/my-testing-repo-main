"use client";
// Orders with post-delivery tip adjustment (7.4). Changing the tip recomputes
// the order total, which is the assertion.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Empty, Field, Input, Banner } from "../../clones/kit/ui";
import { BRAND, BASE, TIP_PRESETS, REPLACEMENTS, useStore, money, findItem } from "../shared";

export default function OrdersPage() {
  const [s, update] = useStore();
  const [editing, setEditing] = useState(null);
  const [custom, setCustom] = useState("");
  const [notice, setNotice] = useState(null);

  function setTip(orderId, tip) {
    update((st) => {
      const o = st.orders.find((x) => x.id === orderId);
      if (!o) return st;
      const base = +(o.total - o.tip).toFixed(2);
      o.tip = +Number(tip).toFixed(2);
      o.total = +(base + o.tip).toFixed(2);
      o.tipEdited = true;
      return st;
    });
    setNotice(`Tip updated to ${money(tip)}`);
    setEditing(null);
    setCustom("");
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Shop" }, { href: `${BASE}/checkout`, label: "Cart" }]} />
      <Page title="Your orders">
        {notice && <Banner tone="ok" testId="tip-notice" onClose={() => setNotice(null)}>{notice}</Banner>}

        {s.orders.length === 0 ? <Empty>No orders yet.</Empty> : s.orders.map((o) => (
          <Card key={o.id} title={`${o.id} · ${o.at}`} testId={`order-${o.id}`}>
            <Badge tone="ok" testId={`order-status-${o.id}`}>Delivered</Badge>

            {o.stores.map((st) => (
              <div key={st.storeId} style={{ borderTop: "1px solid #eef1ed", marginTop: 10, paddingTop: 10 }}
                   data-testid={`order-store-${st.storeId}`}>
                <div className="ck-strong">{st.storeName}</div>
                <div className="ck-muted" data-testid={`order-slot-${st.storeId}`}>{st.slot} · {st.window}</div>
                {st.items.map((i) => {
                  const rep = o.replacements[i.itemId];
                  return (
                    <div key={i.itemId}>
                      <Row label={`${i.title} × ${i.qty}`} value={money(i.price * i.qty)} />
                      {rep && (
                        <div className="ck-muted" data-testid={`order-rep-${i.itemId}`}>
                          Replacement: {REPLACEMENTS.find((r) => r.id === rep.choice).label}
                          {rep.backup ? ` → ${rep.backup}` : ""}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

            <div style={{ borderTop: "1px solid #eef1ed", marginTop: 10, paddingTop: 10 }}>
              <Row label="Tip" value={money(o.tip)} testId={`order-tip-${o.id}`} />
              <Row label="Order total" value={money(o.total)} strong testId={`order-total-${o.id}`} />
              {o.tipEdited && <Badge tone="info" testId={`tip-edited-${o.id}`}>Tip adjusted after delivery</Badge>}

              {editing === o.id ? (
                <div data-testid="tip-editor">
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "8px 0" }}>
                    {TIP_PRESETS.map((v) => (
                      <Btn key={v} size="sm" variant="secondary" onClick={() => setTip(o.id, v)} data-testid={`set-tip-${v}`}>
                        {money(v)}
                      </Btn>
                    ))}
                  </div>
                  <Field label="Custom tip">
                    <Input value={custom} onChange={(e) => setCustom(e.target.value)} inputMode="decimal"
                           aria-label="Custom tip" data-testid="custom-tip" />
                  </Field>
                  <Btn size="sm" onClick={() => setTip(o.id, Number(custom) || 0)} data-testid="save-tip">Save tip</Btn>
                  <Btn size="sm" variant="ghost" onClick={() => setEditing(null)}>Cancel</Btn>
                </div>
              ) : (
                <Btn size="sm" variant="secondary" onClick={() => setEditing(o.id)} data-testid={`adjust-tip-${o.id}`}>
                  Adjust tip
                </Btn>
              )}
            </div>
          </Card>
        ))}
      </Page>
    </Shell>
  );
}
