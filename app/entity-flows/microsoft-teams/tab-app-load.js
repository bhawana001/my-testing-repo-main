"use client";
import { useEffect, useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Segment, Skeleton, Badge, Alert } from "@/app/components/eval/ui";
import { Message } from "@/app/components/engines/Feed";

const COLS = [{ t: "To do", items: ["Onboarding copy", "Billing edge cases"] }, { t: "In progress", items: ["Usage meter API"] }, { t: "Done", items: ["Pricing page"] }];
const seed = () => ({ tab: "Posts" });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { if (s.tab !== "Sprint Board") { setLoaded(false); return; } const chaos = new URLSearchParams(window.location.search).get("chaos") === "true"; const t = setTimeout(() => setLoaded(true), chaos ? 4000 : 900); return () => clearTimeout(t); }, [s.tab]);
  return (
    <SaasShell flow={flow} nav={["Activity", "Chat", "Teams", "Apps"]} active="Teams" title="Product Team › General">
      <Segment options={["Posts", "Files", "Sprint Board"]} value={s.tab} onChange={(v) => set({ tab: v })} />
      <div style={{ height: 12 }} />
      {s.tab === "Posts" && <Card><Message msg={{ id: "m", author: "Priya Nair", time: "9:00 AM", text: "Added the Sprint Board app as a tab 👆" }} /></Card>}
      {s.tab === "Files" && <Card><div className="ee-small">📄 Q3 plan.docx · 📊 Metrics.xlsx</div></Card>}
      {s.tab === "Sprint Board" && (
        <Card data-testid="tab-frame">
          <div className="ee-row ee-row--between ee-small" style={{ marginBottom: 10 }}><span className="ee-mono ee-muted">https://apps.acme.test/sprint-board?team=product</span>{loaded ? <Badge tone="ok" data-testid="app-status">App loaded · v2.3.1</Badge> : <Badge data-testid="app-status">Loading app…</Badge>}</div>
          {!loaded ? <div className="ee-stack" data-testid="app-skeleton"><Skeleton h={24} w="40%" /><Skeleton h={120} /><Skeleton h={120} /></div> : (
            <div data-testid="app-content">
              <div className="ee-strong" style={{ marginBottom: 8 }}>Sprint 38 · Sep 14 – Sep 25</div>
              <div className="ee-kanban">{COLS.map((c) => <div key={c.t} className="ee-kanban__col" style={{ minHeight: 120 }}><div className="ee-kanban__head"><span>{c.t}</span><span>{c.items.length}</span></div>{c.items.map((i) => <div key={i} className="ee-kanban__card">{i}</div>)}</div>)}</div>
              <Alert tone="ok">Connected to Teamz as Demo User. No errors.</Alert>
            </div>
          )}
        </Card>
      )}
    </SaasShell>
  );
}
