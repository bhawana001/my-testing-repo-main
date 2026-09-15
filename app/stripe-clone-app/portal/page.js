"use client";
// Customer billing portal (9.4): add a card and make it the default. The
// default badge moves, which is the assertion.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Field, Input, Banner, Modal } from "../../clones/kit/ui";
import { BRAND, BASE, useStore, money, PRODUCT } from "../shared";

export default function PortalPage() {
  const [s, update] = useStore();
  const [open, setOpen] = useState(false);
  const [num, setNum] = useState("");
  const [exp, setExp] = useState("");
  const [err, setErr] = useState("");
  const [notice, setNotice] = useState(null);

  const def = s.paymentMethods.find((p) => p.default);

  function addCard() {
    const digits = num.replace(/\s+/g, "");
    if (digits.length < 15) { setErr("Enter a full card number."); return; }
    if (!/^\d{2}\s*\/\s*\d{2}$/.test(exp.trim())) { setErr("Expiry must look like 12 / 34."); return; }
    setErr("");
    const last4 = digits.slice(-4);
    update((st) => {
      st.paymentMethods.forEach((p) => { p.default = false; });
      st.paymentMethods.unshift({ id: "pm_new" + last4, brand: "Visa", last4, exp: exp.trim(), default: true });
      return st;
    });
    setNotice(`Card ending in ${last4} added and set as default.`);
    setOpen(false);
    setNum(""); setExp("");
  }

  const makeDefault = (id) => {
    update((st) => { st.paymentMethods.forEach((p) => { p.default = p.id === id; }); return st; });
    setNotice("Default payment method updated.");
  };

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Merchant" }, { href: `${BASE}/dashboard`, label: "Dashboard" }]} />
      <Page title="Billing portal" sub="Manage your subscription and payment methods">
        {notice && <Banner tone="ok" testId="portal-notice" onClose={() => setNotice(null)}>{notice}</Banner>}

        <Card title="Subscription">
          <Row label="Plan" value={PRODUCT.name} />
          <Row label="Amount" value={`${money(PRODUCT.price)} / year`} />
          <Row label="Next invoice" value="September 9, 2027" />
        </Card>

        <Card title="Payment methods" testId="payment-methods"
              actions={<Btn onClick={() => setOpen(true)} data-testid="add-card">Add payment method</Btn>}>
          {s.paymentMethods.map((p) => (
            <div key={p.id} className="ck-row" data-testid={`pm-${p.id}`}>
              <span>
                <strong>{p.brand} ending in {p.last4}</strong> <span className="ck-muted">exp {p.exp}</span>
                {p.default && <> <Badge tone="ok" testId={`default-${p.id}`}>Default</Badge></>}
              </span>
              <span>
                {!p.default && (
                  <Btn size="sm" variant="secondary" onClick={() => makeDefault(p.id)} data-testid={`set-default-${p.id}`}>
                    Make default
                  </Btn>
                )}
              </span>
            </div>
          ))}
          <Row label="Current default" value={`${def.brand} ending in ${def.last4}`} strong testId="current-default" />
        </Card>
      </Page>

      <Modal open={open} title="Add a payment method" onClose={() => setOpen(false)} testId="add-card-modal"
             actions={<>
               <Btn variant="secondary" onClick={() => setOpen(false)}>Cancel</Btn>
               <Btn onClick={addCard} data-testid="save-card">Add card</Btn>
             </>}>
        <Field label="Card number" error={err}>
          <Input value={num} onChange={(e) => setNum(e.target.value)} inputMode="numeric"
                 placeholder="5555 5555 5555 4444" aria-label="New card number" data-testid="new-card-number" />
        </Field>
        <Field label="Expiry">
          <Input value={exp} onChange={(e) => setExp(e.target.value)} placeholder="11 / 30" aria-label="New card expiry" data-testid="new-card-exp" />
        </Field>
        <p className="ck-muted">New cards become the default automatically.</p>
      </Modal>
    </Shell>
  );
}
