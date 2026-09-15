"use client";
// Request money and remind (22.2). A reminder can only be sent on a pending
// request, and the reminder count goes up each time.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input, Select, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, FRIENDS, useStore, money } from "../shared";

export default function RequestsPage() {
  const [s, update] = useStore();
  const [from, setFrom] = useState(FRIENDS[0].id);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [err, setErr] = useState("");
  const [notice, setNotice] = useState(null);

  function request() {
    const amt = Number(amount);
    if (!amt || amt <= 0) { setErr("Enter an amount above zero."); return; }
    if (!note.trim()) { setErr("Add a note for the request."); return; }
    setErr("");
    const friend = FRIENDS.find((f) => f.id === from);
    const id = "r" + (s.counter + 1);
    update((st) => {
      st.requests.unshift({ id, from: friend.name, handle: friend.handle, amount: amt,
                            note: note.trim(), status: "Pending", reminders: 0, at: "2026-09-15" });
      st.counter += 1;
      return st;
    });
    setNotice(`Requested ${money(amt)} from ${friend.name}.`);
    setAmount(""); setNote("");
  }

  function remind(id) {
    update((st) => {
      const r = st.requests.find((x) => x.id === id);
      if (r && r.status === "Pending") {
        r.reminders += 1;
        r.lastReminder = "2026-09-15";
      }
      return st;
    });
    setNotice("Reminder sent.");
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/pay`, label: "Pay" }]} />
      <Page title="Request money">
        {notice && <Banner tone="ok" testId="request-notice" onClose={() => setNotice(null)}>{notice}</Banner>}

        <div className="ck-split">
          <Card title="New request">
            <Field label="From">
              <Select value={from} onChange={(e) => setFrom(e.target.value)} aria-label="From" data-testid="request-from">
                {FRIENDS.map((f) => <option key={f.id} value={f.id}>{f.name} · {f.handle}</option>)}
              </Select>
            </Field>
            <Field label="Amount" error={err}>
              <Input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal"
                     aria-label="Amount" data-testid="request-amount" />
            </Field>
            <Field label="What's it for?">
              <Input value={note} onChange={(e) => setNote(e.target.value)} aria-label="What's it for?" data-testid="request-note" />
            </Field>
            <Btn block onClick={request} data-testid="send-request">Request</Btn>
          </Card>

          <Card title={`Pending requests (${s.requests.length})`} testId="request-list">
            {s.requests.length === 0 ? <Empty>No requests yet.</Empty> : s.requests.map((r) => (
              <div key={r.id} style={{ borderTop: "1px solid #e8eef5", paddingTop: 8, marginTop: 8 }}
                   data-testid={`request-${r.id}`}>
                <Row label={`From ${r.from}`} value={money(r.amount)} testId={`request-amount-${r.id}`} />
                <div className="ck-muted">{r.note} · requested {r.at}</div>
                <Badge tone="warn" testId={`request-status-${r.id}`}>{r.status}</Badge>
                {r.reminders > 0 && (
                  <> <Badge tone="info" testId={`reminder-count-${r.id}`}>
                    {r.reminders} reminder{r.reminders === 1 ? "" : "s"} sent
                  </Badge></>
                )}
                <div>
                  <Btn size="sm" variant="secondary" onClick={() => remind(r.id)} data-testid={`remind-${r.id}`}>
                    Send reminder
                  </Btn>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </Page>
    </Shell>
  );
}
