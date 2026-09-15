"use client";
// Order in the Klarnah app (14.3) and returns recalculating instalments (14.4).
// Returning an item reduces the outstanding balance and rewrites the unpaid
// instalments -- the paid first one is not refunded away, it is credited.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Empty, Check } from "../../clones/kit/ui";
import { BRAND, BASE, useStore, money } from "../shared";

export default function AppPage() {
  const [s, update] = useStore();
  const [selected, setSelected] = useState([]);
  const [notice, setNotice] = useState(null);

  const order = s.order;

  function registerReturn() {
    if (!selected.length) { setNotice("Choose at least one item to return."); return; }
    update((st) => {
      const o = st.order;
      const returned = o.items.filter((i) => selected.includes(i.id));
      const refund = returned.reduce((n, i) => n + i.price * i.qty, 0);
      o.items = o.items.map((i) => (selected.includes(i.id) ? { ...i, returned: true } : i));
      const newTotal = +(o.total - refund).toFixed(2);
      const paid = o.schedule.filter((p) => p.status === "Paid").reduce((n, p) => n + p.amount, 0);
      const outstanding = Math.max(+(newTotal - paid).toFixed(2), 0);
      const unpaid = o.schedule.filter((p) => p.status !== "Paid");
      const per = unpaid.length ? Math.floor((outstanding / unpaid.length) * 100) / 100 : 0;
      let running = 0;
      o.schedule = o.schedule.map((p) => {
        if (p.status === "Paid") return p;
        const isLast = p.n === o.schedule[o.schedule.length - 1].n;
        const amount = isLast ? +(outstanding - running).toFixed(2) : per;
        running += amount;
        return { ...p, amount };
      });
      o.total = newTotal;
      o.refund = refund;
      st.returns.unshift({ id: "RT-" + (st.counter + 1), items: returned.map((i) => i.name), refund, at: "2026-09-15" });
      st.counter += 1;
      return st;
    });
    setNotice("Return registered — your remaining payments have been recalculated.");
    setSelected([]);
  }

  if (!order) {
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Store" }, { href: `${BASE}/checkout`, label: "Checkout" }]} />
        <Page title="Klarnah app"><Empty>No orders yet. Place one at the merchant checkout first.</Empty></Page>
      </Shell>
    );
  }

  const outstanding = order.schedule.filter((p) => p.status !== "Paid").reduce((n, p) => n + p.amount, 0);

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Store" }, { href: `${BASE}/checkout`, label: "Checkout" }]} />
      <Page title="Your purchases">
        {notice && <Banner tone="ok" testId="app-notice" onClose={() => setNotice(null)}>{notice}</Banner>}

        <Card title={`${order.merchant} · ${order.id}`} testId="order-card">
          <Row label="Order total" value={money(order.total)} strong testId="app-order-total" />
          <Row label="Outstanding" value={money(+outstanding.toFixed(2))} testId="app-outstanding" />
          {order.refund > 0 && <Badge tone="info" testId="refund-badge">Refund applied: {money(order.refund)}</Badge>}
          {order.items.map((i) => (
            <Row key={i.id} label={`${i.name}${i.returned ? " — returned" : ""}`} value={money(i.price * i.qty)} testId={`app-item-${i.id}`} />
          ))}
        </Card>

        <Card title="Payment schedule" testId="schedule">
          <table className="ck-table">
            <thead><tr><th>Payment</th><th>Due</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {order.schedule.map((p) => (
                <tr key={p.n} data-testid={`instalment-${p.n}`}>
                  <td>Payment {p.n} of 4</td>
                  <td data-testid={`instalment-date-${p.n}`}>{p.date}</td>
                  <td className="ck-strong" data-testid={`instalment-amount-${p.n}`}>{money(p.amount)}</td>
                  <td><Badge tone={p.status === "Paid" ? "ok" : "warn"} testId={`instalment-status-${p.n}`}>{p.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Register a return" testId="return-panel">
          {order.items.filter((i) => !i.returned).length === 0 ? (
            <Empty>Everything in this order has been returned.</Empty>
          ) : (
            <>
              {order.items.filter((i) => !i.returned).map((i) => (
                <Check key={i.id} label={`${i.name} — ${money(i.price * i.qty)}`} testId={`return-${i.id}`}
                       checked={selected.includes(i.id)}
                       onChange={(e) => setSelected((v) => e.target.checked ? [...v, i.id] : v.filter((x) => x !== i.id))} />
              ))}
              <Btn onClick={registerReturn} data-testid="register-return">Register return</Btn>
            </>
          )}
        </Card>

        {s.returns.length > 0 && (
          <Card title="Returns" testId="returns-list">
            {s.returns.map((r) => (
              <Row key={r.id} label={`${r.id} · ${r.items.join(", ")}`} value={money(r.refund)} testId={`return-record-${r.id}`} />
            ))}
          </Card>
        )}
      </Page>
    </Shell>
  );
}
