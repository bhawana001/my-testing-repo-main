"use client";
import { useEffect, useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, Badge } from "@/app/components/eval/ui";

// Deterministic live feed: the score advances through a fixed ball-by-ball script every 4 s while playing.
const SCRIPT = [{ r: 214, w: 4, o: "38.2", ev: "" }, { r: 215, w: 4, o: "38.3", ev: "1 run" }, { r: 219, w: 4, o: "38.4", ev: "FOUR!" }, { r: 219, w: 5, o: "38.5", ev: "WICKET!" }, { r: 225, w: 5, o: "38.6", ev: "SIX!" }, { r: 226, w: 5, o: "39.1", ev: "1 run" }];
const seed = () => ({ playing: false, idx: 0, behind: false });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [viewers] = useState("12.4M");
  useEffect(() => { if (!s.playing || s.behind) return; const t = setInterval(() => set((st) => ({ ...st, idx: Math.min(SCRIPT.length - 1, st.idx + 1) })), 4000); return () => clearInterval(t); }, [s.playing, s.behind, set]);
  const b = SCRIPT[s.idx];
  return (
    <>
      <Topbar entity={ent} light={false} nav={["Home", "Sports", "Movies"]} active="Sports" />
      <main className="ee-main">
        <div className="ee-player" data-testid="live-player" data-playing={s.playing ? "true" : "false"} style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="ee-center"><div style={{ fontSize: 60 }}>🏏</div><div className="ee-strong">IND vs AUS · 2nd ODI · Wankhede-ish Stadium</div>{!s.playing && <div className="ee-small" style={{ marginTop: 6 }}>Tap play to watch live</div>}</div>
          {s.playing && !s.behind && <span className="ee-badge ee-badge--err" style={{ position: "absolute", top: 12, left: 12 }} data-testid="live-indicator">● LIVE</span>}
          {s.behind && <button type="button" className="ee-badge" style={{ position: "absolute", top: 12, left: 12, cursor: "pointer" }} onClick={() => set({ ...s, behind: false })} data-testid="go-live">⟲ Go LIVE</button>}
          <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,.7)", padding: "8px 12px", borderRadius: 8, textAlign: "right" }} data-testid="score-overlay"><div className="ee-strong" data-testid="score">IND {b.r}/{b.w}</div><div className="ee-tiny" data-testid="overs">{b.o} ov · Target 289</div>{b.ev && <div className="ee-tiny" style={{ color: "#ffd400" }} data-testid="last-ball">{b.ev}</div>}</div>
          <div className="ee-player__controls"><Btn size="sm" variant="secondary" onClick={() => set({ ...s, playing: !s.playing })} data-testid="live-toggle">{s.playing ? "❚❚ Pause" : "▶ Play"}</Btn><Btn size="sm" variant="secondary" onClick={() => set({ ...s, behind: true })} disabled={!s.playing} data-testid="rewind">⟲ 30s</Btn><span className="ee-tiny">{viewers} watching</span></div>
        </div>
        <Card style={{ maxWidth: 900, margin: "14px auto 0" }} data-testid="match-info"><Badge tone="err">LIVE</Badge> <span className="ee-small">India need {289 - b.r} runs from {Math.round((50 - Number(b.o.split(".")[0]) - Number(b.o.split(".")[1]) / 6) * 6)} balls</span></Card>
      </main>
    </>
  );
}
