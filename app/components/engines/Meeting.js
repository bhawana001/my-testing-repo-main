"use client";
// Meeting UI pieces shared by Teamz and Zoomly: participant tiles and a control bar.
import { Btn } from "../eval/ui";

export function Tiles({ people, sharing, testIdPrefix = "tiles" }) {
  return (
    <div className="ee-grid ee-grid--2" style={{ gap: 8 }} data-testid={testIdPrefix}>
      {sharing && <div style={{ gridColumn: "1 / -1", background: "#0b1220", color: "#fff", borderRadius: 10, padding: 24, textAlign: "center" }} data-testid={`${testIdPrefix}-share`}><div className="ee-tiny" style={{ opacity: 0.7 }}>{sharing.by} is sharing</div><div style={{ fontSize: 40 }}>🖥️</div><div className="ee-strong">{sharing.what}</div></div>}
      {people.map((p) => (
        <div key={p.name} style={{ background: "#1f2430", color: "#fff", borderRadius: 10, aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }} data-testid={`${testIdPrefix}-${p.name.split(" ")[0].toLowerCase()}`}>
          <span className="ee-avatar ee-avatar--round" style={{ width: 48, height: 48, fontSize: 16 }}>{p.name.split(" ").map((x) => x[0]).join("")}</span>
          <span className="ee-tiny" style={{ position: "absolute", left: 8, bottom: 6 }}>{p.name}{p.muted ? " 🔇" : " 🎙️"}</span>
        </div>
      ))}
    </div>
  );
}
export function Controls({ muted, camera, onMute, onCamera, onLeave, extra, testIdPrefix = "ctl" }) {
  return (
    <div className="ee-row" style={{ justifyContent: "center", background: "#151922", padding: 10, borderRadius: 12, marginTop: 10 }} data-testid={`${testIdPrefix}-bar`}>
      <Btn size="sm" variant="secondary" onClick={onMute} aria-pressed={muted} data-testid={`${testIdPrefix}-mic`}>{muted ? "🔇 Unmute" : "🎙️ Mute"}</Btn>
      {onCamera && <Btn size="sm" variant="secondary" onClick={onCamera} aria-pressed={!camera} data-testid={`${testIdPrefix}-camera`}>{camera ? "📷 Stop video" : "📷 Start video"}</Btn>}
      {extra}
      <Btn size="sm" variant="danger" onClick={onLeave} data-testid={`${testIdPrefix}-leave`}>Leave</Btn>
    </div>
  );
}
