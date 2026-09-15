"use client";
// Merchant admin: orders, draft orders (2.4) and themes (2.5).
// A draft order is built line by line, then "Mark as paid" converts it into a
// real order that shows in the orders list -- the same list storefront
// checkouts land in.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Field, Input, Select, Row, Badge, Banner, Empty, Modal } from "../../clones/kit/ui";
import { BRAND, BASE, PRODUCTS, THEMES, useStore, money, nextOrderId, findProduct } from "../shared";

const TABS = [
  { id: "orders", label: "Orders" },
  { id: "drafts", label: "Draft orders" },
  { id: "themes", label: "Themes" },
];

export default function AdminPage() {
  const [s, update] = useStore();
  const [tab, setTab] = useState("orders");
  const [notice, setNotice] = useState(null);

  // draft builder
  const [customer, setCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [pid, setPid] = useState(PRODUCTS[0].id);
  const [qty, setQty] = useState(1);
  const [draftLines, setDraftLines] = useState([]);
  const [publishing, setPublishing] = useState(null);

  const theme = THEMES.find((t) => t.id === s.activeTheme) || THEMES[0];
  const brand = { ...BRAND, accent: theme.accent };
  const draftTotal = draftLines.reduce((n, l) => n + l.price * l.qty, 0);

  function addLine() {
    const p = findProduct(pid);
    setDraftLines((ls) => [...ls, { id: p.id, title: p.title, price: p.price, qty: Number(qty), variant: "" }]);
  }

  function saveDraft() {
    if (!draftLines.length) { setNotice({ tone: "bad", msg: "Add at least one line item to the draft." }); return; }
    const id = "D" + (s.drafts.length + 1);
    update((st) => {
      st.drafts.unshift({ id, customer: customer || "No customer", email, items: draftLines, total: +draftTotal.toFixed(2), status: "open" });
      return st;
    });
    setDraftLines([]); setCustomer(""); setEmail("");
    setNotice({ tone: "ok", msg: `Draft order ${id} saved.` });
    setTab("drafts");
  }

  // Converts a draft into a paid order in the orders list (2.4's assertion).
  function markPaid(draftId) {
    let newId = null;
    update((st) => {
      const d = st.drafts.find((x) => x.id === draftId);
      if (!d) return st;
      newId = nextOrderId(st.counter);
      st.counter += 1;
      st.orders.unshift({
        id: newId, email: d.email, customer: d.customer, total: d.total,
        status: "paid", channel: "Draft order", placedAt: "2026-09-15", items: d.items,
      });
      d.status = "completed";
      d.orderId = newId;
      return st;
    });
    setNotice({ tone: "ok", msg: `Draft ${draftId} marked as paid — order ${newId} created.` });
    setTab("orders");
  }

  function publishTheme(id) {
    const t = THEMES.find((x) => x.id === id);
    update((st) => {
      st.activeTheme = id;
      st.themeHistory.unshift({ theme: t.name, at: "2026-09-15", action: "Published" });
      return st;
    });
    setPublishing(null);
    setNotice({ tone: "ok", msg: `${t.name} is now the live theme.` });
  }

  return (
    <Shell brand={brand}>
      <TopBar brand={{ ...brand, name: "Shoplify admin" }}
              nav={[{ href: BASE, label: "View storefront", testId: "view-storefront" }]} />
      <Page title="Admin" wide>
        <div className="ck-card-actions" role="tablist" style={{ marginBottom: 14 }}>
          {TABS.map((t) => (
            <Btn key={t.id} variant={tab === t.id ? "primary" : "secondary"} size="sm"
                 role="tab" aria-selected={tab === t.id}
                 onClick={() => setTab(t.id)} data-testid={`tab-${t.id}`}>
              {t.label}
            </Btn>
          ))}
        </div>

        {notice && <Banner tone={notice.tone} testId="admin-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        {tab === "orders" && (
          <Card title={`Orders (${s.orders.length})`} testId="orders-list">
            <table className="ck-table">
              <thead><tr><th>Order</th><th>Customer</th><th>Channel</th><th>Date</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>
                {s.orders.map((o) => (
                  <tr key={o.id} data-testid={`order-${o.id.replace("#", "")}`}>
                    <td className="ck-strong">{o.id}</td>
                    <td>{o.customer}</td>
                    <td>{o.channel}</td>
                    <td>{o.placedAt}</td>
                    <td>{money(o.total)}</td>
                    <td>
                      <Badge tone={o.status === "paid" ? "ok" : "warn"} testId={`status-${o.id.replace("#", "")}`}>
                        {o.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {tab === "drafts" && (
          <>
            <Card title="Create draft order" testId="draft-builder">
              <div className="ck-grid ck-grid--2">
                <Field label="Customer name">
                  <Input value={customer} onChange={(e) => setCustomer(e.target.value)} aria-label="Customer name" data-testid="draft-customer" />
                </Field>
                <Field label="Customer email">
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Customer email" data-testid="draft-email" />
                </Field>
              </div>
              <div className="ck-grid ck-grid--2">
                <Field label="Product">
                  <Select value={pid} onChange={(e) => setPid(e.target.value)} aria-label="Product" data-testid="draft-product">
                    {PRODUCTS.map((p) => <option key={p.id} value={p.id}>{p.title} — {money(p.price)}</option>)}
                  </Select>
                </Field>
                <Field label="Quantity">
                  <Input type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} aria-label="Quantity" data-testid="draft-qty" />
                </Field>
              </div>
              <Btn variant="secondary" onClick={addLine} data-testid="add-line">Add line item</Btn>

              {draftLines.length > 0 && (
                <div style={{ marginTop: 12 }} data-testid="draft-lines">
                  {draftLines.map((l, i) => <Row key={i} label={`${l.title} × ${l.qty}`} value={money(l.price * l.qty)} />)}
                  <Row label="Draft total" value={money(draftTotal)} strong testId="draft-total" />
                </div>
              )}

              <div className="ck-card-actions">
                <Btn onClick={saveDraft} data-testid="save-draft">Save draft order</Btn>
              </div>
            </Card>

            <Card title={`Draft orders (${s.drafts.length})`} testId="drafts-list">
              {s.drafts.length === 0 ? <Empty>No draft orders yet.</Empty> : (
                <table className="ck-table">
                  <thead><tr><th>Draft</th><th>Customer</th><th>Total</th><th>Status</th><th /></tr></thead>
                  <tbody>
                    {s.drafts.map((d) => (
                      <tr key={d.id} data-testid={`draft-${d.id}`}>
                        <td className="ck-strong">{d.id}</td>
                        <td>{d.customer}</td>
                        <td>{money(d.total)}</td>
                        <td>
                          <Badge tone={d.status === "completed" ? "ok" : "warn"}>{d.status}</Badge>
                          {d.orderId && <span className="ck-muted"> → {d.orderId}</span>}
                        </td>
                        <td>
                          {d.status === "open" && (
                            <Btn size="sm" onClick={() => markPaid(d.id)} data-testid={`mark-paid-${d.id}`}>Mark as paid</Btn>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Card>
          </>
        )}

        {tab === "themes" && (
          <>
            <Card title="Themes" testId="themes-list">
              {THEMES.map((t) => (
                <div key={t.id} className="ck-row" data-testid={`theme-${t.id}`}>
                  <span>
                    <strong>{t.name}</strong> <span className="ck-muted">v{t.version}</span>
                    {t.id === s.activeTheme && <> <Badge tone="ok" testId="live-badge">Live</Badge></>}
                  </span>
                  <span>
                    {t.id !== s.activeTheme && (
                      <Btn size="sm" variant="secondary" onClick={() => setPublishing(t)} data-testid={`publish-${t.id}`}>
                        Publish
                      </Btn>
                    )}
                  </span>
                </div>
              ))}
            </Card>
            <Card title="Publish history" testId="theme-history">
              {s.themeHistory.map((h, i) => <Row key={i} label={`${h.action} ${h.theme}`} value={h.at} />)}
            </Card>
          </>
        )}

        <Modal
          open={Boolean(publishing)}
          title={`Publish ${publishing?.name}?`}
          onClose={() => setPublishing(null)}
          testId="publish-modal"
          actions={
            <>
              <Btn variant="secondary" onClick={() => setPublishing(null)}>Cancel</Btn>
              <Btn onClick={() => publishTheme(publishing.id)} data-testid="confirm-publish">Publish theme</Btn>
            </>
          }
        >
          This replaces the live storefront theme for all customers immediately.
        </Modal>
      </Page>
    </Shell>
  );
}
