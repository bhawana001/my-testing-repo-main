"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Select, Field, Check, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, useStore, boardsVisibleTo } from "../shared";

export default function Sharing() {
  const [s, update] = useStore();
  const [email, setEmail] = useState("");
  const [picked, setPicked] = useState(["launch"]);
  const [viewer, setViewer] = useState("owner");
  const [notice, setNotice] = useState(null);

  const boards = Object.values(s.boards);
  const visible = boardsVisibleTo(s, viewer);

  function toggleBoard(id) {
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  }

  function invite() {
    const who = email.trim();
    if (!who.includes("@")) { setNotice({ tone: "bad", msg: "Enter a valid email address." }); return; }
    if (picked.length === 0) { setNotice({ tone: "bad", msg: "Pick at least one board." }); return; }
    update((st) => {
      st.guests = st.guests.filter((g) => g.email !== who);
      st.guests.push({ email: who, boardIds: [...picked], role: "Guest" });
      return st;
    });
    setNotice({ tone: "ok", msg: `${who} invited as a guest on ${picked.length} of ${boards.length} boards.` });
    setViewer(who);
    setEmail("");
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Sharing" sub="A guest gets exactly the boards you tick, and nothing else">
        {notice && <Banner tone={notice.tone} testId="share-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Invite a guest">
          <Field label="Email">
            <Input value={email} placeholder="guest@partner.test" data-testid="guest-email" aria-label="Guest email"
                   onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Field label="Boards">
            {boards.map((b) => (
              <Check key={b.id} checked={picked.includes(b.id)} onChange={() => toggleBoard(b.id)}
                     label={b.name} detail={`${b.items.length} items`} testId={`pick-${b.id}`} />
            ))}
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={invite} data-testid="send-invite">Invite as guest</Btn>
          </div>
        </Card>

        <Card title="Guests" testId="guest-list">
          {s.guests.length === 0 && <Empty>No guests yet.</Empty>}
          {s.guests.map((g) => (
            <div key={g.email} className="ck-row" data-testid={`guest-${g.email}`}>
              <span><strong>{g.email}</strong><div className="ck-muted">{g.role}</div></span>
              <span>
                {g.boardIds.map((id) => (
                  <Badge key={id} tone="info" testId={`guest-board-${id}`}>{s.boards[id].name}</Badge>
                ))}
              </span>
            </div>
          ))}
        </Card>

        <Card title="What each person sees" testId="visibility">
          <Field label="View as" hint="Switch to the guest to check their access is scoped">
            <Select value={viewer} data-testid="viewer" aria-label="View as"
                    onChange={(e) => setViewer(e.target.value)}>
              <option value="owner">Priya Nair (owner)</option>
              {s.guests.map((g) => <option key={g.email} value={g.email}>{g.email} (guest)</option>)}
            </Select>
          </Field>
          <Row label="Boards visible" value={`${visible.length} of ${boards.length}`} testId="visible-count" />
          {visible.length === 0 && <Empty>This person cannot see any board.</Empty>}
          <div data-testid="visible-boards">
            {visible.map((b) => (
              <Row key={b.id} label={b.name} value={`${b.items.length} items`} testId={`visible-${b.id}`} />
            ))}
          </div>
          <div className="ck-muted" data-testid="hidden-boards">
            Hidden from this viewer:{" "}
            {boards.filter((b) => !visible.some((v) => v.id === b.id)).map((b) => b.name).join(", ") || "nothing"}
          </div>
        </Card>
      </Page>
    </Shell>
  );
}
