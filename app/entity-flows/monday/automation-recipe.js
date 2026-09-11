"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { MondayShell, STATUS } from "./_shell";
import { Card, Select, Btn, Badge, Alert, Segment } from "@/app/components/eval/ui";

const seed = () => ({ items: [{ id: "i1", name: "Design review", status: "Working on it" }, { id: "i2", name: "Launch email", status: "Not started" }], recipes: [], notes: { "Priya Nair": [] }, as: "Demo User" });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [when, setWhen] = useState("Done"); const [who, setWho] = useState("Priya Nair");
  function change(id, status) {
    set((st) => {
      const item = st.items.find((i) => i.id === id);
      const notes = { ...st.notes };
      st.recipes.filter((r) => r.when === status && item.status !== status).forEach((r) => { notes[r.who] = [{ id: id + status + (notes[r.who]?.length || 0), text: `Automation: “${item.name}” status changed to ${status}` }, ...(notes[r.who] || [])]; });
      return { ...st, items: st.items.map((i) => (i.id === id ? { ...i, status } : i)), notes };
    });
  }
  const bell = s.notes["Priya Nair"] || [];
  return (
    <MondayShell flow={flow} active="Automations" title="Marketing plan · Automations" actions={<Segment options={[{ value: "Demo User", label: "Me" }, { value: "Priya Nair", label: "Priya" }]} value={s.as} onChange={(v) => set({ ...s, as: v })} />}>
      {s.as === "Demo User" ? (<>
        <Card title="Recipe" data-testid="recipe-builder">
          <div className="ee-row" style={{ fontSize: 16, gap: 6 }}>When <b>Status</b> changes to <Select value={when} onChange={(e) => setWhen(e.target.value)} aria-label="Status value" style={{ width: "auto" }}>{Object.keys(STATUS).map((x) => <option key={x}>{x}</option>)}</Select>, notify <Select value={who} onChange={(e) => setWho(e.target.value)} aria-label="Notify person" style={{ width: "auto" }}>{["Priya Nair", "Tom Alvarez"].map((x) => <option key={x}>{x}</option>)}</Select></div>
          <Btn style={{ marginTop: 10 }} onClick={() => set({ ...s, recipes: [...s.recipes, { id: "r" + (s.recipes.length + 1), when, who }] })} data-testid="create-automation">Create automation</Btn>
          <div className="ee-stack" style={{ marginTop: 10 }} data-testid="active-recipes">{s.recipes.map((r) => <div key={r.id} className="ee-small"><Badge tone="ok">Active</Badge> When Status changes to {r.when}, notify {r.who}</div>)}</div>
        </Card>
        <Card title="Board items" style={{ marginTop: 14 }} data-testid="items">
          {s.items.map((i) => <div key={i.id} className="ee-row ee-row--between" style={{ padding: "6px 0" }}><span>{i.name}</span><Select value={i.status} onChange={(e) => change(i.id, e.target.value)} aria-label={`Status for ${i.name}`} style={{ width: "auto", background: STATUS[i.status], color: "#fff", fontWeight: 700 }}>{Object.keys(STATUS).map((x) => <option key={x}>{x}</option>)}</Select></div>)}
        </Card>
      </>) : (
        <Card title={<span>🔔 Notifications {bell.length > 0 && <Badge tone="err" data-testid="bell-count">{bell.length}</Badge>}</span>} data-testid="bell">
          {bell.length === 0 ? <div className="ee-empty">No notifications.</div> : bell.map((n) => <div key={n.id} className="ee-card ee-card--flat ee-card--tight" data-testid={`note-${n.id}`}>{n.text}</div>)}
        </Card>
      )}
    </MondayShell>
  );
}
