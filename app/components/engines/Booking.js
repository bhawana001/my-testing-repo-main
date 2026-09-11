"use client";
// Booking calendar engine: fixed month (September 2026), deterministic
// availability, slot picking, timezone conversion, confirm / reschedule.
import { useState } from "react";
import { Btn, Card, Select } from "../eval/ui";

export const BOOKING_MONTH = { year: 2026, month: 8, label: "September 2026" }; // month is 0-based
export const TZS = [
  { id: "America/New_York", label: "Eastern Time (New York)", offset: -4 },
  { id: "Europe/London", label: "London (BST)", offset: 1 },
  { id: "Asia/Kolkata", label: "India (IST)", offset: 5.5 },
  { id: "America/Los_Angeles", label: "Pacific Time (Los Angeles)", offset: -7 },
];
export function tzById(id) {
  return TZS.find((t) => t.id === id) || TZS[0];
}
/** Convert "HH:MM" in fromTz to toTz, returning "HH:MM" and a day shift (-1/0/1). */
export function convertTime(hhmm, fromTz, toTz) {
  const [h, m] = hhmm.split(":").map(Number);
  let mins = h * 60 + m + (tzById(toTz).offset - tzById(fromTz).offset) * 60;
  let shift = 0;
  if (mins < 0) { mins += 1440; shift = -1; }
  if (mins >= 1440) { mins -= 1440; shift = 1; }
  return { time: `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`, shift };
}
export function fmt12(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const ap = h >= 12 ? "pm" : "am";
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")}${ap}`;
}
export function dateLabel(day, shift = 0) {
  const d = new Date(Date.UTC(BOOKING_MONTH.year, BOOKING_MONTH.month, day + shift));
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

/**
 * Calendar: availableDays (array of day numbers), selected, onSelect
 */
export function Calendar({ availableDays = [], selected, onSelect, testIdPrefix = "cal" }) {
  const first = new Date(Date.UTC(BOOKING_MONTH.year, BOOKING_MONTH.month, 1)).getUTCDay();
  const daysIn = new Date(Date.UTC(BOOKING_MONTH.year, BOOKING_MONTH.month + 1, 0)).getUTCDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: daysIn }, (_, i) => i + 1)];
  return (
    <div data-testid={testIdPrefix}>
      <div className="ee-row ee-row--between" style={{ marginBottom: 8 }}>
        <span className="ee-strong">{BOOKING_MONTH.label}</span>
      </div>
      <div className="ee-cal">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => <div key={d} className="ee-cal__dow">{d}</div>)}
        {cells.map((d, i) => d === null ? <div key={"e" + i} /> : (
          <button key={d} type="button" className="ee-cal__day" disabled={!availableDays.includes(d)} data-available={availableDays.includes(d) ? "true" : "false"} data-selected={selected === d ? "true" : "false"} onClick={() => onSelect(d)} aria-label={`September ${d}, 2026${availableDays.includes(d) ? "" : " (unavailable)"}`} aria-pressed={selected === d}>
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Slots: slots ["09:00", ...] (host tz), busy [...], viewerTz, hostTz, selected, onSelect */
export function Slots({ slots, busy = [], hostTz, viewerTz, selected, onSelect, testIdPrefix = "slots" }) {
  const free = slots.filter((s) => !busy.includes(s));
  return (
    <div data-testid={testIdPrefix}>
      {free.length === 0 && <div className="ee-empty">No times available on this day.</div>}
      <div className="ee-slots">
        {free.map((s) => {
          const { time } = convertTime(s, hostTz, viewerTz);
          return (
            <button key={s} type="button" className="ee-slot" data-selected={selected === s ? "true" : "false"} onClick={() => onSelect(s)} aria-pressed={selected === s} data-testid={`${testIdPrefix}-${s.replace(":", "")}`}>
              {fmt12(time)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TzPicker({ value, onChange, label = "Time zone" }) {
  return (
    <label className="ee-field">
      <span className="ee-label">{label}</span>
      <Select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label}>
        {TZS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
      </Select>
    </label>
  );
}

export function BookingSummary({ booking, hostTz, testIdPrefix = "booking" }) {
  const v = convertTime(booking.slot, hostTz, booking.tz);
  const h = booking.slot;
  return (
    <Card data-testid={`${testIdPrefix}-summary`}>
      <div className="ee-badge ee-badge--ok" style={{ marginBottom: 8 }}>Confirmed</div>
      <h3 style={{ marginBottom: 8 }}>{booking.title}</h3>
      <div className="ee-small ee-stack" style={{ gap: 4 }}>
        <div data-testid={`${testIdPrefix}-invitee-time`}><b>Your time:</b> {fmt12(v.time)} · {dateLabel(booking.day, v.shift)} ({tzById(booking.tz).label})</div>
        <div data-testid={`${testIdPrefix}-host-time`}><b>Host time:</b> {fmt12(h)} · {dateLabel(booking.day)} ({tzById(hostTz).label})</div>
        <div><b>Duration:</b> {booking.duration} minutes</div>
        {booking.ref && <div><b>Reference:</b> <span className="ee-mono" data-testid={`${testIdPrefix}-ref`}>{booking.ref}</span></div>}
      </div>
    </Card>
  );
}
