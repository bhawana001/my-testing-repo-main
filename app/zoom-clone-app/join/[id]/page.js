"use client";
import { use, useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Field, Badge, Banner, Empty, Row } from "../../../clones/kit/ui";
import { BRAND, BASE, useStore, findMeeting, slug } from "../../shared";

/**
 * Guest side and host side on one page. Zoom splits these across two computers;
 * putting both here is what lets a single browser prove the gate: the guest sits
 * in the waiting room until the host's Admit button is pressed, and not before.
 */
export default function Join({ params }) {
  const { id } = use(params);
  const [s, update] = useStore();
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const m = findMeeting(s.meetings, id);
  const me = m && [...m.waiting, ...m.participants].find((p) => p.name === name.trim());
  const status = !me ? "out" : m.waiting.some((w) => w.name === name.trim()) ? "waiting" : "in";

  function knock() {
    const who = name.trim();
    if (!who) { setError("Enter your name to join."); return; }
    setError(null);
    update((st) => {
      const target = findMeeting(st.meetings, id);
      if (!target) return st;
      if (target.waiting.some((w) => w.name === who) || target.participants.some((p) => p.name === who)) return st;
      if (target.waitingRoom) target.waiting.push({ name: who, at: "now" });
      else target.participants.push({ name: who, role: "guest", muted: true, sharing: false });
      return st;
    });
  }

  function admit(who) {
    update((st) => {
      const target = findMeeting(st.meetings, id);
      if (!target) return st;
      target.waiting = target.waiting.filter((w) => w.name !== who);
      target.participants.push({ name: who, role: "guest", muted: true, sharing: false });
      return st;
    });
  }

  function removeGuest(who) {
    update((st) => {
      const target = findMeeting(st.meetings, id);
      if (target) target.waiting = target.waiting.filter((w) => w.name !== who);
      return st;
    });
  }

  return (
    <Shell brand={BRAND}>
      <Page title={m ? `Join — ${m.topic}` : "Meeting not found"} sub={m ? `Meeting ID ${m.id}` : null} wide>
        {!m && <Empty>No meeting with that id.</Empty>}

        {m && (
          <>
            <Card title="Guest" testId="guest-panel">
              {error && <Banner tone="bad" testId="join-error">{error}</Banner>}
              <Field label="Your name">
                <Input value={name} placeholder="Tom Alvarez" data-testid="guest-name" aria-label="Your name"
                       onChange={(e) => setName(e.target.value)} />
              </Field>
              <div className="ck-card-actions">
                <Btn onClick={knock} data-testid="guest-join">Join meeting</Btn>
              </div>

              {status === "waiting" && (
                <Banner tone="warn" title="Please wait" testId="waiting-room-screen">
                  The host will let you in soon. You are in the waiting room.
                </Banner>
              )}
              {status === "in" && (
                <Banner tone="ok" title="You are in the meeting" testId="guest-admitted">
                  You were admitted by the host.{" "}
                  <Link href={`${BASE}/m/${slug(m.id)}`} data-testid="go-to-meeting">Open the meeting</Link>
                </Banner>
              )}
              <Row label="Your status"
                   value={status === "out" ? "Not joined" : status === "waiting" ? "Waiting room" : "In meeting"}
                   testId="guest-status" />
            </Card>

            <Card title="Host controls" testId="host-panel">
              <Row label="Waiting room" value={m.waitingRoom ? "On" : "Off"} testId="waiting-room-setting" />
              <Row label="In the waiting room" value={m.waiting.length} testId="waiting-count" />
              {m.waiting.length === 0 && <Empty>Nobody is waiting.</Empty>}
              {m.waiting.map((w) => (
                <div key={w.name} className="ck-row" data-testid={`waiting-${w.name.split(" ")[0].toLowerCase()}`}>
                  <span>{w.name} <Badge tone="warn">waiting</Badge></span>
                  <span>
                    <Btn size="sm" data-testid={`admit-${w.name.split(" ")[0].toLowerCase()}`}
                         onClick={() => admit(w.name)}>Admit</Btn>{" "}
                    <Btn size="sm" variant="ghost" onClick={() => removeGuest(w.name)}>Remove</Btn>
                  </span>
                </div>
              ))}
              <Row label="In the meeting" value={m.participants.length} testId="participant-count" />
              <div data-testid="participant-names">
                {m.participants.map((p) => (
                  <Badge key={p.name} tone="ok">{p.name}</Badge>
                ))}
              </div>
            </Card>
          </>
        )}
      </Page>
    </Shell>
  );
}
