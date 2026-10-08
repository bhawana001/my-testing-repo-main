"use client";
// Destination page, e.g. /content/en/in/flights/england/london — the page the
// home hero and the offer cards link to, with the search pre-set to that city.
import { use } from "react";
import Link from "next/link";
import { Header, Footer, SearchWidget } from "../../../../../../ui";
import { R, destByPath, img, fmt, DEST_BASE, searchFlights, useStore } from "../../../../../../shared";

export default function Destination({ params }) {
  const { country, city } = use(params);
  useStore();
  const d = destByPath(country, city);
  if (!d) {
    return (
      <>
        <Header />
        <div className="bx-wrap bx-page"><h1 className="bx-h1">Page not found</h1><p className="bx-lead">We don't have a page for that destination.</p><Link className="bx-btn" href={R.offers}>See all destinations</Link></div>
        <Footer />
      </>
    );
  }
  const direct = searchFlights("DEL", d.code)[0];
  const cname = country[0].toUpperCase() + country.slice(1);
  return (
    <>
      <Header />
      <div className="bx-wrap">
        <div className="bx-dest-hero" style={{ backgroundImage: `url(${img(d.img, 1600)})` }} />
        <div className="bx-dest-body">
          <div className="bx-crumb"><Link href={R.offers}>← {cname}</Link></div>
          <h1>Flights to {d.name}</h1>
          <p>{d.blurb}</p>
          <div className="bx-three" style={{ margin: "18px 0" }}>
            <div className="bx-card" style={{ margin: 0 }}><small className="bx-muted">Return flights from New Delhi</small><div className="bx-total" data-testid="dest-from-price">from {fmt(DEST_BASE[d.code])}</div><small className="bx-muted">Economy, {d.month}</small></div>
            <div className="bx-card" style={{ margin: 0 }}><small className="bx-muted">Flight time</small><div className="bx-total">{direct ? direct.duration : "—"}</div><small className="bx-muted">{direct && direct.stops === 0 ? "Direct from Delhi and Mumbai" : "Connect through London Heathrow"}</small></div>
            <div className="bx-card" style={{ margin: 0 }}><small className="bx-muted">Airport</small><div className="bx-total">{d.code}</div><small className="bx-muted">Free hand baggage on every fare</small></div>
          </div>
          <h2 className="bx-sec-h">Search flights to {d.name}</h2>
          <SearchWidget defaultTo={d.code} />
        </div>
      </div>
      <div style={{ height: 50 }} />
      <Footer />
    </>
  );
}
