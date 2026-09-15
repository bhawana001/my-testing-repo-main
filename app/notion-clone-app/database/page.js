"use client";
import { useState } from "react";
import { Shell, Page, Card, Select, Field, Badge, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, STATUSES, useStore, viewRows } from "../shared";

export default function Database() {
  const [s] = useStore();
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("none");
  const rows = viewRows(s.database.rows, { status, sort });

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title={s.database.name} sub="Database view — filter and sort change what you see" wide>
        <Card title="View">
          <Field label="Filter by status">
            <Select value={status} data-testid="filter-status" aria-label="Status filter"
                    onChange={(e) => setStatus(e.target.value)}>
              <option value="all">All statuses</option>
              {STATUSES.map((st) => <option key={st} value={st}>{st}</option>)}
            </Select>
          </Field>
          <Field label="Sort by due date">
            <Select value={sort} data-testid="sort-due" aria-label="Sort"
                    onChange={(e) => setSort(e.target.value)}>
              <option value="none">No sort</option>
              <option value="due-asc">Due date, earliest first</option>
              <option value="due-desc">Due date, latest first</option>
            </Select>
          </Field>
          <Row label="Rows shown" value={`${rows.length} of ${s.database.rows.length}`} testId="row-count" />
        </Card>

        <Card title="Rows" testId="database-rows">
          {rows.length === 0 && <Empty>No rows match this view.</Empty>}
          <table className="ck-table">
            <thead>
              <tr><th>Name</th><th>Status</th><th>Due</th><th>Owner</th></tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id} data-testid={`row-${i}`}>
                  <td data-testid={`row-name-${i}`}>{r.name}</td>
                  <td><Badge tone={r.status === "Done" ? "ok" : r.status === "In progress" ? "info" : "neutral"}>{r.status}</Badge></td>
                  <td data-testid={`row-due-${i}`}>{r.due}</td>
                  <td>{r.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Page>
    </Shell>
  );
}
