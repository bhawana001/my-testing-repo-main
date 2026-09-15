"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Select, Field, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, STAGES, OWNERS, useStore, nextRecordId, runAutomations } from "../shared";

export default function Grid() {
  const [s, update] = useStore();
  const [name, setName] = useState("");
  const [owner, setOwner] = useState(OWNERS[0]);
  const [stage, setStage] = useState(STAGES[0]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [notice, setNotice] = useState(null);

  function create() {
    if (!name.trim()) { setNotice({ tone: "bad", msg: "A record needs a name." }); return; }
    const id = nextRecordId(s.counter);
    update((st) => {
      st.records.push({ id, name: name.trim(), owner, stage, effort: 3, notes: "" });
      st.counter += 1;
      return st;
    });
    setName("");
    setNotice({ tone: "ok", msg: `Record ${id} created.` });
  }

  function saveEdit() {
    if (!editId) return;
    update((st) => {
      const r = st.records.find((x) => x.id === editId);
      if (r) r.name = editName.trim() || r.name;
      return st;
    });
    setNotice({ tone: "ok", msg: `Record ${editId} updated.` });
    setEditId(null);
  }

  function changeStage(id, to) {
    const record = s.records.find((r) => r.id === id);
    if (!record) return;
    const from = record.stage;
    update((st) => {
      const r = st.records.find((x) => x.id === id);
      if (!r) return st;
      r.stage = to;
      st.runLog.unshift(...runAutomations(st.automations, r, { field: "stage", from, to }));
      return st;
    });
  }

  function remove(id) {
    update((st) => { st.records = st.records.filter((r) => r.id !== id); return st; });
    setNotice({ tone: "info", msg: `Record ${id} deleted.` });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Grid view" sub="Create, edit and delete — every change is written through" wide>
        {notice && <Banner tone={notice.tone} testId="grid-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="New record">
          <Field label="Name">
            <Input value={name} placeholder="Mobile nav polish" data-testid="new-name" aria-label="Record name"
                   onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && create()} />
          </Field>
          <Field label="Owner">
            <Select value={owner} data-testid="new-owner" aria-label="Owner" onChange={(e) => setOwner(e.target.value)}>
              {OWNERS.map((o) => <option key={o} value={o}>{o}</option>)}
            </Select>
          </Field>
          <Field label="Stage">
            <Select value={stage} data-testid="new-stage" aria-label="Stage" onChange={(e) => setStage(e.target.value)}>
              {STAGES.map((st) => <option key={st} value={st}>{st}</option>)}
            </Select>
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={create} data-testid="create-record">Create record</Btn>
          </div>
        </Card>

        <Card title="Records" testId="grid-table">
          <Row label="Record count" value={s.records.length} testId="record-count" />
          {s.records.length === 0 && <Empty>No records.</Empty>}
          <table className="ck-table">
            <thead><tr><th>Id</th><th>Name</th><th>Owner</th><th>Stage</th><th></th></tr></thead>
            <tbody>
              {s.records.map((r) => (
                <tr key={r.id} data-testid={`record-${r.id}`}>
                  <td>{r.id}</td>
                  <td data-testid={`name-${r.id}`}>{r.name}</td>
                  <td>{r.owner}</td>
                  <td>
                    <select className="ck-input" value={r.stage} data-testid={`stage-${r.id}`} aria-label={`Stage for ${r.name}`}
                            onChange={(e) => changeStage(r.id, e.target.value)}>
                      {STAGES.map((st) => <option key={st} value={st}>{st}</option>)}
                    </select>
                  </td>
                  <td>
                    <Btn size="sm" variant="ghost" data-testid={`edit-${r.id}`}
                         onClick={() => { setEditId(r.id); setEditName(r.name); }}>Edit</Btn>{" "}
                    <Btn size="sm" variant="danger" data-testid={`delete-${r.id}`}
                         onClick={() => remove(r.id)}>Delete</Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {editId && (
          <Card title={`Edit ${editId}`} testId="edit-panel">
            <Field label="Name">
              <Input value={editName} data-testid="edit-name" aria-label="Edit name"
                     onChange={(e) => setEditName(e.target.value)}
                     onKeyDown={(e) => e.key === "Enter" && saveEdit()} />
            </Field>
            <div className="ck-card-actions">
              <Btn onClick={saveEdit} data-testid="save-edit">Save</Btn>
              <Btn variant="ghost" onClick={() => setEditId(null)}>Cancel</Btn>
            </div>
          </Card>
        )}
      </Page>
    </Shell>
  );
}
