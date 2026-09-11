"use client";
import { SaasShell } from "@/app/components/engines/SaasShell";
export function AsanaShell({ flow, active = "My tasks", title, actions, children }) {
  return <SaasShell flow={flow} nav={["Home", "My tasks", "Inbox", "Projects · Website launch"]} active={active} title={title} actions={actions}>{children}</SaasShell>;
}
