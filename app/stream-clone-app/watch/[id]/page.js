"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { BASE } from "../../lib";
import { getTitle } from "../../data";
import { useStore, fmtTime } from "../../account-store";

function Player() {
  const { id } = useParams();
  const params = useSearchParams();
  const t = getTitle(id);
  // "Stream any kane-cli video": pass ?v=<video-url> to play it here.
  const videoUrl = params.get("v") || "";
  const [session, setSession] = useState(null);
  // Playback position (47.2). Progress is written to the account store when you
  // stop, so returning to the title resumes where you left off rather than
  // restarting -- including from a different page or a fresh session.
  const [acct, updateAcct] = useStore();
  const saved = acct.progress[id];
  const [pos, setPos] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [resumed, setResumed] = useState(false);
  const runtime = saved?.runtime || 1320;

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setPos((p) => Math.min(p + 1, runtime)), 250);
    return () => clearInterval(t);
  }, [playing, runtime]);

  function resume() {
    setPos(saved.seconds);
    setResumed(true);
    setPlaying(true);
  }
  function startOver() {
    setPos(0);
    setResumed(true);
    setPlaying(true);
  }
  function stopAndSave() {
    setPlaying(false);
    updateAcct((st) => {
      st.progress[id] = { seconds: pos, runtime, updatedAt: "2026-09-15" };
      return st;
    });
  }

  useEffect(() => {
    let alive = true;
    fetch("/api/stream/play", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titleId: id, videoUrl }),
    })
      .then((r) => r.json())
      .then((d) => alive && setSession(d))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [id, videoUrl]);

  const streamUrl = session?.streamUrl || videoUrl;

  return (
    <div className="flx-player">
      <div className="flx-player__top">
        <Link href={t ? `${BASE}/title/${t.id}` : BASE} className="flx-player__back">
          ← Back
        </Link>
      </div>
      <div className="flx-player__stage">
        {streamUrl ? (
          <video controls autoPlay src={streamUrl} data-testid="stream-video" />
        ) : (
          <div className="flx-player__placeholder">
            <div className="big">▶</div>
            <h2 style={{ color: "#fff", marginTop: 10 }}>{t ? t.title : "Now Playing"}</h2>
            <div className="flx-hint">
              This player streams whatever video URL you give it. Append{" "}
              <code>?v=&lt;video-url&gt;</code> to this page to stream any video — e.g. a{" "}
              <b>kane-cli</b> demo recording:
              <br />
              <code>
                {BASE}/watch/{id}?v=https://.../kane-demo.mp4
              </code>
            </div>
          </div>
        )}
      </div>
      <div className="flx-player__bar">
        <span className="flx-player__meta">
          {t ? `${t.title} · ${t.genre}` : id}
          {session?.sessionId ? ` · session ${session.sessionId}` : ""}
        </span>
      </div>

      <div className="flx-resume" data-testid="playback-controls">
        {saved && !resumed && (
          <div className="flx-resume__prompt" data-testid="resume-prompt">
            <span>
              You stopped at <strong data-testid="resume-point">{fmtTime(saved.seconds)}</strong> of {fmtTime(runtime)}.
            </span>
            <button className="flx-resume__btn" onClick={resume} data-testid="resume-play">
              Resume from {fmtTime(saved.seconds)}
            </button>
            <button className="flx-resume__btn flx-resume__btn--ghost" onClick={startOver} data-testid="start-over">
              Start over
            </button>
          </div>
        )}

        <div className="flx-resume__row">
          <span data-testid="playhead">{fmtTime(pos)} / {fmtTime(runtime)}</span>
          <div className="flx-resume__track" aria-hidden="true">
            <div className="flx-resume__fill" style={{ width: `${(pos / runtime) * 100}%` }} />
          </div>
          {playing ? (
            <button className="flx-resume__btn" onClick={stopAndSave} data-testid="stop-save">Stop and save</button>
          ) : (
            <button className="flx-resume__btn" onClick={() => { setResumed(true); setPlaying(true); }} data-testid="play">Play</button>
          )}
        </div>
        <div className="flx-resume__hint" data-testid="saved-progress">
          {acct.progress[id]
            ? `Saved resume point: ${fmtTime(acct.progress[id].seconds)}`
            : "No resume point saved yet"}
        </div>
      </div>
    </div>
  );
}

export default function WatchPage() {
  return (
    <Suspense fallback={<div className="flx-player" />}>
      <Player />
    </Suspense>
  );
}
