"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Badge, Row, Banner } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, ME, useStore } from "../shared";

export default function Files() {
  const [s, update] = useStore();
  const [openId, setOpenId] = useState(null);
  const [line, setLine] = useState("");
  const [notice, setNotice] = useState(null);

  const docs = Object.values(s.docs);
  const doc = openId ? s.docs[openId] : null;

  function open(id) {
    setOpenId(id);
    setLine("");
    // Opening a document joins you to it, which is what puts you in the presence list.
    update((st) => {
      const d = st.docs[id];
      if (d && !d.editors.includes(ME.name)) d.editors.push(ME.name);
      return st;
    });
  }

  function addLine() {
    const text = line.trim();
    if (!text || !openId) return;
    update((st) => { st.docs[openId].lines.push(text); return st; });
    setNotice({ tone: "ok", msg: "Line saved to the document." });
    setLine("");
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Files" sub="Shared documents open in Teemz and save as you type">
        {notice && <Banner tone={notice.tone} testId="doc-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Shared documents" testId="doc-list">
          {docs.map((d) => (
            <div key={d.id} className="ck-row" data-testid={`doc-${d.id}`}>
              <span><strong>{d.name}</strong> <span className="ck-muted">in {d.channel}</span></span>
              <Btn size="sm" data-testid={`open-${d.id}`} onClick={() => open(d.id)}>Open</Btn>
            </div>
          ))}
        </Card>

        {doc && (
          <Card title={doc.name} testId="doc-editor">
            <Row label="Line count" value={doc.lines.length} testId="line-count" />
            <div data-testid="presence">
              Editing now:{" "}
              {doc.editors.map((e) => (
                <Badge key={e} tone="ok" testId={`presence-${e.split(" ")[0].toLowerCase()}`}>{e}</Badge>
              ))}
            </div>
            <div className="ck-list" data-testid="doc-body">
              {doc.lines.map((l, i) => (
                <div key={i} className="ck-row" data-testid={`doc-line-${i}`}><span>{l}</span></div>
              ))}
            </div>
            <div className="ck-card-actions">
              <Input value={line} placeholder="Type a new line" data-testid="doc-input" aria-label="New line"
                     onChange={(e) => setLine(e.target.value)}
                     onKeyDown={(e) => e.key === "Enter" && addLine()} />
              <Btn onClick={addLine} data-testid="doc-save">Add line</Btn>
            </div>
          </Card>
        )}
      </Page>
    </Shell>
  );
}
