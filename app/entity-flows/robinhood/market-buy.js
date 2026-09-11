"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { TradeShell, Change } from "@/app/components/engines/TradeShell";
import { Card, Input, Btn, KV, Badge, Segment, Alert, Field } from "@/app/components/eval/ui";
import { STOCKS, stock } from "@/lib/seed/markets";
import { money, round2 } from "@/lib/seed";

const seed = () => ({ positions: { NOVA: 5 }, bp: 2500, view: "search", sym: null, orders: [], confirm: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [q, setQ] = useState(""); const [qty, setQty] = useState("1"); const [err, setErr] = useState(null); const [review, setReview] = useState(false);
  const results = q.trim() ? STOCKS.filter((x) => (x.sym + " " + x.name).toLowerCase().includes(q.trim().toLowerCase())) : [];
  const st = s.sym ? stock(s.sym) : null;
  const n = Number(qty); const est = st ? round2(n * st.price) : 0;
  function doReview() {
    if (!Number.isInteger(n) || n < 1) { setErr("Enter a whole number of shares."); return; }
    if (est > s.bp) { setErr(`Not enough buying power. You have ${money(s.bp)}.`); return; }
    setErr(null); setReview(true);
  }
  function submit() {
    const o = { id: "ORD-" + (s.orders.length + 1001), sym: st.sym, side: "Buy", type: "Market", qty: n, fill: st.price, total: est, status: "Filled" };
    set({ ...s, positions: { ...s.positions, [st.sym]: (s.positions[st.sym] || 0) + n }, bp: round2(s.bp - est), orders: [o, ...s.orders], confirm: o }); setReview(false);
  }
  return (
    <TradeShell flow={flow} nav={["Investing", "Crypto", "Retirement"]} active="Investing" right={<span className="ee-small">Buying power <b data-testid="buying-power">{money(s.bp)}</b></span>}>
      {!st ? (
        <Card title="Search" data-testid="search">
          <Input type="search" placeholder="Search tickers or companies" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search tickers" />
          <div className="ee-stack" style={{ marginTop: 10 }}>
            {results.map((x) => <button key={x.sym} type="button" className="ee-row ee-row--between ee-card ee-card--flat ee-card--tight" style={{ cursor: "pointer", textAlign: "left" }} onClick={() => set({ ...s, sym: x.sym, confirm: null })} data-testid={`result-${x.sym}`}><span><b>{x.sym}</b> <span className="ee-muted">{x.name}</span></span><span className="ee-num">{money(x.price)}</span></button>)}
            {q && results.length === 0 && <div className="ee-empty">No matches for “{q}”.</div>}
          </div>
        </Card>
      ) : (
        <div className="ee-split">
          <div>
            <button className="ee-link ee-small" onClick={() => { set({ ...s, sym: null, confirm: null }); setReview(false); }}>← Search</button>
            <h1 className="ee-page-title" style={{ marginTop: 8 }} data-testid="stock-title">{st.name} ({st.sym})</h1>
            <div className="ee-price" style={{ fontSize: 34 }} data-testid="stock-price">{money(st.price)}</div>
            <Change value={st.price} prev={st.prev} /> <span className="ee-small ee-muted">Today</span>
            <Card title="Your position" style={{ marginTop: 16 }} data-testid="position">
              <KV k="Shares" v={<span data-testid="share-count">{s.positions[st.sym] || 0}</span>} />
              <KV k="Market value" v={money((s.positions[st.sym] || 0) * st.price)} />
            </Card>
          </div>
          <Card title={`Buy ${st.sym}`} data-testid="order-ticket">
            {s.confirm ? (
              <div className="ee-stack" data-testid="order-filled">
                <Badge tone="ok">Order filled</Badge>
                <div className="ee-strong">Bought {s.confirm.qty} share{s.confirm.qty > 1 ? "s" : ""} of {s.confirm.sym} at {money(s.confirm.fill)}</div>
                <KV k="Order" v={s.confirm.id} /><KV k="Total cost" v={money(s.confirm.total)} testId="filled-total" /><KV k="Shares owned" v={s.positions[st.sym]} testId="filled-shares" />
                <Btn variant="secondary" size="sm" onClick={() => set({ ...s, confirm: null })}>Buy more</Btn>
              </div>
            ) : (
              <div className="ee-stack">
                <Segment options={["Market", "Limit"]} value="Market" onChange={() => {}} />
                <Field label="Shares" htmlFor="rh-qty" error={err}><Input id="rh-qty" inputMode="numeric" value={qty} onChange={(e) => { setQty(e.target.value); setReview(false); }} /></Field>
                <KV k="Market price" v={money(st.price)} /><KV k="Estimated cost" v={money(est)} total testId="est-cost" />
                {!review ? <Btn block onClick={doReview} data-testid="review-order">Review order</Btn> : (
                  <>
                    <Alert tone="info">You're buying {n} share{n > 1 ? "s" : ""} of {st.sym} at market price for about {money(est)}.</Alert>
                    <Btn block onClick={submit} data-testid="submit-order">Submit buy order</Btn>
                  </>
                )}
              </div>
            )}
          </Card>
        </div>
      )}
    </TradeShell>
  );
}
