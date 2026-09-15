"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Select, Field, Badge, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, CHANNELS, useStore, searchMessages, highlight } from "../shared";

export default function Search() {
  const [s] = useStore();
  const [q, setQ] = useState("");
  const [scope, setScope] = useState("all");
  const [ran, setRan] = useState(false);

  const hits = ran ? searchMessages(s.messages, q, scope) : [];

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Search" sub="Search every channel, then narrow to one">
        <Card title="Query">
          <Field label="Search term">
            <Input value={q} placeholder="deploy" data-testid="search-input" aria-label="Search term"
                   onChange={(e) => { setQ(e.target.value); setRan(false); }}
                   onKeyDown={(e) => e.key === "Enter" && setRan(true)} />
          </Field>
          <Field label="In channel">
            <Select value={scope} data-testid="search-scope" aria-label="Channel filter"
                    onChange={(e) => setScope(e.target.value)}>
              <option value="all">All channels</option>
              {CHANNELS.map((c) => <option key={c.id} value={c.id}>#{c.name}</option>)}
            </Select>
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={() => setRan(true)} data-testid="search-go">Search</Btn>
          </div>
        </Card>

        {ran && (
          <Card title="Results" testId="search-results">
            <div className="ck-muted" data-testid="result-count">
              {hits.length} {hits.length === 1 ? "result" : "results"}
              {scope !== "all" ? ` in #${CHANNELS.find((c) => c.id === scope).name}` : " across all channels"}
            </div>
            {hits.length === 0 && <Empty>No messages matched.</Empty>}
            {hits.map((h, i) => {
              const [pre, hit, post] = highlight(h.text, q);
              return (
                <div key={`${h.id}-${i}`} className="ck-row" data-testid={`result-${i}`}>
                  <span>
                    <Badge tone="neutral" testId={`result-channel-${i}`}>#{h.channelName}</Badge>{" "}
                    <strong>{h.user}</strong>
                    <div>
                      {pre}
                      {hit && <mark data-testid={`highlight-${i}`}>{hit}</mark>}
                      {post}
                    </div>
                  </span>
                </div>
              );
            })}
          </Card>
        )}
      </Page>
    </Shell>
  );
}
