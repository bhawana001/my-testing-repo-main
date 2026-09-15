"use client";
// Add a recipient (15.2). Account details are validated per currency, and a
// saved recipient becomes selectable on the send screen.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Field, Input, Select, Banner, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, useStore } from "../shared";

export default function RecipientsPage() {
  const [s, update] = useStore();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(null);

  function save() {
    const e = {};
    if (!name.trim()) e.name = "Enter the recipient's full name.";
    if (!bank.trim()) e.bank = "Enter their bank name.";
    if (!/^\d{6,18}$/.test(account.trim())) e.account = "Account number must be 6 to 18 digits.";
    if (currency === "INR" && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc.trim().toUpperCase())) {
      e.ifsc = "IFSC must look like HDFB0001234.";
    }
    setErrors(e);
    if (Object.keys(e).length) return;
    const rec = { id: "r_" + (s.recipients.length + 1), name: name.trim(), currency, bank: bank.trim(),
                  account: "••••" + account.trim().slice(-4), ifsc: ifsc.trim().toUpperCase(), email: email.trim() };
    update((st) => { st.recipients.unshift(rec); return st; });
    setSaved(rec);
    setOpen(false);
    setName(""); setBank(""); setAccount(""); setIfsc(""); setEmail("");
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/send`, label: "Send money" }]} />
      <Page title="Recipients" actions={<Btn onClick={() => setOpen(true)} data-testid="add-recipient">Add recipient</Btn>}>
        {saved && (
          <Banner tone="ok" title="Recipient saved" testId="recipient-saved">
            <strong data-testid="saved-name">{saved.name}</strong> can now receive {saved.currency}.
          </Banner>
        )}

        {open && (
          <Card title="New recipient" testId="recipient-form">
            <Field label="Full name" error={errors.name}>
              <Input value={name} onChange={(e) => setName(e.target.value)} aria-label="Full name" data-testid="rec-name" />
            </Field>
            <Field label="They receive">
              <Select value={currency} onChange={(e) => setCurrency(e.target.value)} aria-label="They receive" data-testid="rec-currency">
                {["INR", "EUR", "GBP", "USD"].map((c) => <option key={c}>{c}</option>)}
              </Select>
            </Field>
            <Field label="Bank name" error={errors.bank}>
              <Input value={bank} onChange={(e) => setBank(e.target.value)} aria-label="Bank name" data-testid="rec-bank" />
            </Field>
            <Field label="Account number" error={errors.account}>
              <Input value={account} onChange={(e) => setAccount(e.target.value)} inputMode="numeric"
                     aria-label="Account number" data-testid="rec-account" />
            </Field>
            {currency === "INR" && (
              <Field label="IFSC code" error={errors.ifsc}>
                <Input value={ifsc} onChange={(e) => setIfsc(e.target.value)} aria-label="IFSC code" data-testid="rec-ifsc" />
              </Field>
            )}
            <Field label="Email (optional)">
              <Input value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" data-testid="rec-email" />
            </Field>
            <div className="ck-card-actions">
              <Btn variant="secondary" onClick={() => setOpen(false)}>Cancel</Btn>
              <Btn onClick={save} data-testid="save-recipient">Save recipient</Btn>
            </div>
          </Card>
        )}

        <Card title={`Saved recipients (${s.recipients.length})`} testId="recipient-list">
          {s.recipients.length === 0 ? <Empty>No recipients yet.</Empty> : s.recipients.map((r) => (
            <div key={r.id} data-testid={`recipient-${r.id}`}>
              <Row label={r.name} value={r.currency} testId={`recipient-name-${r.id}`} />
              <div className="ck-muted">{r.bank} {r.account}{r.ifsc ? ` · ${r.ifsc}` : ""}</div>
              <Badge tone="ok">Ready to receive {r.currency}</Badge>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
