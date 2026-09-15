"use client";
import { useState } from "react";
import { Shell, Page, Card, Select, Field, Badge, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, HOST, DATE, EVENT_TYPES, useStore, allSlots, openSlots, busyReason, fmt } from "../shared";

export default function Availability() {
  const [s] = useStore();
  const [eventId, setEventId] = useState("intro");
  const event = EVENT_TYPES.find((e) => e.id === eventId);

  const every = allSlots(event.minutes);
  const open = openSlots(s, event.minutes);
  const blocked = every.filter((t) => !open.includes(t));

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Availability" sub={`Working hours 09:00–17:00 ${HOST.tz} on ${DATE}`} wide>
        <Card title="Event">
          <Field label="Event type">
            <Select value={eventId} data-testid="event-type" aria-label="Event type"
                    onChange={(e) => setEventId(e.target.value)}>
              {EVENT_TYPES.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
            </Select>
          </Field>
          <Row label="Slots in working hours" value={every.length} testId="total-slots" />
          <Row label="Offered to invitees" value={open.length} testId="open-slots" />
          <Row label="Withheld" value={blocked.length} testId="blocked-slots" />
        </Card>

        <Card title="Busy on the host calendar" testId="busy-list">
          {s.busy.map((b) => (
            <Row key={b.label} label={b.label} value={`${b.startIst}–${b.endIst} IST`}
                 testId={`busy-${b.label.replace(/\s+/g, "-").toLowerCase()}`} />
          ))}
        </Card>

        <Card title="Slot by slot" testId="slot-audit">
          {every.length === 0 && <Empty>No slots in the working day for this length.</Empty>}
          <table className="ck-table">
            <thead><tr><th>Host time</th><th>Offered</th><th>Why not</th></tr></thead>
            <tbody>
              {every.map((t) => {
                const offered = open.includes(t);
                const reason = offered ? "" : busyReason(s, t, event.minutes) || "Outside working hours";
                return (
                  <tr key={t} data-testid={`audit-${t}`}>
                    <td data-testid={`audit-time-${t}`}>{fmt(t, HOST.tz)}</td>
                    <td>
                      <Badge tone={offered ? "ok" : "bad"} testId={`audit-offered-${t}`}>
                        {offered ? "Offered" : "Not offered"}
                      </Badge>
                    </td>
                    <td data-testid={`audit-reason-${t}`}>{reason}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </Page>
    </Shell>
  );
}
