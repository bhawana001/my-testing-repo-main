"use client";
import { Shell, Page, Card, Row } from "../clones/kit/ui";
import Nav from "./Nav";
import { BRAND, STATUSES, SUPPORT_ADDRESS, useStore } from "./shared";

export default function Home() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Freshdesc" sub={`Support inbox for ${SUPPORT_ADDRESS}`}>
        <Card title="Tickets">
          <Row label="Total" value={s.tickets.length} testId="ticket-count" />
          {STATUSES.map((st) => (
            <Row key={st} label={st} value={s.tickets.filter((t) => t.status === st).length}
                 testId={`status-count-${st.toLowerCase()}`} />
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
