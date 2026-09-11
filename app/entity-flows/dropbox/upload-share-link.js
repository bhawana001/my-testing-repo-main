"use client";
import { useEffect, useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Table, Modal, Select, Badge, Alert } from "@/app/components/eval/ui";

const seed = () => ({ files: [{ id: "f1", name: "Brand-guidelines.pdf", size: "4.1 MB", modified: "Sep 10" }], link: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [share, setShare] = useState(null); const [perm, setPerm] = useState("Can view"); const [shared, setShared] = useState(null);
  useEffect(() => { setShared(new URLSearchParams(window.location.search).get("s")); }, []);
  if (shared) {
    const ok = s.link && s.link.token === shared;
    return (
      <main className="ee-main ee-main--narrow" data-testid="anon-viewer">
        {ok ? (<Card>
          <div className="ee-row ee-row--between"><span className="ee-strong">📄 {s.link.file}</span><Badge tone="info" data-testid="anon-permission">Viewing as guest · {s.link.perm}</Badge></div>
          <div className="ee-card ee-card--flat" style={{ minHeight: 180, marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center" }} data-testid="anon-preview">PDF preview · Q3 report · page 1 of 6</div>
          <div className="ee-row" style={{ marginTop: 10 }}><Btn size="sm" variant="secondary">Download</Btn><span className="ee-small ee-muted" data-testid="anon-no-edit">Editing and deleting are not available on view-only links.</span></div>
        </Card>) : <Alert tone="err" data-testid="anon-missing">This link doesn't exist or was disabled.</Alert>}
      </main>
    );
  }
  function upload() { if (s.files.some((f) => f.name === "Q3-report.pdf")) return; set({ ...s, files: [...s.files, { id: "f2", name: "Q3-report.pdf", size: "1.2 MB", modified: "Just now" }] }); }
  function create() { const token = "k3x9q2"; set({ ...s, link: { file: share.name, perm, token, url: `https://dropboxy.test/s/${token}/${share.name}?dl=0` } }); setShare(null); }
  return (
    <SaasShell flow={flow} nav={["Home", "All files", "Shared", "File requests"]} active="All files" title="All files" actions={<Btn size="sm" onClick={upload} data-testid="upload">⬆ Upload sample Q3-report.pdf</Btn>}>
      <Card data-testid="file-list">
        <Table cols={[{ key: "name", label: "Name", render: (r) => <span data-testid={`file-${r.id}`}>📄 {r.name}</span> }, { key: "size", label: "Size" }, { key: "modified", label: "Modified" }, { key: "x", label: "", align: "right", render: (r) => <Btn size="sm" variant="secondary" onClick={() => setShare(r)} data-testid={`share-${r.id}`}>Share</Btn> }]} rows={s.files} rowKey={(r) => r.id} />
      </Card>
      {s.link && (
        <Card title="Link created" style={{ marginTop: 14 }} data-testid="link-card">
          <div className="ee-mono ee-small" style={{ wordBreak: "break-all" }} data-testid="share-url">{s.link.url}</div>
          <div className="ee-row" style={{ marginTop: 8 }}><Badge tone="info" data-testid="link-perm">{s.link.perm}</Badge><Btn size="sm" onClick={() => { window.location.href = `${window.location.pathname}?s=${s.link.token}`; }} data-testid="open-anon">Open link as anonymous viewer</Btn></div>
        </Card>
      )}
      <Modal open={!!share} title={share ? `Share “${share.name}”` : ""} onClose={() => setShare(null)}>
        <div className="ee-stack" data-testid="share-modal">
          <div className="ee-small">Anyone with the link</div>
          <Select value={perm} onChange={(e) => setPerm(e.target.value)} aria-label="Link permission"><option>Can view</option><option>Can edit</option></Select>
          <Btn onClick={create} data-testid="create-link">Create link</Btn>
        </div>
      </Modal>
    </SaasShell>
  );
}
