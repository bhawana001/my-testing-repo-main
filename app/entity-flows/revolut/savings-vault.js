"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { MobileShell } from "@/app/components/engines/MobileShell";
import { Toggle, Badge, KV, Btn, Select, Field } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const seed = () => ({ roundup: false, multiplier: "1", vault: 240.5, sims: 0 });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  function simulate() {
    if (!s.roundup) return;
    const spend = 3.4; const roundTo = Math.ceil(spend) - spend; const add = Math.round(roundTo * Number(s.multiplier) * 100) / 100;
    set({ ...s, vault: Math.round((s.vault + add) * 100) / 100, sims: s.sims + 1 });
  }
  return (
    <MobileShell flow={flow} title="Holiday Vault" nav={["Home", "Cards", "Payments", "Wealth"]}>
      <div className="ee-card" style={{ background: "linear-gradient(135deg,#4f55f1,#191c1f)", color: "#fff" }}>
        <div className="ee-small">Holiday Vault</div>
        <div className="ee-price" style={{ fontSize: 28 }} data-testid="vault-balance">{money(s.vault)}</div>
        <div className="ee-tiny">Goal {money(1500)}</div>
      </div>
      <div className="ee-row ee-row--between">
        <div><div className="ee-strong">Round-ups</div><div className="ee-tiny ee-muted">Round up card spending to the nearest dollar and save the change.</div></div>
        <Toggle checked={s.roundup} label="Round-ups" onChange={(v) => set({ ...s, roundup: v })} data-testid="roundup-toggle" />
      </div>
      <div data-testid="rule-status">{s.roundup ? <Badge tone="ok">Rule active · round-ups to Holiday Vault</Badge> : <Badge>Rule inactive</Badge>}</div>
      {s.roundup && (
        <Field label="Multiplier" htmlFor="rv-mult"><Select id="rv-mult" value={s.multiplier} onChange={(e) => set({ ...s, multiplier: e.target.value })}>{["1", "2", "5", "10"].map((m) => <option key={m} value={m}>{m}×</option>)}</Select></Field>
      )}
      <Btn variant="secondary" disabled={!s.roundup} onClick={simulate} data-testid="simulate-spend">Simulate a $3.40 card purchase</Btn>
      <KV k="Round-ups saved so far" v={`${s.sims} purchase${s.sims === 1 ? "" : "s"}`} testId="roundup-count" />
    </MobileShell>
  );
}
