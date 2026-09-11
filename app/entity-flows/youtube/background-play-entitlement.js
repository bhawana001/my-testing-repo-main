"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { MobileShell } from "@/app/components/engines/MobileShell";
import { Btn, Badge, Segment, Toggle, KV, Alert } from "@/app/components/eval/ui";

const ACCOUNTS = { free: { email: "free@evals.dev", premium: false }, premium: { email: "premium@evals.dev", premium: true } };
const seed = () => ({ acct: "free", bg: false, app: "foreground", playing: true });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const a = ACCOUNTS[s.acct];
  const entitled = a.premium;
  const bgOn = entitled && s.bg;
  const playing = s.app === "foreground" ? s.playing : bgOn && s.playing;
  return (
    <MobileShell flow={flow} title="YouTubely">
      <Segment options={[{ value: "free", label: "Free test account" }, { value: "premium", label: "Premium test account" }]} value={s.acct} onChange={(v) => set({ ...seed(), acct: v })} />
      <KV k="Signed in as" v={a.email} /><KV k="Membership" v={<Badge tone={entitled ? "ok" : undefined} data-testid="membership">{entitled ? "Premium" : "Free"}</Badge>} />
      <KV k="Entitlement: background_play" v={<span className="ee-mono" data-testid="entitlement-flag">{String(entitled)}</span>} />
      <div className="ee-row ee-row--between"><span>Background play</span>{entitled ? <Toggle checked={s.bg} label="Background play" onChange={(v) => set({ ...s, bg: v })} data-testid="bg-toggle" /> : <Badge data-testid="bg-locked">Premium feature 🔒</Badge>}</div>
      {!entitled && <Alert tone="info" data-testid="upsell">Get Premium to keep videos playing when you lock your screen or switch apps.</Alert>}
      <div className="ee-player" style={{ aspectRatio: "16/9" }}><div className="ee-center"><div style={{ fontSize: 34 }}>{playing ? "🔊" : "⏸"}</div><div className="ee-small" data-testid="playback-state">{playing ? "Playing" : "Paused"}{s.app === "background" ? " (app in background)" : ""}</div></div></div>
      <div className="ee-row">{s.app === "foreground" ? <Btn size="sm" variant="secondary" onClick={() => set({ ...s, app: "background" })} data-testid="lock-screen">Lock screen / switch app</Btn> : <Btn size="sm" onClick={() => set({ ...s, app: "foreground" })} data-testid="return-app">Return to app</Btn>}</div>
    </MobileShell>
  );
}
