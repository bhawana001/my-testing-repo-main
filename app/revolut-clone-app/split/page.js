"use client";
// Split a transaction with contacts (19.3). The split is an even share of the
// bill, and requests are recorded against the transaction.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Check, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, CONTACTS, useStore, fmt } from "../shared";

export default function SplitPage() {
  const [s, update] = useStore();
  const [openId, setOpenId] = useState(null);
  const [selected, setSelected] = useState([]);
  const [err, setErr] = useState("");
  const [done, setDone] = useState(null);

  const txn = openId ? s.transactions.find((t) => t.id === openId) : null;
  const ways = selected.length + 1; // the payer counts
  const share = txn ? +(txn.amount / ways).toFixed(2) : 0;

  function split() {
    if (!selected.length) { setErr("Choose at least one person to split with."); return; }
    setErr("");
    const people = CONTACTS.filter((c) => selected.includes(c.id));
    update((st) => {
      const t = st.transactions.find((x) => x.id === txn.id);
      t.split = { ways, share, people: people.map((p) => p.name), requestedAt: "2026-09-15",
                  status: "Requested" };
      return st;
    });
    setDone({ merchant: txn.merchant, share, ways, people: people.map((p) => p.name) });
    setOpenId(null);
    setSelected([]);
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Accounts" }, { href: `${BASE}/exchange`, label: "Exchange" }]} />
      <Page title="Split a bill">
        {done && (
          <Banner tone="ok" title="Split requested" testId="split-done">
            Requested <strong data-testid="split-share">{fmt(done.share, "USD")}</strong> each from{" "}
            <strong data-testid="split-people">{done.people.join(", ")}</strong> for {done.merchant}
            {" "}(split <span data-testid="split-ways">{done.ways}</span> ways).
          </Banner>
        )}

        <Card title="Recent transactions" testId="transactions">
          {s.transactions.map((t) => (
            <div key={t.id} className="ck-row" data-testid={`txn-${t.id}`}>
              <span>
                <strong>{t.merchant}</strong> <span className="ck-muted">· {t.at}</span>
                {t.split && (
                  <div data-testid={`split-status-${t.id}`}>
                    <Badge tone="info">Split {t.split.ways} ways · {fmt(t.split.share, "USD")} each</Badge>
                  </div>
                )}
              </span>
              <span>
                {fmt(t.amount, t.currency)}{" "}
                {!t.split && (
                  <Btn size="sm" variant="secondary" onClick={() => { setOpenId(t.id); setErr(""); }} data-testid={`split-${t.id}`}>
                    Split
                  </Btn>
                )}
              </span>
            </div>
          ))}
        </Card>

        {txn && (
          <Card title={`Split ${txn.merchant} · ${fmt(txn.amount, txn.currency)}`} testId="split-panel">
            {CONTACTS.map((c) => (
              <Check key={c.id} label={c.name} testId={`contact-${c.id}`}
                     checked={selected.includes(c.id)}
                     onChange={(e) => setSelected((v) => e.target.checked ? [...v, c.id] : v.filter((x) => x !== c.id))} />
            ))}
            {err && <div className="ck-field-error" role="alert" data-testid="split-error">{err}</div>}
            <Row label="Split between" value={`${ways} people (including you)`} testId="ways-preview" />
            <Row label="Each pays" value={fmt(share, "USD")} strong testId="share-preview" />
            <Btn block onClick={split} data-testid="request-split">Request money</Btn>
          </Card>
        )}
      </Page>
    </Shell>
  );
}
