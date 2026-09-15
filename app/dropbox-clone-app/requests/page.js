"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Select, Field, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, ME, useStore, token } from "../shared";

export default function Requests() {
  const [s, update] = useStore();
  const [title, setTitle] = useState("Send us your headshot");
  const [folder, setFolder] = useState("launch");
  const [made, setMade] = useState(null);

  function create() {
    const t = token("r", s.fileRequests.length);
    const req = { token: t, title: title.trim() || "File request", folder, by: ME, uploads: [] };
    update((st) => { st.fileRequests.push(req); return st; });
    setMade(req);
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="File requests" sub="Collect files from people who do not have an account">
        {made && (
          <Banner tone="ok" title="File request created" testId="request-created" onClose={() => setMade(null)}>
            <span data-testid="request-link">{`${BASE}/r/${made.token}`}</span>{" "}
            <Link href={`${BASE}/r/${made.token}`} data-testid="open-request">Open it as a guest</Link>
          </Banner>
        )}

        <Card title="New request">
          <Field label="What are you asking for">
            <Input value={title} data-testid="request-title" aria-label="Request title"
                   onChange={(e) => setTitle(e.target.value)} />
          </Field>
          <Field label="Files land in">
            <Select value={folder} data-testid="request-folder" aria-label="Target folder"
                    onChange={(e) => setFolder(e.target.value)}>
              {Object.values(s.folders).map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </Select>
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={create} data-testid="create-request">Create request</Btn>
          </div>
        </Card>

        <Card title="Open requests" testId="request-list">
          <Row label="Requests" value={s.fileRequests.length} testId="request-count" />
          {s.fileRequests.length === 0 && <Empty>No file requests yet.</Empty>}
          {s.fileRequests.map((r) => (
            <div key={r.token} className="ck-row" data-testid={`request-${r.token}`}>
              <span>
                <strong>{r.title}</strong>
                <div className="ck-muted">Uploads go to {s.folders[r.folder].name}</div>
              </span>
              <span>
                <Badge tone={r.uploads.length ? "ok" : "neutral"} testId={`uploads-${r.token}`}>
                  {r.uploads.length} received
                </Badge>{" "}
                <Link href={`${BASE}/r/${r.token}`} className="ck-btn ck-btn--ghost ck-btn--sm">Guest page</Link>
              </span>
            </div>
          ))}
        </Card>

        <Card title="Files received through requests" testId="received-files">
          {s.files.filter((f) => f.viaRequest).length === 0 && <Empty>Nothing yet.</Empty>}
          {s.files.filter((f) => f.viaRequest).map((f) => (
            <Row key={f.id} label={f.name} value={`${s.folders[f.folder].name} · from ${f.owner}`}
                 testId={`received-${f.id}`} />
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
