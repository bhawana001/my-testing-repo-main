"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, Input, Alert, Badge } from "@/app/components/eval/ui";

const SONGS = [{ id: "s1", t: "Midnight Drive", a: "The Lanterns", d: "3:41" }, { id: "s2", t: "Paper Planes", a: "Nova Kid", d: "2:58" }, { id: "s3", t: "Glass Harbor", a: "Mira Sol", d: "4:05" }, { id: "s4", t: "Neon Rain", a: "The Lanterns", d: "3:20" }, { id: "s5", t: "Slow Satellite", a: "Echo Park", d: "5:12" }];
const seed = () => ({ playlist: null });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [name, setName] = useState(""); const [q, setQ] = useState(""); const [msg, setMsg] = useState(null);
  const res = q.trim() ? SONGS.filter((x) => (x.t + " " + x.a).toLowerCase().includes(q.toLowerCase())) : SONGS;
  function add(song) { if (s.playlist.tracks.includes(song.id)) { setMsg({ tone: "warn", text: `“${song.t}” is already in this playlist.` }); return; } setMsg({ tone: "ok", text: `Added to ${s.playlist.name}` }); set({ playlist: { ...s.playlist, tracks: [...s.playlist.tracks, song.id] } }); }
  return (
    <>
      <Topbar entity={ent} light={false} />
      <main className="ee-main">
        {!s.playlist ? (
          <Card title="Create playlist" style={{ maxWidth: 480 }} data-testid="create-playlist"><div className="ee-row"><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="My Playlist #1" aria-label="Playlist name" style={{ flex: 1 }} /><Btn style={{ background: "#1db954" }} disabled={!name.trim()} onClick={() => set({ playlist: { name: name.trim(), tracks: [] } })} data-testid="create-btn">Create</Btn></div></Card>
        ) : (
          <div className="ee-split">
            <Card title={<span data-testid="playlist-name">🎵 {s.playlist.name}</span>} right={<Badge data-testid="track-count">{s.playlist.tracks.length} songs</Badge>} data-testid="playlist">
              {s.playlist.tracks.length === 0 ? <div className="ee-empty">Let's find something for your playlist.</div> : s.playlist.tracks.map((id, i) => { const x = SONGS.find((y) => y.id === id); return <div key={id} className="ee-row ee-row--between ee-small" style={{ padding: "4px 0" }} data-testid={`track-${i + 1}`}><span>{i + 1}. <b>{x.t}</b> · {x.a}</span><span className="ee-muted">{x.d}</span></div>; })}
            </Card>
            <Card title="Find songs" data-testid="song-search">
              <Input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for songs" aria-label="Search for songs" />
              {msg && <Alert tone={msg.tone} data-testid="add-msg">{msg.text}</Alert>}
              <div className="ee-stack" style={{ marginTop: 8 }}>{res.map((x) => <div key={x.id} className="ee-row ee-row--between ee-small"><span><b>{x.t}</b> · {x.a}</span><Btn size="sm" variant="secondary" onClick={() => add(x)} data-testid={`add-${x.id}`}>Add</Btn></div>)}</div>
            </Card>
          </div>
        )}
      </main>
    </>
  );
}
