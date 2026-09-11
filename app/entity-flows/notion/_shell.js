"use client";
import { getEntity } from "@/lib/registry";
export function NotionShell({ flow, pages = [], active, onPage, children, topRight }) {
  const ent = getEntity(flow.entitySlug);
  return (
    <div className="ee-shell" style={{ minHeight: "calc(100vh - 41px)" }}>
      <aside style={{ background: "#f7f6f3", borderRight: "1px solid var(--ee-border)", padding: "14px 10px" }} data-testid="notion-sidebar">
        <div className="ee-strong" style={{ padding: "4px 8px 12px" }}>🗒️ Demo's {ent.skin}</div>
        {pages.map((p) => <button key={p.id} type="button" onClick={() => onPage?.(p.id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "6px 8px", borderRadius: 6, border: 0, background: p.id === active ? "#e9e8e4" : "transparent", cursor: "pointer", fontSize: 14 }} data-testid={`nav-${p.id}`}>{p.icon || "📄"} {p.title}</button>)}
      </aside>
      <section className="ee-content" style={{ maxWidth: 900 }}>
        {topRight && <div className="ee-row ee-row--end" style={{ marginBottom: 8 }}>{topRight}</div>}
        {children}
      </section>
    </div>
  );
}
