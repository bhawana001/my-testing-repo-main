"use client";
import { use, useState } from "react";
import { Shell, Page, Card, Btn, Input, Field, Banner, Row, Empty } from "../../../clones/kit/ui";
import { BRAND, useStore, nextId } from "../../shared";

/** The guest side of a file request: no account, one upload box. */
export default function RequestUpload({ params }) {
  const { token: t } = use(params);
  const [s, update] = useStore();
  const [name, setName] = useState("");
  const [who, setWho] = useState("");
  const [done, setDone] = useState(null);
  const [error, setError] = useState(null);

  const req = s.fileRequests.find((r) => r.token === t) || null;

  function send() {
    if (!name.trim() || !who.trim()) { setError("Your name and a file name are both needed."); return; }
    const id = nextId(s.counter);
    const file = {
      id, name: name.trim(), folder: req.folder, owner: who.trim(), size: "8 KB",
      viaRequest: req.token,
      content: `Uploaded by ${who.trim()} in response to “${req.title}”.`,
      versions: [{ v: 1, at: "now", by: who.trim(), content: `Uploaded by ${who.trim()}.` }],
    };
    update((st) => {
      st.files.push(file);
      const target = st.fileRequests.find((r) => r.token === t);
      if (target) target.uploads.push({ name: file.name, by: file.owner, at: "now" });
      st.counter += 1;
      return st;
    });
    setError(null);
    setDone({ file, folder: s.folders[req.folder].name });
  }

  if (!req) {
    return (
      <Shell brand={BRAND}>
        <Page title="Request not found"><Empty>This file request link is not valid.</Empty></Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <Page title={req.title} sub={`${req.by} is asking you for a file`}>
        {error && <Banner tone="bad" testId="request-error">{error}</Banner>}

        {!done && (
          <Card title="Upload" testId="guest-upload-form">
            <Field label="Your name">
              <Input value={who} placeholder="Sam Rivera" data-testid="guest-name" aria-label="Your name"
                     onChange={(e) => setWho(e.target.value)} />
            </Field>
            <Field label="File name">
              <Input value={name} placeholder="headshot.jpg" data-testid="guest-file" aria-label="File name"
                     onChange={(e) => setName(e.target.value)} />
            </Field>
            <div className="ck-card-actions">
              <Btn onClick={send} data-testid="guest-send">Upload</Btn>
            </div>
          </Card>
        )}

        {done && (
          <Card title="Thanks — your file was sent" tone="ok" testId="guest-confirmation">
            <Row label="File" value={done.file.name} testId="uploaded-name" />
            <Row label="Landed in" value={done.folder} testId="uploaded-folder" />
            <Row label="Uploaded by" value={done.file.owner} />
          </Card>
        )}
      </Page>
    </Shell>
  );
}
