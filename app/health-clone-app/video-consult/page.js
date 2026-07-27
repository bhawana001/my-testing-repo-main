"use client";

import { useState } from "react";
import HealthHeader from "../HealthHeader";
import HealthFooter from "../HealthFooter";
import ConsultModal from "../ConsultModal";

const SPECIALITIES = [
  { icon: "🤰", h: "Gynaecology", fee: "₹649" },
  { icon: "🛏️", h: "Sexology", fee: "₹649" },
  { icon: "🩺", h: "General physician", fee: "₹799" },
  { icon: "🧴", h: "Dermatology", fee: "₹799" },
  { icon: "🧠", h: "Psychiatry", fee: "₹799" },
  { icon: "🍽️", h: "Stomach and digestion", fee: "₹749" },
];

const CONCERNS = [
  { h: "Cough & Cold?", fee: "₹799", s: "cough cold" },
  { h: "Period problems?", fee: "₹799", s: "period problems" },
  { h: "Performance issues in bed?", fee: "₹849", s: "performance in bed" },
  { h: "Skin problems?", fee: "₹799", s: "skin problems" },
];

const DOCTORS = [
  { n: "Dr. Aastha Jain", s: "Obstetrician · 8 years experience" },
  { n: "Dr. Shalabh Singla", s: "Dermatologist · 9 years experience" },
  { n: "Dr. Hitesh Viradiya", s: "Dermatologist, Cosmetologist · 11 yrs" },
  { n: "Dr. Simoni Sarodia", s: "Dermatologist · 13 years experience" },
];

const BENEFITS = [
  { h: "Consult Top Doctors 24x7", p: "Connect instantly with a 24x7 specialist or choose to video visit a particular doctor." },
  { h: "Convenient and Easy", p: "Start an instant consultation within 2 minutes or do video consultation at scheduled time." },
  { h: "100% Safe Consultations", p: "Be assured that your online consultation will be fully private and secured." },
  { h: "Similar Clinic Experience", p: "Experience clinic-like consultation through a video call with the doctor." },
  { h: "Free Follow-up", p: "Get a valid prescription and a 7-day free follow up for further clarifications." },
  { h: "Verified Doctors", p: "We follow a strict verification process for every doctor providing online consults." },
];

const FAQS = [
  { q: "What is online doctor consultation?", a: "Online doctor consultation or online medical consultation is a method of connecting with a verified doctor over audio/video." },
  { q: "How do I start online consultation with doctors on Practo?", a: "Starting an online consultation with doctors is very simple on Practo. Enter your symptom and mobile number to continue." },
  { q: "Are the doctors online qualified?", a: "We follow a strict verification process for every doctor providing online consultations." },
  { q: "Is online doctor consultation safe and secured on Practo?", a: "The privacy of our patients is critical to us, and thus, we are compliant with data-security standards." },
];

const STATS = [
  { b: "2,00,000+", s: "Happy Users" },
  { b: "20,000+", s: "Verified Doctors" },
  { b: "25+", s: "Specialities" },
  { b: "4.5 / 5", s: "App Rating" },
];

export default function VideoConsult() {
  const [open, setOpen] = useState(false);
  const [seed, setSeed] = useState("");
  const consult = (s = "") => {
    setSeed(s);
    setOpen(true);
  };

  return (
    <>
      <HealthHeader active="Video Consult" />

      <main>
        {/* Hero */}
        <section className="h-vhero">
          <div className="h-container h-wide">
            <div className="h-vhero__grid">
              <div>
                <h1>Skip the travel!<br />Take Online Doctor Consultation</h1>
                <p>Private consultation + Audio call · Starts at just ₹199</p>
                <button className="h-solid-btn" onClick={() => consult()}>
                  Consult Now
                </button>
                <div className="h-vhero__meta">
                  <span>✔ Verified Doctors</span>
                  <span>✔ Digital Prescription</span>
                  <span>✔ Free Followup</span>
                </div>
              </div>
              <div className="h-vhero__img">🧑‍⚕️</div>
            </div>
          </div>
        </section>

        {/* Specialities */}
        <section className="h-section">
          <div className="h-container h-wide">
            <div className="h-section__head">
              <h2>25+ Specialities</h2>
              <button className="h-outline-btn">See all Specialities</button>
            </div>
            <p className="h-section__sub">Consult with top doctors across specialities</p>
            <div className="h-specs">
              {SPECIALITIES.map((s) => (
                <div className="h-spec" key={s.h}>
                  <div className="h-spec__circle">{s.icon}</div>
                  <p>
                    {s.h}
                    <br />
                    <small style={{ color: "#71747f" }}>{s.fee}</small>
                  </p>
                  <button className="h-consult-link" onClick={() => consult(s.h)}>
                    Consult now →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Health Concerns */}
        <section className="h-section">
          <div className="h-container h-wide">
            <h2>Common Health Concerns</h2>
            <p className="h-section__sub">Consult a doctor online for any health issue</p>
            <div className="h-clinic">
              {CONCERNS.map((c) => (
                <div key={c.h} role="button" tabIndex={0} onClick={() => consult(c.s)}>
                  <div className="h-clinic__img">🩹</div>
                  <h4>{c.h}</h4>
                  <p>{c.fee}</p>
                  <button className="h-consult-link">Consult Now →</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Offers */}
        <section className="h-section">
          <div className="h-container h-wide">
            <h2>Offers</h2>
            <div className="h-offers" style={{ marginTop: 16 }}>
              <div className="h-offer g">Download the App &amp; get ₹200 HealthCash</div>
              <div className="h-offer o">Consult with specialists at just ₹199</div>
            </div>
          </div>
        </section>

        {/* Our Doctors */}
        <section className="h-section">
          <div className="h-container h-wide">
            <h2>Our Doctors</h2>
            <div className="h-clinic" style={{ marginTop: 16 }}>
              {DOCTORS.map((d) => (
                <div key={d.n}>
                  <div className="h-clinic__img">🧑‍⚕️</div>
                  <h4>{d.n}</h4>
                  <p>{d.s}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Stats */}
      <section className="h-stats">
        <div className="h-container h-wide">
          <div className="h-stats__grid">
            {STATS.map((s) => (
              <div key={s.s}>
                <b>{s.b}</b>
                <span>{s.s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main>
        {/* Benefits */}
        <section className="h-section">
          <div className="h-container h-wide">
            <h2>Benefits of Online Consultation</h2>
            <div className="h-benefits" style={{ marginTop: 18 }}>
              {BENEFITS.map((b) => (
                <div className="h-benefit" key={b.h}>
                  <h4>
                    <span className="h-check">✔</span>
                    {b.h}
                  </h4>
                  <p>{b.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="h-section">
          <div className="h-container h-wide">
            <h2>FAQs</h2>
            <div style={{ marginTop: 14 }}>
              {FAQS.map((f) => (
                <div className="h-faq" key={f.q}>
                  <h4>{f.q}</h4>
                  <p>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sticky consult CTA */}
        <section className="h-section">
          <div className="h-container h-wide">
            <div
              className="h-offer"
              style={{
                background: "#232733",
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Still delaying your health concerns? Connect with India's top doctors online</span>
              <button className="h-solid-btn" onClick={() => consult()}>
                Consult Now
              </button>
            </div>
          </div>
        </section>
      </main>

      <HealthFooter />

      <ConsultModal open={open} onClose={() => setOpen(false)} initialSymptom={seed} />
    </>
  );
}
