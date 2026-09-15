"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Row, Badge, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, useStore } from "../shared";

export default function Recordings() {
  const [s] = useStore();
  const [playing, setPlaying] = useState(null);

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Cloud recordings" sub="Everything recorded to the cloud lands here">
        <Card title="Library" testId="recording-list">
          <div className="ck-muted" data-testid="recording-count">
            {s.recordings.length} {s.recordings.length === 1 ? "recording" : "recordings"}
          </div>
          {s.recordings.length === 0 && <Empty>No cloud recordings yet.</Empty>}
          {s.recordings.map((r) => (
            <div key={r.id} className="ck-row" data-testid={`recording-${r.id}`}>
              <span>
                <strong data-testid={`recording-topic-${r.id}`}>{r.topic}</strong>
                <div className="ck-muted">{r.at} · {r.length} · {r.size} · Meeting ID {r.meetingId}</div>
                <Badge tone="ok" testId={`recording-status-${r.id}`}>{r.storage} · {r.status}</Badge>
              </span>
              <Btn size="sm" data-testid={`play-${r.id}`} onClick={() => setPlaying(r.id)}>Play</Btn>
            </div>
          ))}
        </Card>

        {playing && (
          <Card title="Playback" testId="player">
            {(() => {
              const r = s.recordings.find((x) => x.id === playing);
              if (!r) return <Empty>Recording unavailable.</Empty>;
              return (
                <>
                  <div className="ck-tile" style={{ minHeight: 160, display: "grid", placeItems: "center", background: "#111", color: "#fff" }}
                       data-testid="player-surface">
                    <span style={{ fontSize: 34 }}>▶</span>
                    <strong>Playing {r.topic}</strong>
                  </div>
                  <Row label="Duration" value={r.length} testId="player-length" />
                  <Row label="Stored in" value={r.storage} testId="player-storage" />
                </>
              );
            })()}
          </Card>
        )}
      </Page>
    </Shell>
  );
}
