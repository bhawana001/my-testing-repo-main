"use client";
import Link from "next/link";
import { Shell, Page, Card, Row, Empty } from "../clones/kit/ui";
import Nav from "./Nav";
import { BRAND, BASE, useStore } from "./shared";

export default function Home() {
  const [s] = useStore();
  const boards = Object.values(s.boards);
  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Workspace" sub={`${boards.length} boards`}>
        <Card title="Boards" testId="board-list">
          {boards.map((b) => (
            <div key={b.id} className="ck-row" data-testid={`board-${b.id}`}>
              <span><Link href={`${BASE}/board/${b.id}`} data-testid={`open-${b.id}`}>{b.name}</Link></span>
              <span>{b.items.length} items</span>
            </div>
          ))}
        </Card>
        <Card title="Notifications" testId="notifications">
          <Row label="Total" value={s.notifications.length} testId="notification-count" />
          {s.notifications.length === 0 && <Empty>No automation has fired yet.</Empty>}
          {s.notifications.map((n) => (
            <Row key={n.id} label={n.to} value={n.text} testId={`notification-${n.id}`} />
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
