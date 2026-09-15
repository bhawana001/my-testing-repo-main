"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Select, Field, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, TRACKS, ME, useStore, track, mmss } from "../shared";

export default function Playlists() {
  const [s, update] = useStore();
  const [name, setName] = useState("");
  const [openId, setOpenId] = useState("pl_liked");
  const [pick, setPick] = useState("t2");
  const [notice, setNotice] = useState(null);

  const playlist = s.playlists.find((p) => p.id === openId) || s.playlists[0];

  function create() {
    if (!name.trim()) { setNotice({ tone: "bad", msg: "Give the playlist a name." }); return; }
    const id = `pl_${s.counter}`;
    update((st) => {
      st.playlists.push({ id, name: name.trim(), trackIds: [], owner: ME.name });
      st.counter += 1;
      return st;
    });
    setOpenId(id);
    setName("");
    setNotice({ tone: "ok", msg: "Playlist created." });
  }

  function addTrack() {
    if (!playlist) return;
    if (playlist.trackIds.includes(pick)) {
      setNotice({ tone: "info", msg: "That track is already in the playlist." });
      return;
    }
    update((st) => {
      st.playlists.find((p) => p.id === playlist.id).trackIds.push(pick);
      return st;
    });
    setNotice({ tone: "ok", msg: `${track(pick).title} added.` });
  }

  function removeTrack(id) {
    update((st) => {
      const p = st.playlists.find((x) => x.id === playlist.id);
      p.trackIds = p.trackIds.filter((t) => t !== id);
      return st;
    });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Playlists" sub={`${s.playlists.length} playlists`} wide>
        {notice && <Banner tone={notice.tone} testId="playlist-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="New playlist">
          <Field label="Name">
            <Input value={name} placeholder="Deep focus" data-testid="playlist-name" aria-label="Playlist name"
                   onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && create()} />
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={create} data-testid="create-playlist">Create playlist</Btn>
          </div>
        </Card>

        <Card title="Your playlists" testId="playlist-list">
          {s.playlists.map((p) => (
            <div key={p.id} className="ck-row" data-testid={`playlist-${p.id}`}>
              <span>
                <strong data-testid={`playlist-name-${p.id}`}>{p.name}</strong>
                <div className="ck-muted">{p.owner}</div>
              </span>
              <span>
                <Badge tone="neutral" testId={`playlist-count-${p.id}`}>{p.trackIds.length} tracks</Badge>{" "}
                <Btn size="sm" variant="ghost" data-testid={`open-${p.id}`} onClick={() => setOpenId(p.id)}>Open</Btn>
              </span>
            </div>
          ))}
        </Card>

        {playlist && (
          <Card title={playlist.name} testId="playlist-detail">
            <Row label="Tracks" value={playlist.trackIds.length} testId="detail-track-count" />
            {playlist.trackIds.length === 0 && <Empty>No tracks yet.</Empty>}
            {playlist.trackIds.map((id, i) => {
              const t = track(id);
              return (
                <div key={id} className="ck-row" data-testid={`pl-track-${i}`}>
                  <span>
                    <strong data-testid={`pl-track-title-${i}`}>{t.title}</strong>
                    <div className="ck-muted">{t.artist} · {mmss(t.seconds)}</div>
                  </span>
                  <Btn size="sm" variant="ghost" data-testid={`remove-${id}`} onClick={() => removeTrack(id)}>Remove</Btn>
                </div>
              );
            })}
            <div className="ck-card-actions">
              <Select value={pick} data-testid="track-picker" aria-label="Track to add"
                      onChange={(e) => setPick(e.target.value)}>
                {TRACKS.map((t) => <option key={t.id} value={t.id}>{t.title} — {t.artist}</option>)}
              </Select>
              <Btn onClick={addTrack} data-testid="add-track">Add to this playlist</Btn>
            </div>
          </Card>
        )}
      </Page>
    </Shell>
  );
}
