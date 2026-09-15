"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Badge, Banner, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, SECTIONS, useStore } from "../shared";

export default function Board() {
  const [s, update] = useStore();
  const [dragging, setDragging] = useState(null);
  const [notice, setNotice] = useState(null);

  function move(id, to) {
    const task = s.tasks.find((t) => t.id === id);
    if (!task || task.section === to) return;
    const from = task.section;
    update((st) => {
      const t = st.tasks.find((x) => x.id === id);
      if (!t) return st;
      t.section = to;
      t.history.push({ at: "now", text: `Moved from ${from} to ${to}` });
      return st;
    });
    setNotice({ tone: "ok", msg: `${task.name} moved from ${from} to ${to} — logged in the task history.` });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Board" sub="Drag a card between columns, or pick a section on the card" wide>
        {notice && <Banner tone={notice.tone} testId="board-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <div className="ck-grid ck-grid--3">
          {SECTIONS.map((sec) => {
            const key = sec.replace(/\s+/g, "-").toLowerCase();
            const cards = s.tasks.filter((t) => t.section === sec);
            return (
              <Card key={sec} title={`${sec} (${cards.length})`} testId={`column-${key}`}>
                <div onDragOver={(e) => e.preventDefault()}
                     onDrop={() => { if (dragging) move(dragging, sec); setDragging(null); }}
                     data-testid={`dropzone-${key}`} style={{ minHeight: 60 }}>
                  {cards.length === 0 && <Empty>Empty</Empty>}
                  {cards.map((t) => (
                    <div key={t.id} className="ck-tile" draggable
                         onDragStart={() => setDragging(t.id)} data-testid={`card-${t.id}`}>
                      <Link href={`${BASE}/task/${t.id}`}><strong>{t.name}</strong></Link>
                      <div className="ck-muted">{t.assignee} · due {t.due}</div>
                      <Badge tone="neutral" testId={`card-section-${t.id}`}>{t.section}</Badge>
                      <select className="ck-input" value={t.section} aria-label={`Section for ${t.name}`}
                              data-testid={`move-${t.id}`} onChange={(e) => move(t.id, e.target.value)}>
                        {SECTIONS.map((x) => <option key={x} value={x}>{x}</option>)}
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
