"use client";
import { useState } from "react";
import { Shell, Page, Card, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, STAGES, useStore, money } from "../shared";

export default function Deals() {
  const [s, update] = useStore();
  const [dragging, setDragging] = useState(null);
  const [notice, setNotice] = useState(null);

  function move(id, to) {
    const deal = s.deals.find((d) => d.id === id);
    if (!deal || deal.stage === to) return;
    const from = deal.stage;
    update((st) => {
      const d = st.deals.find((x) => x.id === id);
      if (!d) return st;
      // Only the stage changes — the amount is deliberately untouched, because
      // losing it on a drag is the classic pipeline bug.
      d.stage = to;
      d.history.push({ at: "2026-09-16", text: `Stage ${from} → ${to}, amount unchanged at ${money(d.amount)}` });
      return st;
    });
    setNotice({ tone: "ok", msg: `${deal.name} moved to ${to}. Amount still ${money(deal.amount)}.` });
  }

  const total = s.deals.reduce((n, d) => n + d.amount, 0);

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Sales pipeline" sub={`${s.deals.length} deals · ${money(total)}`} wide>
        {notice && <Banner tone={notice.tone} testId="deal-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <div className="ck-grid ck-grid--3">
          {STAGES.map((stage) => {
            const key = stage.replace(/\s+/g, "-").toLowerCase();
            const cards = s.deals.filter((d) => d.stage === stage);
            const value = cards.reduce((n, d) => n + d.amount, 0);
            return (
              <Card key={stage} title={`${stage} — ${money(value)}`} testId={`column-${key}`}>
                <div onDragOver={(e) => e.preventDefault()}
                     onDrop={() => { if (dragging) move(dragging, stage); setDragging(null); }}
                     data-testid={`dropzone-${key}`} style={{ minHeight: 60 }}>
                  {cards.length === 0 && <Empty>Empty</Empty>}
                  {cards.map((d) => (
                    <div key={d.id} className="ck-tile" draggable
                         onDragStart={() => setDragging(d.id)} data-testid={`deal-${d.id}`}>
                      <strong data-testid={`deal-name-${d.id}`}>{d.name}</strong>
                      <div data-testid={`deal-amount-${d.id}`}>{money(d.amount)}</div>
                      <Badge tone="neutral" testId={`deal-stage-${d.id}`}>{d.stage}</Badge>
                      <select className="ck-input" value={d.stage} aria-label={`Stage for ${d.name}`}
                              data-testid={`move-${d.id}`} onChange={(e) => move(d.id, e.target.value)}>
                        {STAGES.map((x) => <option key={x} value={x}>{x}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        <Card title="Deal records" testId="deal-records">
          {s.deals.map((d) => (
            <div key={d.id} className="ck-row" data-testid={`record-${d.id}`}>
              <span>
                <strong>{d.name}</strong>
                <div className="ck-muted">{d.stage} · owner {d.owner}</div>
                {d.history.map((h, i) => (
                  <div key={i} className="ck-muted" data-testid={`deal-history-${d.id}-${i}`}>{h.at} — {h.text}</div>
                ))}
              </span>
              <span data-testid={`record-amount-${d.id}`}>{money(d.amount)}</span>
            </div>
          ))}
          <Row label="Total pipeline" value={money(total)} strong testId="total-pipeline" />
        </Card>
      </Page>
    </Shell>
  );
}
