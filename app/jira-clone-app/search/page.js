"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Textarea, Field, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, useStore, runJql } from "../shared";

const EXAMPLES = [
  'project = ACME AND status = "In Progress"',
  'project = ACME AND type = Bug AND priority = Highest',
  'component = Billing ORDER BY priority ASC',
];

export default function Search() {
  const [s, update] = useStore();
  const [jql, setJql] = useState('project = ACME AND type = Bug');
  const [result, setResult] = useState(null);
  const [filterName, setFilterName] = useState("");
  const [notice, setNotice] = useState(null);

  function run() {
    setResult(runJql(s.issues, jql));
    setNotice(null);
  }

  function saveFilter() {
    const name = filterName.trim();
    if (!name) { setNotice({ tone: "bad", msg: "Give the filter a name before saving." }); return; }
    if (!result || result.error) { setNotice({ tone: "bad", msg: "Run a valid query before saving it." }); return; }
    update((st) => {
      st.savedFilters = st.savedFilters.filter((f) => f.name !== name);
      st.savedFilters.unshift({ id: `flt_${st.counter++}`, name, jql, count: result.rows.length });
      return st;
    });
    setNotice({ tone: "ok", msg: `Filter “${name}” saved.` });
    setFilterName("");
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Filters" sub="Run a JQL query, then save it" wide>
        {notice && <Banner tone={notice.tone} testId="filter-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="JQL">
          <Field label="Query" hint="field = value joined by AND, with an optional ORDER BY">
            <Textarea value={jql} data-testid="jql-input" aria-label="JQL query" rows={2}
                      onChange={(e) => setJql(e.target.value)} />
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={run} data-testid="run-jql">Run query</Btn>
            {EXAMPLES.map((ex, i) => (
              <Btn key={i} variant="ghost" size="sm" data-testid={`example-${i}`} onClick={() => setJql(ex)}>
                Example {i + 1}
              </Btn>
            ))}
          </div>
        </Card>

        {result && (
          <Card title="Results" testId="jql-results">
            {result.error && <Banner tone="bad" testId="jql-error">{result.error}</Banner>}
            {!result.error && (
              <>
                <Row label="Issues matched" value={result.rows.length} testId="result-count" />
                {result.rows.length === 0 && <Empty>No issues match this query.</Empty>}
                <table className="ck-table">
                  <thead><tr><th>Key</th><th>Summary</th><th>Type</th><th>Priority</th><th>Status</th></tr></thead>
                  <tbody>
                    {result.rows.map((i, idx) => (
                      <tr key={i.key} data-testid={`result-${idx}`}>
                        <td><Link href={`${BASE}/browse/${i.key}`} data-testid={`result-key-${idx}`}>{i.key}</Link></td>
                        <td>{i.summary}</td>
                        <td data-testid={`result-type-${idx}`}>{i.type}</td>
                        <td data-testid={`result-priority-${idx}`}>{i.priority}</td>
                        <td data-testid={`result-status-${idx}`}>{i.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </Card>
        )}

        <Card title="Save this filter">
          <Field label="Filter name">
            <Input value={filterName} placeholder="Open checkout bugs" data-testid="filter-name"
                   aria-label="Filter name" onChange={(e) => setFilterName(e.target.value)} />
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={saveFilter} data-testid="save-filter">Save filter</Btn>
          </div>
        </Card>

        <Card title="Saved filters" testId="saved-filters">
          <Row label="Saved" value={s.savedFilters.length} testId="saved-count" />
          {s.savedFilters.length === 0 && <Empty>Nothing saved yet.</Empty>}
          {s.savedFilters.map((f) => (
            <div key={f.id} className="ck-row" data-testid={`saved-${f.id}`}>
              <span>
                <strong data-testid={`saved-name-${f.id}`}>{f.name}</strong>
                <div className="ck-muted">{f.jql}</div>
              </span>
              <span>
                <Badge tone="info">{f.count} issues</Badge>{" "}
                <Btn size="sm" variant="ghost" data-testid={`load-${f.id}`}
                     onClick={() => { setJql(f.jql); setResult(runJql(s.issues, f.jql)); }}>Load</Btn>
              </span>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
