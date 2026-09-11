"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { MobileShell } from "@/app/components/engines/MobileShell";
import { Field, Input, Select, Btn, Segment, Badge, Alert } from "@/app/components/eval/ui";
import { TxFeed } from "@/app/components/engines/Feed";

const seed = () => ({ feed: [{ id: "f1", who: "Priya Nair", note: "Concert tix 🎸", amount: 60, dir: "out", privacy: "Friends", when: "Yesterday" }], viewAs: "me", seq: 2, last: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [to, setTo] = useState("Tom Alvarez"); const [amt, setAmt] = useState(""); const [note, setNote] = useState(""); const [privacy, setPrivacy] = useState("Private"); const [err, setErr] = useState(null);
  function pay() {
    if (!(Number(amt) > 0)) { setErr("Enter an amount."); return; }
    if (!note.trim()) { setErr("A note is required."); return; }
    setErr(null);
    const tx = { id: "f" + s.seq, who: to, note: note.trim(), amount: Number(amt), dir: "out", privacy, when: "Just now" };
    set({ ...s, seq: s.seq + 1, feed: [tx, ...s.feed], last: tx }); setAmt(""); setNote("");
  }
  const visible = s.feed.filter((t) => s.viewAs === "me" || (s.viewAs === "friend" && t.privacy !== "Private") || (s.viewAs === "public" && t.privacy === "Public"));
  return (
    <MobileShell flow={flow} title="Pay or Request" nav={["Feed", "Pay", "Cards"]}>
      <Field label="To" htmlFor="vm-to"><Select id="vm-to" value={to} onChange={(e) => setTo(e.target.value)}>{["Tom Alvarez", "Priya Nair", "Sam Lee"].map((c) => <option key={c}>{c}</option>)}</Select></Field>
      <Field label="Amount" htmlFor="vm-amt"><Input id="vm-amt" inputMode="decimal" value={amt} onChange={(e) => setAmt(e.target.value)} placeholder="$0" style={{ fontSize: 22 }} /></Field>
      <Field label="What's it for?" htmlFor="vm-note" error={err}><Input id="vm-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="🍕 Pizza night" /></Field>
      <Field label="Privacy" htmlFor="vm-privacy"><Select id="vm-privacy" value={privacy} onChange={(e) => setPrivacy(e.target.value)}>{["Public", "Friends", "Private"].map((p) => <option key={p}>{p}</option>)}</Select></Field>
      <Btn block onClick={pay} data-testid="vm-pay">Pay</Btn>
      {s.last && <Alert tone="ok" data-testid="vm-paid">You paid {s.last.who} ${s.last.amount.toFixed(2)} · “{s.last.note}” · {s.last.privacy}</Alert>}
      <div className="ee-row ee-row--between"><span className="ee-strong ee-small">Feed</span><Segment options={[{ value: "me", label: "As me" }, { value: "friend", label: "As a friend" }, { value: "public", label: "As public" }]} value={s.viewAs} onChange={(v) => set({ ...s, viewAs: v })} /></div>
      <div className="ee-tiny ee-muted" data-testid="feed-note">Viewing as {s.viewAs === "me" ? "yourself (all entries)" : s.viewAs === "friend" ? "a friend (Public + Friends)" : "the public (Public only)"} · {visible.length} visible</div>
      <TxFeed items={visible} testIdPrefix="feed" />
    </MobileShell>
  );
}
