"use client";
import Link from "next/link";
import { Header, Footer } from "../../../../ui";
import { R, DESTINATIONS, DEST_BASE, img, fmt, useStore } from "../../../../shared";

export default function Offers() {
  useStore();
  return (
    <>
      <Header />
      <div className="bx-wrap bx-page">
        <div className="bx-crumb"><Link href={R.home}>Home</Link> › Offers</div>
        <h1 className="bx-h1">Flight offers from India</h1>
        <p className="bx-lead">Return fares from New Delhi, including taxes and charges. Prices change with demand.</p>
        <div className="bx-offers">
          {DESTINATIONS.map((o) => (
            <Link key={o.code} href={R.dest(o)} className="bx-offer">
              <img src={img(o.img, 500)} alt={o.name} />
              <div><b>{o.name} flights</b><span className="p">{fmt(DEST_BASE[o.code])}</span><small>Return, from New Delhi, {o.month}</small></div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
