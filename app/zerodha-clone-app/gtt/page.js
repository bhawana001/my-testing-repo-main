"use client";
// GTT creation (17.2). A Good Till Triggered order needs both a trigger price
// and a limit price, and the trigger must sit on the correct side of LTP.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input, Select, Radio, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, STOCKS, findStock, useStore, money } from "../shared";

export default function GttPage() {
  const [s, update] = useStore();
  const [symbol, setSymbol] = useState("RELIANCE");
  const [side, setSide] = useState("BUY");
  const [trigger, setTrigger] = useState("");
  const [limit, setLimit] = useState("");
  const [qty, setQty] = useState("5");
  const [err, setErr] = useState("");
  const [created, setCreated] = useState(null);

  const stock = findStock(symbol);

  function create() {
    const t = Number(trigger), l = Number(limit), q = Number(qty);
    if (!t || !l || !q) { setErr("Enter trigger price, limit price and quantity."); return; }
    if (side === "BUY" && t >= stock.ltp) { setErr(`For a buy GTT the trigger must be below the LTP of ${money(stock.ltp)}.`); return; }
    if (side === "SELL" && t <= stock.ltp) { setErr(`For a sell GTT the trigger must be above the LTP of ${money(stock.ltp)}.`); return; }
    setErr("");
    const id = "GTT-" + (s.gtts.length + 1);
    const gtt = { id, symbol: stock.symbol, side, trigger: t, limit: l, qty: q,
                  ltp: stock.ltp, status: "Active", createdAt: "2026-09-15", validTill: "2027-09-15" };
    update((st) => { st.gtts.unshift(gtt); return st; });
    setCreated(gtt);
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Dashboard" }, { href: `${BASE}/orders`, label: "Orders" }]} />
      <Page title="GTT — Good Till Triggered">
        {created && (
          <Banner tone="ok" title="GTT created" testId="gtt-created">
            <strong data-testid="gtt-id">{created.id}</strong> · {created.side} {created.qty} {created.symbol} when price hits{" "}
            <strong data-testid="gtt-trigger">{money(created.trigger)}</strong>, limit{" "}
            <strong data-testid="gtt-limit">{money(created.limit)}</strong>.
          </Banner>
        )}

        <div className="ck-split">
          <Card title="New GTT" testId="gtt-form">
            <Field label="Instrument">
              <Select value={symbol} onChange={(e) => setSymbol(e.target.value)} aria-label="Instrument" data-testid="gtt-symbol">
                {STOCKS.map((x) => <option key={x.symbol} value={x.symbol}>{x.symbol} · LTP {money(x.ltp)}</option>)}
              </Select>
            </Field>
            <Radio name="s" label="BUY" detail="Trigger must be below the last traded price"
                   testId="side-buy" checked={side === "BUY"} onChange={() => setSide("BUY")} />
            <Radio name="s" label="SELL" detail="Trigger must be above the last traded price"
                   testId="side-sell" checked={side === "SELL"} onChange={() => setSide("SELL")} />
            <Row label="Last traded price" value={money(stock.ltp)} testId="gtt-ltp" />
            <div className="ck-grid ck-grid--3">
              <Field label="Trigger price" error={err}>
                <Input value={trigger} onChange={(e) => setTrigger(e.target.value)} inputMode="decimal"
                       aria-label="Trigger price" data-testid="trigger-price" />
              </Field>
              <Field label="Limit price">
                <Input value={limit} onChange={(e) => setLimit(e.target.value)} inputMode="decimal"
                       aria-label="Limit price" data-testid="limit-price" />
              </Field>
              <Field label="Quantity">
                <Input value={qty} onChange={(e) => setQty(e.target.value)} inputMode="numeric"
                       aria-label="Quantity" data-testid="gtt-qty" />
              </Field>
            </div>
            <Btn block onClick={create} data-testid="create-gtt">Create GTT</Btn>
          </Card>

          <Card title={`Active GTTs (${s.gtts.length})`} testId="gtt-list">
            {s.gtts.length === 0 ? <Empty>No GTTs yet.</Empty> : s.gtts.map((g) => (
              <div key={g.id} data-testid={`gtt-${g.id}`}>
                <Row label={`${g.side} ${g.qty} ${g.symbol}`} value={`Trigger ${money(g.trigger)}`} />
                <div className="ck-muted">Limit {money(g.limit)} · valid till {g.validTill}</div>
                <Badge tone="ok" testId={`gtt-status-${g.id}`}>{g.status}</Badge>
              </div>
            ))}
          </Card>
        </div>
      </Page>
    </Shell>
  );
}
