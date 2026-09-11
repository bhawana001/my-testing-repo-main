"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Topbar } from "@/app/components/eval/SkinChrome";
import { Card, Btn, Textarea, Select, Badge, Segment, Alert, KV } from "@/app/components/eval/ui";
import { Message } from "@/app/components/engines/Feed";
import { STATUS_TONE } from "@/lib/seed/helpdesk";

const seed = () => ({ view: "agent", status: "Open", thread: [{ id: "m1", author: "Maria Chen", time: "9:12 AM", text: "Hi, my September invoice shows the wrong billing address. Can you fix it?", public: true }] });
export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [text, setText] = useState(""); const [next, setNext] = useState("Pending"); const [mode, setMode] = useState("public"); const [err, setErr] = useState(null);
  function submit() {
    if (!text.trim()) { setErr("Write a reply before submitting."); return; }
    setErr(null);
    set({ ...s, status: next, thread: [...s.thread, { id: "m" + (s.thread.length + 1), author: "Demo User", time: "10:0" + s.thread.length + " AM", text: text.trim(), public: mode === "public" }] }); setText("");
  }
  const customerThread = s.thread.filter((m) => m.public);
  const customerStatus = { New: "Open", Open: "Open", Pending: "Awaiting your reply", Solved: "Solved" }[s.status];
  return (
    <>
      <Topbar entity={ent} nav={["Views", "Tickets", "Customers"]} light right={<Segment options={[{ value: "agent", label: "Agent" }, { value: "customer", label: "Customer portal" }]} value={s.view} onChange={(v) => set({ ...s, view: v })} />} />
      <main className="ee-main">
        {s.view === "agent" ? (
          <div className="ee-split">
            <Card title="#1042 · Wrong billing address on invoice" right={<Badge tone={STATUS_TONE[s.status]} data-testid="agent-status">{s.status}</Badge>} data-testid="agent-ticket">
              <div className="ee-feed">{s.thread.map((m) => <div key={m.id}><Message msg={m} testIdPrefix="thread" />{!m.public && <Badge tone="warn">Internal note</Badge>}</div>)}</div>
              <div className="ee-divider" />
              <Segment options={[{ value: "public", label: "Public reply" }, { value: "internal", label: "Internal note" }]} value={mode} onChange={setMode} />
              <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Reply to Maria Chen" aria-label="Reply" style={{ marginTop: 8 }} />
              {err && <Alert tone="err">{err}</Alert>}
              <div className="ee-row ee-row--end" style={{ marginTop: 8 }}>
                <Select value={next} onChange={(e) => setNext(e.target.value)} aria-label="Submit as status" style={{ width: "auto" }}>{["Open", "Pending", "Solved"].map((x) => <option key={x} value={x}>Submit as {x}</option>)}</Select>
                <Btn onClick={submit} data-testid="submit-reply">Submit as {next}</Btn>
              </div>
            </Card>
            <Card title="Requester"><KV k="Name" v="Maria Chen" /><KV k="Email" v="maria@globex.test" /><KV k="Organization" v="Globex" /></Card>
          </div>
        ) : (
          <Card title="My requests · Wrong billing address on invoice" right={<Badge tone={STATUS_TONE[s.status]} data-testid="customer-status">{customerStatus}</Badge>} data-testid="customer-portal" style={{ maxWidth: 720 }}>
            <div className="ee-small ee-muted" style={{ marginBottom: 10 }}>Request #1042 · Signed in as Maria Chen</div>
            <div className="ee-feed">{customerThread.map((m) => <Message key={m.id} msg={m} testIdPrefix="portal" />)}</div>
          </Card>
        )}
      </main>
    </>
  );
}
