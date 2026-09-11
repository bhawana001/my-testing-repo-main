"use client";
import { useFlowState, storageKey } from "@/lib/state";
import { MobileShell } from "@/app/components/engines/MobileShell";
import { Btn, KV, Badge, Segment } from "@/app/components/eval/ui";
import { money } from "@/lib/seed";

const SHOWS = [{ id: "s1", time: "4:15 PM", price: 250 }, { id: "s2", time: "7:30 PM", price: 320 }, { id: "s3", time: "10:45 PM", price: 280 }];
const ROWS = ["A", "B", "C", "D"]; const COLS = [1, 2, 3, 4, 5, 6];
const TAKEN = new Set(["A3", "A4", "B1", "C5", "D2"]);
const seed = () => ({ show: "s2", seat: null, stage: "seats", locked: null });
export default function Flow({ flow }) {
  const [s, set] = useFlowState(storageKey(flow.entitySlug, flow.slug), seed);
  const show = SHOWS.find((x) => x.id === s.show);
  return (
    <MobileShell flow={flow} title="Movies · Signal Lost" nav={["Home", "Movies", "Events"]}>
      {s.stage === "seats" && (<>
        <div className="ee-small ee-muted">PVR-ish Cinemas, Koramangala · Sun 14 Sep</div>
        <Segment options={SHOWS.map((x) => ({ value: x.id, label: x.time }))} value={s.show} onChange={(v) => set({ ...s, show: v, seat: null })} />
        <div className="ee-tiny ee-muted ee-center">SCREEN THIS WAY</div>
        <div className="ee-stack" style={{ gap: 6 }} data-testid="seat-map">
          {ROWS.map((r) => (
            <div key={r} className="ee-row" style={{ gap: 6, justifyContent: "center" }}>
              <span className="ee-tiny ee-muted" style={{ width: 14 }}>{r}</span>
              {COLS.map((c) => { const id = r + c; const taken = TAKEN.has(id); const sel = s.seat === id; return <button key={id} type="button" disabled={taken} aria-label={`Seat ${id}${taken ? " (taken)" : ""}`} aria-pressed={sel} data-testid={`seat-${id}`} onClick={() => set({ ...s, seat: id })} style={{ width: 34, height: 30, borderRadius: 6, border: "1px solid var(--ee-border)", background: taken ? "var(--ee-border)" : sel ? "var(--ee-accent)" : "var(--ee-surface)", color: sel ? "#fff" : "inherit", fontSize: 11, cursor: taken ? "not-allowed" : "pointer" }}>{c}</button>; })}
            </div>
          ))}
        </div>
        <KV k="Selected" v={s.seat ? `Seat ${s.seat} · ${show.time}` : "—"} testId="selected-seat" />
        <Btn block disabled={!s.seat} onClick={() => set({ ...s, stage: "pay", locked: { seat: s.seat, show: show.time, price: show.price, until: "10:10 AM" } })} data-testid="seat-continue">{s.seat ? `Pay ${money(show.price, "INR")}` : "Select a seat"}</Btn>
      </>)}
      {s.stage === "pay" && s.locked && (<div className="ee-stack" data-testid="payment-page">
        <Badge tone="warn" data-testid="seat-locked">Seat {s.locked.seat} locked for you until {s.locked.until}</Badge>
        <KV k="Movie" v="Signal Lost (U/A)" /><KV k="Show" v={`Sun 14 Sep · ${s.locked.show}`} testId="pay-show" /><KV k="Seat" v={s.locked.seat} testId="pay-seat" />
        <KV k="Ticket price" v={money(s.locked.price, "INR")} /><KV k="Convenience fee" v={money(30, "INR")} /><KV k="Total" v={money(s.locked.price + 30, "INR")} total testId="pay-total" />
        <Btn block data-testid="pay-now">Pay {money(s.locked.price + 30, "INR")} with UPI</Btn>
        <button className="ee-link ee-small" onClick={() => set({ ...s, stage: "seats", locked: null })}>Change seat</button>
      </div>)}
    </MobileShell>
  );
}
