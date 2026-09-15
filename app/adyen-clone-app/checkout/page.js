"use client";
// Drop-in with 3DS2 (13.1), iDEAL issuer simulation (13.2) and stored-card
// reuse (13.3). Every completed payment also emits a webhook notification,
// which the merchant orders page reads for 13.4.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input, Select, Radio, Modal } from "../../clones/kit/ui";
import { BRAND, BASE, ORDER, IDEAL_ISSUERS, lookupCard, useStore, money, pspRef } from "../shared";

export default function CheckoutPage() {
  const [s, update] = useStore();
  const [method, setMethod] = useState("stored");
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [store, setStore] = useState(true);
  const [issuer, setIssuer] = useState(IDEAL_ISSUERS[0].id);
  const [token, setToken] = useState(s.storedCards[0]?.token || "");
  const [err, setErr] = useState("");
  const [challenge, setChallenge] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [result, setResult] = useState(null);

  function settle(resultCode, detail) {
    const ref = pspRef(s.counter + 1);
    const payment = { pspReference: ref, orderRef: ORDER.reference, amount: ORDER.amount,
                      currency: ORDER.currency, resultCode, method: detail.method,
                      detail: detail.label, at: "2026-09-15", threeDS: Boolean(detail.threeDS) };
    update((st) => {
      st.payments.unshift(payment);
      // The webhook mirrors the shopper-facing result -- that parity is 13.4.
      st.webhooks.unshift({ pspReference: ref, eventCode: "AUTHORISATION",
                            success: resultCode === "Authorised", reason: resultCode,
                            orderRef: ORDER.reference, at: "2026-09-15 10:31" });
      if (detail.storeCard) {
        st.storedCards.unshift({ token: "tok_" + (st.counter + 900), brand: detail.brand,
                                 last4: detail.last4, exp: detail.exp || "12/34",
                                 label: `${detail.brand} ending ${detail.last4}` });
      }
      st.counter += 1;
      return st;
    });
    setResult(payment);
  }

  function payCard() {
    const match = lookupCard(card);
    if (!match) { setErr("Unrecognised test card. Try 4111 1111 1111 1111."); return; }
    setErr("");
    if (match.outcome === "refused") {
      settle("Refused", { method: "Card", label: `${match.brand} ••••${match.last4} — ${match.reason}`, brand: match.brand, last4: match.last4 });
      return;
    }
    if (match.outcome === "3ds2") { setChallenge(match); return; }
    settle("Authorised", { method: "Card", label: `${match.brand} ••••${match.last4}`, brand: match.brand, last4: match.last4, exp, storeCard: store });
  }

  function completeChallenge() {
    const m = challenge;
    setChallenge(null);
    settle("Authorised", { method: "Card", label: `${m.brand} ••••${m.last4}`, brand: m.brand, last4: m.last4, exp, storeCard: store, threeDS: true });
  }

  function payStored() {
    const t = s.storedCards.find((x) => x.token === token);
    if (!t) { setErr("Choose a stored card."); return; }
    setErr("");
    settle("Authorised", { method: "Stored card", label: `${t.label} (token ${t.token})` });
  }

  function payIdeal() {
    setRedirect(true);
  }
  function issuerApprove() {
    const bank = IDEAL_ISSUERS.find((i) => i.id === issuer);
    setRedirect(false);
    settle("Authorised", { method: "iDEAL", label: bank.name });
  }

  if (result) {
    const ok = result.resultCode === "Authorised";
    return (
      <Shell brand={BRAND}>
        <TopBar brand={BRAND} nav={[{ href: BASE, label: "Store" }, { href: `${BASE}/orders`, label: "Merchant orders" }]} />
        <Page>
          <Banner tone={ok ? "ok" : "bad"} title={ok ? "Payment authorised" : "Payment refused"} testId="payment-result">
            Result code <strong data-testid="result-code">{result.resultCode}</strong> for {ORDER.reference}.
          </Banner>
          <Card title="Payment" testId="result-card">
            <Row label="PSP reference" value={result.pspReference} testId="psp-reference" />
            <Row label="Method" value={result.method} testId="result-method" />
            <Row label="Detail" value={result.detail} testId="result-detail" />
            <Row label="Amount" value={`€${result.amount.toFixed(2)}`} strong testId="result-amount" />
            {result.threeDS && <Badge tone="ok" testId="threeds2-badge">3DS2 authentication completed</Badge>}
          </Card>
          <Btn as="link" href={`${BASE}/orders`} data-testid="view-merchant-order">View the merchant order page</Btn>
        </Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Store" }]} />
      <Page title="Payment" sub={`${ORDER.merchant} · €${ORDER.amount.toFixed(2)}`}>
        <Card title="Drop-in" testId="dropin">
          <Radio name="m" label="Stored payment method" detail="One click with a saved token" testId="method-stored"
                 checked={method === "stored"} onChange={() => { setMethod("stored"); setErr(""); }} />
          <Radio name="m" label="Card" detail="Visa, Mastercard — 3DS2 where required" testId="method-card"
                 checked={method === "card"} onChange={() => { setMethod("card"); setErr(""); }} />
          <Radio name="m" label="iDEAL" detail="Pay via your Dutch bank" testId="method-ideal"
                 checked={method === "ideal"} onChange={() => { setMethod("ideal"); setErr(""); }} />

          {method === "stored" && (
            <div data-testid="stored-pane">
              <Field label="Stored card" error={err}>
                <Select value={token} onChange={(e) => setToken(e.target.value)} aria-label="Stored card" data-testid="stored-select">
                  {s.storedCards.map((c) => <option key={c.token} value={c.token}>{c.label} · exp {c.exp}</option>)}
                </Select>
              </Field>
              <Badge tone="info" testId="no-card-entry">No card entry needed — paying with a stored token</Badge>
              <Btn block style={{ marginTop: 10 }} onClick={payStored} data-testid="pay-stored">Pay €{ORDER.amount.toFixed(2)}</Btn>
            </div>
          )}

          {method === "card" && (
            <div data-testid="card-pane">
              <Field label="Card number" error={err} hint="4111… authorises · 4212 3456 7890 1237 triggers 3DS2 · 4000…0101 refuses">
                <Input value={card} onChange={(e) => setCard(e.target.value)} inputMode="numeric"
                       aria-label="Card number" data-testid="card-number" />
              </Field>
              <div className="ck-grid ck-grid--2">
                <Field label="Expiry"><Input value={exp} onChange={(e) => setExp(e.target.value)} placeholder="03 / 30" aria-label="Expiry" data-testid="card-exp" /></Field>
                <Field label="CVC"><Input value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="737" aria-label="CVC" data-testid="card-cvc" /></Field>
              </div>
              <label className="ck-choice">
                <input type="checkbox" checked={store} onChange={(e) => setStore(e.target.checked)} aria-label="Save for next time" data-testid="store-card" />
                <span><span className="ck-choice-label">Save this card for next time</span></span>
              </label>
              <Btn block onClick={payCard} data-testid="pay-card">Pay €{ORDER.amount.toFixed(2)}</Btn>
            </div>
          )}

          {method === "ideal" && (
            <div data-testid="ideal-pane">
              <Field label="Your bank">
                <Select value={issuer} onChange={(e) => setIssuer(e.target.value)} aria-label="Your bank" data-testid="ideal-issuer">
                  {IDEAL_ISSUERS.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
                </Select>
              </Field>
              <Btn block onClick={payIdeal} data-testid="pay-ideal">Continue to {IDEAL_ISSUERS.find((i) => i.id === issuer).name}</Btn>
            </div>
          )}
        </Card>

        <Modal open={Boolean(challenge)} title="3DS2 authentication" onClose={() => setChallenge(null)} testId="threeds2-challenge"
               actions={<>
                 <Btn variant="secondary" onClick={() => { setChallenge(null); setErr("Authentication cancelled."); }}>Cancel</Btn>
                 <Btn onClick={completeChallenge} data-testid="threeds2-complete">Complete authentication</Btn>
               </>}>
          <p>Your bank is verifying this payment.</p>
          <Row label="Merchant" value={ORDER.merchant} />
          <Row label="Amount" value={`€${ORDER.amount.toFixed(2)}`} testId="challenge-amount" />
        </Modal>

        <Modal open={redirect} title={`${IDEAL_ISSUERS.find((i) => i.id === issuer).name} — issuer simulator`}
               onClose={() => setRedirect(false)} testId="ideal-issuer-page"
               actions={<>
                 <Btn variant="secondary" onClick={() => setRedirect(false)} data-testid="ideal-cancel">Cancel</Btn>
                 <Btn onClick={issuerApprove} data-testid="ideal-approve">Approve payment</Btn>
               </>}>
          <p>You have been redirected to your bank to approve this payment.</p>
          <Row label="Paying" value={ORDER.merchant} />
          <Row label="Amount" value={`€${ORDER.amount.toFixed(2)}`} testId="ideal-amount" />
        </Modal>
      </Page>
    </Shell>
  );
}
