"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Input, Field, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import { BRAND, OWNER, MEETING_SLOTS, useStore, meetingRef, nextId } from "../shared";

/** The prospect-facing meeting link. No CRM chrome, no sign-in. */
export default function Meetings() {
  const [s, update] = useStore();
  const [slot, setSlot] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [booked, setBooked] = useState(null);

  const taken = s.meetings.map((m) => m.slot);
  const open = MEETING_SLOTS.filter((x) => !taken.includes(x));

  function book() {
    if (!slot) { setError("Pick a time."); return; }
    if (!name.trim() || !email.includes("@")) { setError("Name and a valid email are both required."); return; }
    const meeting = {
      ref: meetingRef(s.meetings.length), slot, name: name.trim(), email: email.trim(),
      with: OWNER, minutes: 30, status: "Scheduled",
    };
    update((st) => {
      st.meetings.unshift(meeting);
      // A booking is also a contact, which is what makes the meeting link useful.
      let contact = st.contacts.find((c) => c.email === meeting.email);
      if (!contact) {
        contact = {
          id: nextId("c", st.counter++), firstName: meeting.name.split(" ")[0],
          lastName: meeting.name.split(" ").slice(1).join(" "), email: meeting.email,
          company: "", phone: "", source: "Meeting link", timeline: [],
        };
        st.contacts.push(contact);
      }
      contact.timeline.unshift({ at: "2026-09-16", text: `Booked a 30 minute meeting with ${OWNER} for ${slot}` });
      return st;
    });
    setError(null);
    setBooked(meeting);
    setSlot(null);
  }

  return (
    <Shell brand={BRAND}>
      <Page title={`Book time with ${OWNER}`} sub="30 minute meeting">
        {error && <Banner tone="bad" testId="meeting-error">{error}</Banner>}

        {booked && (
          <Card title="You are booked in" tone="ok" testId="meeting-confirmation">
            <Row label="Reference" value={booked.ref} testId="meeting-ref" />
            <Row label="When" value={booked.slot} testId="meeting-when" />
            <Row label="With" value={booked.with} testId="meeting-with" />
            <Row label="Length" value={`${booked.minutes} minutes`} />
            <Row label="Your email" value={booked.email} testId="meeting-email" />
            <Badge tone="ok" testId="meeting-status">{booked.status}</Badge>
          </Card>
        )}

        <Card title="Pick a time" testId="slot-grid">
          <Row label="Times available" value={open.length} testId="slot-count" />
          {open.length === 0 && <Empty>No times left this week.</Empty>}
          <div className="ck-card-actions">
            {open.map((x) => (
              <Btn key={x} variant={slot === x ? "primary" : "secondary"}
                   data-testid={`slot-${x.replace(/[\s:]/g, "-")}`} onClick={() => { setSlot(x); setError(null); }}>
                {x}
              </Btn>
            ))}
          </div>
          {slot && <Row label="Selected" value={slot} testId="selected-slot" />}
        </Card>

        <Card title="Your details">
          <Field label="Name">
            <Input value={name} data-testid="prospect-name" aria-label="Name" onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Email">
            <Input value={email} data-testid="prospect-email" aria-label="Email" onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={book} data-testid="confirm-meeting">Confirm the meeting</Btn>
          </div>
        </Card>
      </Page>
    </Shell>
  );
}
