"use client";
import { getEntity } from "@/lib/registry";
import { Topbar } from "../eval/SkinChrome";
import { Badge } from "../eval/ui";

export function TradeShell({ flow, nav, active, right, children, wide }) {
  const ent = getEntity(flow.entitySlug);
  return (
    <>
      <Topbar entity={ent} nav={nav} active={active} light={ent.mode !== "dark"} right={right || <Badge tone="warn">Paper trading</Badge>} />
      <main className={"ee-main" + (wide ? " ee-main--wide" : "")}>{children}</main>
    </>
  );
}
export function Change({ value, prev, suffix = "" }) {
  const d = value - prev; const p = (d / prev) * 100;
  const up = d >= 0;
  return <span style={{ color: up ? "var(--ee-ok)" : "var(--ee-err)", fontWeight: 700 }} className="ee-num">{up ? "+" : "−"}{Math.abs(d).toFixed(2)}{suffix} ({up ? "+" : "−"}{Math.abs(p).toFixed(2)}%)</span>;
}
