"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Select, Field, Badge, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, FILE_TYPES, useStore, searchFiles } from "../shared";

export default function Search() {
  const [s] = useStore();
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const [ran, setRan] = useState(false);

  const rows = ran ? searchFiles(s.files, q, type) : [];

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Search Drivve" sub="Keyword across names and contents, narrowed by file type" wide>
        <Card title="Query">
          <Field label="Keyword">
            <Input value={q} placeholder="launch" data-testid="search-input" aria-label="Keyword"
                   onChange={(e) => { setQ(e.target.value); setRan(false); }}
                   onKeyDown={(e) => e.key === "Enter" && setRan(true)} />
          </Field>
          <Field label="File type">
            <Select value={type} data-testid="type-filter" aria-label="File type"
                    onChange={(e) => setType(e.target.value)}>
              <option value="all">Any type</option>
              {FILE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </Select>
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={() => setRan(true)} data-testid="search-go">Search</Btn>
          </div>
        </Card>

        {ran && (
          <Card title="Results" testId="search-results">
            <Row label="Matches"
                 value={`${rows.length}${type !== "all" ? ` of type ${type}` : ""}`}
                 testId="result-count" />
            {rows.length === 0 && <Empty>Nothing matched.</Empty>}
            <table className="ck-table">
              <thead><tr><th>Name</th><th>Type</th><th>Owner</th></tr></thead>
              <tbody>
                {rows.map((f, i) => (
                  <tr key={f.id} data-testid={`result-${i}`}>
                    <td data-testid={`result-name-${i}`}>{f.name}</td>
                    <td><Badge tone="neutral" testId={`result-type-${i}`}>{f.type}</Badge></td>
                    <td>{f.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </Page>
    </Shell>
  );
}
