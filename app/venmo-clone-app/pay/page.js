"use client";
// P2P payment with a note and privacy (22.1). The feed can be viewed as
// yourself, a friend or the public, and entries appear or hide accordingly.
import { useState } from "react";
import { Shell, TopBar, Page, Card, Btn, Row, Badge, Banner, Field, Input, Radio, Select, Empty } from "../../clones/kit/ui";
import { BRAND, BASE, ME, FRIENDS, PRIVACY, visibleTo, useStore, money } from "../shared";

const EMOJI = ["🍕", "🎟️", "☕", "🚕", "🏠", "🎁"];

export default function PayPage() {
  const [s, update] = useStore();
  const [to, setTo] = useState(FRIENDS[0].id);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [privacy, setPrivacy] = useState("friends");
  const [viewer, setViewer] = useState("self");
  const [err, setErr] = useState("");
  const [paid, setPaid] = useState(null);

  const friend = FRIENDS.find((f) => f.id === to);
  const visible = s.feed.filter((f) => visibleTo(f, viewer));

  function pay() {
    const amt = Number(amount);
    if (!amt || amt <= 0) { setErr("Enter an amount above zero."); return; }
    if (amt > s.balance) { setErr(`Your balance is ${money(s.balance)}.`); return; }
    if (!note.trim()) { setErr("Add a note — Venmoo requires one."); return; }
    setErr("");
    const id = "p" + (s.counter + 1);
    update((st) => {
      st.balance = +(st.balance - amt).toFixed(2);
      st.feed.unshift({ id, from: ME.name, to: friend.name, amount: amt, note: note.trim(),
                        privacy, at: "2026-09-15", kind: "payment" });
      st.counter += 1;
      return st;
    });
    setPaid({ to: friend.name, amt, note: note.trim(), privacy });
    setAmount(""); setNote("");
  }

  return (
    <Shell brand={BRAND}>
      <TopBar brand={BRAND} nav={[{ href: BASE, label: "Home" }, { href: `${BASE}/requests`, label: "Requests" }]} />
      <Page title="Pay a friend">
        {paid && (
          <Banner tone="ok" title="Payment sent" testId="payment-sent">
            You paid <strong data-testid="paid-to">{paid.to}</strong>{" "}
            <strong data-testid="paid-amount">{money(paid.amt)}</strong> · “{paid.note}” ·{" "}
            <strong data-testid="paid-privacy">{PRIVACY.find((p) => p.id === paid.privacy).label}</strong>
          </Banner>
        )}

        <div className="ck-split">
          <Card title="Send money">
            <Field label="To">
              <Select value={to} onChange={(e) => setTo(e.target.value)} aria-label="To" data-testid="recipient">
                {FRIENDS.map((f) => <option key={f.id} value={f.id}>{f.name} · {f.handle}</option>)}
              </Select>
            </Field>
            <Field label="Amount" error={err}>
              <Input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal"
                     aria-label="Amount" data-testid="amount" />
            </Field>
            <Field label="What's it for?">
              <Input value={note} onChange={(e) => setNote(e.target.value)} aria-label="What's it for?" data-testid="note" />
            </Field>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
              {EMOJI.map((e) => (
                <Btn key={e} size="sm" variant="secondary" onClick={() => setNote((n) => (n ? n + " " : "") + e)}
                     data-testid={`emoji-${e}`}>{e}</Btn>
              ))}
            </div>
            <div className="ck-strong" style={{ marginBottom: 6 }}>Privacy</div>
            {PRIVACY.map((p) => (
              <Radio key={p.id} name="privacy" label={p.label} detail={p.detail} testId={`privacy-${p.id}`}
                     checked={privacy === p.id} onChange={() => setPrivacy(p.id)} />
            ))}
            <Row label="Your balance" value={money(s.balance)} testId="balance" />
            <Btn block onClick={pay} data-testid="send-payment">Pay</Btn>
          </Card>

          <Card title="Feed" testId="feed-card">
            <div className="ck-strong" style={{ marginBottom: 6 }}>Viewing as</div>
            <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
              <Btn size="sm" variant={viewer === "self" ? "primary" : "secondary"} onClick={() => setViewer("self")} data-testid="view-self">Yourself</Btn>
              <Btn size="sm" variant={viewer === "friend" ? "primary" : "secondary"} onClick={() => setViewer("friend")} data-testid="view-friend">A friend</Btn>
              <Btn size="sm" variant={viewer === "public" ? "primary" : "secondary"} onClick={() => setViewer("public")} data-testid="view-public">The public</Btn>
            </div>
            <div className="ck-muted" data-testid="feed-note">
              Viewing as {viewer === "self" ? "yourself (all entries)" : viewer === "friend" ? "a friend (Public + Friends)" : "the public (Public only)"} ·{" "}
              <span data-testid="visible-count">{visible.length}</span> visible
            </div>
            {visible.length === 0 ? <Empty>Nothing visible to this viewer.</Empty> : visible.map((f) => (
              <div key={f.id} style={{ borderTop: "1px solid #e8eef5", paddingTop: 8, marginTop: 8 }}
                   data-testid={`entry-${f.id}`}>
                <Row label={`${f.from} paid ${f.to}`} value={money(f.amount)} />
                <div className="ck-muted" data-testid={`entry-note-${f.id}`}>{f.note}</div>
                <Badge tone="neutral" testId={`entry-privacy-${f.id}`}>{PRIVACY.find((p) => p.id === f.privacy).label}</Badge>
              </div>
            ))}
          </Card>
        </div>
      </Page>
    </Shell>
  );
}
