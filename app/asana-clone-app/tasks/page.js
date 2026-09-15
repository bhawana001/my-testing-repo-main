"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Select, Field, Badge, Banner, Row } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, PEOPLE, SECTIONS, ME, useStore, nextId } from "../shared";

export default function Tasks() {
  const [s, update] = useStore();
  const [name, setName] = useState("");
  const [assignee, setAssignee] = useState(PEOPLE[1]);
  const [due, setDue] = useState("2026-09-17");
  const [section, setSection] = useState(SECTIONS[0]);
  const [notice, setNotice] = useState(null);

  function create() {
    if (!name.trim()) { setNotice({ tone: "bad", msg: "A task needs a name." }); return; }
    const id = nextId(s.counter);
    update((st) => {
      st.tasks.push({
        id, name: name.trim(), assignee, due, section, done: false,
        subtasks: [], blockedBy: null,
        history: [{ at: "now", text: `Created in ${section}, assigned to ${assignee}` }],
      });
      st.notifications.unshift({
        id: nextId(st.counter + 1), to: assignee,
        text: `${ME} assigned you “${name.trim()}”, due ${due}`,
      });
      st.counter += 2;
      return st;
    });
    setName("");
    setNotice({ tone: "ok", msg: `Task created and ${assignee} was notified.` });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Tasks" sub={s.project} wide>
        {notice && <Banner tone={notice.tone} testId="task-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="New task">
          <Field label="Task name">
            <Input value={name} placeholder="Prepare the press kit" data-testid="task-name" aria-label="Task name"
                   onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && create()} />
          </Field>
          <Field label="Assignee">
            <Select value={assignee} data-testid="task-assignee" aria-label="Assignee"
                    onChange={(e) => setAssignee(e.target.value)}>
              {PEOPLE.map((p) => <option key={p} value={p}>{p}</option>)}
            </Select>
          </Field>
          <Field label="Due date">
            <Input type="date" value={due} data-testid="task-due" aria-label="Due date"
                   onChange={(e) => setDue(e.target.value)} />
          </Field>
          <Field label="Section">
            <Select value={section} data-testid="task-section" aria-label="Section"
                    onChange={(e) => setSection(e.target.value)}>
              {SECTIONS.map((sec) => <option key={sec} value={sec}>{sec}</option>)}
            </Select>
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={create} data-testid="create-task">Create task</Btn>
          </div>
        </Card>

        <Card title="All tasks" testId="task-list">
          <Row label="Task count" value={s.tasks.length} testId="task-count" />
          <table className="ck-table">
            <thead><tr><th>Task</th><th>Assignee</th><th>Due</th><th>Section</th><th></th></tr></thead>
            <tbody>
              {s.tasks.map((t) => (
                <tr key={t.id} data-testid={`task-${t.id}`}>
                  <td data-testid={`task-name-${t.id}`}>
                    <Link href={`${BASE}/task/${t.id}`}>{t.name}</Link>
                    {t.done && <Badge tone="ok">Complete</Badge>}
                  </td>
                  <td data-testid={`task-assignee-${t.id}`}>{t.assignee}</td>
                  <td data-testid={`task-due-${t.id}`}>{t.due}</td>
                  <td data-testid={`task-section-${t.id}`}>{t.section}</td>
                  <td><Link href={`${BASE}/task/${t.id}`} className="ck-btn ck-btn--ghost ck-btn--sm"
                            data-testid={`open-${t.id}`}>Open</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Notifications" testId="notifications">
          {s.notifications.map((n) => (
            <Row key={n.id} label={n.to} value={n.text} testId={`notif-${n.id}`} />
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
