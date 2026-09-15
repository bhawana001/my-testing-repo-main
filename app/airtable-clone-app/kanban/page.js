"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Badge, Row, Banner, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, STAGES, useStore, runAutomations } from "../shared";

/**
 * Cards move by drag-and-drop and by an explicit "Move to" control. Both write
 * the same stage field on the record, so the board and the grid never disagree.
 */
export default function Kanban() {
  const [s, update] = useStore();
  const [dragging, setDragging] = useState(null);
  const [notice, setNotice] = useState(null);

  function move(id, to) {
    const record = s.records.find((r) => r.id === id);
    if (!record || record.stage === to) return;
    const from = record.stage;
    update((st) => {
      const r = st.records.find((x) => x.id === id);
      if (!r) return st;
      r.stage = to;
      st.runLog.unshift(...runAutomations(st.automations, r, { field: "stage", from, to }));
      return st;
    });
    setNotice({ tone: "ok", msg: `${record.name} moved from ${from} to ${to}.` });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Kanban view" sub="Drag a card, or use Move to — both update the stage field" wide>
        {notice && <Banner tone={notice.tone} testId="kanban-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <div className="ck-grid ck-grid--3">
          {STAGES.map((stage) => {
            const cards = s.records.filter((r) => r.stage === stage);
            const key = stage.replace(/\s+/g, "-").toLowerCase();
            return (
              <Card key={stage} title={`${stage} (${cards.length})`} testId={`column-${key}`}>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => { if (dragging) move(dragging, stage); setDragging(null); }}
                  data-testid={`dropzone-${key}`}
                  style={{ minHeight: 60 }}
                >
                  {cards.length === 0 && <Empty>Empty</Empty>}
                  {cards.map((r) => (
                    <div key={r.id} className="ck-tile" draggable
                         onDragStart={() => setDragging(r.id)}
                         data-testid={`card-${r.id}`}>
                      <strong>{r.name}</strong>
                      <div className="ck-muted">{r.owner} · effort {r.effort}</div>
                      <Badge tone="neutral" testId={`card-stage-${r.id}`}>{r.stage}</Badge>
                      <div className="ck-card-actions">
                        <select className="ck-input" value={r.stage} aria-label={`Move ${r.name}`}
                                data-testid={`move-${r.id}`}
                                onChange={(e) => move(r.id, e.target.value)}>
                          {STAGES.map((st) => <option key={st} value={st}>{st}</option>)}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        <Card title="Stage field on each record" testId="stage-readout">
          {s.records.map((r) => (
            <Row key={r.id} label={`${r.id} — ${r.name}`} value={r.stage} testId={`readout-${r.id}`} />
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
