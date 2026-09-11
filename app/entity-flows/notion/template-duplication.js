"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { NotionShell } from "./_shell";
import { Btn, Card, Badge } from "@/app/components/eval/ui";

const TEMPLATES = [
  { id: "t1", title: "Weekly meeting notes", icon: "🗓️", blocks: ["## Agenda", "- [ ] Review last week's action items", "- [ ] Metrics check-in", "## Notes", "## Action items"] },
  { id: "t2", title: "Project brief", icon: "📋", blocks: ["## Problem", "## Goals", "- [ ] Define success metrics", "- [ ] Align stakeholders", "## Timeline"] },
  { id: "t3", title: "Bug tracker", icon: "🐞", blocks: ["## Open bugs", "- [ ] Triage new reports", "## Fixed this week"] },
];
const Render = ({ blocks }) => blocks.map((b, i) => b.startsWith("## ") ? <h3 key={i} style={{ margin: "12px 0 4px" }}>{b.slice(3)}</h3> : b.startsWith("- [ ] ") ? <label key={i} className="ee-row" style={{ gap: 8 }}><input type="checkbox" readOnly /> {b.slice(6)}</label> : <p key={i}>{b}</p>);
const seed = () => ({ pages: [{ id: "home", title: "Home", icon: "🏠", blocks: ["Welcome to your workspace."] }], active: "gallery", preview: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const page = s.pages.find((p) => p.id === s.active);
  const tpl = TEMPLATES.find((t) => t.id === s.preview);
  function use(t) { const id = "pg" + (s.pages.length + 1); set({ ...s, pages: [...s.pages, { id, title: `${t.title} (copy)`, icon: t.icon, blocks: [...t.blocks], from: t.title }], active: id, preview: null }); }
  return (
    <NotionShell flow={flow} pages={[{ id: "gallery", title: "Templates", icon: "🧩" }, ...s.pages]} active={s.active} onPage={(id) => set({ ...s, active: id, preview: null })}>
      {s.active === "gallery" ? (tpl ? (
        <Card data-testid="template-preview">
          <div className="ee-row ee-row--between"><h2 style={{ fontSize: 22 }}>{tpl.icon} {tpl.title}</h2><Btn onClick={() => use(tpl)} data-testid="use-template">Use this template</Btn></div>
          <Render blocks={tpl.blocks} />
          <button className="ee-link ee-small" onClick={() => set({ ...s, preview: null })}>← All templates</button>
        </Card>
      ) : (<>
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>🧩 Templates</h1>
        <div className="ee-grid ee-grid--3" data-testid="template-gallery">{TEMPLATES.map((t) => <Card key={t.id} tight><div style={{ fontSize: 28 }}>{t.icon}</div><div className="ee-strong">{t.title}</div><Btn size="sm" variant="secondary" style={{ marginTop: 8 }} onClick={() => set({ ...s, preview: t.id })} data-testid={`preview-${t.id}`}>Preview</Btn></Card>)}</div>
      </>)) : page && (
        <article data-testid="page-view">
          <h1 style={{ fontSize: 32 }} data-testid="page-heading">{page.icon} {page.title}</h1>
          {page.from && <Badge tone="info" data-testid="from-template">Created from template: {page.from}</Badge>}
          <div data-testid="page-content"><Render blocks={page.blocks} /></div>
        </article>
      )}
    </NotionShell>
  );
}
