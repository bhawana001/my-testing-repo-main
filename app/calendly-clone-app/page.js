"use client";
import { useState } from "react";
import Link from "next/link";
import { Shell, Page, Card, Btn, Input, Select, Field, Badge, Banner, Row, Empty } from "../clones/kit/ui";
import Nav from "./Nav";
import {
  BRAND, BASE, HOST, DATE, ZONES, EVENT_TYPES, useStore, openSlots, fmt, bookingRef,
} from "./shared";

export default function Book() {
  const [s, update] = useStore();
  const [eventId, setEventId] = useState("intro");
  const [tz, setTz] = useState("America/New_York");
  const [slot, setSlot] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [error, setError] = useState(null);
  const [done, setDone] = useState(null);

  const event = EVENT_TYPES.find((e) => e.id === eventId);
  const slots = openSlots(s, event.minutes);
  const paid = event.price > 0;

  function confirm() {
    if (slot === null) { setError("Pick a time first."); return; }
    if (!name.trim() || !email.includes("@")) { setError("Name and a valid email are both required."); return; }
    if (paid && card.replace(/\s/g, "").length < 15) {
      setError("A paid event needs a card number — use 4242 4242 4242 4242 to test.");
      return;
    }
    // Built here rather than inside the updater so the confirmation can show it.
    const booking = {
      ref: bookingRef(s.bookings.length),
      eventId, eventName: event.name, minutes: event.minutes,
      startUtc: slot, date: DATE, name: name.trim(), email: email.trim(),
      inviteeTz: tz, hostTz: HOST.tz, status: "Confirmed",
      payment: paid
        ? { amount: event.price, last4: card.replace(/\s/g, "").slice(-4), status: "Paid",
            receipt: `RCPT-${4100 + s.bookings.length * 7}` }
        : null,
      history: [{ at: "now", text: `Booked for ${fmt(slot, tz)}` }],
    };
    update((st) => { st.bookings.unshift(booking); return st; });
    setError(null);
    setDone(booking);
    setSlot(null);
  }

  return (
    <Shell brand={BRAND}>
      <Nav />
      <Page title={`Book with ${HOST.name}`} sub={`${DATE} · host time is ${HOST.tz}`} wide>
        {error && <Banner tone="bad" testId="book-error">{error}</Banner>}

        {done && (
          <Card title="Booking confirmed" tone="ok" testId="confirmation">
            <Row label="Reference" value={done.ref} testId="confirm-ref" />
            <Row label="Event" value={done.eventName} testId="confirm-event" />
            <Row label="Your time" value={fmt(done.startUtc, done.inviteeTz)} testId="confirm-invitee-time" />
            <Row label={`${HOST.name}'s time`} value={fmt(done.startUtc, done.hostTz)} testId="confirm-host-time" />
            {done.payment && (
              <>
                <Row label="Paid" value={`$${done.payment.amount.toFixed(2)}`} testId="confirm-amount" />
                <Row label="Card" value={`•••• ${done.payment.last4}`} testId="confirm-card" />
                <Row label="Receipt" value={done.payment.receipt} testId="confirm-receipt" />
                <Badge tone="ok" testId="payment-status">{done.payment.status}</Badge>
              </>
            )}
            <div className="ck-card-actions">
              <Link href={`${BASE}/b/${done.ref}`} className="ck-btn ck-btn--secondary" data-testid="confirmation-link">
                Open the confirmation link
              </Link>
              <Btn variant="ghost" onClick={() => setDone(null)} data-testid="book-another">Book another</Btn>
            </div>
          </Card>
        )}

        <Card title="Event type">
          <Field label="What are you booking">
            <Select value={eventId} data-testid="event-type" aria-label="Event type"
                    onChange={(e) => { setEventId(e.target.value); setSlot(null); }}>
              {EVENT_TYPES.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}{e.price ? ` — $${e.price}` : " — free"}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Your timezone" hint="The grid below is shown in this timezone">
            <Select value={tz} data-testid="timezone" aria-label="Timezone"
                    onChange={(e) => setTz(e.target.value)}>
              {ZONES.map((z) => <option key={z.id} value={z.id}>{z.label}</option>)}
            </Select>
          </Field>
          <Row label="Slots offered" value={slots.length} testId="slot-count" />
        </Card>

        <Card title={`Available times — ${DATE}`} testId="slot-grid">
          {slots.length === 0 && <Empty>No times are open for this event.</Empty>}
          <div className="ck-card-actions">
            {slots.map((t) => (
              <Btn key={t} variant={slot === t ? "primary" : "secondary"} data-testid={`slot-${t}`}
                   onClick={() => { setSlot(t); setError(null); }}>
                {fmt(t, tz)}
              </Btn>
            ))}
          </div>
          {slot !== null && (
            <>
              <Row label="You picked" value={fmt(slot, tz)} testId="picked-invitee-time" />
              <Row label={`${HOST.name} sees`} value={fmt(slot, HOST.tz)} testId="picked-host-time" />
            </>
          )}
        </Card>

        <Card title="Your details">
          <Field label="Name">
            <Input value={name} data-testid="invitee-name" aria-label="Name" onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Email">
            <Input value={email} data-testid="invitee-email" aria-label="Email" onChange={(e) => setEmail(e.target.value)} />
          </Field>
          {paid && (
            <Field label="Card number" hint="Test card: 4242 4242 4242 4242">
              <Input value={card} placeholder="4242 4242 4242 4242" data-testid="card-number" aria-label="Card number"
                     onChange={(e) => setCard(e.target.value)} />
            </Field>
          )}
          <div className="ck-card-actions">
            <Btn onClick={confirm} data-testid="confirm-booking">
              {paid ? `Pay $${event.price} and confirm` : "Schedule event"}
            </Btn>
          </div>
        </Card>
      </Page>
    </Shell>
  );
}
