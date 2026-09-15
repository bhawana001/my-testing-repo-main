"use client";
import Link from "next/link";
import { Shell, Page, Card, Row, Badge, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, ME, TODAY, BUCKETS, useStore, bucketOf } from "../shared";

export default function MyTasks() {
  const [s] = useStore();
  const mine = s.tasks.filter((t) => t.assignee === ME);

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="My Tasks" sub={`Assigned to ${ME} · grouped by due date · today is ${TODAY}`}>
        <Card title="Summary">
          <Row label="Tasks assigned to me" value={mine.length} testId="my-task-count" />
        </Card>

        {BUCKETS.map((bucket) => {
          const rows = mine.filter((t) => bucketOf(t.due) === bucket);
          const key = bucket.replace(/\s+/g, "-").toLowerCase();
          if (rows.length === 0 && bucket === "No date") return null;
          return (
            <Card key={bucket} title={`${bucket} (${rows.length})`} testId={`bucket-${key}`}>
              {rows.length === 0 && <Empty>Nothing here.</Empty>}
              {rows.map((t) => (
                <div key={t.id} className="ck-row" data-testid={`my-task-${t.id}`}>
                  <span>
                    <Link href={`${BASE}/task/${t.id}`}>{t.name}</Link>
                    <div className="ck-muted">{t.section}</div>
                  </span>
                  <span>
                    <span data-testid={`my-task-due-${t.id}`}>{t.due}</span>{" "}
                    <Badge tone={bucket === "Overdue" ? "bad" : bucket === "Today" ? "warn" : "neutral"}
                           testId={`my-task-bucket-${t.id}`}>{bucket}</Badge>
                  </span>
                </div>
              ))}
            </Card>
          );
        })}
      </Page>
    </Shell>
  );
}
