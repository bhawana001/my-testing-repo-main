"use client";
// Opportunity pipeline (28.2). Moving a deal to the next stage updates its
// probability, which is the assertion. Both the stage path buttons and real
// drag-and-drop between columns work.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner } from "../../clones/kit/ui";
import { BRAND, BASE, STAGES, stageIdx, useStore, money } from "../shared";

export default function PipelinePage() {
  const [s, update] = useStore();
  const [notice, setNotice] = useState(null);
  const [dragging, setDragging] = useState(null);

  function moveTo(oppId, stageId) {
    const stage = STAGES.find((x) => x.id === stageId);
    const opp = s.opportunities.find((o) => o.id === oppId);
    if (!opp || opp.stage === stageId) return;
    update((st) => {
      const o = st.opportunities.find((x) => x.id === oppId);
      o.stage = stageId;
      o.probability = stage.probability;
      return st;
    });
    setNotice(`${opp.name} moved to ${stage.name} — probability now ${stage.probability}%.`);
  }

  function nextStage(opp) {
    const i = stageIdx(opp.stage);
    if (i < STAGES.length - 1) moveTo(opp.id, STAGES[i + 1].id);
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/reports`, label: "Reports" }]} />
      <Page title="Opportunities" sub="Pipeline board" wide>
        {notice && <Banner tone="ok" testId="stage-notice" onClose={() => setNotice(null)}>{notice}</Banner>}

        <div className="ck-grid ck-grid--3" data-testid="kanban">
          {STAGES.map((stage) => {
            const list = s.opportunities.filter((o) => o.stage === stage.id);
            return (
              <Card key={stage.id} testId={`column-${stage.id}`}
                    title={`${stage.name} · ${stage.probability}%`}
                    className={dragging ? "ck-card--warn" : ""}>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); if (dragging) moveTo(dragging, stage.id); setDragging(null); }}
                  style={{ minHeight: 60 }}
                >
                  <div className="ck-muted">{list.length} deal{list.length === 1 ? "" : "s"} · {money(list.reduce((n, o) => n + o.amount, 0))}</div>
                  {list.map((o) => (
                    <div key={o.id} className="ck-tile" style={{ marginTop: 8, cursor: "grab" }}
                         draggable onDragStart={() => setDragging(o.id)} onDragEnd={() => setDragging(null)}
                         data-testid={`opp-${o.id}`}>
                      <div className="ck-strong">{o.name}</div>
                      <div className="ck-muted">{o.account} · closes {o.closeDate}</div>
                      <Row label="Amount" value={money(o.amount)} testId={`opp-amount-${o.id}`} />
                      <Badge tone="info" testId={`opp-probability-${o.id}`}>{o.probability}% probability</Badge>
                      {stageIdx(o.stage) < STAGES.length - 1 && (
                        <Btn size="sm" block style={{ marginTop: 6 }} onClick={() => nextStage(o)}
                             data-testid={`advance-${o.id}`}>
                          Move to {STAGES[stageIdx(o.stage) + 1].name}
                        </Btn>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </Page>
    </Shell>
  );
}
