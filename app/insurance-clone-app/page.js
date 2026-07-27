"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import InsHeader from "./InsHeader";
import InsFooter from "./InsFooter";
import { BASE } from "./lib";

const POPULAR = [
  { key: "auto", label: "Auto", ic: "🚗" },
  { key: "homeowners", label: "Homeowners", ic: "🏠" },
  { key: "renters", label: "Renters", ic: "🏢" },
  { key: "motorcycle", label: "Motorcycle/ Off-Road", ic: "🏍️" },
  { key: "boat", label: "Boat", ic: "⛵" },
  { key: "commercial", label: "Commercial Auto/Business", ic: "🚚" },
];
const ADDITIONAL = [
  { key: "life", label: "Life", ic: "❤️" },
  { key: "umbrella", label: "Umbrella", ic: "☂️" },
  { key: "travel", label: "Travel", ic: "🧳" },
  { key: "pet", label: "Pet", ic: "🐾" },
  { key: "jewelry", label: "Jewelry", ic: "💍" },
  { key: "flood", label: "Flood", ic: "🌊" },
];
const ACCESS = [
  { label: "Log In to Your Policy", href: `${BASE}/login` },
  { label: "Report a Claim", href: `${BASE}/claim` },
  { label: "Track a Claim", href: `${BASE}/claim` },
  { label: "Request Roadside Assistance", href: `${BASE}/claim` },
];
const NEEDS = [
  { h: "Vehicle Insurance", p: "Whether you're on the road, the trail, or the water we're here to help you get the insurance you need.", ic: "🚗", href: `${BASE}/auto` },
  { h: "Property Insurance", p: "We can help with insurance for your home and belongings whether you own or rent.", ic: "🏠", href: `${BASE}/auto` },
  { h: "Business Insurance", p: "Business insurance can be tricky. Finding the right protection doesn't have to be.", ic: "🏢", href: `${BASE}/auto` },
  { h: "Additional Insurance", p: "Protect more of what you love — life, umbrella, travel, overseas, pet, and more.", ic: "🛡️", href: `${BASE}/auto` },
];

export default function InsuranceHome() {
  const [tab, setTab] = useState("popular");
  const [selected, setSelected] = useState(null);
  const router = useRouter();
  const tiles = tab === "popular" ? POPULAR : ADDITIONAL;

  function startQuote(key) {
    setSelected(key);
    router.push(`${BASE}/quote?product=${key}`);
  }

  return (
    <>
      <InsHeader />

      <section className="ins-hero">
        <div className="ins-container ins-hero__grid">
          <div>
            <h1>
              Savings you expect.
              <span className="accent">Protection you deserve.</span>
            </h1>
            <div className="ins-bundle">
              <h3>🛡️ Bundle &amp; Save</h3>
              <p>Bundle your insurance with {""}SafeGuard and you could save!</p>
              <Link href={`${BASE}/quote?product=bundle`}>Build My Bundle →</Link>
            </div>
          </div>

          <div className="ins-quote">
            <h3>Start your quote today.</h3>
            <div className="ins-quote__tabs">
              <div
                className={"ins-quote__tab" + (tab === "popular" ? " is-active" : "")}
                onClick={() => setTab("popular")}
              >
                Popular
              </div>
              <div
                className={"ins-quote__tab" + (tab === "additional" ? " is-active" : "")}
                onClick={() => setTab("additional")}
              >
                Additional Products
              </div>
            </div>
            <div className="ins-quote__grid">
              {tiles.map((t) => (
                <div
                  key={t.key}
                  className={"ins-prod" + (selected === t.key ? " is-selected" : "")}
                  onClick={() => startQuote(t.key)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="ic">{t.ic}</div>
                  <span>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="ins-container">
        <div className="ins-access">
          <div className="ins-access__photo">🧑‍🔧</div>
          <div>
            <h3>Get Instant Access to Claims and Your Policy</h3>
            <div className="ins-linklist">
              {ACCESS.map((a) => (
                <Link key={a.label} href={a.href} className="ins-linkrow">
                  <span>{a.label}</span>
                  <span>›</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <section className="ins-section">
          <div className="ins-section__eyebrow">Insurance for Your Everyday Needs</div>
          <h2>Customized to fit you.</h2>
          <div className="ins-cards2">
            {NEEDS.map((n) => (
              <div className="ins-needcard" key={n.h}>
                <div className="ins-needcard__img">{n.ic}</div>
                <div className="ins-needcard__body">
                  <h4>{n.h}</h4>
                  <p>{n.p}</p>
                  <Link href={n.href} className="ins-btn ins-btn--outline">
                    {n.h}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="ins-stats">
          <div>
            <b>85</b>
            <span>Years of Experience</span>
          </div>
          <div>
            <b>$900+</b>
            <span>Average Annual Savings*</span>
          </div>
          <div>
            <b>97%</b>
            <span>Customer Satisfaction Rating*</span>
          </div>
        </div>

        <div className="ins-appband">
          <div>
            <div className="ins-section__eyebrow">The #1 Rated Insurance App</div>
            <h2>The SafeGuard Mobile app gives you peace of mind at your fingertips.</h2>
            <ul>
              <li>Get ID cards</li>
              <li>Call for roadside assistance</li>
              <li>File a claim</li>
              <li>Pay your bill</li>
            </ul>
            <button className="ins-btn ins-btn--primary">Download Now</button>
          </div>
          <div className="ins-phone">📱</div>
        </div>
      </div>

      <InsFooter />
    </>
  );
}
