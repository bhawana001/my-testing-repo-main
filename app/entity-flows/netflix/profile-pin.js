"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, Badge } from "@/app/components/eval/ui";
import { PinGate } from "@/app/components/engines/Auth";

const PROFILES = [{ id: "demo", name: "Demo", color: "#e50914", locked: false }, { id: "kids", name: "Kids", color: "#f5c518", locked: false }, { id: "priya", name: "Priya", color: "#1db954", locked: true }];
const ROWS = { demo: ["Signal Lost", "Deep Current", "Paper Moons"], kids: ["Robo Pals", "Ocean Friends"], priya: ["The Long Con", "Midnight Kitchen", "Northern Line"] };
const seed = () => ({ active: null, gate: null });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const prof = PROFILES.find((p) => p.id === s.active);
  return (
    <>
      <Topbar entity={ent} light={false} right={prof && <Btn size="sm" variant="secondary" onClick={() => set({ active: null, gate: null })} data-testid="switch-profile">Switch profile</Btn>} />
      <main className="ee-main">
        {s.gate ? (
          <PinGate title={`Profile Lock is on for ${PROFILES.find((p) => p.id === s.gate).name}`} onUnlock={() => set({ active: s.gate, gate: null })} onCancel={() => set({ ...s, gate: null })} />
        ) : !prof ? (
          <div className="ee-center" data-testid="whos-watching">
            <h1 style={{ fontSize: 34, margin: "30px 0 20px" }}>Who's watching?</h1>
            <div className="ee-row" style={{ justifyContent: "center", gap: 24 }}>
              {PROFILES.map((p) => <button key={p.id} type="button" onClick={() => (p.locked ? set({ ...s, gate: p.id }) : set({ active: p.id, gate: null }))} style={{ background: "none", border: 0, color: "inherit", cursor: "pointer" }} data-testid={`profile-${p.id}`}><div style={{ width: 110, height: 110, borderRadius: 8, background: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>{p.name[0]}</div><div style={{ marginTop: 8 }}>{p.name} {p.locked && "🔒"}</div></button>)}
            </div>
          </div>
        ) : (
          <div data-testid="profile-home">
            <div className="ee-row" style={{ marginBottom: 12 }}><Badge data-testid="active-profile">Profile: {prof.name}</Badge></div>
            <h2 style={{ fontSize: 20, marginBottom: 10 }}>Continue watching for {prof.name}</h2>
            <div className="ee-grid ee-grid--3">{ROWS[prof.id].map((t) => <Card key={t} tight data-testid={`title-${t.replace(/\s+/g, "-").toLowerCase()}`}><div className="ee-product__img" style={{ aspectRatio: "16/9", fontSize: 30 }} aria-hidden="true">🎞️</div><div className="ee-strong ee-small" style={{ marginTop: 6 }}>{t}</div></Card>)}</div>
          </div>
        )}
      </main>
    </>
  );
}
