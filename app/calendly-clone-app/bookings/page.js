"use client";
import Link from "next/link";
import { Shell, Page, Card, Badge, Row, Empty } from "../../clones/kit/ui";
import Nav from "../Nav";
import { BRAND, BASE, HOST, useStore, fmt } from "../shared";

export default function Bookings() {
  const [s] = useStore();
  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title="Scheduled events" sub={`${s.bookings.length} bookings`} wide>
        <Card title="Bookings" testId="booking-list">
          <Row label="Confirmed" value={s.bookings.filter((b) => b.status === "Confirmed").length}
               testId="confirmed-count" />
          {s.bookings.length === 0 && <Empty>Nothing booked yet.</Empty>}
          {s.bookings.map((b) => (
            <div key={b.ref} className="ck-row" data-testid={`booking-${b.ref}`}>
              <span>
                <strong>{b.eventName}</strong> — {b.name}
                <div className="ck-muted">
                  {fmt(b.startUtc, b.inviteeTz)} for the invitee · {fmt(b.startUtc, HOST.tz)} for {HOST.name}
                </div>
                {b.payment && <Badge tone="ok">Paid ${b.payment.amount.toFixed(2)} · {b.payment.receipt}</Badge>}
              </span>
              <span>
                <Badge tone={b.status === "Confirmed" ? "ok" : "neutral"} testId={`status-${b.ref}`}>{b.status}</Badge>{" "}
                <Link href={`${BASE}/b/${b.ref}`} className="ck-btn ck-btn--ghost ck-btn--sm"
                      data-testid={`open-${b.ref}`}>Open</Link>
              </span>
            </div>
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
