"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { BASE } from "../../lib";
import { getTitle } from "../../data";

function Player() {
  const { id } = useParams();
  const params = useSearchParams();
  const t = getTitle(id);
  // "Stream any kane-cli video": pass ?v=<video-url> to play it here.
  const videoUrl = params.get("v") || "";
  const [session, setSession] = useState(null);

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
