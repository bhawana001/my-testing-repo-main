"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Select, Field, Radio, Badge, Banner, Row, Empty } from "../clones/kit/ui";
import Nav from "./Nav";
import { BRAND, ROLES, PEOPLE, useStore, roleOf, can, nextId } from "./shared";

export default function Drive() {
  const [s, update] = useStore();
  const [fileId, setFileId] = useState("d1");
  const [who, setWho] = useState(PEOPLE[0]);
  const [role, setRole] = useState("commenter");
  const [viewer, setViewer] = useState(PEOPLE[0]);
  const [comment, setComment] = useState("");
  const [notice, setNotice] = useState(null);

  const file = s.files.find((f) => f.id === fileId);
  const viewerRole = roleOf(s.shares, fileId, viewer);

  function share() {
    update((st) => {
      st.shares = st.shares.filter((x) => !(x.fileId === fileId && x.who === who));
      st.shares.push({ fileId, who, role });
      return st;
    });
    setViewer(who);
    setNotice({ tone: "ok", msg: `${who} was given ${ROLES.find((r) => r.id === role).label} access to ${file.name}.` });
  }

  function addComment() {
    const text = comment.trim();
    if (!text) return;
    if (!can(viewerRole, "comment")) {
      setNotice({ tone: "bad", msg: `${viewer} cannot comment with ${viewerRole || "no"} access.` });
      return;
    }
    update((st) => {
      st.comments.push({ id: nextId(st.counter++), fileId, by: viewer, text, at: "now" });
      return st;
    });
    setComment("");
    setNotice({ tone: "ok", msg: "Comment added." });
  }

  const fileComments = s.comments.filter((c) => c.fileId === fileId);

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="My Drive" sub={`${s.files.length} items`} wide>
        {notice && <Banner tone={notice.tone} testId="drive-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Files" testId="file-list">
          <table className="ck-table">
            <thead><tr><th>Name</th><th>Type</th><th>Owner</th><th>Modified</th></tr></thead>
            <tbody>
              {s.files.map((f) => (
                <tr key={f.id} data-testid={`file-${f.id}`}>
                  <td>
                    <button className="ck-btn ck-btn--ghost ck-btn--sm" data-testid={`select-${f.id}`}
                            onClick={() => setFileId(f.id)}>{f.name}</button>
                  </td>
                  <td>{f.type}</td>
                  <td>{f.owner}</td>
                  <td>{f.modified}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title={`Share “${file.name}”`}>
          <Field label="Person">
            <Select value={who} data-testid="share-who" aria-label="Person" onChange={(e) => setWho(e.target.value)}>
              {PEOPLE.map((p) => <option key={p} value={p}>{p}</option>)}
            </Select>
          </Field>
          {ROLES.map((r) => (
            <Radio key={r.id} name="role" checked={role === r.id} label={r.label} detail={r.detail}
                   testId={`role-${r.id}`} onChange={() => setRole(r.id)} />
          ))}
          <div className="ck-card-actions">
            <Btn onClick={share} data-testid="send-share">Share</Btn>
          </div>
        </Card>

        <Card title="What the recipient can do" testId="recipient-view">
          <Field label="View as">
            <Select value={viewer} data-testid="recipient" aria-label="Recipient"
                    onChange={(e) => setViewer(e.target.value)}>
              {PEOPLE.map((p) => <option key={p} value={p}>{p}</option>)}
            </Select>
          </Field>
          <Row label="Access level"
               value={viewerRole ? ROLES.find((r) => r.id === viewerRole).label : "No access"}
               testId="access-level" />
          <Row label="Can view" value={can(viewerRole, "view") ? "Yes" : "No"} testId="can-view" />
          <Row label="Can comment" value={can(viewerRole, "comment") ? "Yes" : "No"} testId="can-comment" />
          <Row label="Can edit" value={can(viewerRole, "edit") ? "Yes" : "No"} testId="can-edit" />
          {viewerRole === "commenter" && (
            <Badge tone="info" testId="commenter-badge">Commenter — editing is disabled</Badge>
          )}

          <div className="ck-card-actions">
            <Input value={comment} placeholder="Add a comment" data-testid="comment-input" aria-label="Comment"
                   disabled={!can(viewerRole, "comment")}
                   onChange={(e) => setComment(e.target.value)}
                   onKeyDown={(e) => e.key === "Enter" && addComment()} />
            <Btn onClick={addComment} disabled={!can(viewerRole, "comment")} data-testid="add-comment">Comment</Btn>
            <Btn variant="secondary" disabled={!can(viewerRole, "edit")} data-testid="edit-button">
              {can(viewerRole, "edit") ? "Edit document" : "Editing disabled"}
            </Btn>
          </div>

          <div data-testid="comment-list">
            {fileComments.length === 0 && <Empty>No comments on this file.</Empty>}
            {fileComments.map((c) => (
              <Row key={c.id} label={c.by} value={c.text} testId={`comment-${c.id}`} />
            ))}
          </div>
        </Card>
      </Page>
    </Shell>
  );
}
