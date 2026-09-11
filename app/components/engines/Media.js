"use client";
// Media player engine: a simulated player with deterministic playback clock,
// resume positions, download progress and a "second session" panel.
import { useEffect, useRef } from "react";
import { Btn } from "../eval/ui";

export function fmtTime(s) {
  s = Math.max(0, Math.floor(s));
  const m = Math.floor(s / 60);
  const r = s % 60;
  const h = Math.floor(m / 60);
  return h > 0 ? `${h}:${String(m % 60).padStart(2, "0")}:${String(r).padStart(2, "0")}` : `${m}:${String(r).padStart(2, "0")}`;
}

/**
 * Player: props { title, duration (s), position, playing, onChange({position, playing}), tickMs = 250, speed = 4 (sim seconds per real second), poster, overlay, live }
 * The clock advances `speed` seconds of media per real second so tests finish fast but deterministic.
 */
export function Player({ title, subtitle, duration, position, playing, onChange, speed = 4, tickMs = 250, poster = "🎬", overlay, live, testIdPrefix = "player", controlsExtra }) {
  const ref = useRef({ position, playing });
  ref.current = { position, playing };
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      const next = Math.min(duration, ref.current.position + (speed * tickMs) / 1000);
      onChange({ position: next, playing: next < duration });
    }, tickMs);
    return () => clearInterval(t);
  }, [playing, duration, speed, tickMs, onChange]);
  const pct = duration ? (position / duration) * 100 : 0;
  return (
    <div className="ee-player" data-testid={testIdPrefix} data-playing={playing ? "true" : "false"}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 56 }} aria-hidden="true">{poster}</div>
        <div className="ee-strong">{title}</div>
        {subtitle && <div className="ee-small" style={{ opacity: 0.8 }}>{subtitle}</div>}
        {!playing && position > 0 && position < duration && <div className="ee-small" style={{ marginTop: 6 }} data-testid={`${testIdPrefix}-paused-at`}>Paused at {fmtTime(position)}</div>}
        {position >= duration && <div className="ee-small" style={{ marginTop: 6 }}>Finished</div>}
      </div>
      {overlay}
      {live && <span className="ee-badge ee-badge--err" style={{ position: "absolute", top: 12, left: 12 }} data-testid={`${testIdPrefix}-live`}>● LIVE</span>}
      <div className="ee-player__controls">
        <Btn size="sm" variant="secondary" onClick={() => onChange({ position: position >= duration ? 0 : position, playing: !playing })} data-testid={`${testIdPrefix}-toggle`} aria-label={playing ? "Pause" : "Play"}>
          {playing ? "❚❚ Pause" : "▶ Play"}
        </Btn>
        <span className="ee-mono" data-testid={`${testIdPrefix}-time`}>{fmtTime(position)} / {fmtTime(duration)}</span>
        <div className="ee-progress" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); const p = (e.clientX - r.left) / r.width; onChange({ position: Math.round(p * duration), playing }); }}>
          <span style={{ width: pct + "%" }} />
        </div>
        {controlsExtra}
      </div>
    </div>
  );
}

/** DownloadProgress: deterministic download that completes in `steps` ticks. */
export function DownloadProgress({ progress, onTick, active, tickMs = 300, step = 20, testIdPrefix = "download" }) {
  useEffect(() => {
    if (!active || progress >= 100) return;
    const t = setTimeout(() => onTick(Math.min(100, progress + step)), tickMs);
    return () => clearTimeout(t);
  }, [active, progress, onTick, tickMs, step]);
  return (
    <div data-testid={testIdPrefix} data-state={progress >= 100 ? "complete" : active ? "downloading" : "idle"}>
      <div className="ee-progress" style={{ height: 8, background: "var(--ee-border)" }} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <span style={{ width: progress + "%" }} />
      </div>
      <div className="ee-small ee-muted" style={{ marginTop: 4 }} data-testid={`${testIdPrefix}-label`}>
        {progress >= 100 ? "Downloaded · available offline" : active ? `Downloading… ${progress}%` : "Not downloaded"}
      </div>
    </div>
  );
}
