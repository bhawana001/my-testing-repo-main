"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { Card, Toggle, Badge, KV } from "@/app/components/eval/ui";
import { Calendar, Slots, dateLabel } from "@/app/components/engines/Booking";

// Rules: Mon–Fri 9:00–17:00 ET, 30-min slots, synced calendar busy blocks excluded.
const ALL = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];
const BUSY = { 15: [{ from: "10:00", to: "11:30", title: "Dentist" }], 16: [{ from: "13:00", to: "14:00", title: "Team lunch" }], 17: [{ from: "09:00", to: "17:00", title: "Offsite (all day)" }] };
const inBusy = (d, t) => (BUSY[d] || []).some((b) => t >= b.from && t < b.to);
const WEEKDAYS = [14, 15, 16, 17, 18, 21, 22, 23, 24, 25];
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), () => ({ day: null, showBusy: false }));
  const avail = WEEKDAYS.filter((d) => ALL.some((t) => !inBusy(d, t)));
  const blocked = s.day ? ALL.filter((t) => inBusy(s.day, t)) : [];
  return (
    <main className="ee-main">
      <Card style={{ maxWidth: 960, margin: "0 auto" }}>
        <div className="ee-row ee-row--between" style={{ marginBottom: 12 }}><div><div className="ee-small ee-muted">Priya Nair</div><h1 style={{ fontSize: 22 }}>30 Minute Meeting</h1><div className="ee-tiny ee-muted">Availability: Mon–Fri, 9:00am–5:00pm Eastern · synced calendar conflicts are hidden</div></div><label className="ee-row ee-small">Show host's busy times <Toggle checked={s.showBusy} label="Show host's busy times" onChange={(v) => set({ ...s, showBusy: v })} /></label></div>
        <div className="ee-split ee-split--slots">
          <div><Calendar availableDays={avail} selected={s.day} onSelect={(d) => set({ ...s, day: d })} /><div className="ee-tiny ee-muted" style={{ marginTop: 6 }} data-testid="weekend-note">Weekends and Sep 17 (all-day offsite) are unavailable.</div></div>
          <div>{s.day ? (<>
            <div className="ee-small ee-strong" style={{ marginBottom: 8 }} data-testid="slots-day">{dateLabel(s.day)}</div>
            <Slots slots={ALL} busy={blocked} hostTz="America/New_York" viewerTz="America/New_York" selected={null} onSelect={() => {}} />
            <div className="ee-tiny ee-muted" style={{ marginTop: 8 }} data-testid="slot-count">{ALL.length - blocked.length} of {ALL.length} times available</div>
            {s.showBusy && <Card tight style={{ marginTop: 10 }} data-testid="busy-list"><div className="ee-strong ee-small">Host busy blocks</div>{(BUSY[s.day] || []).length === 0 ? <div className="ee-tiny ee-muted">None</div> : BUSY[s.day].map((b) => <KV key={b.from} k={b.title} v={`${b.from}–${b.to}`} />)}</Card>}
          </>) : <div className="ee-small ee-muted">Select a day.</div>}</div>
        </div>
      </Card>
    </main>
  );
}
