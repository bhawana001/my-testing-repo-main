"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { TradeShell } from "@/app/components/engines/TradeShell";
import { Card, Segment, KV, Badge } from "@/app/components/eval/ui";
import { stock } from "@/lib/seed/markets";
import { money } from "@/lib/seed";

const st = stock("NOVA");
const EXPIRIES = [{ id: "2026-09-18", label: "Sep 18", days: 4 }, { id: "2026-09-25", label: "Sep 25", days: 11 }, { id: "2026-10-16", label: "Oct 16", days: 32 }];
const STRIKES = [170, 175, 180, 185, 190, 195];
// Deterministic toy pricing: intrinsic + time value; greeks from moneyness.
export function quote(strike, days, side) {
  const S = st.price; const t = days / 365; const iv = 0.32;
  const intrinsic = side === "call" ? Math.max(0, S - strike) : Math.max(0, strike - S);
  const tv = S * iv * Math.sqrt(t) * 0.4 * Math.exp(-Math.abs(S - strike) / (S * iv * Math.sqrt(t) * 2 + 1));
  const mark = Math.round((intrinsic + tv) * 100) / 100;
  const m = (S - strike) / S;
  const callDelta = Math.min(0.99, Math.max(0.01, 0.5 + m * 6));
  const delta = side === "call" ? callDelta : callDelta - 1;
  const gamma = Math.round((0.06 * Math.exp(-Math.pow(m * 12, 2))) * 1000) / 1000;
  const theta = -Math.round((tv / Math.max(1, days)) * 100) / 100;
  const vega = Math.round(S * Math.sqrt(t) * 0.004 * 100) / 100;
  return { mark, bid: Math.max(0, Math.round((mark - 0.05) * 100) / 100), ask: Math.round((mark + 0.05) * 100) / 100, delta: Math.round(delta * 1000) / 1000, gamma, theta, vega, iv: "32.0%" };
}
const seed = () => ({ expiry: "2026-09-25", side: "call", strike: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const exp = EXPIRIES.find((e) => e.id === s.expiry);
  const sel = s.strike ? quote(s.strike, exp.days, s.side) : null;
  return (
    <TradeShell flow={flow} nav={["Investing", "Options", "Crypto"]} active="Options" wide>
      <h1 className="ee-page-title">{st.sym} options chain</h1>
      <p className="ee-page-sub">{st.name} · last {money(st.price)}</p>
      <div className="ee-row" style={{ marginBottom: 12 }}>
        <Segment options={EXPIRIES.map((e) => ({ value: e.id, label: e.label }))} value={s.expiry} onChange={(v) => set({ ...s, expiry: v, strike: null })} />
        <Segment options={[{ value: "call", label: "Calls" }, { value: "put", label: "Puts" }]} value={s.side} onChange={(v) => set({ ...s, side: v, strike: null })} />
      </div>
      <div className="ee-split">
        <Card tight data-testid="chain">
          <div className="ee-table-wrap"><table className="ee-table"><thead><tr><th>Strike</th><th className="ee-right">Bid</th><th className="ee-right">Ask</th><th className="ee-right">Mark</th><th className="ee-right">Delta</th><th></th></tr></thead><tbody>
            {STRIKES.map((k) => { const q = quote(k, exp.days, s.side); return (
              <tr key={k} style={s.strike === k ? { background: "color-mix(in srgb, var(--ee-accent) 16%, transparent)" } : undefined}>
                <td className="ee-strong">{money(k)}{k === 180 || k === 185 ? <Badge style={{ marginLeft: 6 }}>{k === 180 ? "ITM edge" : "OTM"}</Badge> : null}</td>
                <td className="ee-right">{money(q.bid)}</td><td className="ee-right">{money(q.ask)}</td><td className="ee-right">{money(q.mark)}</td><td className="ee-right">{q.delta}</td>
                <td className="ee-right"><button type="button" className="ee-btn ee-btn--sm ee-btn--secondary" onClick={() => set({ ...s, strike: k })} data-testid={`strike-${k}`} aria-pressed={s.strike === k}>Select</button></td>
              </tr>); })}
          </tbody></table></div>
        </Card>
        <Card title="Selected contract" data-testid="contract">
          {sel ? (<>
            <div className="ee-strong" data-testid="contract-name">{st.sym} {money(s.strike)} {s.side === "call" ? "Call" : "Put"} · {exp.label}</div>
            <KV k="Premium (mark)" v={money(sel.mark)} testId="g-premium" /><KV k="Cost per contract (×100)" v={money(sel.mark * 100)} testId="g-cost" />
            <KV k="Delta" v={sel.delta} testId="g-delta" /><KV k="Gamma" v={sel.gamma} testId="g-gamma" /><KV k="Theta" v={sel.theta} testId="g-theta" /><KV k="Vega" v={sel.vega} testId="g-vega" /><KV k="Implied volatility" v={sel.iv} testId="g-iv" />
          </>) : <div className="ee-empty">Select a strike to see premium and Greeks.</div>}
        </Card>
      </div>
    </TradeShell>
  );
}
