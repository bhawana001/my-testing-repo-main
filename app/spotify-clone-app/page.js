"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Badge, Banner, Row } from "../clones/kit/ui";
import Nav from "./Nav";
import { BRAND, TRACKS, PLANS, useStore, track, mmss, adDue } from "./shared";

export default function Player() {
  const [s, update] = useStore();
  const [ad, setAd] = useState(null);

  const current = track(s.playback.trackId);
  const device = s.devices.find((d) => d.id === s.playback.deviceId) || s.devices[0];

  function play(id) {
    const showAd = adDue(s);
    if (showAd) {
      update((st) => { st.adsSeen += 1; return st; });
      setAd("Spotifly Free — upgrade to Premium to listen without interruptions.");
    } else {
      setAd(null);
    }
    update((st) => {
      st.playback.trackId = id;
      st.playback.positionSeconds = 0;
      st.playback.playing = true;
      st.playback.tracksPlayed += 1;
      return st;
    });
  }

  function seek(delta) {
    update((st) => {
      const t = track(st.playback.trackId);
      st.playback.positionSeconds = Math.max(0, Math.min(t.seconds, st.playback.positionSeconds + delta));
      return st;
    });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Player" sub={`Playing on ${device.name}`} wide>
        {ad && <Banner tone="warn" title="Advertisement" testId="ad-banner" onClose={() => setAd(null)}>{ad}</Banner>}

        <Card title="Now playing" testId="now-playing">
          <Row label="Track" value={current.title} testId="current-track" />
          <Row label="Artist" value={current.artist} testId="current-artist" />
          <Row label="Position" value={`${mmss(s.playback.positionSeconds)} / ${mmss(current.seconds)}`}
               testId="current-position" />
          <Row label="State" value={s.playback.playing ? "Playing" : "Paused"} testId="playback-state" />
          <Row label="Device" value={device.name} testId="current-device" />
          <Row label="Plan" value={PLANS[s.plan].label} testId="current-plan" />
          <Row label="Ads heard this session" value={s.adsSeen} testId="ads-seen" />
          <Badge tone={PLANS[s.plan].ads ? "warn" : "ok"} testId="ad-policy">
            {PLANS[s.plan].ads ? "Ad-supported" : "Ad-free"}
          </Badge>
          <div className="ck-card-actions">
            <Btn variant="secondary" data-testid="seek-back" onClick={() => seek(-30)}>−30s</Btn>
            <Btn data-testid="play-pause"
                 onClick={() => update((st) => { st.playback.playing = !st.playback.playing; return st; })}>
              {s.playback.playing ? "Pause" : "Play"}
            </Btn>
            <Btn variant="secondary" data-testid="seek-forward" onClick={() => seek(30)}>+30s</Btn>
          </div>
        </Card>

        <Card title="Tracks" testId="track-list">
          {TRACKS.map((t) => (
            <div key={t.id} className="ck-row" data-testid={`track-${t.id}`}>
              <span>
                <strong>{t.title}</strong>
                <div className="ck-muted">{t.artist} · {t.album} · {mmss(t.seconds)}</div>
              </span>
              <Btn size="sm" data-testid={`play-${t.id}`} onClick={() => play(t.id)}>Play</Btn>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
