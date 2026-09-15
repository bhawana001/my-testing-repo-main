"use client";
import { use, useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Field, Banner, Row, Empty } from "../../../clones/kit/ui";
import { BRAND, BASE, useStore, findMeeting, slug } from "../../shared";

/** The public-facing registration page: no host chrome, exactly like the real one. */
export default function Register({ params }) {
  const { id } = use(params);
  const [s, update] = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [error, setError] = useState(null);
  const [done, setDone] = useState(null);

  const m = findMeeting(s.meetings, id);

  function submit() {
    if (!name.trim() || !email.trim()) { setError("Name and email are both required."); return; }
    if (!email.includes("@")) { setError("Enter a valid email address."); return; }
    const registrant = { name: name.trim(), email: email.trim(), org: org.trim(), at: "now" };
    update((st) => {
      const target = findMeeting(st.meetings, id);
      if (target) target.registrants.push(registrant);
      return st;
    });
    setError(null);
    setDone(registrant);
  }

  return (
    <Shell brand={BRAND}>
      <Page title={m ? `Register — ${m.topic}` : "Meeting not found"}
            sub={m ? `${m.when} · Meeting ID ${m.id}` : null}>
        {!m && <Empty>No meeting matches this registration link.</Empty>}

        {m && !done && (
          <Card title="Registration" testId="registration-form">
            {error && <Banner tone="bad" testId="registration-error">{error}</Banner>}
            <Field label="Full name">
              <Input value={name} data-testid="reg-name" aria-label="Full name"
                     onChange={(e) => setName(e.target.value)} />
            </Field>
            <Field label="Email">
              <Input value={email} data-testid="reg-email" aria-label="Email"
                     onChange={(e) => setEmail(e.target.value)} />
            </Field>
            <Field label="Organisation" hint="Optional">
              <Input value={org} data-testid="reg-org" aria-label="Organisation"
                     onChange={(e) => setOrg(e.target.value)} />
            </Field>
            <div className="ck-card-actions">
              <Btn onClick={submit} data-testid="reg-submit">Register</Btn>
            </div>
          </Card>
        )}

        {m && done && (
          <Card title="You are registered" tone="ok" testId="registration-confirmed">
            <Row label="Name" value={done.name} testId="confirmed-name" />
            <Row label="Email" value={done.email} testId="confirmed-email" />
            <Row label="Meeting" value={m.topic} />
            <Row label="Total registrants" value={m.registrants.length} testId="registrant-total" />
            <div className="ck-card-actions">
              <Link href={`${BASE}/join/${slug(m.id)}`} className="ck-btn ck-btn--primary"
                    data-testid="join-from-registration">Join the meeting</Link>
            </div>
          </Card>
        )}
      </Page>
    </Shell>
  );
}
