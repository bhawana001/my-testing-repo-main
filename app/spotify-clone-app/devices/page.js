"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Badge, Banner, Row } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, useStore, track, mmss } from "../shared";

/**
 * Handing playback to another device carries the track and the position across.
 * Losing the position is the classic bug here, so both are shown on each side.
 */
export default function Devices() {
  const [s, update] = useStore();
  const [notice, setNotice] = useState(null);

  const current = track(s.playback.trackId);

  function transfer(deviceId) {
    const from = s.devices.find((d) => d.id === s.playback.deviceId);
    const to = s.devices.find((d) => d.id === deviceId);
    if (!to || to.id === s.playback.deviceId) return;
    update((st) => {
      st.devices = st.devices.map((d) => ({ ...d, active: d.id === deviceId }));
      st.playback.deviceId = deviceId;
      st.playback.playing = true;
      return st;
    });
    setNotice({
      tone: "ok",
      msg: `Playback moved from ${from.name} to ${to.name} at ${mmss(s.playback.positionSeconds)}.`,
    });
  }

  function advance() {
    update((st) => {
      const t = track(st.playback.trackId);
      st.playback.positionSeconds = Math.min(t.seconds, st.playback.positionSeconds + 45);
      st.playback.playing = true;
      return st;
    });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Connect to a device" sub="Playback state follows the handoff">
        {notice && <Banner tone={notice.tone} testId="transfer-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Playback state" testId="playback-state">
          <Row label="Track" value={current.title} testId="state-track" />
          <Row label="Position" value={mmss(s.playback.positionSeconds)} testId="state-position" />
          <Row label="Playing on" value={s.devices.find((d) => d.id === s.playback.deviceId).name}
               testId="state-device" />
          <Row label="Status" value={s.playback.playing ? "Playing" : "Paused"} testId="state-status" />
          <div className="ck-card-actions">
            <Btn variant="secondary" data-testid="listen-more" onClick={advance}>Listen for 45 seconds</Btn>
          </div>
        </Card>

        <Card title="Available devices" testId="device-list">
          {s.devices.map((d) => (
            <div key={d.id} className="ck-row" data-testid={`device-${d.id}`}>
              <span>
                <strong>{d.name}</strong>
                <div className="ck-muted">{d.kind}</div>
              </span>
              <span>
                {d.id === s.playback.deviceId
                  ? <Badge tone="ok" testId={`active-${d.id}`}>Currently playing</Badge>
                  : <Btn size="sm" data-testid={`transfer-${d.id}`} onClick={() => transfer(d.id)}>Play here</Btn>}
              </span>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
