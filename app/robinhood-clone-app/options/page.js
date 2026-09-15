"use client";
// Options chain (16.5). Choosing a symbol and expiry renders strikes with bid,
// ask and in-the-money marking; selecting a strike shows the contract.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Select, Field, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, INSTRUMENTS, EXPIRIES, chainFor, findSym, useStore, money } from "../shared";

export default function OptionsPage() {
  const [symbol, setSymbol] = useState("NVDA");
  const [expiry, setExpiry] = useState(EXPIRIES[0]);
  const [strike, setStrike] = useState(null);

  const inst = findSym(symbol);
  const chain = chainFor(symbol, expiry);
  const chosen = chain.find((c) => c.strike === strike) || null;

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Markets" }, { href: `${BASE}/trade`, label: "Trade" }]} />
      <Page title="Options" wide>
        <Card title="Contract">
          <div className="ck-grid ck-grid--2">
            <Field label="Underlying">
              <Select value={symbol} onChange={(e) => { setSymbol(e.target.value); setStrike(null); }}
                      aria-label="Underlying" data-testid="option-symbol">
                {INSTRUMENTS.map((i) => <option key={i.symbol} value={i.symbol}>{i.symbol} — {i.name}</option>)}
              </Select>
            </Field>
            <Field label="Expiry">
              <Select value={expiry} onChange={(e) => { setExpiry(e.target.value); setStrike(null); }}
                      aria-label="Expiry" data-testid="option-expiry">
                {EXPIRIES.map((x) => <option key={x}>{x}</option>)}
              </Select>
            </Field>
          </div>
          <Row label={`${symbol} last`} value={money(inst.price)} testId="underlying-price" />
        </Card>

        <Card title={`Calls · ${expiry}`} testId="options-chain">
          {chain.length === 0 ? <Empty>No contracts.</Empty> : (
            <table className="ck-table">
              <thead><tr><th>Strike</th><th>Bid</th><th>Ask</th><th>Volume</th><th>Moneyness</th><th /></tr></thead>
              <tbody>
                {chain.map((c) => (
                  <tr key={c.strike} data-testid={`strike-${c.strike}`}>
                    <td className="ck-strong">{money(c.strike)}</td>
                    <td data-testid={`bid-${c.strike}`}>{money(c.bid)}</td>
                    <td data-testid={`ask-${c.strike}`}>{money(c.ask)}</td>
                    <td>{c.volume}</td>
                    <td><Badge tone={c.itm ? "ok" : "neutral"}>{c.itm ? "ITM" : "OTM"}</Badge></td>
                    <td><Btn size="sm" variant={strike === c.strike ? "primary" : "secondary"}
                             onClick={() => setStrike(c.strike)} data-testid={`select-strike-${c.strike}`}>Select</Btn></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>

        {chosen && (
          <Card title="Selected contract" testId="selected-contract">
            <Row label="Contract" value={`${symbol} ${expiry} ${money(chosen.strike)} Call`} testId="contract-name" />
            <Row label="Expiry" value={expiry} testId="contract-expiry" />
            <Row label="Strike" value={money(chosen.strike)} testId="contract-strike" />
            <Row label="Bid / Ask" value={`${money(chosen.bid)} / ${money(chosen.ask)}`} testId="contract-quote" />
            <Row label="Cost for 1 contract (100 shares)" value={money(+(chosen.ask * 100).toFixed(2))} strong testId="contract-cost" />
          </Card>
        )}
      </Page>
    </Shell>
  );
}
