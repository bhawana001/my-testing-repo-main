"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Modal, Input, Select, Badge, Alert, Segment, Textarea } from "@/app/components/eval/ui";
import { isValidEmail } from "@/lib/seed";

const seed = () => ({ as: "owner", access: [{ email: "demo@evals.dev", role: "Owner" }], body: "Q4 planning notes\n\n- Hiring: 2 support engineers\n- Launch EU region", comments: [] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [open, setOpen] = useState(false); const [email, setEmail] = useState(""); const [role, setRole] = useState("Commenter"); const [err, setErr] = useState(null); const [c, setC] = useState("");
  const sam = s.access.find((a) => a.email === "sam@acme.test");
  const myRole = s.as === "owner" ? "Owner" : sam ? sam.role : null;
  const canEdit = myRole === "Owner" || myRole === "Editor";
  const canComment = canEdit || myRole === "Commenter";
  function share() { if (!isValidEmail(email)) { setErr("Enter a valid email."); return; } setErr(null); set({ ...s, access: [...s.access.filter((a) => a.email !== email.trim()), { email: email.trim(), role }] }); setOpen(false); setEmail(""); }
  return (
    <SaasShell flow={flow} nav={["My Drive", "Shared with me", "Recent"]} active={s.as === "owner" ? "My Drive" : "Shared with me"} title="📝 Q4 planning" actions={<div className="ee-row"><Segment options={[{ value: "owner", label: "Owner" }, { value: "sam", label: "View as Sam" }]} value={s.as} onChange={(v) => set({ ...s, as: v })} />{s.as === "owner" && <Btn size="sm" onClick={() => setOpen(true)} data-testid="share-btn">Share</Btn>}</div>}>
      {s.as === "sam" && !myRole && <Alert tone="err" data-testid="no-access">You need access. Ask the owner to share this file with sam@acme.test.</Alert>}
      {myRole && (<div className="ee-split">
        <Card data-testid="doc">
          {s.as === "sam" && <div style={{ marginBottom: 8 }} data-testid="role-banner"><Badge tone={canEdit ? "ok" : "warn"}>{canEdit ? "You can edit" : canComment ? "You can comment on this file, but not edit it" : "View only"}</Badge></div>}
          <Textarea value={s.body} onChange={(e) => canEdit && set({ ...s, body: e.target.value })} readOnly={!canEdit} aria-label="Document body" style={{ minHeight: 200, fontFamily: "Georgia, serif" }} data-testid="doc-body" />
          <div className="ee-tiny ee-muted" data-testid="edit-state">{canEdit ? "Editing enabled" : "Editing disabled (read-only)"}</div>
        </Card>
        <Card title="Comments" data-testid="comments">
          {s.comments.map((x, i) => <div key={i} className="ee-small" data-testid={`comment-${i}`}><b>{x.by}</b>: {x.text}</div>)}
          {canComment ? <div className="ee-row" style={{ marginTop: 8 }}><Input value={c} onChange={(e) => setC(e.target.value)} placeholder="Add a comment" aria-label="Add a comment" style={{ flex: 1 }} /><Btn size="sm" disabled={!c.trim()} onClick={() => { set({ ...s, comments: [...s.comments, { by: s.as === "owner" ? "Demo User" : "Sam Lee", text: c.trim() }] }); setC(""); }} data-testid="add-comment">Comment</Btn></div> : <div className="ee-tiny ee-muted">Commenting is disabled.</div>}
          <div className="ee-divider" /><div className="ee-strong ee-small">People with access</div>
          <div data-testid="access-list">{s.access.map((a) => <div key={a.email} className="ee-small">{a.email} · <b>{a.role}</b></div>)}</div>
        </Card>
      </div>)}
      <Modal open={open} title="Share “Q4 planning”" onClose={() => setOpen(false)}>
        <div className="ee-stack" data-testid="share-dialog">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Add people" aria-label="Add people" />
          <Select value={role} onChange={(e) => setRole(e.target.value)} aria-label="Role"><option>Viewer</option><option>Commenter</option><option>Editor</option></Select>
          {err && <Alert tone="err">{err}</Alert>}
          <Btn onClick={share} data-testid="share-send">Send</Btn>
        </div>
      </Modal>
    </SaasShell>
  );
}
