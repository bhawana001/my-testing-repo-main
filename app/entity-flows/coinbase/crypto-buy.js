"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { TradeShell } from "@/app/components/engines/TradeShell";
import { Card, Input, Btn, Field, KV, Badge, Segment } from "@/app/components/eval/ui";
import { PaymentForm } from "@/app/components/engines/Checkout";
import { CRYPTO } from "@/lib/seed/markets";
import { money, round2 } from "@/lib/seed";

const BTC = CRYPTO[0];
export function buyQuote(usd) { const fee = round2(Math.max(0.99, usd * 0.0149)); const btc = Math.floor(((usd - fee) / BTC.price) * 1e8) / 1e8; return { fee, btc, net: round2(usd - fee) }; }
const seed = () => ({ stage: "amount", amount: "50", btc: 0.0125, receipt: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const q = buyQuote(Number(s.amount) || 0);
  return (
    <TradeShell flow={flow} nav={["Home", "Trade", "Assets"]} active="Trade" right={<span className="ee-small">BTC balance <b data-testid="btc-balance">{s.btc.toFixed(8)} BTC</b></span>}>
      <div className="ee-split">
        <Card title="Buy Bitcoin" data-testid="buy-card">
          {s.stage === "amount" && (<div className="ee-stack">
            <Segment options={["Buy", "Sell", "Convert"]} value="Buy" onChange={() => {}} />
            <Field label="Amount (USD)" htmlFor="cb-amt" help={`1 BTC = ${money(BTC.price)}`}><Input id="cb-amt" inputMode="decimal" value={s.amount} onChange={(e) => set({ ...s, amount: e.target.value })} style={{ fontSize: 24 }} /></Field>
            <KV k="Coinbayse fee" v={money(q.fee)} testId="cb-fee" /><KV k="You'll get" v={`${q.btc.toFixed(8)} BTC`} total testId="cb-get" />
            <Btn block disabled={!(Number(s.amount) >= 2)} onClick={() => set({ ...s, stage: "pay" })} data-testid="cb-preview">Preview buy</Btn>
          </div>)}
          {s.stage === "pay" && (<div className="ee-stack">
            <KV k="Buy" v={`${q.btc.toFixed(8)} BTC`} /><KV k="Price" v={money(BTC.price)} /><KV k="Fee" v={money(q.fee)} /><KV k="Total" v={money(Number(s.amount))} total />
            <PaymentForm amount={Number(s.amount)} allow3ds={false} buttonLabel={`Buy now · ${money(Number(s.amount))}`} onSuccess={(p) => set({ ...s, stage: "done", btc: round2(s.btc * 1e8 + q.btc * 1e8) / 1e8, receipt: { ...q, usd: Number(s.amount), card: p.last4, id: "CB-" + Math.round(q.btc * 1e8) } })} />
            <button className="ee-link ee-small" onClick={() => set({ ...s, stage: "amount" })}>Back</button>
          </div>)}
          {s.stage === "done" && s.receipt && (<div className="ee-stack" data-testid="cb-confirmation">
            <Badge tone="ok">Purchase complete</Badge>
            <div className="ee-strong" style={{ fontSize: 18 }}>You bought {s.receipt.btc.toFixed(8)} BTC</div>
            <KV k="Paid" v={money(s.receipt.usd)} /><KV k="Fee" v={money(s.receipt.fee)} /><KV k="Card" v={`Visa •••• ${s.receipt.card}`} /><KV k="Transaction" v={s.receipt.id} />
            <KV k="New BTC balance" v={`${s.btc.toFixed(8)} BTC`} total testId="cb-new-balance" />
            <Btn variant="secondary" size="sm" onClick={() => set({ ...s, stage: "amount", receipt: null })}>Buy more</Btn>
          </div>)}
        </Card>
        <Card title="Your assets"><KV k="Bitcoin" v={`${s.btc.toFixed(8)} BTC`} /><KV k="Value" v={money(s.btc * BTC.price)} /></Card>
      </div>
    </TradeShell>
  );
}
