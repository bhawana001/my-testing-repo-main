"use client";
import { useState } from "react";
import { Shell, Page, Card, Btn, Select, Field, Badge, Banner, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, SEQUENCES, OWNER, useStore } from "../shared";

export default function Sequences() {
  const [s, update] = useStore();
  const [contactId, setContactId] = useState(s.contacts[0] ? s.contacts[0].id : "");
  const [seqId, setSeqId] = useState(SEQUENCES[0].id);
  const [notice, setNotice] = useState(null);

  const contact = s.contacts.find((c) => c.id === contactId) || null;
  const seq = SEQUENCES.find((x) => x.id === seqId);

  function enrol() {
    if (!contact) { setNotice({ tone: "bad", msg: "Pick a contact." }); return; }
    if (s.enrolments.some((e) => e.contactId === contactId && e.sequenceId === seqId && e.status === "Active")) {
      setNotice({ tone: "info", msg: "That contact is already active in this sequence." });
      return;
    }
    update((st) => {
      st.enrolments.unshift({
        id: `enr_${st.counter++}`, contactId, sequenceId: seqId, sequenceName: seq.name,
        status: "Active", step: 1, totalSteps: seq.steps, enrolledOn: "2026-09-16", enrolledBy: OWNER,
      });
      const c = st.contacts.find((x) => x.id === contactId);
      if (c) c.timeline.unshift({ at: "2026-09-16", text: `Enrolled in sequence “${seq.name}” — step 1 of ${seq.steps}` });
      return st;
    });
    setNotice({ tone: "ok", msg: `${contact.firstName} enrolled in “${seq.name}”. It is now on their timeline.` });
  }

  function unenrol(id) {
    update((st) => {
      const e = st.enrolments.find((x) => x.id === id);
      if (!e) return st;
      e.status = "Unenrolled";
      const c = st.contacts.find((x) => x.id === e.contactId);
      if (c) c.timeline.unshift({ at: "2026-09-16", text: `Unenrolled from “${e.sequenceName}”` });
      return st;
    });
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Sequences" sub="Enrolment shows up on the contact timeline">
        {notice && <Banner tone={notice.tone} testId="sequence-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Enrol a contact">
          <Field label="Contact">
            <Select value={contactId} data-testid="enrol-contact" aria-label="Contact"
                    onChange={(e) => setContactId(e.target.value)}>
              {s.contacts.map((c) => (
                <option key={c.id} value={c.id}>{`${c.firstName} ${c.lastName}`.trim()} — {c.email}</option>
              ))}
            </Select>
          </Field>
          <Field label="Sequence">
            <Select value={seqId} data-testid="enrol-sequence" aria-label="Sequence"
                    onChange={(e) => setSeqId(e.target.value)}>
              {SEQUENCES.map((x) => <option key={x.id} value={x.id}>{x.name} — {x.steps} steps over {x.days} days</option>)}
            </Select>
          </Field>
          <div className="ck-card-actions">
            <Btn onClick={enrol} data-testid="enrol">Enrol</Btn>
          </div>
        </Card>

        <Card title="Enrolments" testId="enrolment-list">
          <Row label="Active enrolments" value={s.enrolments.filter((e) => e.status === "Active").length}
               testId="active-enrolments" />
          {s.enrolments.length === 0 && <Empty>Nobody is enrolled.</Empty>}
          {s.enrolments.map((e) => {
            const c = s.contacts.find((x) => x.id === e.contactId);
            return (
              <div key={e.id} className="ck-row" data-testid={`enrolment-${e.id}`}>
                <span>
                  <strong>{c ? `${c.firstName} ${c.lastName}`.trim() : e.contactId}</strong>
                  <div className="ck-muted">{e.sequenceName} · step {e.step} of {e.totalSteps}</div>
                </span>
                <span>
                  <Badge tone={e.status === "Active" ? "ok" : "neutral"} testId={`enrolment-status-${e.id}`}>
                    {e.status}
                  </Badge>{" "}
                  {e.status === "Active" && (
                    <Btn size="sm" variant="ghost" data-testid={`unenrol-${e.id}`} onClick={() => unenrol(e.id)}>
                      Unenrol
                    </Btn>
                  )}
                </span>
              </div>
            );
          })}
        </Card>

        {contact && (
          <Card title={`${contact.firstName}'s timeline`} testId="contact-timeline">
            {contact.timeline.map((t, i) => (
              <Row key={i} label={t.at} value={t.text} testId={`timeline-${i}`} />
            ))}
          </Card>
        )}
      </Page>
    </Shell>
  );
}
