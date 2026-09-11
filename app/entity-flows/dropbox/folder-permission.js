"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Select, Badge, Segment, Alert, Input } from "@/app/components/eval/ui";
import { useState } from "react";

const seed = () => ({ as: "owner", teamAccess: "Can view", files: ["Campaign-brief.docx", "Logo-pack.zip"] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [name, setName] = useState("");
  const canEdit = s.as === "owner" || s.teamAccess === "Can edit";
  return (
    <SaasShell flow={flow} nav={["Home", "All files", "Shared"]} active="Shared" title="📁 Marketing" sub="Shared with Team · Acme" actions={<Segment options={[{ value: "owner", label: "Owner (Demo)" }, { value: "priya", label: "View as Priya" }]} value={s.as} onChange={(v) => set({ ...s, as: v })} />}>
      <div className="ee-split">
        <Card title="Files" data-testid="folder-files">
          {s.files.map((f) => <div key={f} className="ee-row ee-row--between" style={{ padding: "4px 0" }}><span>📄 {f}</span><Btn size="sm" variant="secondary" disabled={!canEdit} title={canEdit ? "" : "You have view-only access"}>Rename</Btn></div>)}
          <div className="ee-row" style={{ marginTop: 8 }}><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="New file name" aria-label="New file name" disabled={!canEdit} style={{ flex: 1 }} /><Btn size="sm" disabled={!canEdit || !name.trim()} onClick={() => { set({ ...s, files: [...s.files, name.trim()] }); setName(""); }} data-testid="add-file">Add file</Btn></div>
          <div className="ee-small" style={{ marginTop: 8 }} data-testid="access-note">{s.as === "priya" ? (canEdit ? <Badge tone="ok">You can edit this folder</Badge> : <Badge tone="warn">You have view-only access</Badge>) : <Badge>Owner</Badge>}</div>
        </Card>
        <Card title="Sharing" data-testid="sharing">
          <div className="ee-row ee-row--between"><span>👥 Team · Acme (Priya Nair, Tom Alvarez)</span>{s.as === "owner" ? <Select value={s.teamAccess} onChange={(e) => set({ ...s, teamAccess: e.target.value })} aria-label="Team access" style={{ width: "auto" }}><option>Can view</option><option>Can edit</option></Select> : <Badge>{s.teamAccess}</Badge>}</div>
          {s.as === "owner" && s.teamAccess === "Can edit" && <Alert tone="ok" data-testid="access-updated">Team · Acme can now edit “Marketing”.</Alert>}
        </Card>
      </div>
    </SaasShell>
  );
}
