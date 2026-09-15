"use client";
// Buy with card (18.1) and recurring buy setup (18.2). The quote breaks out the
// card fee and spread; a recurring buy states its next run date.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input, Select, Radio, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, ASSETS, FREQUENCIES, quoteBuy, nextRun, findAsset, useStore, money } from "../shared";

export default function BuyPage() {
  const [s, update] = useStore();
  const [asset, setAsset] = useState("BTC");
  const [amount, setAmount] = useState("50");
  const [mode, setMode] = useState("once");
  const [freq, setFreq] = useState("weekly");
  const [card, setCard] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(null);

  const amt = Number(amount) || 0;
  const q = quoteBuy(amt, asset);

  function submit() {
    if (!amt || amt < 2) { setErr("Minimum purchase is $2.00."); return; }
    if (card.replace(/\s/g, "").length < 15) { setErr("Enter a valid test card, e.g. 4242 4242 4242 4242."); return; }
    setErr("");
    if (mode === "once") {
      update((st) => {
        st.holdings[asset] = +((st.holdings[asset] || 0) + q.units).toFixed(findAsset(asset).decimals);
        st.transactions.unshift({ id: "TX-" + (st.counter + 1), type: "buy", asset, amount: amt,
                                  units: q.units, fee: q.fee, at: "2026-09-15" });
        st.counter += 1;
        return st;
      });
      setDone({ kind: "once", units: q.units, asset, amt, fee: q.fee });
    } else {
      const run = nextRun(freq);
      update((st) => {
        st.recurring.unshift({ id: "REC-" + (st.recurring.length + 1), asset, amount: amt,
                               frequency: freq, nextRun: run, status: "Active", createdAt: "2026-09-15" });
        return st;
      });
      setDone({ kind: "recurring", asset, amt, freq, run });
    }
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Portfolio" }, { href: `${BASE}/alerts`, label: "Alerts" }]} />
      <Page title="Buy crypto">
        {done?.kind === "once" && (
          <Banner tone="ok" title="Purchase complete" testId="buy-complete">
            Bought <strong data-testid="bought-units">{done.units} {done.asset}</strong> for {money(done.amt)}
            {" "}(fee {money(done.fee)}).
          </Banner>
        )}
        {done?.kind === "recurring" && (
          <Banner tone="ok" title="Recurring buy scheduled" testId="recurring-created">
            {money(done.amt)} of {done.asset} {FREQUENCIES.find((f) => f.id === done.freq).label.toLowerCase()} —
            next run <strong data-testid="next-run">{done.run}</strong>.
          </Banner>
        )}

        <div className="ck-split">
          <Card title="Order">
            <Field label="Asset">
              <Select value={asset} onChange={(e) => setAsset(e.target.value)} aria-label="Asset" data-testid="asset-select">
                {ASSETS.map((a) => <option key={a.id} value={a.id}>{a.id} — {a.name} · {money(a.price)}</option>)}
              </Select>
            </Field>
            <Field label="Amount in USD" error={err}>
              <Input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal"
                     aria-label="Amount in USD" data-testid="amount" />
            </Field>
            <Radio name="m" label="One-time purchase" detail="Buy once, right now"
                   testId="mode-once" checked={mode === "once"} onChange={() => setMode("once")} />
            <Radio name="m" label="Recurring buy" detail="Buy automatically on a schedule"
                   testId="mode-recurring" checked={mode === "recurring"} onChange={() => setMode("recurring")} />
            {mode === "recurring" && (
              <Field label="Frequency">
                <Select value={freq} onChange={(e) => setFreq(e.target.value)} aria-label="Frequency" data-testid="frequency">
                  {FREQUENCIES.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
                </Select>
              </Field>
            )}
            <Field label="Card number" hint="Test card 4242 4242 4242 4242">
              <Input value={card} onChange={(e) => setCard(e.target.value)} inputMode="numeric"
                     aria-label="Card number" data-testid="card" />
            </Field>
            <Btn block onClick={submit} data-testid="submit-buy">
              {mode === "once" ? `Buy ${money(amt)} of ${asset}` : "Schedule recurring buy"}
            </Btn>
          </Card>

          <Card title="Quote" testId="quote">
            <Row label="Amount" value={money(amt)} testId="quote-amount" />
            <Row label="Card fee (1.49%)" value={money(q.fee)} testId="quote-fee" />
            <Row label="Spread (0.5%)" value={money(q.spread)} testId="quote-spread" />
            <Row label="Invested" value={money(q.net)} testId="quote-net" />
            <Row label={`${asset} price`} value={money(q.price)} />
            <Row label="You receive" value={`${q.units} ${asset}`} strong testId="quote-units" />
            {mode === "recurring" && <Badge tone="info" testId="preview-next-run">Next run: {nextRun(freq)}</Badge>}
          </Card>
        </div>

        <Card title={`Recurring buys (${s.recurring.length})`} testId="recurring-list">
          {s.recurring.length === 0 ? <Empty>No recurring buys.</Empty> : s.recurring.map((r) => (
            <div key={r.id} data-testid={`recurring-${r.id}`}>
              <Row label={`${money(r.amount)} of ${r.asset} · ${FREQUENCIES.find((f) => f.id === r.frequency).label}`}
                   value={`Next: ${r.nextRun}`} testId={`recurring-next-${r.id}`} />
              <Badge tone="ok">{r.status}</Badge>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
