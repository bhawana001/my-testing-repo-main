"use client";
import Link from "next/link";
import { Shell, Page, Card, Row, Badge } from "../clones/kit/ui";
import Nav from "./Nav";
import { BRAND, BASE, PROJECT, STATUSES, useStore } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title={PROJECT.name} sub={`Project ${PROJECT.key}`}>
        <Card title="Issues">
          <Row label="Total issues" value={s.issues.length} testId="issue-count" />
          {STATUSES.map((st) => (
            <Row key={st} label={st} value={s.issues.filter((i) => i.status === st).length}
                 testId={`status-count-${st.replace(/\s+/g, "-").toLowerCase()}`} />
          ))}
          <Row label="Saved filters" value={s.savedFilters.length} testId="filter-count" />
        </Card>
        <Card title="All issues" testId="issue-list">
          {s.issues.map((i) => (
            <div key={i.key} className="ck-row" data-testid={`issue-${i.key}`}>
              <span>
                <Link href={`${BASE}/browse/${i.key}`}>{i.key}</Link> — {i.summary}
                <div className="ck-muted">{i.type} · {i.component} · {i.assignee}</div>
              </span>
              <Badge tone={i.status === "Done" ? "ok" : "neutral"}>{i.status}</Badge>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
