"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Textarea, Field, Radio, Badge, Banner, Row } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, VISIBILITY, CHANNEL, ME, useStore, nextId } from "../shared";

const PROCESS_MS = 2000;

export default function Upload() {
  const [s, update] = useStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("unlisted");
  const [error, setError] = useState(null);
  const [uploadedId, setUploadedId] = useState(null);

  const uploaded = uploadedId ? s.videos.find((v) => v.id === uploadedId) : null;

  // A real upload is not watchable the instant it lands, so this one processes
  // for a beat before it flips to Ready. There is a manual check too, for tests
  // that would rather not wait on a timer.
  useEffect(() => {
    if (!uploadedId) return;
    const t = setTimeout(() => {
      update((st) => {
        const v = st.videos.find((x) => x.id === uploadedId);
        if (v && v.status === "Processing") v.status = "Ready";
        return st;
      });
    }, PROCESS_MS);
    return () => clearTimeout(t);
  }, [uploadedId, update]);

  function submit() {
    if (!title.trim()) { setError("A video needs a title."); return; }
    const id = nextId(s.counter);
    update((st) => {
      st.videos.unshift({
        id, title: title.trim(), description: description.trim(), channel: CHANNEL.name,
        visibility, status: "Processing", views: 0, seconds: 64, uploadedBy: ME.name,
      });
      st.counter += 1;
      return st;
    });
    setError(null);
    setUploadedId(id);
    setTitle(""); setDescription("");
  }

  function checkStatus() {
    update((st) => {
      const v = st.videos.find((x) => x.id === uploadedId);
      if (v) v.status = "Ready";
      return st;
    });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Upload a video" sub={`Publishing to ${CHANNEL.name}`}>
        {error && <Banner tone="bad" testId="upload-error">{error}</Banner>}

        {!uploaded && (
          <Card title="Details">
            <Field label="Title">
              <Input value={title} placeholder="Shop tour — September" data-testid="video-title"
                     aria-label="Title" onChange={(e) => setTitle(e.target.value)} />
            </Field>
            <Field label="Description" hint="Optional">
              <Textarea value={description} data-testid="video-description" aria-label="Description"
                        onChange={(e) => setDescription(e.target.value)} />
            </Field>
            <Field label="Visibility">
              {VISIBILITY.map((v) => (
                <Radio key={v.id} name="visibility" checked={visibility === v.id} label={v.label} detail={v.detail}
                       testId={`visibility-${v.id}`} onChange={() => setVisibility(v.id)} />
              ))}
            </Field>
            <div className="ck-card-actions">
              <Btn onClick={submit} data-testid="publish">Upload</Btn>
            </div>
          </Card>
        )}

        {uploaded && (
          <Card title={uploaded.status === "Ready" ? "Upload complete" : "Processing"}
                tone={uploaded.status === "Ready" ? "ok" : "warn"} testId="upload-result">
            <Row label="Title" value={uploaded.title} testId="uploaded-title" />
            <Row label="Visibility" value={uploaded.visibility} testId="uploaded-visibility" />
            <Row label="Status" value={uploaded.status} testId="uploaded-status" />
            <Badge tone={uploaded.status === "Ready" ? "ok" : "warn"} testId="processing-badge">
              {uploaded.status === "Ready" ? "Ready to play" : "Still processing — this takes a moment"}
            </Badge>
            <div className="ck-card-actions">
              {uploaded.status !== "Ready" && (
                <Btn variant="secondary" onClick={checkStatus} data-testid="check-status">Check status</Btn>
              )}
              {uploaded.status === "Ready" && (
                <Link href={`${BASE}/watch/${uploaded.id}`} className="ck-btn ck-btn--primary" data-testid="watch-uploaded">
                  Watch it
                </Link>
              )}
              <Btn variant="ghost" onClick={() => setUploadedId(null)} data-testid="upload-another">Upload another</Btn>
            </div>
          </Card>
        )}
      </Page>
    </Shell>
  );
}
