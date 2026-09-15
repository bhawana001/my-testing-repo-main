"use client";
// Card freeze and unfreeze (19.1). While frozen a simulated purchase is
// genuinely declined and logged; unfreezing lets it through again.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, useStore, fmt, roundUpFor } from "../shared";

const TEST_PURCHASE = { merchant: "Metro Grocer", amount: 24.6, currency: "USD" };

export default function CardPage() {
  const [s, update] = useStore();
  const [notice, setNotice] = useState(null);

  function toggleFreeze() {
    const next = !s.cardFrozen;
    update((st) => { st.cardFrozen = next; return st; });
    setNotice(next ? "Card frozen — new payments will be declined." : "Card unfrozen — payments work again.");
  }

  // Simulating a purchase is the only honest way to show a freeze has teeth.
  function simulatePurchase() {
    if (s.cardFrozen) {
      update((st) => {
        st.declined.unshift({ id: "D-" + (st.counter + 1), merchant: TEST_PURCHASE.merchant,
                              amount: TEST_PURCHASE.amount, reason: "Card is frozen", at: "2026-09-15" });
        st.counter += 1;
        return st;
      });
      setNotice("Payment declined — the card is frozen.");
      return;
    }
    update((st) => {
      const id = "t" + (st.counter + 1);
      st.transactions.unshift({ id, merchant: TEST_PURCHASE.merchant, amount: TEST_PURCHASE.amount,
                                currency: "USD", at: "2026-09-15", split: null });
      const usd = st.pockets.find((p) => p.currency === "USD");
      usd.amount = +(usd.amount - TEST_PURCHASE.amount).toFixed(2);
      if (st.vault.enabled) {
        const up = roundUpFor(TEST_PURCHASE.amount, st.vault.multiplier);
        st.vault.balance = +(st.vault.balance + up).toFixed(2);
        st.vault.roundups.unshift({ from: TEST_PURCHASE.merchant, amount: up, at: "2026-09-15" });
        usd.amount = +(usd.amount - up).toFixed(2);
      }
      st.counter += 1;
      return st;
    });
    setNotice(`Payment approved — ${fmt(TEST_PURCHASE.amount, "USD")} at ${TEST_PURCHASE.merchant}.`);
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Accounts" }, { href: `${BASE}/vault`, label: "Vaults" }]} />
      <Page title="Virtual card">
        {notice && <Banner tone={s.cardFrozen ? "warn" : "ok"} testId="card-notice" onClose={() => setNotice(null)}>{notice}</Banner>}

        <Card testId="card-panel">
          <div className="ck-tile" style={{ background: "#191c1f", color: "#fff", padding: 20, borderRadius: 12 }}>
            <div className="ck-muted" style={{ color: "#aaa" }}>Revolat virtual</div>
            <div style={{ fontSize: 20, letterSpacing: 2, margin: "10px 0" }}>5375 •••• •••• 4218</div>
            <div className="ck-muted" style={{ color: "#aaa" }}>Priya Nair · 04/29</div>
          </div>
          <Badge tone={s.cardFrozen ? "bad" : "ok"} testId="freeze-state">
            {s.cardFrozen ? "Frozen" : "Active"}
          </Badge>
          <Btn block style={{ marginTop: 10 }} onClick={toggleFreeze} data-testid="toggle-freeze">
            {s.cardFrozen ? "Unfreeze card" : "Freeze card"}
          </Btn>
        </Card>

        <Card title="Try a payment" testId="simulate-panel">
          <p className="ck-muted">Run a {fmt(TEST_PURCHASE.amount, "USD")} purchase at {TEST_PURCHASE.merchant} to see what the card does.</p>
          <Btn variant="secondary" onClick={simulatePurchase} data-testid="simulate-purchase">Simulate purchase</Btn>
        </Card>

        <Card title={`Declined payments (${s.declined.length})`} testId="declined-list">
          {s.declined.length === 0 ? <Empty>No declines.</Empty> : s.declined.map((d) => (
            <div key={d.id} data-testid={`declined-${d.id}`}>
              <Row label={`${d.merchant} · ${d.at}`} value={fmt(d.amount, "USD")} />
              <Badge tone="bad" testId={`decline-reason-${d.id}`}>{d.reason}</Badge>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
