"use client";
import { use, useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Select, Field, Badge, Banner, Row, Empty } from "../../../clones/kit/ui";
import Nav from "../../Nav";
import { BRAND, BASE, STATUSES, STATUS_TONE, PEOPLE, useStore, nextId, fireAutomations } from "../../shared";

export default function Board({ params }) {
  const { id } = use(params);
  const [s, update] = useStore();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Not started");
  const [person, setPerson] = useState(PEOPLE[0]);
  const [due, setDue] = useState("2026-09-22");
  const [notice, setNotice] = useState(null);

  const board = s.boards[id] || null;

  function addItem() {
    if (!name.trim()) { setNotice({ tone: "bad", msg: "An item needs a name." }); return; }
    const itemId = nextId(s.counter);
    update((st) => {
      st.boards[id].items.push({ id: itemId, name: name.trim(), status, person, due });
      st.counter += 1;
      return st;
    });
    setName("");
    setNotice({ tone: "ok", msg: `Item added with status ${status} and ${person} on the person column.` });
  }

  function setItemStatus(itemId, to) {
    const item = board.items.find((i) => i.id === itemId);
    if (!item || item.status === to) return;
    update((st) => {
      const b = st.boards[id];
      const it = b.items.find((x) => x.id === itemId);
      if (!it) return st;
      it.status = to;
      const fired = fireAutomations(st.automations, id, it, to);
      st.notifications.unshift(...fired);
      return st;
    });
    const willFire = s.automations.filter((a) => a.boardId === id && a.whenStatus === to);
    setNotice(willFire.length
      ? { tone: "ok", msg: `${item.name} set to ${to} — ${willFire.length} automation fired.` }
      : { tone: "info", msg: `${item.name} set to ${to}.` });
  }

  if (!board) {
    return (
      <Shell brand={BRAND}><Nav />
        <Page title="Board not found"><Empty>No board with that id.</Empty></Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title={board.name} sub={`${board.items.length} items`} wide>
        {notice && <Banner tone={notice.tone} testId="board-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Items" testId="item-table">
          <Row label="Item count" value={board.items.length} testId="item-count" />
          <table className="ck-table">
            <thead><tr><th>Item</th><th>Status</th><th>Person</th><th>Due</th></tr></thead>
            <tbody>
              {board.items.map((it) => (
                <tr key={it.id} data-testid={`item-${it.id}`}>
                  <td data-testid={`item-name-${it.id}`}>{it.name}</td>
                  <td>
                    <Badge tone={STATUS_TONE[it.status]} testId={`item-status-${it.id}`}>{it.status}</Badge>
                    <select className="ck-input" value={it.status} aria-label={`Status for ${it.name}`}
                            data-testid={`status-select-${it.id}`}
                            onChange={(e) => setItemStatus(it.id, e.target.value)}>
                      {STATUSES.map((st) => <option key={st} value={st}>{st}</option>)}
                    </select>
                  </td>
                  <td data-testid={`item-person-${it.id}`}>{it.person}</td>
                  <td data-testid={`item-due-${it.id}`}>{it.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="New item">
          <Field label="Item name">
            <Input value={name} placeholder="Order the catering" data-testid="item-name" aria-label="Item name"
                   onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addItem()} />
          </Field>
          <Field label="Status">
            <Select value={status} data-testid="item-status" aria-label="Status" onChange={(e) => setStatus(e.target.value)}>
              {STATUSES.map((st) => <option key={st} value={st}>{st}</option>)}
            </Select>
          </Field>
          <Field label="Person">
            <Select value={person} data-testid="item-person" aria-label="Person" onChange={(e) => setPerson(e.target.value)}>
              {PEOPLE.map((p) => <option key={p} value={p}>{p}</option>)}
            </Select>
          </Field>
          <Field label="Due">
            <Input type="date" value={due} data-testid="item-due" aria-label="Due date"
                   onChange={(e) => setDue(e.target.value)} />
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={addItem} data-testid="add-item">Add item</Btn>
          </div>
        </Card>

        <p className="ck-muted">
          {Object.values(s.boards).filter((b) => b.id !== id).map((b) => (
            <Link key={b.id} href={`${BASE}/board/${b.id}`}>{b.name}</Link>
          ))}
        </p>
      </Page>
    </Shell>
  );
}
