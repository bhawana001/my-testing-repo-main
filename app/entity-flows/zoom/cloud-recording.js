"use client";
import { useCallback, useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { SaasShell } from "@/app/components/engines/SaasShell";
import { Card, Btn, Badge, Table, Segment } from "@/app/components/eval/ui";
import { Tiles, Controls } from "@/app/components/engines/Meeting";
import { Player, fmtTime } from "@/app/components/engines/Media";

// Recording length is simulated: each "Record" session records a fixed 32 seconds.
const LEN = 32;
const seed = () => ({ view: "meeting", recording: false, recordings: [], player: { position: 0, playing: false }, open: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const onPlayer = useCallback((p) => set((st) => ({ ...st, player: { ...st.player, ...p } })), [set]);
  function stop() { set({ ...s, recording: false, recordings: [{ id: "REC-" + (s.recordings.length + 1), topic: "Weekly sync", date: "Sep 14, 2026", length: LEN, status: "Processing" }, ...s.recordings] }); }
  const rec = s.recordings.find((r) => r.id === s.open);
  return (
    <SaasShell flow={flow} nav={["Home", "Meetings", "Recordings"]} active={s.view === "meeting" ? "Meetings" : "Recordings"} title={s.view === "meeting" ? "Weekly sync · in meeting" : "Recordings · Cloud"} actions={<Segment options={[{ value: "meeting", label: "Meeting" }, { value: "recordings", label: "Recordings" }]} value={s.view} onChange={(v) => set({ ...s, view: v })} />}>
      {s.view === "meeting" ? (
        <Card style={{ background: "#0f131a", color: "#fff", borderColor: "#0f131a", maxWidth: 760 }} data-testid="meeting">
          {s.recording && <div className="ee-row" style={{ marginBottom: 8 }} data-testid="recording-indicator"><Badge tone="err">● Recording to the cloud…</Badge></div>}
          <Tiles people={[{ name: "Demo User" }, { name: "Priya Nair" }]} />
          <Controls muted={false} onMute={() => {}} onLeave={() => set({ ...s, view: "recordings" })} testIdPrefix="zoom" extra={s.recording ? <Btn size="sm" variant="danger" onClick={stop} data-testid="stop-recording">■ Stop recording</Btn> : <Btn size="sm" variant="secondary" onClick={() => set({ ...s, recording: true })} data-testid="record-cloud">⏺ Record to the cloud</Btn>} />
          {s.recordings.length > 0 && !s.recording && <div className="ee-tiny" style={{ marginTop: 6 }} data-testid="recording-saved">Recording stopped. It will appear in Recordings after processing.</div>}
        </Card>
      ) : rec ? (
        <Card data-testid="recording-player" style={{ maxWidth: 760 }}>
          <button className="ee-link ee-small" onClick={() => set({ ...s, open: null, player: { position: 0, playing: false } })}>← Recordings</button>
          <div style={{ height: 8 }} />
          <Player title={`${rec.topic} · ${rec.date}`} duration={rec.length} position={s.player.position} playing={s.player.playing} onChange={onPlayer} poster="📼" speed={1} testIdPrefix="rec-player" />
        </Card>
      ) : (
        <Card data-testid="recordings-list">
          <Table cols={[{ key: "topic", label: "Topic" }, { key: "date", label: "Date" }, { key: "length", label: "Length", render: (r) => fmtTime(r.length) }, { key: "status", label: "Status", render: (r) => <Badge tone={r.status === "Ready" ? "ok" : "warn"} data-testid={`rec-status-${r.id}`}>{r.status}</Badge> }, { key: "x", label: "", render: (r) => r.status === "Ready" ? <Btn size="sm" onClick={() => set({ ...s, open: r.id })} data-testid={`play-${r.id}`}>▶ Play</Btn> : <Btn size="sm" variant="secondary" onClick={() => set({ ...s, recordings: s.recordings.map((x) => (x.id === r.id ? { ...x, status: "Ready" } : x)) })} data-testid={`process-${r.id}`}>Simulate processing complete</Btn> }]} rows={s.recordings} rowKey={(r) => r.id} empty="No cloud recordings yet" />
        </Card>
      )}
    </SaasShell>
  );
}
