"use client";
import Link from "next/link";
import { Shell, Page, Card, Badge, Row } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, MATCHES, useStore } from "../shared";

export default function Sports() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Sports" sub="Live and upcoming">
        {MATCHES.map((m) => (
          <Card key={m.id} title={`${m.home.name} v ${m.away.name}`} testId={`fixture-${m.id}`}>
            <Badge tone={m.status === "LIVE" ? "bad" : "neutral"} testId={`fixture-status-${m.id}`}>
              {m.status === "LIVE" ? "● LIVE" : "Upcoming"}
            </Badge>
            <Row label="Competition" value={m.competition} />
            <Row label="Venue" value={m.venue} />
            {m.status === "LIVE" && (
              <Row label="Score" value={`${m.home.short} ${s.score.runs}/${s.score.wickets} (${s.score.overs})`}
                   testId={`fixture-score-${m.id}`} />
            )}
            <div className="ck-card-actions">
              <Link href={`${BASE}/watch/${m.id}`} className="ck-btn ck-btn--primary" data-testid={`watch-${m.id}`}>
                {m.status === "LIVE" ? "Watch live" : "Set a reminder"}
              </Link>
            </div>
          </Card>
        ))}
      </Page>
    </Shell>
  );
}
