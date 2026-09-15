"use client";
import { Shell, Page, Card, Row } from "../clones/kit/ui";
import Nav from "./Nav";
import { BRAND, STAGES, useStore, money } from "./shared";

export default function Home() {
  const [s] = useStore();
  const pipeline = s.deals.reduce((n, d) => n + d.amount, 0);
  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Hubsprout" sub="Your CRM at a glance">
        <Card title="Summary">
          <Row label="Contacts" value={s.contacts.length} testId="contact-count" />
          <Row label="Deals" value={s.deals.length} testId="deal-count" />
          <Row label="Pipeline value" value={money(pipeline)} testId="pipeline-value" />
          <Row label="Sequence enrolments" value={s.enrolments.length} testId="enrolment-count" />
          <Row label="Meetings booked" value={s.meetings.length} testId="meeting-count" />
        </Card>
        <Card title="Deals by stage">
          {STAGES.map((st) => (
            <Row key={st} label={st} value={s.deals.filter((d) => d.stage === st).length}
                 testId={`stage-count-${st.replace(/\s+/g, "-").toLowerCase()}`} />
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
