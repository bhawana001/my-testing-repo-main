"use client";
import { useState } from "react";
import { useFlowState, storageKey } from "@/lib/state";
import { getEntity } from "@/lib/registry";
import { Card, Btn, Field, Input, Alert } from "@/app/components/eval/ui";
import { Calendar, Slots, TzPicker, BookingSummary, fmt12, convertTime, dateLabel } from "@/app/components/engines/Booking";

const EVENT = { title: "30 Minute Meeting", host: "Priya Nair", hostTz: "America/New_York", duration: 30 };
const AVAILABLE = [14, 15, 16, 17, 18, 21, 22, 23, 24, 25];
const SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "13:00", "13:30", "14:00", "15:00", "16:00"];
const BUSY = { 15: ["10:00", "10:30"], 16: ["13:00"] };
const seed = () => ({ day: null, slot: null, tz: "Asia/Kolkata", booking: null, step: "pick" });

export default function Flow({ flow }) {
  const ent = getEntity(flow.entitySlug);
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const [name, setName] = useState("Demo User");
  const [email, setEmail] = useState("demo@evals.dev");
  const [err, setErr] = useState(null);

  function confirm() {
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr("Enter your name and a valid email.");
      return;
    }
    set({ ...s, booking: { title: EVENT.title, day: s.day, slot: s.slot, tz: s.tz, duration: EVENT.duration, ref: `CAL-${s.day}${s.slot.replace(":", "")}`, name, email }, step: "done" });
  }

  return (
    <main className="ee-main">
      <Card style={{ maxWidth: 960, margin: "0 auto" }}>
        <div className="ee-split ee-split--sidebar-left">
          <div style={{ borderRight: "1px solid var(--ee-border)", paddingRight: 20 }}>
            <div className="ee-muted ee-small">{EVENT.host}</div>
            <h1 style={{ fontSize: 24, margin: "4px 0 10px" }}>{EVENT.title}</h1>
            <div className="ee-small ee-muted">⏱ {EVENT.duration} min</div>
            <div className="ee-small ee-muted">📹 Web conferencing details provided upon confirmation.</div>
            <div className="ee-small ee-muted" style={{ marginTop: 10 }}>Host time zone: Eastern Time (New York)</div>
            {s.day && s.slot && s.step !== "done" && (
              <div className="ee-small" style={{ marginTop: 14 }} data-testid="selected-summary">
                <div className="ee-strong">{fmt12(convertTime(s.slot, EVENT.hostTz, s.tz).time)} – {fmt12(convertTime(addMin(s.slot, EVENT.duration), EVENT.hostTz, s.tz).time)}</div>
                <div>{dateLabel(s.day, convertTime(s.slot, EVENT.hostTz, s.tz).shift)}</div>
              </div>
            )}
          </div>
          <div>
            {s.step === "done" && s.booking ? (
              <div className="ee-stack">
                <BookingSummary booking={s.booking} hostTz={EVENT.hostTz} />
                <p className="ee-small ee-muted">A calendar invitation has been sent to {s.booking.email}. The host sees this meeting at {fmt12(s.booking.slot)} New York time.</p>
                <Btn variant="secondary" onClick={() => set(seed())}>Book another</Btn>
              </div>
            ) : s.step === "details" ? (
              <div className="ee-stack" data-testid="details-form">
                <h2 style={{ fontSize: 18 }}>Enter details</h2>
                <Field label="Name" htmlFor="inv-name"><Input id="inv-name" value={name} onChange={(e) => setName(e.target.value)} /></Field>
                <Field label="Email" htmlFor="inv-email"><Input id="inv-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
                {err && <Alert tone="err">{err}</Alert>}
                <div className="ee-row">
                  <Btn onClick={confirm} data-testid="schedule-event">Schedule Event</Btn>
                  <Btn variant="secondary" onClick={() => set({ ...s, step: "pick" })}>Back</Btn>
                </div>
              </div>
            ) : (
              <div className="ee-stack">
                <h2 style={{ fontSize: 18 }}>Select a Date &amp; Time</h2>
                <div className="ee-split ee-split--slots">
                  <div className="ee-stack">
                    <Calendar availableDays={AVAILABLE} selected={s.day} onSelect={(d) => set({ ...s, day: d, slot: null })} />
                    <TzPicker value={s.tz} onChange={(tz) => set({ ...s, tz })} />
                  </div>
                  <div>
                    {s.day ? (
                      <>
                        <div className="ee-small ee-strong" style={{ marginBottom: 8 }} data-testid="slots-day">{dateLabel(s.day)}</div>
                        <Slots slots={SLOTS} busy={BUSY[s.day] || []} hostTz={EVENT.hostTz} viewerTz={s.tz} selected={s.slot} onSelect={(slot) => set({ ...s, slot })} />
                        {s.slot && <Btn block style={{ marginTop: 12 }} onClick={() => set({ ...s, step: "details" })} data-testid="slot-next">Next</Btn>}
                      </>
                    ) : (
                      <div className="ee-muted ee-small">Pick a highlighted day to see available times in your time zone.</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </main>
  );
}
function addMin(hhmm, min) {
  const [h, m] = hhmm.split(":").map(Number);
  const t = h * 60 + m + min;
  return `${String(Math.floor(t / 60) % 24).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}
