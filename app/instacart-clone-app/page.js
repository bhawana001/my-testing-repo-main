"use client";
// Shop by store. Each store keeps its own cart (7.1) and flaky items expose a
// replacement preference (7.2) on the cart line.
import { Shell, TopBar, Page, Card, Btn, Badge, Row, Select, Field, Empty, useToast } from "../clones/kit/ui";
import { BRAND, BASE, STORES, ITEMS, REPLACEMENTS, BACKUPS, useStore, money, findItem } from "./shared";

export default function Shop() {
  const [s, update] = useStore();
  const [toast, showToast] = useToast();
  const storeIds = Object.keys(s.carts).filter((id) => s.carts[id]?.length);
  const totalItems = Object.values(s.carts).flat().reduce((n, l) => n + l.qty, 0);

  function add(item) {
    update((st) => {
      const list = (st.carts[item.storeId] = st.carts[item.storeId] || []);
      const line = list.find((l) => l.itemId === item.id);
      if (line) line.qty += 1;
      else list.push({ itemId: item.id, qty: 1 });
      return st;
    });
    showToast(`${item.title} added`);
  }
  const setRep = (itemId, patch) => update((st) => {
    st.replacements[itemId] = { ...(st.replacements[itemId] || { choice: "best", backup: "" }), ...patch };
    return st;
  });

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[
        { href: `${BASE}/orders`, label: "Orders", testId: "nav-orders" },
        { href: `${BASE}/checkout`, label: `Cart (${totalItems})`, testId: "nav-cart" },
      ]} />
      <Page title="Shop local stores" wide>
        {STORES.map((store) => (
          <Card key={store.id} title={`${store.emoji} ${store.name}`} testId={`store-${store.id}`}>
            <div className="ck-muted">Delivery {store.eta} · service fee {money(store.serviceFee)}</div>
            <div className="ck-grid ck-grid--3" style={{ marginTop: 10 }}>
              {ITEMS.filter((i) => i.storeId === store.id).map((i) => (
                <div key={i.id} className="ck-tile" data-testid={`item-${i.id}`}>
                  <div className="ck-thumb" aria-hidden="true">{i.emoji}</div>
                  <div className="ck-strong">{i.title}</div>
                  <div style={{ fontWeight: 700 }}>{money(i.price)}</div>
                  {i.flaky && <Badge tone="warn">Often out of stock</Badge>}
                  <Btn size="sm" block style={{ marginTop: 6 }} onClick={() => add(i)} data-testid={`add-${i.id}`}>Add</Btn>
                </div>
              ))}
            </div>
          </Card>
        ))}

        <Card title={`Your carts (${storeIds.length} store${storeIds.length === 1 ? "" : "s"})`} testId="carts">
          {storeIds.length === 0 ? <Empty>Nothing in your carts yet.</Empty> : storeIds.map((sid) => {
            const store = STORES.find((x) => x.id === sid);
            return (
              <div key={sid} style={{ borderTop: "1px solid #eef1ed", paddingTop: 10, marginTop: 10 }}
                   data-testid={`cart-${sid}`}>
                <div className="ck-strong">{store.emoji} {store.name}</div>
                {s.carts[sid].map((l) => {
                  const item = findItem(l.itemId);
                  const rep = s.replacements[l.itemId] || { choice: "best", backup: "" };
                  return (
                    <div key={l.itemId} style={{ padding: "8px 0" }} data-testid={`cart-item-${l.itemId}`}>
                      <Row label={`${item.title} × ${l.qty}`} value={money(item.price * l.qty)} />
                      {item.flaky && (
                        <>
                          <Field label="If it's out of stock">
                            <Select value={rep.choice} aria-label={`Replacement preference for ${item.title}`}
                                    data-testid={`rep-${l.itemId}`}
                                    onChange={(e) => setRep(l.itemId, { choice: e.target.value })}>
                              {REPLACEMENTS.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
                            </Select>
                          </Field>
                          {rep.choice === "specific" && (
                            <Field label="Backup item">
                              <Select value={rep.backup} aria-label={`Backup for ${item.title}`}
                                      data-testid={`backup-${l.itemId}`}
                                      onChange={(e) => setRep(l.itemId, { backup: e.target.value })}>
                                <option value="">Choose a backup</option>
                                {(BACKUPS[l.itemId] || []).map((b) => <option key={b}>{b}</option>)}
                              </Select>
                            </Field>
                          )}
                          <Badge tone="info" testId={`rep-saved-${l.itemId}`}>
                            Saved: {REPLACEMENTS.find((r) => r.id === rep.choice).label}
                            {rep.backup ? ` → ${rep.backup}` : ""}
                          </Badge>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
          {storeIds.length > 0 && (
            <Btn as="link" href={`${BASE}/checkout`} block style={{ marginTop: 12 }} data-testid="go-checkout">
              Go to checkout
            </Btn>
          )}
        </Card>
      </Page>
      {toast}
    </Shell>
  );
}
