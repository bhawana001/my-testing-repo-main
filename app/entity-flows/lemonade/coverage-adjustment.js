"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, KV, Badge, Alert, Select, Field } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";
import { quote } from "./instant-quote";

const BASE = { property: "20000", liability: "100000", deductible: "500", extras: "no", pets: "no" };
const seed = () => ({ current: { ...BASE }, draft: { ...BASE }, saved: false });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const cur = quote(s.current), nxt = quote(s.draft);
  const diff = Math.round((nxt - cur) * 100) / 100;
  return (
    <>
      <Topbar entity={ent} nav={["Policy", "Claims", "Coverage"]} active="Coverage" light />
      <main className="ee-main">
        <h1 className="ee-page-title">Edit coverage</h1>
        <p className="ee-page-sub">Policy LP-2201-0915 · changes apply from September 15, 2026</p>
        <div className="ee-split">
          <Card title="Coverage" data-testid="coverage-form">
            <div className="ee-stack">
              <Field label="Personal property" htmlFor="cv-prop"><Select id="cv-prop" value={s.draft.property} onChange={(e) => set({ ...s, draft: { ...s.draft, property: e.target.value }, saved: false })}>{["10000", "20000", "30000", "50000"].map((v) => <option key={v} value={v}>{money(Number(v))}</option>)}</Select></Field>
              <Field label="Personal liability" htmlFor="cv-liab"><Select id="cv-liab" value={s.draft.liability} onChange={(e) => set({ ...s, draft: { ...s.draft, liability: e.target.value }, saved: false })}>{["100000", "300000", "500000"].map((v) => <option key={v} value={v}>{money(Number(v))}</option>)}</Select></Field>
              <Field label="Deductible" htmlFor="cv-ded"><Select id="cv-ded" value={s.draft.deductible} onChange={(e) => set({ ...s, draft: { ...s.draft, deductible: e.target.value }, saved: false })}>{["250", "500", "1000"].map((v) => <option key={v} value={v}>{money(Number(v))}</option>)}</Select></Field>
            </div>
          </Card>
          <Card title="Premium" data-testid="premium-panel">
            <KV k="Current premium" v={`${money(cur)}/mo`} testId="premium-current" />
            <KV k="New premium" v={`${money(nxt)}/mo`} total testId="premium-new" />
            <KV k="Change" v={`${diff >= 0 ? "+" : "−"}${money(Math.abs(diff))}/mo`} testId="premium-change" />
            <Btn block style={{ marginTop: 12 }} disabled={diff === 0 && JSON.stringify(s.draft) === JSON.stringify(s.current)} onClick={() => set({ ...s, current: { ...s.draft }, saved: true })} data-testid="save-coverage">Save changes</Btn>
            {s.saved && <Alert tone="ok" data-testid="coverage-saved">Coverage updated. Your premium is now {money(cur)}/month.</Alert>}
          </Card>
        </div>
      </main>
    </>
  );
}
