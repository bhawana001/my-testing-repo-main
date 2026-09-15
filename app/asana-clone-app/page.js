"use client";
import { Shell, Page, Card, Row, Empty } from "../clones/kit/ui";
import Nav from "./Nav";
import { BRAND, SECTIONS, useStore } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title={s.project} sub="Project overview">
        <Card title="Sections">
          {SECTIONS.map((sec) => (
            <Row key={sec} label={sec} value={s.tasks.filter((t) => t.section === sec).length}
                 testId={`section-count-${sec.replace(/\s+/g, "-").toLowerCase()}`} />
          ))}
          <Row label="Total tasks" value={s.tasks.length} testId="task-count" />
        </Card>
        <Card title="Notifications" testId="notifications">
          {s.notifications.length === 0 && <Empty>No notifications yet.</Empty>}
          {s.notifications.map((n) => (
            <Row key={n.id} label={n.to} value={n.text} testId={`notif-${n.id}`} />
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
