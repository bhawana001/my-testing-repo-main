"use client";
// Club account hub: Avions balance, tier progress and the member's trips
// (any booking made with the member's email, including ones booked today).
import Link from "next/link";
import { Header, Footer } from "../../../../../../ui";
import { R, BRAND, airport, prettyDate, tripEnds, useStore } from "../../../../../../shared";

const SILVER_AT = 600;

export default function Account() {
  const [s] = useStore();
  const u = s.user;
  if (!u) {
    return (
      <>
        <Header />
        <div className="bx-wrap bx-page"><h1 className="bx-h1">Please log in</h1><p className="bx-lead">You need to log in to see your account.</p><Link className="bx-btn" href={R.login}>Log in</Link></div>
        <Footer />
      </>
    );
  }
  const trips = s.bookings.filter((b) => b.email === u.email);
  return (
    <>
      <Header />
      <div className="bx-wrap bx-page">
        <h1 className="bx-h1">Welcome back, {u.first}</h1>
        <p className="bx-lead">{BRAND.club} · Membership number {u.number}</p>
        <div className="bx-three">
          <div className="bx-card"><small className="bx-muted">Avions balance</small><div className="bx-total" data-testid="avions">{u.avions.toLocaleString("en-US")}</div></div>
          <div className="bx-card"><small className="bx-muted">Tier</small><div className="bx-total" data-testid="tier">{u.tier}</div></div>
          <div className="bx-card"><small className="bx-muted">Tier points</small><div className="bx-total">{u.tierPoints} / {SILVER_AT}</div><small className="bx-muted">{SILVER_AT - u.tierPoints} more for Silver</small></div>
        </div>
        <div className="bx-card">
          <h2>Your trips</h2>
          {trips.length === 0 ? <p className="bx-muted">No upcoming trips.</p> : (
            <table className="bx-table">
              <thead><tr><th>Booking</th><th>Route</th><th>Departs</th><th /></tr></thead>
              <tbody>{trips.map((b) => (
                <tr key={b.ref} data-testid={`trip-${b.ref}`}>
                  <td>{b.ref}</td>
                  <td>{airport(tripEnds(b.legs).from).city} {tripEnds(b.legs).isReturn ? "⇄" : "→"} {airport(tripEnds(b.legs).to).city}</td>
                  <td>{prettyDate(b.legs[0].date)}</td>
                  <td><Link href={`${R.manage}?ref=${b.ref}&surname=${encodeURIComponent(b.surname)}`}>Manage</Link></td>
                </tr>
              ))}</tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
