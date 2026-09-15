"use client";
import { use, useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Badge, Row, Banner, Empty } from "../../../clones/kit/ui";
import Nav from "../../Nav";
import { BRAND, BASE, useStore, findMeeting, slug } from "../../shared";

export default function Meeting({ params }) {
  const { id } = use(params);
  const [s, update] = useStore();
  const [notice, setNotice] = useState(null);
  const m = findMeeting(s.meetings, id);

  function toggleShare() {
    update((st) => {
      const t = findMeeting(st.meetings, id);
      if (!t) return st;
      t.sharing = t.sharing ? null : { by: "Priya Nair", surface: "Screen 1" };
      t.participants = t.participants.map((p) => ({ ...p, sharing: t.sharing ? p.role === "host" : false }));
      return st;
    });
  }

  function startRecording() {
    update((st) => {
      const t = findMeeting(st.meetings, id);
      if (t) t.recording = { startedAt: "now", to: "cloud" };
      return st;
    });
    setNotice({ tone: "info", msg: "Recording — this meeting is being recorded to the cloud." });
  }

  function stopRecording() {
    // The finished recording is assembled here, outside the updater, so the
    // notice below can name the file the moment it is written.
    const file = {
      id: `rec_${s.recordings.length + 1}`,
      meetingId: m.id, topic: m.topic,
      length: "00:04:12", size: "38.4 MB", storage: "Cloud",
      status: "Ready", at: "2026-09-16",
    };
    update((st) => {
      const t = findMeeting(st.meetings, id);
      if (t) t.recording = null;
      st.recordings.unshift(file);
      return st;
    });
    setNotice({ tone: "ok", msg: `Recording saved to the cloud — ${file.topic}, ${file.length}.` });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title={m ? m.topic : "Meeting not found"} sub={m ? `Meeting ID ${m.id}` : null} wide>
        {!m && <Empty>No meeting with that id.</Empty>}
        {notice && <Banner tone={notice.tone} testId="meeting-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        {m && (
          <>
            <Card title="Stage" testId="meeting-stage">
              {m.sharing ? (
                <div className="ck-tile" data-testid="shared-screen"
                     style={{ minHeight: 160, display: "grid", placeItems: "center", background: "#111", color: "#fff" }}>
                  <span style={{ fontSize: 32 }}>🖥️</span>
                  <strong>{m.sharing.by} is sharing {m.sharing.surface}</strong>
                </div>
              ) : (
                <div className="ck-tile" style={{ minHeight: 160, display: "grid", placeItems: "center" }}>
                  <span className="ck-muted">Gallery view — nobody is sharing</span>
                </div>
              )}
              {m.sharing && <Badge tone="ok" testId="share-indicator">Screen sharing is active</Badge>}
              {m.recording && <Badge tone="bad" testId="recording-indicator">● Recording</Badge>}
            </Card>

            <Card title="Participants" testId="participants">
              <Row label="In the meeting" value={m.participants.length} testId="participant-count" />
              {m.participants.map((p) => (
                <div key={p.name} className="ck-row" data-testid={`participant-${p.name.split(" ")[0].toLowerCase()}`}>
                  <span>{p.name} <span className="ck-muted">{p.role}</span></span>
                  <span>
                    {p.sharing && <Badge tone="ok" testId={`sharing-${p.name.split(" ")[0].toLowerCase()}`}>sharing</Badge>}
                    {m.sharing && <Badge tone="info">viewing shared screen</Badge>}
                  </span>
                </div>
              ))}
              {m.waiting.length > 0 && (
                <Link href={`${BASE}/join/${slug(m.id)}`} data-testid="go-waiting">
                  {m.waiting.length} waiting to be admitted
                </Link>
              )}
            </Card>

            <Card title="Controls">
              <div className="ck-card-actions">
                <Btn variant="secondary" data-testid="share-screen" onClick={toggleShare}>
                  {m.sharing ? "Stop share" : "Share screen"}
                </Btn>
                {!m.recording ? (
                  <Btn variant="secondary" data-testid="start-recording" onClick={startRecording}>
                    Record to the cloud
                  </Btn>
                ) : (
                  <Btn variant="danger" data-testid="stop-recording" onClick={stopRecording}>
                    Stop recording
                  </Btn>
                )}
                <Link href={`${BASE}/recordings`} className="ck-btn ck-btn--ghost" data-testid="open-recordings">
                  Recordings
                </Link>
              </div>
            </Card>
          </>
        )}
      </Page>
    </Shell>
  );
}
