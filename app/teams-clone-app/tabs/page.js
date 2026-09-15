"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Badge, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, TAB_APPS, TEAM_CHANNELS, useStore } from "../shared";

/** Each tab app renders its own surface, so "the tab loaded" is observable. */
function TabSurface({ id }) {
  if (id === "tasks") {
    return (
      <div data-testid="tab-surface-tasks">
        <Row label="Open" value="4" />
        <Row label="In progress" value="2" />
        <Row label="Done this week" value="7" />
      </div>
    );
  }
  return (
    <div data-testid="tab-surface-wiki">
      <p><strong>Onboarding</strong> — how the release train works.</p>
      <p><strong>Runbooks</strong> — rollback steps for build 4.19.</p>
    </div>
  );
}

export default function Tabs() {
  const [s, update] = useStore();
  const [active, setActive] = useState(null);

  function addTab(appId) {
    update((st) => {
      if (!st.tabs.find((t) => t.appId === appId)) {
        st.tabs.push({ appId, channel: TEAM_CHANNELS[0].id });
      }
      return st;
    });
    setActive(appId);
  }

  const app = TAB_APPS.find((a) => a.id === active) || null;

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Apps" sub="Pin an app as a tab inside a channel">
        <Card title="Available apps">
          {TAB_APPS.map((a) => (
            <div key={a.id} className="ck-row" data-testid={`app-${a.id}`}>
              <span><strong>{a.name}</strong><div className="ck-muted">{a.blurb}</div></span>
              <Btn size="sm" data-testid={`add-tab-${a.id}`} onClick={() => addTab(a.id)}>Add to channel</Btn>
            </div>
          ))}
        </Card>

        <Card title={`${TEAM_CHANNELS[0].name} tabs`} testId="channel-tabs">
          {s.tabs.length === 0 && <Empty>No apps pinned yet.</Empty>}
          <div className="ck-card-actions">
            {s.tabs.map((t) => {
              const meta = TAB_APPS.find((a) => a.id === t.appId);
              return (
                <Btn key={t.appId} variant={active === t.appId ? "primary" : "secondary"}
                     data-testid={`tab-${t.appId}`} onClick={() => setActive(t.appId)}>
                  {meta.name}
                </Btn>
              );
            })}
          </div>
          {app && (
            <div data-testid="tab-content">
              <Badge tone="ok" testId="tab-loaded">{app.name} loaded</Badge>
              <TabSurface id={app.id} />
            </div>
          )}
        </Card>
      </Page>
    </Shell>
  );
}
