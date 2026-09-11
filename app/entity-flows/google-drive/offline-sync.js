"use client";
import { useEffect, useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Badge, Textarea, Alert } from "@/app/components/eval/ui";

const seed = () => ({ online: true, local: "Trip checklist\n- Passport\n- Chargers", server: "Trip checklist\n- Passport\n- Chargers", pending: false, lastSync: "Sep 14, 9:58 AM" });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [syncing, setSyncing] = useState(false);
  useEffect(() => { if (!syncing) return; const t = setTimeout(() => { setSyncing(false); set((st) => ({ ...st, server: st.local, pending: false, lastSync: "Sep 14, 10:05 AM" })); }, 900); return () => clearTimeout(t); }, [syncing, set]);
  function edit(v) { set((st) => ({ ...st, local: v, pending: !st.online ? true : st.pending, server: st.online ? v : st.server })); }
  const status = syncing ? "Syncing…" : !s.online ? (s.pending ? "Offline · changes saved on this device" : "Offline") : "All changes saved in Drively";
  return (
    <SaasShell flow={flow} nav={["My Drive", "Offline files"]} active="Offline files" title="📝 Trip checklist" actions={<div className="ee-row"><Badge tone={s.online ? "ok" : "warn"} data-testid="network-state">{s.online ? "Online" : "Offline"}</Badge>{s.online ? <Btn size="sm" variant="secondary" onClick={() => set({ ...s, online: false })} data-testid="go-offline">Go offline</Btn> : <Btn size="sm" onClick={() => { set({ ...s, online: true }); if (s.pending) setSyncing(true); }} data-testid="reconnect">Reconnect</Btn>}</div>}>
      <div className="ee-split ee-split--even">
        <Card title="This device" data-testid="local-doc">
          <Textarea value={s.local} onChange={(e) => edit(e.target.value)} aria-label="Document body" style={{ minHeight: 180 }} data-testid="doc-body" />
          <div className="ee-small" style={{ marginTop: 6 }} data-testid="save-status"><Badge tone={syncing ? "info" : s.pending ? "warn" : "ok"}>{status}</Badge></div>
        </Card>
        <Card title="Drively server copy" data-testid="server-doc">
          <pre className="ee-mono ee-small" style={{ whiteSpace: "pre-wrap", margin: 0 }} data-testid="server-content">{s.server}</pre>
          <div className="ee-tiny ee-muted" style={{ marginTop: 6 }} data-testid="last-sync">Last synced {s.lastSync}</div>
          {!s.online && s.pending && <Alert tone="warn">The server hasn't received your offline edits yet.</Alert>}
        </Card>
      </div>
    </SaasShell>
  );
}
