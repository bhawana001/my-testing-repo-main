"use client";
// Market buy (16.1) and limit order placement (16.2). A market order fills at
// the quote; a limit below market stays pending rather than filling.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input, Radio, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, INSTRUMENTS, findSym, useStore, money, orderId } from "../shared";

export default function TradePage() {
  const [s, update] = useStore();
  const [query, setQuery] = useState("");
  const [symbol, setSymbol] = useState(null);
  const [type, setType] = useState("market");
  const [shares, setShares] = useState("1");
  const [limitPrice, setLimitPrice] = useState("");
  const [err, setErr] = useState("");
  const [placed, setPlaced] = useState(null);

  const inst = symbol ? findSym(symbol) : null;
  const matches = query.trim()
    ? INSTRUMENTS.filter((i) => (i.symbol + " " + i.name).toLowerCase().includes(query.trim().toLowerCase()))
    : [];

  function place() {
    const qty = Number(shares);
    if (!qty || qty <= 0) { setErr("Enter a whole number of shares."); return; }
    const price = type === "market" ? inst.price : Number(limitPrice);
    if (type === "limit" && (!price || price <= 0)) { setErr("Enter a limit price."); return; }
    const cost = +(qty * price).toFixed(2);
    if (type === "market" && cost > s.buyingPower) {
      setErr(`That costs ${money(cost)} but your buying power is ${money(s.buyingPower)}.`);
      return;
    }
    setErr("");
    const id = orderId(s.counter);
    const filled = type === "market" || price >= inst.price;
    const order = { id, symbol: inst.symbol, side: "buy", type, shares: qty,
                    price, status: filled ? "Filled" : "Pending", at: "2026-09-15",
                    note: filled ? "" : `Waiting for ${inst.symbol} to reach ${money(price)}` };
    update((st) => {
      st.orders.unshift(order);
      st.counter += 1;
      if (filled) {
        st.buyingPower = +(st.buyingPower - cost).toFixed(2);
        st.cash = +(st.cash - cost).toFixed(2);
        const pos = st.positions.find((p) => p.symbol === inst.symbol);
        if (pos) {
          const total = pos.shares + qty;
          pos.avgCost = +(((pos.avgCost * pos.shares) + cost) / total).toFixed(2);
          pos.shares = total;
        } else {
          st.positions.push({ symbol: inst.symbol, shares: qty, avgCost: price });
        }
      }
      return st;
    });
    setPlaced(order);
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Markets" }, { href: `${BASE}/portfolio`, label: "Portfolio" }]} />
      <Page title="Trade">
        {placed && (
          <Banner tone={placed.status === "Filled" ? "ok" : "info"}
                  title={placed.status === "Filled" ? "Order filled" : "Order pending"} testId="order-result">
            {placed.type === "market" ? "Market" : "Limit"} buy of {placed.shares} {placed.symbol} —{" "}
            <strong data-testid="order-status">{placed.status}</strong> at{" "}
            <strong data-testid="order-price">{money(placed.price)}</strong>.
          </Banner>
        )}

        <Card title="Find a stock">
          <Field label="Search ticker or name">
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="NVDA"
                   aria-label="Search ticker" data-testid="ticker-search" />
          </Field>
          {matches.length > 0 && (
            <div data-testid="search-results">
              {matches.map((m) => (
                <div key={m.symbol} className="ck-row" data-testid={`result-${m.symbol}`}>
                  <span><strong>{m.symbol}</strong> <span className="ck-muted">{m.name}</span></span>
                  <span>
                    {money(m.price)}{" "}
                    <Btn size="sm" onClick={() => { setSymbol(m.symbol); setQuery(""); setPlaced(null); }}
                         data-testid={`select-${m.symbol}`}>Trade</Btn>
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {inst && (
          <Card title={`Buy ${inst.symbol}`} testId="order-ticket">
            <Row label="Last price" value={money(inst.price)} testId="last-price" />
            <Radio name="t" label="Market order" detail="Fills immediately at the current price"
                   testId="type-market" checked={type === "market"} onChange={() => setType("market")} />
            <Radio name="t" label="Limit order" detail="Only fills at your price or better"
                   testId="type-limit" checked={type === "limit"} onChange={() => setType("limit")} />
            <Field label="Shares" error={err}>
              <Input value={shares} onChange={(e) => setShares(e.target.value)} inputMode="numeric"
                     aria-label="Shares" data-testid="shares" />
            </Field>
            {type === "limit" && (
              <Field label="Limit price" hint={`Below ${money(inst.price)} stays pending`}>
                <Input value={limitPrice} onChange={(e) => setLimitPrice(e.target.value)} inputMode="decimal"
                       aria-label="Limit price" data-testid="limit-price" />
              </Field>
            )}
            <Row label="Estimated cost"
                 value={money(+(Number(shares || 0) * (type === "market" ? inst.price : Number(limitPrice) || 0)).toFixed(2))}
                 strong testId="estimated-cost" />
            <Btn block onClick={place} data-testid="place-order">Review and buy</Btn>
          </Card>
        )}

        <Card title={`Orders (${s.orders.length})`} testId="orders">
          {s.orders.length === 0 ? <Empty>No orders yet.</Empty> : s.orders.map((o) => (
            <div key={o.id} className="ck-row" data-testid={`order-${o.id}`}>
              <span>
                <strong>{o.side === "buy" ? "Buy" : "Sell"} {o.shares} {o.symbol}</strong>
                <div className="ck-muted">{o.type} · {o.at}{o.note ? ` · ${o.note}` : ""}</div>
              </span>
              <span>
                {money(o.price)}{" "}
                <Badge tone={o.status === "Filled" ? "ok" : "warn"} testId={`status-${o.id}`}>{o.status}</Badge>
              </span>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
