"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Select, Field, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, ME, useStore } from "../shared";

export default function Versions() {
  const [s, update] = useStore();
  const [fileId, setFileId] = useState("f1");
  const [notice, setNotice] = useState(null);

  const file = s.files.find((f) => f.id === fileId) || null;

  function restore(v) {
    if (!file) return;
    const version = file.versions.find((x) => x.v === v);
    if (!version) return;
    update((st) => {
      const f = st.files.find((x) => x.id === fileId);
      if (!f) return st;
      f.content = version.content;
      // Restoring is itself an edit, so it gets its own version entry — the same
      // way Dropbox keeps the newer versions rather than throwing them away.
      f.versions.push({
        v: f.versions.length + 1, at: "now", by: ME,
        content: version.content, note: `Restored from version ${v}`,
      });
      return st;
    });
    setNotice({ tone: "ok", msg: `${file.name} restored to version ${v}.` });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Version history" sub="Restore an earlier version and the content reverts" wide>
        {notice && <Banner tone={notice.tone} testId="restore-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="File">
          <Field label="File">
            <Select value={fileId} data-testid="version-file" aria-label="File"
                    onChange={(e) => setFileId(e.target.value)}>
              {s.files.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </Select>
          </Field>
          {!file && <Empty>Pick a file.</Empty>}
          {file && (
            <>
              <Row label="Current version" value={file.versions.length} testId="current-version" />
              <pre className="ck-tile" data-testid="current-content" style={{ whiteSpace: "pre-wrap" }}>{file.content}</pre>
            </>
          )}
        </Card>

        {file && (
          <Card title="Versions" testId="version-list">
            {file.versions.map((v) => (
              <div key={v.v} className="ck-row" data-testid={`version-${v.v}`}>
                <span>
                  <strong>Version {v.v}</strong> <span className="ck-muted">{v.at} · {v.by}</span>
                  {v.note && <Badge tone="info">{v.note}</Badge>}
                  <pre className="ck-muted" style={{ whiteSpace: "pre-wrap", margin: 0 }}
                       data-testid={`version-content-${v.v}`}>{v.content}</pre>
                </span>
                <Btn size="sm" variant="secondary" data-testid={`restore-${v.v}`}
                     disabled={v.v === file.versions.length}
                     onClick={() => restore(v.v)}>
                  {v.v === file.versions.length ? "Current" : "Restore"}
                </Btn>
              </div>
            ))}
          </Card>
        )}
      </Page>
    </Shell>
  );
}
