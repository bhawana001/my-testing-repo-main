"use client";
import Link from "next/link";
import { Shell, Page, Card, Badge, Empty } from "../clones/kit/ui";
import Nav from "./Nav";
import { BRAND, BASE, useStore, slug } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Meetings" sub="Your scheduled and upcoming meetings">
        <Card title="Upcoming" testId="meeting-list">
          {s.meetings.length === 0 && <Empty>Nothing scheduled.</Empty>}
          {s.meetings.map((m) => (
            <div key={m.id} className="ck-row" data-testid={`meeting-${slug(m.id)}`}>
              <span>
                <strong>{m.topic}</strong>
                <div className="ck-muted">
                  {m.when} · {m.duration} min · Meeting ID {m.id}
                </div>
                {m.registration && <Badge tone="info">Registration required</Badge>}
                {m.waitingRoom && <Badge tone="warn">Waiting room on</Badge>}
                {m.registrants.length > 0 && (
                  <Badge tone="ok" testId={`registrants-${slug(m.id)}`}>
                    {m.registrants.length} registered
                  </Badge>
                )}
              </span>
              <span>
                <Link href={`${BASE}/m/${slug(m.id)}`} className="ck-btn ck-btn--primary ck-btn--sm"
                      data-testid={`open-${slug(m.id)}`}>Start</Link>{" "}
                {m.registration && (
                  <Link href={`${BASE}/register/${slug(m.id)}`} className="ck-btn ck-btn--ghost ck-btn--sm"
                        data-testid={`reglink-${slug(m.id)}`}>Registration link</Link>
                )}
              </span>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
