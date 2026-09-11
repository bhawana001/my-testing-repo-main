"use client";
import { getEntity } from "@/lib/registry";
import { ChannelList } from "@/app/components/engines/Feed";

export function SlackShell({ flow, channels = ["general", "design", "release-train"], active, onChannel, header, children, sideExtra }) {
  const ent = getEntity(flow.entitySlug);
  return (
    <div className="ee-shell" style={{ minHeight: "calc(100vh - 41px)" }}>
      <aside className="ee-sidenav" style={{ background: ent.accent }}>
        <div className="ee-sidenav__brand">Slacky · Acme Inc</div>
        <div className="ee-tiny" style={{ opacity: 0.7, padding: "0 10px 4px" }}>Channels</div>
        <ChannelList channels={channels} active={active} onSelect={onChannel || (() => {})} />
        {sideExtra}
      </aside>
      <section className="ee-content">
        {header}
        {children}
      </section>
    </div>
  );
}
