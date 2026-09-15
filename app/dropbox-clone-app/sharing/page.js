"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Select, Field, Radio, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, ACCESS, MEMBERS, useStore, canEdit } from "../shared";

export default function Sharing() {
  const [s, update] = useStore();
  const [folderId, setFolderId] = useState("launch");
  const [viewer, setViewer] = useState(MEMBERS[0]);
  const [notice, setNotice] = useState(null);

  const folder = s.folders[folderId];
  const editable = canEdit(folder, viewer);

  function setAccess(access) {
    update((st) => { st.folders[folderId].access = access; return st; });
    setNotice({ tone: "ok", msg: `${folder.name} is now set to ${access === "edit" ? "Can edit" : "Can view"} for the team.` });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Folder permissions" sub="Change the access level, then check what a member can do">
        {notice && <Banner tone={notice.tone} testId="access-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Folder">
          <Field label="Folder">
            <Select value={folderId} data-testid="folder-select" aria-label="Folder"
                    onChange={(e) => setFolderId(e.target.value)}>
              {Object.values(s.folders).map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </Select>
          </Field>
          <Row label="Current access" value={folder.access === "edit" ? "Can edit" : "Can view"} testId="current-access" />
          <Row label="Members" value={folder.members.join(", ") || "None"} testId="folder-members" />
          {ACCESS.map((a) => (
            <Radio key={a.id} name="access" checked={folder.access === a.id} label={a.label} detail={a.detail}
                   testId={`access-${a.id}`} onChange={() => setAccess(a.id)} />
          ))}
        </Card>

        <Card title="What a member sees" testId="member-view">
          <Field label="View as">
            <Select value={viewer} data-testid="member-select" aria-label="Member"
                    onChange={(e) => setViewer(e.target.value)}>
              {MEMBERS.map((m) => <option key={m} value={m}>{m}</option>)}
            </Select>
          </Field>
          {!folder.members.includes(viewer) && (
            <Empty>{viewer} is not a member of {folder.name}.</Empty>
          )}
          {folder.members.includes(viewer) && (
            <>
              <Badge tone={editable ? "ok" : "neutral"} testId="member-capability">
                {editable ? "Can edit this folder" : "Can view only"}
              </Badge>
              <Row label="Open and download" value="Allowed" testId="cap-view" />
              <Row label="Rename, replace, delete" value={editable ? "Allowed" : "Blocked"} testId="cap-edit" />
              <div className="ck-card-actions">
                <Btn variant={editable ? "primary" : "secondary"} disabled={!editable} data-testid="member-edit-button">
                  {editable ? "Edit files" : "Editing unavailable"}
                </Btn>
              </div>
            </>
          )}
        </Card>
      </Page>
    </Shell>
  );
}
