"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, ME, useStore, nextId } from "../shared";

/**
 * Offline edits are held in a queue rather than written into the document, and
 * reconnecting flushes them in order. That is the whole behaviour the sync case
 * checks, so the queue is visible on the page.
 */
export default function Offline() {
  const [s, update] = useStore();
  const [text, setText] = useState("");
  const [notice, setNotice] = useState(null);

  const connected = s.offline.connected;
  const doc = s.files.find((f) => f.id === s.offline.docId);

  function edit() {
    const body = text.trim();
    if (!body) return;
    update((st) => {
      if (st.offline.connected) {
        st.files.find((f) => f.id === st.offline.docId).body.push(body);
      } else {
        st.offline.queue.push({ id: nextId(st.counter++), text: body, at: "now" });
      }
      return st;
    });
    setNotice(connected
      ? { tone: "ok", msg: "Saved to Drivve." }
      : { tone: "warn", msg: "You are offline — the edit is queued and will sync when you reconnect." });
    setText("");
  }

  function setConnection(next) {
    if (next) {
      const pending = s.offline.queue.length;
      update((st) => {
        const d = st.files.find((f) => f.id === st.offline.docId);
        for (const q of st.offline.queue) d.body.push(q.text);
        st.offline.queue = [];
        st.offline.connected = true;
        return st;
      });
      setNotice(pending
        ? { tone: "ok", msg: `Back online — ${pending} queued ${pending === 1 ? "edit" : "edits"} synced.` }
        : { tone: "info", msg: "Back online. Nothing was queued." });
    } else {
      update((st) => { st.offline.connected = false; return st; });
      setNotice({ tone: "warn", msg: "Offline mode — edits are stored on this device." });
    }
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Offline editing" sub={`Editing “${doc.name}” as ${ME}`}>
        {notice && <Banner tone={notice.tone} testId="offline-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Connection">
          <Badge tone={connected ? "ok" : "warn"} testId="connection-state">
            {connected ? "Online" : "Offline"}
          </Badge>
          <Row label="Queued edits" value={s.offline.queue.length} testId="queue-count" />
          <div className="ck-card-actions">
            <Btn variant="secondary" data-testid="go-offline" disabled={!connected}
                 onClick={() => setConnection(false)}>Go offline</Btn>
            <Btn data-testid="go-online" disabled={connected} onClick={() => setConnection(true)}>Reconnect</Btn>
          </div>
        </Card>

        <Card title="Edit">
          <Input value={text} placeholder="Type a line" data-testid="offline-input" aria-label="New line"
                 onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && edit()} />
          <div className="ck-card-actions">
            <Btn onClick={edit} data-testid="save-line">Save line</Btn>
          </div>
        </Card>

        <Card title="Pending sync" testId="queue">
          {s.offline.queue.length === 0 && <Empty>Nothing waiting to sync.</Empty>}
          {s.offline.queue.map((q) => (
            <Row key={q.id} label="Queued locally" value={q.text} testId={`queued-${q.id}`} />
          ))}
        </Card>

        <Card title="Document" testId="document">
          <Row label="Lines saved to Drivve" value={doc.body.length} testId="doc-line-count" />
          {doc.body.map((line, i) => (
            <Row key={i} label={`Line ${i + 1}`} value={line} testId={`doc-line-${i}`} />
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
