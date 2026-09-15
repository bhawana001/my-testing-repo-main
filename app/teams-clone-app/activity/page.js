"use client";
import { useState } from "react";
import { Shell, Page, Card, Select, Field, Badge, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, PEOPLE, useStore } from "../shared";

export default function Activity() {
  const [s] = useStore();
  const [viewer, setViewer] = useState(PEOPLE[1].name);
  const items = s.activity.filter((a) => a.to === viewer);

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Activity" sub="Mentions land here for the person who was mentioned">
        <Card title="Viewing as">
          <Field label="Person" hint="Switch to check a mention reached the right person">
            <Select value={viewer} data-testid="viewer" aria-label="Viewer"
                    onChange={(e) => setViewer(e.target.value)}>
              {PEOPLE.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
            </Select>
          </Field>
        </Card>

        <Card title="Feed" testId="activity-feed">
          <div className="ck-muted" data-testid="activity-total">
            {items.length} {items.length === 1 ? "item" : "items"} for {viewer}
          </div>
          {items.length === 0 && <Empty>Nothing here yet.</Empty>}
          {items.map((a) => (
            <div key={a.id} className="ck-row" data-testid={`activity-${a.id}`}>
              <span>
                <strong>{a.from}</strong> mentioned you in <em>{a.channel}</em>
                <div data-testid={`activity-text-${a.id}`}>{a.text}</div>
              </span>
              <Badge tone="info">@mention</Badge>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
