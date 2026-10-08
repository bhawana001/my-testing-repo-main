"use client";
// Home page: hero offer carousel, flight search, quick links to Manage / Check
// in / Flight status, best offers, the explore mosaic and the journey promos.
import { useState } from "react";
import Link from "next/link";
import { Header, Footer, SearchWidget } from "../../../../ui";
import { R, DESTINATIONS, IMG, img, fmt, DEST_BASE, useStore } from "../../../../shared";

// "From" price on each card is the published return Economy fare from New Delhi.
const offerPrice = (d) => DEST_BASE[d.code];

export default function Home() {
  useStore(); // honours ?reset=true on the landing page
  const slides = DESTINATIONS.slice(0, 3);
  const [i, setI] = useState(0);
  const d = slides[i];
  const go = (n) => setI((i + n + slides.length) % slides.length);

  return (
    <>
      <div className="bx-hero" style={{ backgroundImage: `url(${img(d.img, 1800)})` }}>
        <Header over />
        <div className="bx-hero__card" data-testid="hero-offer">
          <div className="k">Discover the wonder of</div>
          <h1>{d.name}</h1>
          <div className="bx-hero__row">
            <div>
              <div className="bx-small">{d.name} flights from</div>
              <Link href={R.dest(d)} className="bx-hero__price" style={{ color: "#fff" }}>{fmt(offerPrice(d))}</Link>
              <div className="bx-hero__fine">Return, from New Delhi, {d.month}</div>
            </div>
            <Link href={R.dest(d)} className="bx-btn">Search {d.name} flights</Link>
          </div>
        </div>
        <div className="bx-hero__ctl">
          <button className="bx-arrow" aria-label="Previous offer" onClick={() => go(-1)}>←</button>
          <div className="bx-dots">{slides.map((s, k) => <span key={s.code} data-on={k === i ? "true" : "false"} />)}</div>
          <button className="bx-arrow" aria-label="Next offer" onClick={() => go(1)}>→</button>
        </div>
      </div>

      <div className="bx-wrap">
        <SearchWidget lift />
        <div className="bx-inspire">
          Need inspiration?
          <div><Link href={R.offers}>Find your next adventure ↗</Link><Link href={R.offers}>Book using a voucher or promotional code →</Link></div>
        </div>
        <div className="bx-quick">
          <Link href={R.manage}>🗎 Manage booking</Link>
          <Link href={R.checkin}>🎫 Check in</Link>
          <Link href={R.status}>🛫 See flight status</Link>
        </div>

        <h2 className="bx-sec-h">Take your pick from our best offers</h2>
        <div className="bx-offers">
          {DESTINATIONS.map((o) => (
            <Link key={o.code} href={R.dest(o)} className="bx-offer" data-testid={`offer-${o.city}`}>
              <img src={img(o.img, 500)} alt={o.name} />
              <div>
                <b>{o.name} flights</b>
                <span className="p">{fmt(offerPrice(o))}</span>
                <small>Return, from New Delhi, {o.month}</small>
              </div>
            </Link>
          ))}
        </div>
        <p className="bx-fine">Terms and Conditions apply</p>
      </div>

      <section className="bx-explore">
        <div className="bx-wrap bx-explore__in">
          <div className="bx-explore__title"><small>The world is yours</small><h2>to explore</h2></div>
          <div className="bx-col">
            <Link href={R.help} className="bx-tile" style={{ height: 200, backgroundImage: `url(${img(IMG.lounge, 500)})` }}><span>Our lounges</span></Link>
            <Link href={R.help} className="bx-tile" style={{ height: 260, backgroundImage: `url(${img(IMG.window, 500)})` }}><span>The Britannic experience</span></Link>
          </div>
          <div className="bx-col" style={{ marginTop: -16 }}>
            <Link href={R.help} className="bx-tile" style={{ height: 258, backgroundImage: `url(${img(IMG.wing, 500)})` }}><span>Britannic Better World</span></Link>
            <Link href={R.help} className="bx-tile" style={{ height: 200, backgroundImage: `url(${img(IMG.cabin, 500)})` }}><span>Our cabins</span></Link>
          </div>
          <div className="bx-col">
            <Link href={R.offers} className="bx-tile" style={{ height: 200, backgroundImage: `url(${img(IMG.barcelona, 500)})` }}><span>New routes</span></Link>
            <Link href={R.offers} className="bx-tile" style={{ height: 260, backgroundImage: `url(${img(IMG.street, 500)})` }}><span>Where we fly</span></Link>
          </div>
        </div>
      </section>

      <section className="bx-journey">
        <div className="bx-wrap">
          <div className="bx-journey__h"><small>With you every step</small><h2>of the journey</h2></div>
          <div className="bx-promo">
            <div className="bx-cardart">IndusLand Bank · Britannic<b>VISA</b></div>
            <div>
              <h3>Collect 20,000 bonus Avions as a warm welcome</h3>
              <p>Apply for the IndusLand Bank Avions Infinite Credit Card and you'll also collect 6 Avions for every INR 200 spent. Ready for your next travel adventure? T&Cs apply.</p>
              <Link href={R.login}>Apply now →</Link>
            </div>
          </div>
          <div className="bx-trio">
            <div><div className="pic" style={{ backgroundImage: `url(${img(IMG.landing, 200)})` }} /><div className="body"><h3>Before you fly</h3><p>Check your baggage allowance, entry requirements and discover additional services to help your trip go smoothly.</p><Link href={R.help}>Plan your journey →</Link></div></div>
            <div><div className="pic" style={{ background: "#3b3fa0", color: "#fff", display: "grid", placeItems: "center", fontSize: 14 }}>IndiGlo</div><div className="body"><h3>IndiGlo</h3><p>Travel to 26 destinations in India on Britannic codeshare flights operated by our partner IndiGlo.</p><Link href={R.offers}>Find out more →</Link></div></div>
            <div><div className="pic" style={{ backgroundImage: `url(${img(IMG.board, 200)})` }} /><div className="body"><h3>If you need to contact us</h3><p>We're always here to help. Our friendly Customer Services team are on hand to answer all of your queries.</p><Link href={R.help}>How to contact us →</Link></div></div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
