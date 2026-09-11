"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Modal, Field, Select, Alert, KV, Badge } from "@/app/components/eval/ui";

const seed = () => ({ status: "In Review", resolution: "", fixVersion: "", history: [] });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [open, setOpen] = useState(false); const [f, setF] = useState({ resolution: "", fixVersion: "" }); const [errs, setErrs] = useState({});
  function done() {
    const e = {};
    if (!f.resolution) e.resolution = "Resolution is required.";
    if (!f.fixVersion) e.fixVersion = "Fix version/s is required to close a Bug.";
    setErrs(e);
    if (Object.keys(e).length) return;
    set({ status: "Done", resolution: f.resolution, fixVersion: f.fixVersion, history: [{ text: `Demo User changed Status from ${s.status} to Done (Resolution: ${f.resolution})`, when: "just now" }, ...s.history] }); setOpen(false);
  }
  return (
    <SaasShell flow={flow} nav={["Your work", "Projects · Website", "Board"]} active="Projects · Website" title="WEB-123 · Payment webhook retries" sub="Bug · Priority Highest">
      <Card data-testid="issue">
        <div className="ee-row ee-row--between"><KV k="Status" v={<Badge tone={s.status === "Done" ? "ok" : "info"} data-testid="issue-status">{s.status}</Badge>} />{s.status !== "Done" && <div className="ee-row"><Btn size="sm" variant="secondary" onClick={() => set({ ...s, status: "In Progress" })}>Back to In Progress</Btn><Btn size="sm" onClick={() => { setErrs({}); setOpen(true); }} data-testid="transition-done">Done</Btn></div>}</div>
        <KV k="Resolution" v={<span data-testid="issue-resolution">{s.resolution || "Unresolved"}</span>} /><KV k="Fix version/s" v={<span data-testid="issue-fixversion">{s.fixVersion || "None"}</span>} />
        {s.history.length > 0 && <div className="ee-small" style={{ marginTop: 8 }} data-testid="issue-history">{s.history[0].text}</div>}
      </Card>
      <Modal open={open} title="Transition: Done" onClose={() => setOpen(false)}>
        <div className="ee-stack" data-testid="transition-screen">
          <div className="ee-small ee-muted">This transition requires the fields below.</div>
          <Field label="Resolution *" htmlFor="tr-res" error={errs.resolution}><Select id="tr-res" value={f.resolution} onChange={(e) => setF({ ...f, resolution: e.target.value })} invalid={!!errs.resolution}><option value="">None</option>{["Fixed", "Won't Do", "Duplicate", "Cannot Reproduce"].map((x) => <option key={x}>{x}</option>)}</Select></Field>
          <Field label="Fix version/s *" htmlFor="tr-fix" error={errs.fixVersion}><Select id="tr-fix" value={f.fixVersion} onChange={(e) => setF({ ...f, fixVersion: e.target.value })} invalid={!!errs.fixVersion}><option value="">None</option>{["2026.09", "2026.10"].map((x) => <option key={x}>{x}</option>)}</Select></Field>
          {Object.keys(errs).length > 0 && <Alert tone="err" data-testid="transition-error">This transition is blocked until the required fields are completed.</Alert>}
          <div className="ee-row ee-row--end"><Btn variant="secondary" onClick={() => setOpen(false)}>Cancel</Btn><Btn onClick={done} data-testid="transition-confirm">Done</Btn></div>
        </div>
      </Modal>
    </SaasShell>
  );
}
