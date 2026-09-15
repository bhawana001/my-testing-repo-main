"use client";
import Link from "next/link";
import { Shell, Page, Card, Badge } from "../clones/kit/ui";
import Nav from "./Nav";
import { BRAND, BASE, MATCHES, SHOWS } from "./shared";

export default function Home() {
  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Hotstarr" sub="Live sport, shows and films">
        <Card title="Live now" testId="live-now">
          {MATCHES.map((m) => (
            <div key={m.id} className="ck-row" data-testid={`match-${m.id}`}>
              <span>
                <Link href={`${BASE}/watch/${m.id}`} data-testid={`open-${m.id}`}>
                  <strong>{m.home.name} v {m.away.name}</strong>
                </Link>
                <div className="ck-muted">{m.competition} · {m.venue}</div>
              </span>
              <Badge tone={m.status === "LIVE" ? "bad" : "neutral"} testId={`status-${m.id}`}>
                {m.status === "LIVE" ? "● LIVE" : m.startsAt}
              </Badge>
            </div>
          ))}
        </Card>
        <Card title="Popular shows">
          {SHOWS.map((s) => (
            <div key={s.id} className="ck-row" data-testid={`show-${s.id}`}>
              <span><strong>{s.title}</strong><div className="ck-muted">{s.kind} · {s.rating}</div></span>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
