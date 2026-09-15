"use client";
import Link from "next/link";
import { Shell, Page, Card, Row, Badge } from "../clones/kit/ui";
import Nav from "./Nav";
import { BRAND, BASE, CHANNELS, useStore, threadCount } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Acme Robotics" sub="3 channels · 4 members">
        <Card title="Channels">
          {CHANNELS.map((c) => {
            const msgs = s.messages[c.id] || [];
            const threads = msgs.filter((m) => threadCount(m) > 0).length;
            return (
              <div key={c.id} className="ck-row">
                <span>
                  <Link href={`${BASE}/channel/${c.id}`} data-testid={`channel-${c.id}`}>#{c.name}</Link>
                  <span className="ck-muted"> — {c.purpose}</span>
                </span>
                <span>
                  {msgs.length} messages{threads ? ` · ${threads} threads` : ""}
                </span>
              </div>
            );
          })}
        </Card>
        <Card title="Workspace">
          <Row label="Files uploaded" value={s.files.length} testId="file-count" />
          <Row label="Workflow submissions" value={s.workflowRuns.length} testId="workflow-count" />
          <Row label="Huddle" value={s.huddle ? `Active in #${s.huddle.channel}` : "None"} testId="huddle-state" />
        </Card>
      </Page>
    </Shell>
  );
}
