"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Select, Textarea, Field, Badge, Banner, Row } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, ME, useStore, nextId, token } from "../shared";

export default function Files() {
  const [s, update] = useStore();
  const [name, setName] = useState("");
  const [folder, setFolder] = useState("launch");
  const [content, setContent] = useState("");
  const [notice, setNotice] = useState(null);
  const [link, setLink] = useState(null);

  function upload() {
    if (!name.trim()) { setNotice({ tone: "bad", msg: "Give the file a name." }); return; }
    const id = nextId(s.counter);
    const body = content.trim() || "Uploaded from the Dropbaks web app.";
    update((st) => {
      st.files.push({
        id, name: name.trim(), folder, owner: ME, size: `${Math.max(1, body.length / 100).toFixed(0)} KB`,
        content: body,
        versions: [{ v: 1, at: "now", by: ME, content: body }],
      });
      st.counter += 1;
      return st;
    });
    setName(""); setContent("");
    setNotice({ tone: "ok", msg: `${name.trim()} uploaded to ${s.folders[folder].name}.` });
  }

  function share(fileId) {
    const file = s.files.find((f) => f.id === fileId);
    if (!file) return;
    // Token built from the count we already hold so the link can be shown now.
    const t = token("s", s.shareLinks.length);
    update((st) => {
      st.shareLinks.push({ token: t, fileId, access: "view", createdBy: ME, views: 0 });
      return st;
    });
    setLink({ token: t, name: file.name });
    setNotice({ tone: "ok", msg: `View-only link created for ${file.name}.` });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Files" sub="Upload, then create a view-only link anyone can open" wide>
        {notice && <Banner tone={notice.tone} testId="file-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}
        {link && (
          <Banner tone="ok" title="Share link ready" testId="share-link-banner">
            <span data-testid="share-link">{`${BASE}/s/${link.token}`}</span>{" "}
            <Link href={`${BASE}/s/${link.token}`} data-testid="open-share-link">Open it as a visitor</Link>
          </Banner>
        )}

        <Card title="Upload a file">
          <Field label="File name">
            <Input value={name} placeholder="press-release.txt" data-testid="upload-name" aria-label="File name"
                   onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Folder">
            <Select value={folder} data-testid="upload-folder" aria-label="Folder"
                    onChange={(e) => setFolder(e.target.value)}>
              {Object.values(s.folders).map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </Select>
          </Field>
          <Field label="Contents" hint="Optional">
            <Textarea value={content} data-testid="upload-content" aria-label="File contents"
                      onChange={(e) => setContent(e.target.value)} />
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={upload} data-testid="upload-file">Upload</Btn>
          </div>
        </Card>

        <Card title="All files" testId="file-list">
          <Row label="File count" value={s.files.length} testId="file-count" />
          <table className="ck-table">
            <thead><tr><th>Name</th><th>Folder</th><th>Owner</th><th>Size</th><th></th></tr></thead>
            <tbody>
              {s.files.map((f) => {
                const existing = s.shareLinks.find((l) => l.fileId === f.id);
                return (
                  <tr key={f.id} data-testid={`file-${f.id}`}>
                    <td data-testid={`file-name-${f.id}`}>{f.name}</td>
                    <td>{s.folders[f.folder].name}</td>
                    <td>{f.owner}</td>
                    <td>{f.size}</td>
                    <td>
                      {existing ? (
                        <Link href={`${BASE}/s/${existing.token}`} className="ck-btn ck-btn--ghost ck-btn--sm"
                              data-testid={`link-${f.id}`}>Open link</Link>
                      ) : (
                        <Btn size="sm" data-testid={`share-${f.id}`} onClick={() => share(f.id)}>Create link</Btn>
                      )}
                      {existing && <Badge tone="info" testId={`access-${f.id}`}>view only</Badge>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </Page>
    </Shell>
  );
}
