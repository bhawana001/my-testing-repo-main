"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Select, Field, Check, Banner, Row } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, useStore, nextMeetingId, slug } from "../shared";

export default function Schedule() {
  const [s, update] = useStore();
  const [topic, setTopic] = useState("");
  const [when, setWhen] = useState("2026-09-20 15:00");
  const [duration, setDuration] = useState("30");
  const [registration, setRegistration] = useState(true);
  const [waitingRoom, setWaitingRoom] = useState(true);
  const [created, setCreated] = useState(null);
  const [error, setError] = useState(null);

  function save() {
    if (!topic.trim()) { setError("Give the meeting a topic."); return; }
    // Built from the state we already hold: a React updater runs later, so an id
    // assigned inside one would still be null when the link below is rendered.
    const id = nextMeetingId(s.meetings.length);
    const meeting = {
      id, topic: topic.trim(), when, duration: Number(duration),
      registration, waitingRoom, registrants: [],
      participants: [{ name: "Priya Nair", role: "host", muted: false, sharing: false }],
      waiting: [], sharing: null, recording: null,
    };
    update((st) => { st.meetings.push(meeting); return st; });
    setError(null);
    setCreated(meeting);
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Schedule a meeting">
        {error && <Banner tone="bad" testId="schedule-error">{error}</Banner>}

        <Card title="Details">
          <Field label="Topic">
            <Input value={topic} placeholder="Quarterly product review" data-testid="topic"
                   aria-label="Topic" onChange={(e) => setTopic(e.target.value)} />
          </Field>
          <Field label="When">
            <Input value={when} data-testid="when" aria-label="When" onChange={(e) => setWhen(e.target.value)} />
          </Field>
          <Field label="Duration">
            <Select value={duration} data-testid="duration" aria-label="Duration"
                    onChange={(e) => setDuration(e.target.value)}>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">60 minutes</option>
            </Select>
          </Field>
          <Check checked={registration} onChange={() => setRegistration((v) => !v)}
                 label="Required registration" detail="Attendees must register before they get a join link"
                 testId="require-registration" />
          <Check checked={waitingRoom} onChange={() => setWaitingRoom((v) => !v)}
                 label="Waiting room" detail="Guests wait until the host admits them"
                 testId="waiting-room" />
          <div className="ck-card-actions">
            <Btn onClick={save} data-testid="save-meeting">Save</Btn>
          </div>
        </Card>

        {created && (
          <Card title="Meeting scheduled" tone="ok" testId="schedule-result">
            <Row label="Topic" value={created.topic} testId="result-topic" />
            <Row label="Meeting ID" value={created.id} testId="result-id" />
            <Row label="Registration" value={created.registration ? "Required" : "Not required"} testId="result-registration" />
            {created.registration && (
              <>
                <Row label="Registration link"
                     value={`${BASE}/register/${slug(created.id)}`} testId="registration-link" />
                <div className="ck-card-actions">
                  <Link href={`${BASE}/register/${slug(created.id)}`} className="ck-btn ck-btn--primary"
                        data-testid="open-registration">Open registration form</Link>
                </div>
              </>
            )}
          </Card>
        )}
      </Page>
    </Shell>
  );
}
