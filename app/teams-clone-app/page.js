"use client";
import { Shell, Page, Card, Row } from "../clones/kit/ui";
import Nav from "./Nav";
import { BRAND, useStore } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Acme Robotics" sub="Teemz workspace">
        <Card title="Today">
          <Row label="Meetings scheduled" value={s.meetings.length} testId="meeting-count" />
          <Row label="In a meeting" value={s.inMeeting ? s.inMeeting.title : "No"} testId="in-meeting" />
          <Row label="Activity items" value={s.activity.length} testId="activity-count" />
          <Row label="Shared documents" value={Object.keys(s.docs).length} />
        </Card>
      </Page>
    </Shell>
  );
}
