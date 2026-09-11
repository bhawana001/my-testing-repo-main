"use client";
import { useState } from "react";
import { sendEmail } from "@/lib/inbox";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Badge, Modal, Textarea, Alert, Segment } from "@/app/components/eval/ui";
import { TrackerTimeline } from "@/app/components/engines/Tracker";

const seed = () => ({ as: "signer", status: "Delivered", reason: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [open, setOpen] = useState(false); const [reason, setReason] = useState(""); const [err, setErr] = useState(null);
  const steps = [{ id: "sent", title: "Sent", at: "Sep 14, 9:00 AM" }, { id: "delivered", title: "Delivered to Sam Lee", at: "Sep 14, 9:02 AM" }, { id: "final", title: s.status === "Declined" ? `Declined by Sam Lee: “${s.reason}”` : "Awaiting signature", at: s.status === "Declined" ? "Sep 14, 10:05 AM" : "" }];
  return (
    <SaasShell flow={flow} nav={["Home", "Agreements", "Templates"]} active="Agreements" title="Vendor-Agreement.pdf" actions={<Segment options={[{ value: "signer", label: "Signer (Sam Lee)" }, { value: "sender", label: "Sender (Demo User)" }]} value={s.as} onChange={(v) => set({ ...s, as: v })} />}>
      {s.as === "signer" ? (
        <Card data-testid="signer-view">
          {s.status === "Declined" ? <Alert tone="info" data-testid="signer-declined">You declined to sign this document.</Alert> : (<>
            <div className="ee-row ee-row--between"><span className="ee-strong">Review and sign · Vendor-Agreement.pdf</span><div className="ee-row"><Btn variant="secondary" size="sm" onClick={() => setOpen(true)} data-testid="decline">Other actions ▾ Decline to sign</Btn><Btn size="sm">Finish</Btn></div></div>
            <div className="ee-card ee-card--flat" style={{ marginTop: 10, minHeight: 140 }}>Vendor Agreement between Acme Inc and Sam Lee Consulting…</div>
          </>)}
        </Card>
      ) : (
        <div className="ee-split">
          <Card title="Envelope status" right={<Badge tone={s.status === "Declined" ? "err" : "info"} data-testid="sender-status">{s.status}</Badge>} data-testid="sender-view">
            <TrackerTimeline steps={steps} currentIndex={s.status === "Declined" ? 3 : 2} testIdPrefix="env" />
            {s.reason && <div className="ee-small" data-testid="decline-reason">Reason: {s.reason}</div>}
          </Card>
          <Card title="Inbox · demo@evals.dev (simulated)" data-testid="sender-inbox">
            {s.status === "Declined" ? <div className="ee-card ee-card--flat ee-card--tight" data-testid="decline-email"><div className="ee-strong">Sam Lee declined to sign Vendor-Agreement.pdf</div><div className="ee-small">Reason: “{s.reason}”</div></div> : <div className="ee-empty">No new notifications.</div>}
          </Card>
        </div>
      )}
      <Modal open={open} title="Decline to sign" onClose={() => setOpen(false)}>
        <div className="ee-stack" data-testid="decline-modal">
          <Textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Please provide a reason" aria-label="Decline reason" />
          {err && <Alert tone="err">{err}</Alert>}
          <Btn variant="danger" onClick={() => { if (!reason.trim()) { setErr("A reason is required to decline."); return; } setErr(null); sendEmail({ to: "demo@evals.dev", subject: "Sam Lee declined to sign Vendor-Agreement.pdf", body: `Reason: ${reason.trim()}`, from: "dse@docusigned.evals.dev", flow: "docusign/decline-void" }); set({ ...s, status: "Declined", reason: reason.trim() }); setOpen(false); }} data-testid="decline-confirm">Decline to sign</Btn>
        </div>
      </Modal>
    </SaasShell>
  );
}
