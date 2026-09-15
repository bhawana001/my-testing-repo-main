"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Select, Field, Row, Badge, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, STATUSES, STATUS_TONE, useStore, statusBreakdown } from "../shared";

/** Bars are sized from the live counts, and each one prints its own number. */
function StatusChart({ board }) {
  const counts = statusBreakdown(board);
  const max = Math.max(1, ...Object.values(counts));
  return (
    <div data-testid="chart">
      {STATUSES.map((st) => {
        const key = st.replace(/\s+/g, "-").toLowerCase();
        const n = counts[st];
        return (
          <div key={st} className="ck-row" data-testid={`bar-${key}`}>
            <span style={{ minWidth: 120 }}>{st}</span>
            <span style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
              <span aria-hidden="true" style={{
                display: "inline-block", height: 14, borderRadius: 7,
                width: `${(n / max) * 160}px`, minWidth: n ? 8 : 0,
                background: "var(--ck-accent)",
              }} />
              <strong data-testid={`bar-value-${key}`}>{n}</strong>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function Dashboard() {
  const [s, update] = useStore();
  const [boardId, setBoardId] = useState("launch");
  const boards = Object.values(s.boards);

  function addWidget() {
    update((st) => {
      if (!st.widgets.find((w) => w.boardId === boardId && w.type === "status-chart")) {
        st.widgets.push({ id: `w${st.counter++}`, type: "status-chart", boardId, title: `${st.boards[boardId].name} by status` });
      }
      return st;
    });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Dashboard" sub="Widgets read straight from board data" wide>
        <Card title="Add a widget">
          <Field label="Board">
            <Select value={boardId} data-testid="widget-board" aria-label="Board"
                    onChange={(e) => setBoardId(e.target.value)}>
              {boards.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </Select>
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={addWidget} data-testid="add-widget">Add chart widget</Btn>
          </div>
        </Card>

        <Row label="Widgets" value={s.widgets.length} testId="widget-count" />
        {s.widgets.length === 0 && <Empty>No widgets on the dashboard yet.</Empty>}

        {s.widgets.map((w) => {
          const board = s.boards[w.boardId];
          if (!board) return null;
          const counts = statusBreakdown(board);
          return (
            <Card key={w.id} title={w.title} testId={`widget-${w.id}`}>
              <Badge tone="info" testId={`widget-source-${w.id}`}>Source: {board.name} · {board.items.length} items</Badge>
              <StatusChart board={board} />
              <div className="ck-muted" data-testid={`widget-summary-${w.id}`}>
                {STATUSES.map((st) => `${st}: ${counts[st]}`).join(" · ")}
              </div>
            </Card>
          );
        })}
      </Page>
    </Shell>
  );
}
