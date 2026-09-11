"use client";
import { SaasShell } from "@/app/components/engines/SaasShell";
export const STATUS = { "Working on it": "#fdab3d", Done: "#00c875", Stuck: "#e2445c", "Not started": "#c4c4c4" };
export function StatusPill({ v }) { return <span style={{ background: STATUS[v] || "#c4c4c4", color: "#fff", padding: "4px 10px", borderRadius: 4, fontWeight: 700, fontSize: 12, display: "inline-block", minWidth: 100, textAlign: "center" }}>{v}</span>; }
export function MondayShell({ flow, title, actions, children, active = "Marketing plan" }) {
  return <SaasShell flow={flow} nav={["Home", "My work", "Marketing plan", "Client project", "Dashboards", "Automations"]} active={active} title={title} actions={actions}>{children}</SaasShell>;
}
