"use client";
import { use, useState } from "react";
import { Shell, Page, Card, Btn, Input, Select, Field, Badge, Banner, Row, Empty } from "../../../clones/kit/ui";
import Nav from "../../Nav";
import { BRAND, SECTIONS, useStore, nextId, completionBlocker } from "../../shared";

export default function TaskDetail({ params }) {
  const { id } = use(params);
  const [s, update] = useStore();
  const [sub, setSub] = useState("");
  const [blocker, setBlocker] = useState("");
  const [notice, setNotice] = useState(null);

  const task = s.tasks.find((t) => t.id === id) || null;
  const blocked = task ? completionBlocker(task, s.tasks) : null;

  function addSubtask() {
    const name = sub.trim();
    if (!name) return;
    update((st) => {
      const t = st.tasks.find((x) => x.id === id);
      if (!t) return st;
      t.subtasks.push({ id: nextId(st.counter++), name, done: false });
      t.history.push({ at: "now", text: `Subtask added: ${name}` });
      return st;
    });
    setSub("");
    setNotice({ tone: "ok", msg: "Subtask added." });
  }

  function setDependency(blockerId) {
    setBlocker(blockerId);
    update((st) => {
      const t = st.tasks.find((x) => x.id === id);
      if (!t) return st;
      t.blockedBy = blockerId || null;
      const b = st.tasks.find((x) => x.id === blockerId);
      t.history.push({ at: "now", text: blockerId ? `Now blocked by ${b ? b.name : blockerId}` : "Dependency removed" });
      return st;
    });
  }

  function complete() {
    if (blocked) {
      setNotice({ tone: "bad", msg: `Cannot complete — this task is blocked by “${blocked.name}”, which is still open.` });
      return;
    }
    update((st) => {
      const t = st.tasks.find((x) => x.id === id);
      if (!t) return st;
      t.done = true;
      t.section = "Done";
      t.history.push({ at: "now", text: "Marked complete" });
      return st;
    });
    setNotice({ tone: "ok", msg: "Task completed." });
  }

  if (!task) {
    return (
      <Shell brand={BRAND}><Nav />
        <Page title="Task not found"><Empty>No task with that id.</Empty></Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title={task.name} sub={`Assigned to ${task.assignee} · due ${task.due}`} wide>
        {notice && <Banner tone={notice.tone} testId="task-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Details">
          <Row label="Section" value={task.section} testId="detail-section" />
          <Row label="Assignee" value={task.assignee} testId="detail-assignee" />
          <Row label="Due" value={task.due} testId="detail-due" />
          <Row label="Status" value={task.done ? "Complete" : "Open"} testId="detail-status" />
          {blocked && (
            <Badge tone="bad" testId="blocked-badge">Blocked by {blocked.name}</Badge>
          )}
          <div className="ck-card-actions">
            <Btn onClick={complete} disabled={task.done} data-testid="complete-task">
              {task.done ? "Completed" : "Mark complete"}
            </Btn>
            <Select value={task.section} data-testid="detail-move" aria-label="Move section"
                    onChange={(e) => {
                      const to = e.target.value;
                      update((st) => {
                        const t = st.tasks.find((x) => x.id === id);
                        if (!t) return st;
                        const from = t.section;
                        t.section = to;
                        t.history.push({ at: "now", text: `Moved from ${from} to ${to}` });
                        return st;
                      });
                    }}>
              {SECTIONS.map((sec) => <option key={sec} value={sec}>{sec}</option>)}
            </Select>
          </div>
        </Card>

        <Card title="Subtasks" testId="subtasks">
          <Row label="Subtask count" value={task.subtasks.length} testId="subtask-count" />
          {task.subtasks.length === 0 && <Empty>No subtasks yet.</Empty>}
          {task.subtasks.map((st2) => (
            <label key={st2.id} className="ck-choice" data-testid={`subtask-${st2.id}`}>
              <input type="checkbox" checked={st2.done} aria-label={st2.name}
                     data-testid={`subtask-check-${st2.id}`}
                     onChange={() => update((st) => {
                       const t = st.tasks.find((x) => x.id === id);
                       const target = t && t.subtasks.find((y) => y.id === st2.id);
                       if (target) target.done = !target.done;
                       return st;
                     })} />
              <span>{st2.name}</span>
            </label>
          ))}
          <div className="ck-card-actions">
            <Input value={sub} placeholder="Add a subtask" data-testid="subtask-name" aria-label="Subtask name"
                   onChange={(e) => setSub(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addSubtask()} />
            <Btn onClick={addSubtask} data-testid="add-subtask">Add subtask</Btn>
          </div>
        </Card>

        <Card title="Dependency" testId="dependency">
          <Field label="This task is blocked by" hint="Completion is refused while the blocker is open">
            <Select value={task.blockedBy || blocker} data-testid="dependency-select" aria-label="Blocked by"
                    onChange={(e) => setDependency(e.target.value)}>
              <option value="">Nothing</option>
              {s.tasks.filter((t) => t.id !== id).map((t) => (
                <option key={t.id} value={t.id}>{t.name}{t.done ? " (complete)" : ""}</option>
              ))}
            </Select>
          </Field>
          <Row label="Blocked by"
               value={task.blockedBy ? (s.tasks.find((t) => t.id === task.blockedBy) || {}).name || "—" : "Nothing"}
               testId="dependency-value" />
        </Card>

        <Card title="History" testId="history">
          {task.history.map((h, i) => (
            <Row key={i} label={h.at} value={h.text} testId={`history-${i}`} />
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
