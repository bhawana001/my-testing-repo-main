"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Badge, Alert } from "@/app/components/eval/ui";

const V = [
  { v: 1, when: "Sep 1, 2026 · Demo User", content: "Starter: $9/mo\nPro: $29/mo\nBusiness: $99/mo" },
  { v: 2, when: "Sep 8, 2026 · Priya Nair", content: "Starter: $12/mo\nPro: $29/mo\nBusiness: $99/mo" },
  { v: 3, when: "Sep 13, 2026 · Tom Alvarez", content: "Starter: $12/mo\nPro: $35/mo\nBusiness: $120/mo" },
];
const seed = () => ({ versions: V, current: 3, preview: null, restored: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const cur = s.versions.find((x) => x.v === s.current);
  const pv = s.versions.find((x) => x.v === s.preview);
  function restore(v) { const src = s.versions.find((x) => x.v === v); const nv = { v: s.versions.length + 1, when: `Sep 14, 2026 · Demo User (restored from v${v})`, content: src.content }; set({ ...s, versions: [...s.versions, nv], current: nv.v, preview: null, restored: v }); }
  return (
    <SaasShell flow={flow} nav={["Home", "All files"]} active="All files" title="📄 pricing.txt · Version history">
      {s.restored && <Alert tone="ok" data-testid="restored-msg">Restored version {s.restored}. It's now the current version (v{s.current}).</Alert>}
      <div className="ee-split" style={{ marginTop: 10 }}>
        <Card title={`Current content (v${s.current})`} data-testid="current-content"><pre className="ee-mono" style={{ whiteSpace: "pre-wrap", margin: 0 }} data-testid="file-content">{cur.content}</pre></Card>
        <Card title="Versions" data-testid="versions">
          {[...s.versions].reverse().map((x) => (
            <div key={x.v} className="ee-row ee-row--between" style={{ padding: "6px 0", borderBottom: "1px solid var(--ee-border)" }} data-testid={`version-${x.v}`}>
              <span className="ee-small"><b>v{x.v}</b> {x.v === s.current && <Badge tone="ok">Current</Badge>}<div className="ee-tiny ee-muted">{x.when}</div></span>
              <span className="ee-row"><Btn size="sm" variant="ghost" onClick={() => set({ ...s, preview: x.v })} data-testid={`preview-v${x.v}`}>Preview</Btn>{x.v !== s.current && <Btn size="sm" variant="secondary" onClick={() => restore(x.v)} data-testid={`restore-v${x.v}`}>Restore</Btn>}</span>
            </div>
          ))}
          {pv && <div className="ee-card ee-card--flat ee-card--tight" style={{ marginTop: 10 }} data-testid="version-preview"><div className="ee-tiny ee-muted">Preview of v{pv.v}</div><pre className="ee-mono ee-small" style={{ whiteSpace: "pre-wrap", margin: 0 }}>{pv.content}</pre></div>}
        </Card>
      </div>
    </SaasShell>
  );
}
