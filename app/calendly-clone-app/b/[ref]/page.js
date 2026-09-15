"use client";
import { use, useState } from "react";
import { Shell, Page, Card, Btn, Badge, Banner, Row, Empty } from "../../../clones/kit/ui";
import { BRAND, HOST, DATE, EVENT_TYPES, useStore, openSlots, fmt } from "../../shared";

/**
 * What the confirmation email links to. Rescheduling releases the old slot
 * before taking the new one, so the freed time reappears in the grid below.
 */
export default function BookingDetail({ params }) {
  const { ref } = use(params);
  const [s, update] = useStore();
  const [picking, setPicking] = useState(false);
  const [notice, setNotice] = useState(null);

  const booking = s.bookings.find((b) => b.ref === ref) || null;
  const event = booking ? EVENT_TYPES.find((e) => e.id === booking.eventId) : null;

  // The old slot is excluded from "taken" here so it shows as free to move within.
  const candidates = booking
    ? openSlots(
        { ...s, bookings: s.bookings.filter((b) => b.ref !== ref) },
        booking.minutes
      ).filter((t) => t !== booking.startUtc)
    : [];

  function reschedule(t) {
    const old = booking.startUtc;
    update((st) => {
      const b = st.bookings.find((x) => x.ref === ref);
      if (!b) return st;
      b.startUtc = t;
      b.history.push({ at: "now", text: `Rescheduled from ${fmt(old, b.inviteeTz)} to ${fmt(t, b.inviteeTz)}` });
      return st;
    });
    setPicking(false);
    setNotice({
      tone: "ok",
      msg: `Rescheduled — ${fmt(old, booking.inviteeTz)} is free again and ${fmt(t, booking.inviteeTz)} is confirmed.`,
    });
  }

  function cancel() {
    update((st) => {
      const b = st.bookings.find((x) => x.ref === ref);
      if (!b) return st;
      b.status = "Cancelled";
      b.history.push({ at: "now", text: "Cancelled by the invitee" });
      return st;
    });
    setNotice({ tone: "info", msg: "Booking cancelled — the slot is free again." });
  }

  if (!booking) {
    return (
      <Shell brand={BRAND}>
        <Page title="Booking not found"><Empty>That confirmation link is not valid.</Empty></Page>
      </Shell>
    );
  }

  return (
    <Shell brand={BRAND}>
      <Page title={booking.eventName} sub={`Reference ${booking.ref} · ${DATE}`} wide>
        {notice && <Banner tone={notice.tone} testId="reschedule-notice" onClose={() => setNotice(null)}>{notice.msg}</Banner>}

        <Card title="Your booking" testId="booking-detail">
          <Badge tone={booking.status === "Confirmed" ? "ok" : "neutral"} testId="booking-status">{booking.status}</Badge>
          <Row label="Invitee" value={`${booking.name} · ${booking.email}`} testId="detail-invitee" />
          <Row label="Your time" value={fmt(booking.startUtc, booking.inviteeTz)} testId="detail-invitee-time" />
          <Row label={`${HOST.name}'s time`} value={fmt(booking.startUtc, HOST.tz)} testId="detail-host-time" />
          <Row label="Length" value={`${booking.minutes} minutes`} />
          {booking.payment && (
            <>
              <Row label="Payment" value={`$${booking.payment.amount.toFixed(2)} · ${booking.payment.status}`}
                   testId="detail-payment" />
              <Row label="Receipt" value={booking.payment.receipt} testId="detail-receipt" />
            </>
          )}
          <div className="ck-card-actions">
            <Btn data-testid="reschedule" disabled={booking.status !== "Confirmed"}
                 onClick={() => setPicking(true)}>Reschedule</Btn>
            <Btn variant="danger" data-testid="cancel" disabled={booking.status !== "Confirmed"}
                 onClick={cancel}>Cancel</Btn>
          </div>
        </Card>

        {picking && (
          <Card title="Pick a new time" testId="reschedule-grid">
            <Row label="Times available" value={candidates.length} testId="reschedule-count" />
            {candidates.length === 0 && <Empty>Nothing else is open that day.</Empty>}
            <div className="ck-card-actions">
              {candidates.map((t) => (
                <Btn key={t} variant="secondary" data-testid={`new-slot-${t}`} onClick={() => reschedule(t)}>
                  {fmt(t, booking.inviteeTz)}
                </Btn>
              ))}
            </div>
          </Card>
        )}

        <Card title="History" testId="booking-history">
          {booking.history.map((h, i) => (
            <Row key={i} label={h.at} value={h.text} testId={`history-${i}`} />
          ))}
        </Card>
      </Page>
    </Shell>
  );
}
