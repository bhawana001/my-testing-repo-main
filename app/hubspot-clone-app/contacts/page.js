"use client";
import { useState } from "react";
import { Shell, Page, Card, Badge, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, useStore } from "../shared";

export default function Contacts() {
  const [s] = useStore();
  const [openId, setOpenId] = useState(null);
  const contact = s.contacts.find((c) => c.id === openId) || null;

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Contacts" sub={`${s.contacts.length} records`} wide>
        <Card title="All contacts" testId="contact-table">
          <Row label="Contact count" value={s.contacts.length} testId="contact-count" />
          <table className="ck-table">
            <thead><tr><th>Name</th><th>Email</th><th>Company</th><th>Phone</th><th>Source</th></tr></thead>
            <tbody>
              {s.contacts.map((c) => (
                <tr key={c.id} data-testid={`contact-${c.id}`}>
                  <td>
                    <button className="ck-btn ck-btn--ghost ck-btn--sm" data-testid={`open-${c.id}`}
                            onClick={() => setOpenId(c.id)}>
                      {`${c.firstName} ${c.lastName}`.trim()}
                    </button>
                  </td>
                  <td data-testid={`contact-email-${c.id}`}>{c.email}</td>
                  <td data-testid={`contact-company-${c.id}`}>{c.company || "—"}</td>
                  <td data-testid={`contact-phone-${c.id}`}>{c.phone || "—"}</td>
                  <td><Badge tone="neutral" testId={`contact-source-${c.id}`}>{c.source}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {contact && (
          <Card title={`${contact.firstName} ${contact.lastName}`.trim()} testId="contact-record">
            <Row label="Email" value={contact.email} testId="record-email" />
            <Row label="Company" value={contact.company || "—"} testId="record-company" />
            <Row label="Phone" value={contact.phone || "—"} testId="record-phone" />
            <Row label="Original source" value={contact.source} testId="record-source" />
            <h3>Timeline</h3>
            <div data-testid="contact-timeline">
              {contact.timeline.length === 0 && <Empty>Nothing on the timeline yet.</Empty>}
              {contact.timeline.map((t, i) => (
                <Row key={i} label={t.at} value={t.text} testId={`timeline-${i}`} />
              ))}
            </div>
          </Card>
        )}
      </Page>
    </Shell>
  );
}
