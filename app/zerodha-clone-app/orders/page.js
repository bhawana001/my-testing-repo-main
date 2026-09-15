"use client";
// Intraday limit order (17.1). MIS (intraday) gets leverage, a limit below LTP
// stays open, and the order book shows it as OPEN rather than COMPLETE.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input, Select, Radio, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, STOCKS, findStock, useStore, money, orderNo } from "../shared";

const LEVERAGE = 5;

export default function OrdersPage() {
  const [s, update] = useStore();
  const [symbol, setSymbol] = useState("RELIANCE");
  const [product, setProduct] = useState("MIS");
  const [orderType, setOrderType] = useState("LIMIT");
  const [qty, setQty] = useState("10");
  const [price, setPrice] = useState("");
  const [err, setErr] = useState("");
  const [placed, setPlaced] = useState(null);

  const stock = findStock(symbol);
  const q = Number(qty) || 0;
  const p = orderType === "LIMIT" ? Number(price) || 0 : stock.ltp;
  const value = +(q * p).toFixed(2);
  const marginNeeded = product === "MIS" ? +(value / LEVERAGE).toFixed(2) : value;

  function place() {
    if (!q || q <= 0) { setErr("Enter a quantity above zero."); return; }
    if (orderType === "LIMIT" && (!p || p <= 0)) { setErr("Enter a limit price."); return; }
    if (marginNeeded > s.balance) { setErr(`Insufficient margin. Need ${money(marginNeeded)}, available ${money(s.balance)}.`); return; }
    setErr("");
    const executes = orderType === "MARKET" || p >= stock.ltp;
    const id = orderNo(s.counter);
    const order = { id, symbol: stock.symbol, exchange: stock.exchange, product, orderType,
                    qty: q, price: p, ltp: stock.ltp, status: executes ? "COMPLETE" : "OPEN",
                    at: "2026-09-15 10:32", marginBlocked: marginNeeded };
    update((st) => {
      st.orders.unshift(order);
      st.balance = +(st.balance - marginNeeded).toFixed(2);
      st.counter += 1;
      return st;
    });
    setPlaced(order);
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Dashboard" }, { href: `${BASE}/holdings`, label: "Holdings" }]} />
      <Page title="Orders">
        {placed && (
          <Banner tone={placed.status === "COMPLETE" ? "ok" : "info"} title={`Order ${placed.status}`} testId="order-result">
            {placed.product} {placed.orderType} buy · {placed.qty} {placed.symbol} at{" "}
            <strong data-testid="placed-price">{money(placed.price)}</strong> —{" "}
            <strong data-testid="placed-status">{placed.status}</strong>. Order no{" "}
            <span data-testid="order-number">{placed.id}</span>.
          </Banner>
        )}

        <div className="ck-split">
          <Card title="Buy order" testId="order-form">
            <Field label="Instrument">
              <Select value={symbol} onChange={(e) => setSymbol(e.target.value)} aria-label="Instrument" data-testid="symbol">
                {STOCKS.map((x) => <option key={x.symbol} value={x.symbol}>{x.symbol} · {money(x.ltp)}</option>)}
              </Select>
            </Field>
            <div className="ck-strong" style={{ margin: "8px 0 6px" }}>Product</div>
            <Radio name="p" label="MIS — Intraday" detail={`${LEVERAGE}x leverage, auto square-off at 3:20pm`}
                   testId="product-mis" checked={product === "MIS"} onChange={() => setProduct("MIS")} />
            <Radio name="p" label="CNC — Delivery" detail="Full value blocked"
                   testId="product-cnc" checked={product === "CNC"} onChange={() => setProduct("CNC")} />
            <div className="ck-strong" style={{ margin: "8px 0 6px" }}>Order type</div>
            <Radio name="o" label="LIMIT" detail="Executes at your price or better"
                   testId="type-limit" checked={orderType === "LIMIT"} onChange={() => setOrderType("LIMIT")} />
            <Radio name="o" label="MARKET" detail="Executes at the last traded price"
                   testId="type-market" checked={orderType === "MARKET"} onChange={() => setOrderType("MARKET")} />
            <div className="ck-grid ck-grid--2">
              <Field label="Quantity" error={err}>
                <Input value={qty} onChange={(e) => setQty(e.target.value)} inputMode="numeric" aria-label="Quantity" data-testid="qty" />
              </Field>
              {orderType === "LIMIT" && (
                <Field label="Price" hint={`LTP ${money(stock.ltp)}`}>
                  <Input value={price} onChange={(e) => setPrice(e.target.value)} inputMode="decimal" aria-label="Price" data-testid="price" />
                </Field>
              )}
            </div>
            <Row label="Order value" value={money(value)} testId="order-value" />
            <Row label="Margin required" value={money(marginNeeded)} strong testId="margin-required" />
            <Btn block onClick={place} data-testid="place-order">Buy {stock.symbol}</Btn>
          </Card>

          <Card title={`Order book (${s.orders.length})`} testId="order-book">
            {s.orders.length === 0 ? <Empty>No orders today.</Empty> : s.orders.map((o) => (
              <div key={o.id} className="ck-row" data-testid={`order-${o.id}`}>
                <span>
                  <strong>{o.symbol}</strong> <span className="ck-muted">{o.product} · {o.orderType} · qty {o.qty}</span>
                  <div className="ck-muted">{o.id} · {o.at}</div>
                </span>
                <span>
                  {money(o.price)}{" "}
                  <Badge tone={o.status === "COMPLETE" ? "ok" : "warn"} testId={`status-${o.id}`}>{o.status}</Badge>
                </span>
              </div>
            ))}
          </Card>
        </div>
      </Page>
    </Shell>
  );
}
