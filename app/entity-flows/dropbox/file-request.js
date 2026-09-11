"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Field, Input, Select, Badge, Alert, Segment, Table } from "@/app/components/eval/ui";

const seed = () => ({ as: "owner", request: null, folder: { "/Contracts": [{ name: "MSA-2025.pdf", by: "Demo User" }] } });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [title, setTitle] = useState(""); const [dest, setDest] = useState("/Contracts"); const [err, setErr] = useState(null);
  const [gname, setGname] = useState(""); const [gfile, setGfile] = useState(null); const [gerr, setGerr] = useState(null); const [done, setDone] = useState(false);
  function create() { if (!title.trim()) { setErr("Give your request a title."); return; } setErr(null); set({ ...s, request: { title: title.trim(), dest, url: "https://dropboxy.test/request/Rq7Tz2" } }); }
  function upload() { if (!gname.trim() || !gfile) { setGerr("Add your name and choose a file."); return; } setGerr(null); set({ ...s, folder: { ...s.folder, [s.request.dest]: [...(s.folder[s.request.dest] || []), { name: gfile, by: `${gname.trim()} (guest, via file request)` }] } }); setDone(true); }
  return (
    <SaasShell flow={flow} nav={["Home", "All files", "File requests"]} active="File requests" title={s.as === "owner" ? "File requests" : "Upload files · Dropboxy"} actions={<Segment options={[{ value: "owner", label: "Owner" }, { value: "guest", label: "Guest (request link)" }]} value={s.as} onChange={(v) => set({ ...s, as: v })} />}>
      {s.as === "owner" ? (
        <div className="ee-split">
          <Card title="Create a file request" data-testid="request-form">
            {s.request ? (<div className="ee-stack" data-testid="request-created"><Badge tone="ok">Request created</Badge><div className="ee-strong">{s.request.title}</div><div className="ee-small">Files will go to <b>{s.request.dest}</b></div><div className="ee-mono ee-small" data-testid="request-url">{s.request.url}</div></div>) : (<div className="ee-stack">
              <Field label="Title" htmlFor="fr-title"><Input id="fr-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Signed contracts" /></Field>
              <Field label="Destination folder" htmlFor="fr-dest"><Select id="fr-dest" value={dest} onChange={(e) => setDest(e.target.value)}><option>/Contracts</option><option>/Invoices</option></Select></Field>
              {err && <Alert tone="err">{err}</Alert>}
              <Btn onClick={create} data-testid="create-request">Create</Btn>
            </div>)}
          </Card>
          <Card title={`${dest}`} data-testid="destination-folder">
            <Table cols={[{ key: "name", label: "Name" }, { key: "by", label: "Uploaded by" }]} rows={s.folder[s.request?.dest || dest] || []} rowKey={(r) => r.name} empty="Empty folder" />
          </Card>
        </div>
      ) : !s.request ? <Card><div className="ee-empty">No active file request. Create one as the owner first.</div></Card> : (
        <Card style={{ maxWidth: 520 }} data-testid="guest-upload">
          <div className="ee-strong" style={{ fontSize: 18 }}>{s.request.title}</div>
          <div className="ee-small ee-muted" style={{ marginBottom: 10 }}>Demo User is requesting files. You don't need a Dropboxy account.</div>
          {done ? <Alert tone="ok" data-testid="guest-done">Upload complete. Demo User has been notified.</Alert> : (<div className="ee-stack">
            <Field label="Your name" htmlFor="gu-name"><Input id="gu-name" value={gname} onChange={(e) => setGname(e.target.value)} /></Field>
            {gfile ? <Badge tone="info">📄 {gfile}</Badge> : <Btn size="sm" variant="secondary" onClick={() => setGfile("Signed-Contract-Globex.pdf")} data-testid="choose-sample">Choose sample Signed-Contract-Globex.pdf</Btn>}
            {gerr && <Alert tone="err">{gerr}</Alert>}
            <Btn onClick={upload} data-testid="guest-upload-btn">Upload</Btn>
          </div>)}
        </Card>
      )}
    </SaasShell>
  );
}
