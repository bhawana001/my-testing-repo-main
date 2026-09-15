"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Select, Field, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, STATUSES, PEOPLE, useStore, fireAutomations } from "../shared";

export default function Automations() {
  const [s, update] = useStore();
  const [boardId, setBoardId] = useState("launch");
  const [whenStatus, setWhenStatus] = useState("Done");
  const [notify, setNotify] = useState(PEOPLE[0]);
  const [itemId, setItemId] = useState("");
  const [to, setTo] = useState("Done");
  const [notice, setNotice] = useState(null);

  const boards = Object.values(s.boards);
  const board = s.boards[boardId];

  function addRecipe() {
    const label = `When status changes to ${whenStatus}, notify ${notify}`;
    update((st) => {
      st.automations.unshift({
        id: `a${st.counter++}`, boardId, boardName: st.boards[boardId].name,
        whenStatus, notify, label,
      });
      return st;
    });
    setNotice({ tone: "ok", msg: `Recipe saved on ${board.name}: ${label}` });
  }

  function trigger() {
    const item = board.items.find((i) => i.id === itemId);
    if (!item) { setNotice({ tone: "bad", msg: "Pick an item first." }); return; }
    const fired = fireAutomations(s.automations, boardId, item, to);
    update((st) => {
      const it = st.boards[boardId].items.find((x) => x.id === itemId);
      if (it) it.status = to;
      st.notifications.unshift(...fired);
      return st;
    });
    setNotice(fired.length
      ? { tone: "ok", msg: `${fired.length} notification generated — ${fired.map((f) => f.to).join(", ")} notified.` }
      : { tone: "info", msg: `Status changed to ${to}, but no recipe matches that status on this board.` });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Automations" sub="Build a recipe, then change a status to fire it">
        {notice && <Banner tone={notice.tone} testId="automation-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="New recipe">
          <Field label="Board">
            <Select value={boardId} data-testid="recipe-board" aria-label="Board"
                    onChange={(e) => { setBoardId(e.target.value); setItemId(""); }}>
              {boards.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </Select>
          </Field>
          <Field label="When status changes to">
            <Select value={whenStatus} data-testid="recipe-status" aria-label="Trigger status"
                    onChange={(e) => setWhenStatus(e.target.value)}>
              {STATUSES.map((st) => <option key={st} value={st}>{st}</option>)}
            </Select>
          </Field>
          <Field label="Notify">
            <Select value={notify} data-testid="recipe-notify" aria-label="Notify"
                    onChange={(e) => setNotify(e.target.value)}>
              {PEOPLE.map((p) => <option key={p} value={p}>{p}</option>)}
            </Select>
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={addRecipe} data-testid="save-recipe">Create automation</Btn>
          </div>
        </Card>

        <Card title="Active recipes" testId="recipe-list">
          <Row label="Recipes" value={s.automations.length} testId="recipe-count" />
          {s.automations.length === 0 && <Empty>No recipes yet.</Empty>}
          {s.automations.map((a) => (
            <div key={a.id} className="ck-row" data-testid={`recipe-${a.id}`}>
              <span><strong>{a.boardName}</strong><div className="ck-muted">{a.label}</div></span>
              <Badge tone="info">active</Badge>
            </div>
          ))}
        </Card>

        <Card title="Trigger it">
          <Field label="Item">
            <Select value={itemId} data-testid="trigger-item" aria-label="Item"
                    onChange={(e) => setItemId(e.target.value)}>
              <option value="">Choose an item…</option>
              {board.items.map((i) => <option key={i.id} value={i.id}>{i.name} ({i.status})</option>)}
            </Select>
          </Field>
          <Field label="New status">
            <Select value={to} data-testid="trigger-status" aria-label="New status"
                    onChange={(e) => setTo(e.target.value)}>
              {STATUSES.map((st) => <option key={st} value={st}>{st}</option>)}
            </Select>
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={trigger} data-testid="trigger-change">Change the status</Btn>
          </div>
        </Card>

        <Card title="Notifications" testId="notifications">
          <Row label="Notifications generated" value={s.notifications.length} testId="notification-count" />
          {s.notifications.length === 0 && <Empty>Nothing yet.</Empty>}
          {s.notifications.map((n) => (
            <div key={n.id} className="ck-row" data-testid={`notification-${n.id}`}>
              <span><strong>{n.to}</strong><div className="ck-muted">{n.text}</div></span>
              <Badge tone="ok">{n.recipe}</Badge>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
