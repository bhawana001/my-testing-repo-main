"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import { Shell, Page, Card, Btn, Row, Badge, Empty } from "../../../clones/kit/ui";
import Nav from "../../Nav";
import { BRAND, BASE, useStore } from "../../shared";

export default function Meeting({ params }) {
  const { id } = use(params);
  const [s, update] = useStore();
  const router = useRouter();
  const m = s.inMeeting && s.inMeeting.id === id ? s.inMeeting : null;

  function toggle(key) {
    update((st) => { if (st.inMeeting) st.inMeeting[key] = !st.inMeeting[key]; return st; });
  }
  function leave() {
    update((st) => { st.inMeeting = null; return st; });
    router.push(`${BASE}/calendar`);
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title={m ? m.title : "Not in this meeting"} sub={m ? "You are in the meeting" : null} wide>
        {!m && <Empty>Join this meeting from the calendar first.</Empty>}
        {m && (
          <Card title="In meeting" tone="ok" testId="in-meeting-screen">
            <div className="ck-tile" style={{ minHeight: 160, display: "grid", placeItems: "center" }}
                 data-testid="meeting-stage">
              <span style={{ fontSize: 40 }}>{m.camera ? "🎥" : "👤"}</span>
              <span>{m.camera ? "Your camera is on" : "Your camera is off"}</span>
            </div>
            <Row label="Participants" value={m.participants} testId="participants" />
            <Row label="Microphone" value={m.muted ? "Muted" : "Unmuted"} testId="mic-state" />
            <Row label="Camera" value={m.camera ? "On" : "Off"} testId="camera-state" />
            <Row label="Screen share" value={m.sharing ? "Sharing" : "Not sharing"} testId="share-state" />
            {m.sharing && <Badge tone="ok" testId="share-indicator">You are sharing your screen</Badge>}
            <div className="ck-card-actions">
              <Btn variant="secondary" data-testid="toggle-mic" onClick={() => toggle("muted")}>
                {m.muted ? "Unmute" : "Mute"}
              </Btn>
              <Btn variant="secondary" data-testid="toggle-camera" onClick={() => toggle("camera")}>
                {m.camera ? "Stop video" : "Start video"}
              </Btn>
              <Btn variant="secondary" data-testid="toggle-share" onClick={() => toggle("sharing")}>
                {m.sharing ? "Stop sharing" : "Share screen"}
              </Btn>
              <Btn variant="danger" data-testid="leave-meeting" onClick={leave}>Leave</Btn>
            </div>
          </Card>
        )}
      </Page>
    </Shell>
  );
}
