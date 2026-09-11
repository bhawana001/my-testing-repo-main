"use client";
// Dense SaaS chrome: dark sidenav + header bar + content area.
import { getEntity } from "@/lib/registry";
import { Badge } from "../eval/ui";

export function SaasShell({ flow, nav = [], active, title, actions, children, sub }) {
  const ent = getEntity(flow.entitySlug);
  return (
    <div className="ee-shell">
      <aside className="ee-sidenav">
        <div className="ee-sidenav__brand">{ent.skin}</div>
        {nav.map((n) => <button key={n} type="button" data-active={n === active ? "true" : "false"}>{n}</button>)}
      </aside>
      <section className="ee-content">
        <div className="ee-row ee-row--between" style={{ marginBottom: 14 }}>
          <div>
            <h1 style={{ fontSize: 20 }} data-testid="page-title">{title}</h1>
            {sub && <div className="ee-small ee-muted">{sub}</div>}
          </div>
          <div className="ee-row">{actions}<Badge>Demo User · Admin</Badge></div>
        </div>
        {children}
      </section>
    </div>
  );
}
