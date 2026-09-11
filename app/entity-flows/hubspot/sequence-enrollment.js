"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Modal, Select, Field, Badge, Timeline, Alert, KV } from "@/app/components/eval/ui";

const SEQS = [{ id: "s1", name: "Inbound demo follow-up", steps: 4 }, { id: "s2", name: "Webinar no-show nurture", steps: 3 }];
const seed = () => ({ enrolled: null, timeline: [{ title: "Contact created", meta: "Sep 10, 2026 · Form: Ebook download", state: "done" }, { title: "Email opened: Growth Playbook", meta: "Sep 11, 2026", state: "done" }] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [open, setOpen] = useState(false); const [seq, setSeq] = useState("s1"); const [err, setErr] = useState(null);
  function enroll() {
    const q = SEQS.find((x) => x.id === seq);
    set({ enrolled: { ...q, status: "Active", step: 1, next: "Sep 15, 2026 · 9:00 AM" }, timeline: [{ title: `Enrolled in sequence: ${q.name}`, meta: "Sep 14, 2026 · by Demo User", state: "active" }, ...s.timeline] });
    setOpen(false);
  }
  return (
    <SaasShell flow={flow} nav={["Contacts", "Companies", "Deals", "Sequences"]} active="Contacts" title="Maria Chen" sub="maria@globex.test · Globex">
      <div className="ee-split">
        <Card title="Activity timeline" data-testid="timeline"><Timeline items={s.timeline} /></Card>
        <Card title="Sequences" data-testid="sequence-panel">
          {s.enrolled ? (<div className="ee-stack" data-testid="sequence-active">
            <Badge tone="ok" data-testid="sequence-status">Sequence active</Badge>
            <KV k="Sequence" v={s.enrolled.name} testId="sequence-name" /><KV k="Step" v={`1 of ${s.enrolled.steps}`} /><KV k="Next email" v={s.enrolled.next} />
            <Btn variant="secondary" size="sm" onClick={() => set({ ...s, enrolled: { ...s.enrolled, status: "Paused" } })}>Pause</Btn>
          </div>) : (<>
            <div className="ee-small ee-muted" style={{ marginBottom: 10 }}>Not enrolled in any sequence.</div>
            <Btn onClick={() => setOpen(true)} data-testid="enroll-open">Enroll in sequence</Btn>
          </>)}
          {err && <Alert tone="err">{err}</Alert>}
        </Card>
      </div>
      <Modal open={open} title="Enroll Maria Chen in a sequence" onClose={() => setOpen(false)}>
        <div className="ee-stack" data-testid="enroll-modal">
          <Field label="Sequence" htmlFor="sq-pick"><Select id="sq-pick" value={seq} onChange={(e) => setSeq(e.target.value)}>{SEQS.map((q) => <option key={q.id} value={q.id}>{q.name} · {q.steps} steps</option>)}</Select></Field>
          <Field label="Send from"><Select value="me" readOnly aria-label="Send from"><option value="me">Demo User (demo@evals.dev)</option></Select></Field>
          <Btn onClick={enroll} data-testid="enroll-confirm">Enroll</Btn>
        </div>
      </Modal>
    </SaasShell>
  );
}
