"use client";
// Online check-in. Opens 24 hours before departure on the pinned clock, so
// QX7K4P (BX142, tomorrow 02:35) can check in and LM2R9D (20 Oct) cannot.
// Steps: passengers -> passport -> seats -> dangerous goods -> boarding pass.
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header, Footer } from "../../../../ui";
import { R, airport, prettyDate, addDays, findBooking, checkinWindow, SEAT_ROWS, SEAT_COLS, TAKEN, useStore } from "../../../../shared";

const NATIONALITIES = ["Indian", "British", "American", "Canadian", "Australian", "French"];
const boardTime = (dep) => {
  const [h, m] = dep.split(":").map(Number);
  const t = (h * 60 + m - 45 + 1440) % 1440;
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
};
const opensAt = (leg) => `${leg.dep} on ${prettyDate(addDays(leg.date, -1))}`;

function CheckinInner() {
  const p = useSearchParams();
  const [s, update] = useStore();
  const [ref, setRef] = useState(p.get("ref") || "");
  const [surname, setSurname] = useState(p.get("surname") || "");
  const [key, setKey] = useState(null);
  const [err, setErr] = useState("");
  const [step, setStep] = useState("pax");
  const [picked, setPicked] = useState([]);
  const [docs, setDocs] = useState({});
  const [docErr, setDocErr] = useState({});
  const [seats, setSeats] = useState({});
  const [seatFor, setSeatFor] = useState(null);
  const [dg, setDg] = useState(false);

  useEffect(() => {
    if (p.get("ref") && p.get("surname")) setKey({ ref: p.get("ref"), surname: p.get("surname") });
  }, [p]);

  const b = key ? findBooking(s, key.ref, key.surname) : null;

  const retrieve = (e) => {
    e.preventDefault();
    if (!ref.trim() || !surname.trim()) { setErr("Enter your booking reference and last name."); return; }
    if (!findBooking(s, ref, surname)) { setErr("We can't find a booking with those details. Check your booking reference and last name and try again."); return; }
    setErr(""); setStep("pax"); setPicked([]); setSeats({}); setDocs({}); setDg(false);
    setKey({ ref, surname });
  };

  if (!b) {
    return (
      <div className="bx-wrap bx-page">
        <div className="bx-crumb"><Link href={R.home}>Home</Link> › Check in</div>
        <h1 className="bx-h1">Check in online</h1>
        <p className="bx-lead">Online check-in opens 24 hours before departure and closes 60 minutes before. You'll choose your seat for free and get a mobile boarding pass.</p>
        <form className="bx-card" style={{ maxWidth: 520 }} onSubmit={retrieve} noValidate>
          <div className="bx-grid">
            <div className="bx-f"><label htmlFor="ref">Booking reference</label><input id="ref" className="bx-in" maxLength={6} value={ref} onChange={(e) => setRef(e.target.value.toUpperCase())} /></div>
            <div className="bx-f"><label htmlFor="surname">Last name</label><input id="surname" className="bx-in" value={surname} onChange={(e) => setSurname(e.target.value)} /></div>
          </div>
          {err && <div className="bx-banner bx-banner--err" role="alert" style={{ marginTop: 14 }}>{err}</div>}
          <div style={{ marginTop: 14 }}><button className="bx-btn" type="submit">Find my booking</button></div>
        </form>
      </div>
    );
  }

  const leg = b.legs.find((l) => checkinWindow(l).open);
  const header = (
    <>
      <div className="bx-crumb"><Link href={R.home}>Home</Link> › <button className="bx-linkbtn" onClick={() => setKey(null)}>Check in</button> › {b.ref}</div>
      <h1 className="bx-h1">Check in · {b.ref}</h1>
    </>
  );

  if (!leg) {
    const next = b.legs.find((l) => checkinWindow(l).minsUntil > 1440);
    return (
      <div className="bx-wrap bx-page">
        {header}
        <div className="bx-banner bx-banner--warn" role="status" data-testid="checkin-closed">
          {next
            ? <>Check-in for {next.flight} on {prettyDate(next.date)} isn't open yet. It opens 24 hours before departure, at {opensAt(next)}.</>
            : <>Online check-in has closed for this booking. Please go to the airport check-in desk.</>}
        </div>
        <Link className="bx-btn bx-btn--ghost" href={`${R.manage}?ref=${b.ref}&surname=${encodeURIComponent(b.surname)}`}>Go to Manage My Booking</Link>
      </div>
    );
  }

  const done = b.passengers.filter((pp) => pp.checkedIn);
  if (step === "pass" || (done.length && done.length === b.passengers.length)) {
    return (
      <div className="bx-wrap bx-page">
        {header}
        <div className="bx-banner bx-banner--ok" role="status">You're checked in for {leg.flight}. Show your boarding pass at security and the gate.</div>
        <div style={{ display: "grid", gap: 16 }}>
          {done.map((pp, k) => (
            <div className="bx-pass" key={pp.id} data-testid={`boarding-pass-${pp.id}`}>
              <div className="bx-pass__top"><span>BRITANNIC AIRWAYS · Boarding pass</span><span>{leg.flight}</span></div>
              <div className="bx-pass__body">
                <div style={{ gridColumn: "1 / -1" }}><small>Passenger</small><b>{pp.title} {pp.first} {pp.last}</b></div>
                <div><small>From</small><b>{airport(leg.from).city} ({leg.from})</b></div>
                <div><small>To</small><b>{airport(leg.to).city} ({leg.to})</b></div>
                <div><small>Date</small><b>{prettyDate(leg.date)}</b></div>
                <div><small>Departs</small><b>{leg.dep}</b></div>
                <div><small>Boarding</small><b>{boardTime(leg.dep)}</b></div>
                <div><small>Gate</small><b>{leg.gate}</b></div>
                <div><small>Seat</small><b data-testid={`pass-seat-${pp.id}`}>{pp.seat}</b></div>
                <div><small>Group</small><b>4</b></div>
                <div><small>Seq</small><b>{String(41 + k * 3).padStart(3, "0")}</b></div>
              </div>
              <div className="bx-barcode" aria-hidden="true" />
            </div>
          ))}
        </div>
        {done.length < b.passengers.length && <button className="bx-btn" style={{ marginTop: 16 }} onClick={() => { setStep("pax"); setPicked([]); }}>Check in another passenger</button>}
      </div>
    );
  }

  const pending = b.passengers.filter((pp) => !pp.checkedIn);
  const chosen = pending.filter((pp) => picked.includes(pp.id));
  const taken = new Set([...TAKEN, ...b.passengers.map((pp) => pp.seat).filter(Boolean)]);

  const submitDocs = (e) => {
    e.preventDefault();
    const x = {};
    chosen.forEach((pp) => {
      const d = docs[pp.id] || {};
      if (!/^[A-Z0-9]{8,9}$/.test((d.number || "").toUpperCase())) x[pp.id + "n"] = "Passport numbers are 8 or 9 letters and numbers";
      if (!d.nationality) x[pp.id + "c"] = "Choose a nationality";
      if (!d.expiry) x[pp.id + "e"] = "Enter the expiry date";
      else if (d.expiry < addDays(b.legs[b.legs.length - 1].date, 180)) x[pp.id + "e"] = "Your passport must be valid for at least 6 months after your trip";
    });
    setDocErr(x);
    if (!Object.keys(x).length) { setStep("seats"); setSeatFor(chosen[0].id); }
  };

  const finish = () => {
    update((d) => ({
      ...d,
      bookings: d.bookings.map((x) => x.ref !== b.ref ? x : {
        ...x,
        passengers: x.passengers.map((pp) => picked.includes(pp.id)
          ? { ...pp, checkedIn: true, seat: seats[pp.id], passport: { ...docs[pp.id], number: docs[pp.id].number.toUpperCase() } }
          : pp),
      }),
    }));
    setStep("pass");
  };

  return (
    <div className="bx-wrap bx-page">
      {header}
      <p className="bx-lead">{leg.flight} · {airport(leg.from).city} to {airport(leg.to).city} · {prettyDate(leg.date)} at {leg.dep}</p>
      <div className="bx-steps">{[["pax", "Passengers"], ["docs", "Passport"], ["seats", "Seats"], ["dg", "Safety"]].map(([k, t]) => <span key={k} data-on={step === k ? "true" : "false"}>{t}</span>)}</div>

      {step === "pax" && (
        <div className="bx-card">
          <h2>Who is checking in?</h2>
          {done.length > 0 && <p className="bx-small">{done.map((pp) => pp.first).join(", ")} already checked in. <button className="bx-linkbtn" onClick={() => setStep("pass")}>View boarding passes</button></p>}
          {pending.map((pp) => (
            <label key={pp.id} className="bx-row" style={{ padding: "8px 0", cursor: "pointer" }}>
              <input type="checkbox" checked={picked.includes(pp.id)} onChange={(e) => setPicked((l) => e.target.checked ? [...l, pp.id] : l.filter((x) => x !== pp.id))} />
              {pp.title} {pp.first} {pp.last}
            </label>
          ))}
          <button className="bx-btn" style={{ marginTop: 10 }} disabled={!chosen.length} onClick={() => setStep("docs")}>Continue</button>
        </div>
      )}

      {step === "docs" && (
        <form onSubmit={submitDocs} noValidate>
          {chosen.map((pp) => {
            const d = docs[pp.id] || {};
            const set = (k, v) => setDocs((all) => ({ ...all, [pp.id]: { ...d, [k]: v } }));
            return (
              <div className="bx-card" key={pp.id}>
                <h2>Passport for {pp.first} {pp.last}</h2>
                <div className="bx-three">
                  <div className="bx-f"><label htmlFor={`pn-${pp.id}`}>Passport number</label><input id={`pn-${pp.id}`} className="bx-in" value={d.number || ""} onChange={(e) => set("number", e.target.value)} />{docErr[pp.id + "n"] && <div className="bx-err">{docErr[pp.id + "n"]}</div>}</div>
                  <div className="bx-f"><label htmlFor={`pc-${pp.id}`}>Nationality</label><select id={`pc-${pp.id}`} className="bx-in" value={d.nationality || ""} onChange={(e) => set("nationality", e.target.value)}><option value="">Select</option>{NATIONALITIES.map((n) => <option key={n}>{n}</option>)}</select>{docErr[pp.id + "c"] && <div className="bx-err">{docErr[pp.id + "c"]}</div>}</div>
                  <div className="bx-f"><label htmlFor={`pe-${pp.id}`}>Expiry date</label><input id={`pe-${pp.id}`} type="date" className="bx-in" defaultValue="" onChange={(e) => set("expiry", e.target.value)} />{docErr[pp.id + "e"] && <div className="bx-err">{docErr[pp.id + "e"]}</div>}</div>
                </div>
              </div>
            );
          })}
          <div className="bx-between"><button type="button" className="bx-btn bx-btn--ghost" onClick={() => setStep("pax")}>Back</button><button type="submit" className="bx-btn">Continue to seats</button></div>
        </form>
      )}

      {step === "seats" && (
        <div className="bx-card">
          <h2>Choose your seats</h2>
          <p className="bx-small bx-muted">Seat selection is free once check-in opens. Economy, rows 30-41.</p>
          <div className="bx-row" style={{ marginBottom: 10 }}>
            {chosen.map((pp) => (
              <button key={pp.id} className={"bx-btn" + (seatFor === pp.id ? "" : " bx-btn--ghost")} onClick={() => setSeatFor(pp.id)}>
                {pp.first}: {seats[pp.id] || "no seat"}
              </button>
            ))}
          </div>
          <div className="bx-legend"><span><i />Available</span><span><i style={{ background: "#d9dde3", borderColor: "#d9dde3" }} />Taken</span><span><i style={{ background: "var(--navy)", borderColor: "var(--navy)" }} />Selected</span></div>
          <div style={{ overflowX: "auto" }}>
            <div className="bx-seatmap" role="grid" aria-label="Seat map">
              <span />{SEAT_COLS.map((c, i) => <span key={i} className="ch">{c}</span>)}
              {SEAT_ROWS.map((r) => (
                <div key={r} style={{ display: "contents" }}>
                  <span className="rn">{r}</span>
                  {SEAT_COLS.map((c, i) => {
                    if (!c) return <span key={i} />;
                    const id = `${r}${c}`;
                    const mine = Object.entries(seats).find(([, v]) => v === id);
                    return (
                      <button key={i} className="bx-seat" aria-label={`Seat ${id}`} disabled={taken.has(id) || (mine && mine[0] !== seatFor)}
                        data-on={mine ? "true" : "false"} onClick={() => setSeats((x) => ({ ...x, [seatFor]: id }))}>{id}</button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="bx-between" style={{ marginTop: 14 }}>
            <button className="bx-btn bx-btn--ghost" onClick={() => setStep("docs")}>Back</button>
            <button className="bx-btn" disabled={chosen.some((pp) => !seats[pp.id])} onClick={() => setStep("dg")}>Continue</button>
          </div>
        </div>
      )}

      {step === "dg" && (
        <div className="bx-card">
          <h2>Dangerous goods</h2>
          <p>For safety, you can't carry items such as gas canisters, flammable liquids, fireworks or spare lithium batteries in checked baggage.</p>
          <label className="bx-row" style={{ cursor: "pointer", margin: "10px 0 16px" }}>
            <input type="checkbox" checked={dg} onChange={(e) => setDg(e.target.checked)} />
            I confirm that no one in my party is carrying dangerous goods
          </label>
          <div className="bx-between">
            <button className="bx-btn bx-btn--ghost" onClick={() => setStep("seats")}>Back</button>
            <button className="bx-btn" disabled={!dg} onClick={finish}>Check in</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Checkin() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="bx-wrap bx-page">Loading…</div>}><CheckinInner /></Suspense>
      <Footer />
    </>
  );
}
