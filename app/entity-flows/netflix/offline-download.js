"use client";
import { useCallback } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { MobileShell } from "@/app/components/engines/MobileShell";
import { Btn, Badge, Segment, Toggle } from "@/app/components/eval/ui";
import { DownloadProgress, Player } from "@/app/components/engines/Media";

const EPS = [{ id: "e1", title: "1. Static", mins: 48 }, { id: "e2", title: "2. Relay", mins: 51 }, { id: "e3", title: "3. Blackout", mins: 46 }];
const seed = () => ({ tab: "show", progress: {}, active: null, offline: false, playing: null, player: { position: 0, playing: false } });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const tick = useCallback((p) => set((st) => ({ ...st, progress: { ...st.progress, [st.active]: p }, active: p >= 100 ? null : st.active })), [set]);
  const onPlayer = useCallback((p) => set((st) => ({ ...st, player: { ...st.player, ...p } })), [set]);
  const downloaded = EPS.filter((e) => (s.progress[e.id] || 0) >= 100);
  return (
    <MobileShell flow={flow} title="Netflixy" right={<label className="ee-row ee-tiny">✈️ <Toggle checked={s.offline} label="Airplane mode" onChange={(v) => set({ ...s, offline: v })} /></label>}>
      <Segment options={[{ value: "show", label: "Signal Lost" }, { value: "downloads", label: "Downloads" }]} value={s.tab} onChange={(v) => set({ ...s, tab: v, playing: null })} />
      {s.offline && <Badge tone="warn" data-testid="offline-badge">Offline · only downloads can play</Badge>}
      {s.tab === "show" && EPS.map((e) => (
        <div key={e.id} className="ee-card ee-card--flat ee-card--tight" data-testid={`ep-${e.id}`}>
          <div className="ee-row ee-row--between"><span className="ee-strong ee-small">{e.title}</span><span className="ee-tiny ee-muted">{e.mins}m</span></div>
          {(s.progress[e.id] || 0) > 0 || s.active === e.id ? <DownloadProgress progress={s.progress[e.id] || 0} active={s.active === e.id} onTick={tick} testIdPrefix={`dl-${e.id}`} /> : <Btn size="sm" variant="secondary" disabled={s.offline || !!s.active} onClick={() => set({ ...s, active: e.id, progress: { ...s.progress, [e.id]: 0 } })} data-testid={`download-${e.id}`}>⬇ Download</Btn>}
        </div>
      ))}
      {s.tab === "downloads" && (s.playing ? (
        <div data-testid="offline-player"><Player title="Signal Lost" subtitle={EPS.find((e) => e.id === s.playing).title} duration={EPS.find((e) => e.id === s.playing).mins * 60} position={s.player.position} playing={s.player.playing} onChange={onPlayer} poster="🛰️" speed={20} /><Btn size="sm" variant="ghost" onClick={() => set({ ...s, playing: null })}>← Downloads</Btn></div>
      ) : downloaded.length === 0 ? <div className="ee-empty">No downloads yet.</div> : downloaded.map((e) => <div key={e.id} className="ee-row ee-row--between ee-card ee-card--flat ee-card--tight" data-testid={`downloaded-${e.id}`}><span className="ee-small">{e.title} · <Badge tone="ok">Downloaded</Badge></span><Btn size="sm" onClick={() => set({ ...s, playing: e.id, player: { position: 0, playing: true } })} data-testid={`play-${e.id}`}>▶ Play</Btn></div>))}
    </MobileShell>
  );
}
