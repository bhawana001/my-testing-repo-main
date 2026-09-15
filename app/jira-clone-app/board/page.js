"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Badge, Banner, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, STATUSES, useStore, transitionBlockers } from "../shared";

export default function Board() {
  const [s, update] = useStore();
  const [dragging, setDragging] = useState(null);
  const [notice, setNotice] = useState(null);

  function move(key, to) {
    const issue = s.issues.find((i) => i.key === key);
    if (!issue || issue.status === to) return;
    const blockers = transitionBlockers(issue, to);
    if (blockers.length) {
      setNotice({ tone: "bad", msg: `${key} cannot move to ${to}. ${blockers.join(" ")}` });
      return;
    }
    const from = issue.status;
    update((st) => {
      const i = st.issues.find((x) => x.key === key);
      if (!i) return st;
      i.status = to;
      i.history.push({ at: "now", text: `Status: ${from} → ${to}` });
      return st;
    });
    setNotice({ tone: "ok", msg: `${key} transitioned ${from} → ${to} and the change is in its history.` });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Sprint 19 board" sub="Drag a card to a column, or pick a status on the card" wide>
        {notice && <Banner tone={notice.tone} testId="board-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <div className="ck-grid ck-grid--3">
          {STATUSES.map((status) => {
            const key = status.replace(/\s+/g, "-").toLowerCase();
            const cards = s.issues.filter((i) => i.status === status);
            return (
              <Card key={status} title={`${status} (${cards.length})`} testId={`column-${key}`}>
                <div onDragOver={(e) => e.preventDefault()}
                     onDrop={() => { if (dragging) move(dragging, status); setDragging(null); }}
                     data-testid={`dropzone-${key}`} style={{ minHeight: 60 }}>
                  {cards.length === 0 && <Empty>Empty</Empty>}
                  {cards.map((i) => (
                    <div key={i.key} className="ck-tile" draggable
                         onDragStart={() => setDragging(i.key)} data-testid={`card-${i.key}`}>
                      <Link href={`${BASE}/browse/${i.key}`}><strong>{i.key}</strong></Link>
                      <div>{i.summary}</div>
                      <div className="ck-muted">{i.priority} · {i.component} · {i.assignee}</div>
                      <Badge tone="neutral" testId={`card-status-${i.key}`}>{i.status}</Badge>
                      <select className="ck-input" value={i.status} aria-label={`Status for ${i.key}`}
                              data-testid={`move-${i.key}`} onChange={(e) => move(i.key, e.target.value)}>
                        {STATUSES.map((st) => <option key={st} value={st}>{st}</option>)}
                      </select>
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
