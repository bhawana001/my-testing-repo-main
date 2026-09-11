"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Field, Input, Select, KV, Alert, Spinner, useDelay } from "@/app/components/eval/ui";

const seed = () => ({ account: { name: "Globex Corporation", phone: "(555) 010-4400", industry: "Manufacturing", employees: "1200", rating: "Warm" }, editing: false });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const delay = useDelay();
  const [draft, setDraft] = useState(null); const [overlay, setOverlay] = useState(null); const [saved, setSaved] = useState(false);
  async function edit() { setOverlay("Loading record…"); await delay(700); setOverlay(null); setDraft({ ...s.account }); set({ ...s, editing: true }); setSaved(false); }
  async function save() { setOverlay("Saving…"); await delay(900); setOverlay("Refreshing…"); await delay(500); setOverlay(null); set({ account: { ...draft }, editing: false }); setSaved(true); }
  const a = s.account;
  return (
    <SaasShell flow={flow} nav={["Home", "Accounts", "Contacts", "Opportunities"]} active="Accounts" title={a.name} sub="Account">
      <div style={{ position: "relative" }}>
        {overlay && <div data-testid="loading-overlay" style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,.75)", zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, borderRadius: 12 }}><Spinner /> <span className="ee-strong">{overlay}</span></div>}
        <Card title="Details" right={!s.editing && <Btn size="sm" variant="secondary" onClick={edit} data-testid="edit-account">Edit</Btn>} data-testid="account-details">
          {saved && <Alert tone="ok" data-testid="save-toast">Account "{a.name}" was saved.</Alert>}
          {!s.editing ? (
            <div className="ee-grid ee-grid--2" style={{ marginTop: 8 }}>
              <KV k="Account Name" v={a.name} /><KV k="Phone" v={<span data-testid="phone-value">{a.phone}</span>} /><KV k="Industry" v={<span data-testid="industry-value">{a.industry}</span>} /><KV k="Employees" v={a.employees} /><KV k="Rating" v={a.rating} />
            </div>
          ) : (
            <div className="ee-grid ee-grid--2" data-testid="edit-form">
              <Field label="Account Name" htmlFor="ac-name"><Input id="ac-name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></Field>
              <Field label="Phone" htmlFor="ac-phone"><Input id="ac-phone" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} /></Field>
              <Field label="Industry" htmlFor="ac-industry"><Select id="ac-industry" value={draft.industry} onChange={(e) => setDraft({ ...draft, industry: e.target.value })}>{["Manufacturing", "Technology", "Healthcare", "Retail", "Finance"].map((x) => <option key={x}>{x}</option>)}</Select></Field>
              <Field label="Employees" htmlFor="ac-emp"><Input id="ac-emp" value={draft.employees} onChange={(e) => setDraft({ ...draft, employees: e.target.value })} /></Field>
              <div className="ee-row" style={{ gridColumn: "1 / -1" }}><Btn variant="secondary" onClick={() => set({ ...s, editing: false })}>Cancel</Btn><Btn onClick={save} data-testid="save-account">Save</Btn></div>
            </div>
          )}
        </Card>
      </div>
    </SaasShell>
  );
}
