"use client";
// Skin chrome: a top bar and sidenav that adopt the entity's accent colours.
import { cx } from "./ui";

export function Topbar({ entity, nav = [], right, light, active }) {
  return (
    <header className={cx("ee-topbar", light && "ee-topbar--light")}>
      <span className="ee-logo">
        <span className="ee-logo__mark" aria-hidden="true" />
        {entity.skin}
      </span>
      {nav.length > 0 && (
        <nav className="ee-topbar__nav" aria-label="Primary">
          {nav.map((n) => (
            <span key={n} style={{ fontWeight: n === active ? 800 : 500 }}>{n}</span>
          ))}
        </nav>
      )}
      <span className="ee-topbar__spacer" />
      {right}
    </header>
  );
}

export function Sidenav({ entity, items, active, onSelect }) {
  return (
    <aside className="ee-sidenav">
      <div className="ee-sidenav__brand">{entity.skin}</div>
      {items.map((it) => (
        <button key={it} type="button" data-active={it === active ? "true" : "false"} onClick={() => onSelect?.(it)}>
          {it}
        </button>
      ))}
    </aside>
  );
}
