"use client";
// Manage My Booking: retrieve a booking by reference + last name, then add
// checked bags (paid) or request special meals. Changes persist, so Check in
// and the Club account show the same bags and meals afterwards.
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header, Footer } from "../../../../ui";
import { R, airport, cabin, family, fmt, prettyDate, findBooking, checkinWindow, tripEnds, EXTRA_BAG, MEALS, useStore } from "../../../../shared";

const MAX_BAGS = 3;

function ManageInner() {
  const p = useSearchParams();
  const [s, update] = useStore();
  const [ref, setRef] = useState(p.get("ref") || "");
  const [surname, setSurname] = useState(p.get("surname") || "");
  const [key, setKey] = useState(null); // { ref, surname } once retrieved
  const [err, setErr] = useState("");
  const [panel, setPanel] = useState(null); // "bags" | "meals"
  const [addBags, setAddBags] = useState({});
  const [meals, setMeals] = useState({});
  const [flash, setFlash] = useState("");

  const b = key ? findBooking(s, key.ref, key.surname) : null;

  useEffect(() => {
    // Arriving from the confirmation page with ?ref=&surname= opens the booking straight away.
    if (p.get("ref") && p.get("surname")) setKey({ ref: p.get("ref"), surname: p.get("surname") });
  }, [p]);

  const retrieve = (e) => {
    e.preventDefault();
    if (!ref.trim() || !surname.trim()) { setErr("Enter your booking reference and last name."); return; }
    if (!findBooking(s, ref, surname)) { setErr("We can't find a booking with those details. Check your booking reference and last name and try again."); return; }
    setErr(""); setFlash(""); setPanel(null);
    setKey({ ref, surname });
  };

  if (!b) {
    return (
      <div className="bx-wrap bx-page">
        <div className="bx-crumb"><Link href={R.home}>Home</Link> › Manage My Booking</div>
        <h1 className="bx-h1">Manage My Booking</h1>
        <p className="bx-lead">Add bags, choose meals and see your itinerary. Your booking reference is 6 characters, for example QX7K4P, and is on your confirmation email.</p>
        <form className="bx-card" style={{ maxWidth: 520 }} onSubmit={retrieve} noValidate>
          <div className="bx-grid">
            <div className="bx-f"><label htmlFor="ref">Booking reference</label><input id="ref" className="bx-in" value={ref} maxLength={6} onChange={(e) => setRef(e.target.value.toUpperCase())} /></div>
            <div className="bx-f"><label htmlFor="surname">Last name</label><input id="surname" className="bx-in" value={surname} onChange={(e) => setSurname(e.target.value)} /></div>
          </div>
          {err && <div className="bx-banner bx-banner--err" role="alert" style={{ marginTop: 14 }}>{err}</div>}
          <div style={{ marginTop: 14 }}><button className="bx-btn" type="submit">Find my booking</button></div>
        </form>
        {key && !b && <p className="bx-err">This booking is no longer available.</p>}
      </div>
    );
  }

  const bagCost = Object.values(addBags).reduce((n, k) => n + k, 0) * EXTRA_BAG;
  const firstOpen = b.legs.find((l) => checkinWindow(l).open);

  const payBags = () => {
    const n = Object.values(addBags).reduce((a, k) => a + k, 0);
    if (!n) return;
    update((d) => ({
      ...d,
      bookings: d.bookings.map((x) => x.ref !== b.ref ? x : {
        ...x,
        passengers: x.passengers.map((pp) => ({ ...pp, bags: pp.bags + (addBags[pp.id] || 0) })),
        payments: [...x.payments, { label: `${n} extra checked bag${n > 1 ? "s" : ""}`, amount: n * EXTRA_BAG }],
      }),
    }));
    setFlash(`Payment of ${fmt(n * EXTRA_BAG)} taken. ${n} extra bag${n > 1 ? "s" : ""} added to your booking.`);
    setAddBags({}); setPanel(null);
  };

  const saveMeals = () => {
    update((d) => ({ ...d, bookings: d.bookings.map((x) => x.ref !== b.ref ? x : { ...x, passengers: x.passengers.map((pp) => ({ ...pp, meal: meals[pp.id] || pp.meal })) }) }));
    setFlash("Your meal request has been saved.");
    setPanel(null);
  };

  return (
    <div className="bx-wrap bx-page" data-testid="booking-view">
      <div className="bx-crumb"><Link href={R.home}>Home</Link> › <button className="bx-linkbtn" onClick={() => setKey(null)}>Manage My Booking</button> › {b.ref}</div>
      <div className="bx-between">
        <div>
          <h1 className="bx-h1">Booking {b.ref}</h1>
          <p className="bx-lead">{airport(tripEnds(b.legs).from).city} to {airport(tripEnds(b.legs).to).city}{tripEnds(b.legs).isReturn ? " and back" : ""} · {cabin(b.cabin).name} {family(b.family).name}</p>
        </div>
        {firstOpen && <Link className="bx-btn" href={`${R.checkin}?ref=${b.ref}&surname=${encodeURIComponent(b.surname)}`}>Check in now</Link>}
      </div>
      {flash && <div className="bx-banner bx-banner--ok" role="status">{flash}</div>}

      <div className="bx-card">
        <h2>Your flights</h2>
        <table className="bx-table">
          <thead><tr><th>Flight</th><th>From</th><th>To</th><th>Date</th><th>Departs</th><th>Arrives</th></tr></thead>
          <tbody>{b.legs.map((l) => (
            <tr key={l.flight + l.date}><td>{l.flight}</td><td>{airport(l.from).city} ({l.from})</td><td>{airport(l.to).city} ({l.to})</td><td>{prettyDate(l.date)}</td><td>{l.dep}</td><td>{l.arr}</td></tr>
          ))}</tbody>
        </table>
      </div>

      <div className="bx-card">
        <h2>Passengers</h2>
        <table className="bx-table">
          <thead><tr><th>Name</th><th>Checked bags</th><th>Meal</th><th>Seat</th><th>Check-in</th></tr></thead>
          <tbody>{b.passengers.map((pp) => (
            <tr key={pp.id} data-testid={`pax-row-${pp.id}`}>
              <td>{pp.title} {pp.first} {pp.last}</td>
              <td>{pp.bags} x 23kg</td>
              <td>{pp.meal}</td>
              <td>{pp.seat || "Not selected"}</td>
              <td>{pp.checkedIn ? <span className="bx-tag bx-tag--ok">Checked in</span> : <span className="bx-tag bx-tag--info">Not checked in</span>}</td>
            </tr>
          ))}</tbody>
        </table>
        <div className="bx-row" style={{ marginTop: 14 }}>
          <button className="bx-btn bx-btn--ghost" onClick={() => { setPanel("bags"); setFlash(""); }}>Add baggage</button>
          <button className="bx-btn bx-btn--ghost" onClick={() => { setPanel("meals"); setFlash(""); setMeals(Object.fromEntries(b.passengers.map((pp) => [pp.id, pp.meal]))); }}>Request a special meal</button>
        </div>
      </div>

      {panel === "bags" && (
        <div className="bx-card" aria-label="Add baggage">
          <h2>Add checked baggage</h2>
          <p className="bx-small bx-muted">Each extra bag is up to 23kg and costs {fmt(EXTRA_BAG)} for the whole journey. Up to {MAX_BAGS} checked bags per passenger.</p>
          {b.passengers.map((pp) => {
            const extra = addBags[pp.id] || 0;
            return (
              <div className="bx-pax__row" key={pp.id} style={{ borderBottom: "1px solid #e3e6eb" }}>
                <div>{pp.first} {pp.last}<small>Currently {pp.bags} bag{pp.bags === 1 ? "" : "s"}</small></div>
                <div className="bx-step">
                  <button aria-label={`Remove bag for ${pp.first}`} disabled={!extra} onClick={() => setAddBags((a) => ({ ...a, [pp.id]: extra - 1 }))}>−</button>
                  <span data-testid={`extra-bags-${pp.id}`}>{extra}</span>
                  <button aria-label={`Add bag for ${pp.first}`} disabled={pp.bags + extra >= MAX_BAGS} onClick={() => setAddBags((a) => ({ ...a, [pp.id]: extra + 1 }))}>+</button>
                </div>
              </div>
            );
          })}
          <div className="bx-between" style={{ marginTop: 14 }}>
            <div>Total to pay <div className="bx-total" data-testid="bag-total">{fmt(bagCost)}</div><span className="bx-small bx-muted">Charged to the card used for this booking (Visa ending 1111).</span></div>
            <div className="bx-row"><button className="bx-btn bx-btn--ghost" onClick={() => setPanel(null)}>Cancel</button><button className="bx-btn" disabled={!bagCost} onClick={payBags}>Pay {fmt(bagCost)}</button></div>
          </div>
        </div>
      )}

      {panel === "meals" && (
        <div className="bx-card" aria-label="Special meals">
          <h2>Request a special meal</h2>
          {b.passengers.map((pp) => (
            <div className="bx-f" key={pp.id} style={{ maxWidth: 360, marginBottom: 10 }}>
              <label htmlFor={`meal-${pp.id}`}>Meal for {pp.first} {pp.last}</label>
              <select id={`meal-${pp.id}`} className="bx-in" value={meals[pp.id] || pp.meal} onChange={(e) => setMeals((m) => ({ ...m, [pp.id]: e.target.value }))}>
                {MEALS.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
          ))}
          <div className="bx-row"><button className="bx-btn bx-btn--ghost" onClick={() => setPanel(null)}>Cancel</button><button className="bx-btn" onClick={saveMeals}>Save meal request</button></div>
        </div>
      )}

      <div className="bx-card">
        <h2>Payments</h2>
        <table className="bx-table"><tbody>
          {b.payments.map((x, i) => <tr key={i}><td>{x.label}</td><td style={{ textAlign: "right" }}>{fmt(x.amount)}</td></tr>)}
          <tr><td><b>Total paid</b></td><td style={{ textAlign: "right" }} data-testid="payments-total"><b>{fmt(b.payments.reduce((n, x) => n + x.amount, 0))}</b></td></tr>
        </tbody></table>
      </div>
    </div>
  );
}

export default function Manage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="bx-wrap bx-page">Loading…</div>}><ManageInner /></Suspense>
      <Footer />
    </>
  );
}
