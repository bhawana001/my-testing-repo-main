"use client";

import { useState } from "react";
import HealthHeader from "./HealthHeader";
import HealthFooter from "./HealthFooter";
import ConsultModal from "./ConsultModal";

const CATS = [
  { icon: "📱", title: "Instant Video Consultation", sub: "Connect within 60 secs", c: "c1" },
  { icon: "👩‍⚕️", title: "Find Doctors Near You", sub: "Confirmed appointments", c: "c2" },
  { icon: "🧪", title: "Lab Tests", sub: "Safe and trusted lab tests", c: "c3" },
  { icon: "🏥", title: "Surgeries", sub: "Safe and trusted surgery centers", c: "c4" },
];

const SPECS = [
  { icon: "🤰", label: "Period doubts or Pregnancy", symptom: "pregnancy" },
  { icon: "🧴", label: "Acne, pimple or skin issues", symptom: "acne skin" },
  { icon: "🛏️", label: "Performance issues in bed", symptom: "performance in bed" },
  { icon: "🤧", label: "Cold, cough or fever", symptom: "cold cough fever" },
  { icon: "👶", label: "Child not feeling well", symptom: "child not feeling well" },
  { icon: "😔", label: "Depression or anxiety", symptom: "depression anxiety" },
];

const CLINIC = [
  { icon: "🦷", h: "Dentist", p: "Teething troubles? Schedule a dental checkup" },
  { icon: "🤰", h: "Gynecologist/Obstetrician", p: "Explore for women's health, pregnancy and infertility treatments" },
  { icon: "🥗", h: "Dietitian/Nutrition", p: "Get guidance on eating right, weight management and sports nutrition" },
  { icon: "🧘", h: "Physiotherapist", p: "Pulled a muscle? Get it treated by a trained physiotherapist" },
];

const ARTICLES = [
  { icon: "💉", tag: "Coronavirus", title: "12 Coronavirus Myths and Facts That You Should Be Aware Of", by: "Dr. Diana Borgio" },
  { icon: "🥦", tag: "Vitamins and Supplements", title: "Eating Right to Build Immunity Against Cold and Viral Infections", by: "Dr. Diana Borgio" },
];

export default function HealthHome() {
  const [modalOpen, setModalOpen] = useState(false);
  const [seed, setSeed] = useState("");

  function openConsult(symptom = "") {
    setSeed(symptom);
    setModalOpen(true);
  }

  return (
    <>
      <HealthHeader active="Find Doctors" />

      <main>
        {/* Search band */}
        <section className="h-searchband">
          <div className="h-search">
            <div className="h-search__loc">
              <span className="h-pin">📍</span>
              <input defaultValue="New Delhi" aria-label="Location" />
            </div>
            <div className="h-search__q">
              <span>🔍</span>
              <input placeholder="Search doctors, clinics, hospitals, etc." aria-label="Search" />
            </div>
          </div>

          <div className="h-catrow">
            {CATS.map((c) => (
              <div
                key={c.title}
                className="h-cat"
                onClick={() => openConsult(c.title === "Instant Video Consultation" ? "" : "")}
                role="button"
                tabIndex={0}
              >
                <div className={"h-cat__img " + c.c}>{c.icon}</div>
                <div className="h-cat__body">
                  <h3>{c.title}</h3>
                  <p>{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Consult top doctors */}
        <section className="h-section">
          <div className="h-container h-wide">
            <div className="h-section__head">
              <div>
                <h2>Consult top doctors online for any health concern</h2>
                <p className="h-section__sub">
                  Private online consultations with verified doctors in all specialists
                </p>
              </div>
              <button className="h-outline-btn">View All Specialities</button>
            </div>
            <div className="h-specs">
              {SPECS.map((s) => (
                <div className="h-spec" key={s.label}>
                  <div className="h-spec__circle">{s.icon}</div>
                  <p>{s.label}</p>
                  <button className="h-consult-link" onClick={() => openConsult(s.symptom)}>
                    CONSULT NOW
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* In-clinic */}
        <section className="h-section">
          <div className="h-container h-wide">
            <h2>Book an appointment for an in-clinic consultation</h2>
            <p className="h-section__sub">Find experienced doctors across all specialties</p>
            <div className="h-clinic">
              {CLINIC.map((c) => (
                <div key={c.h} role="button" tabIndex={0} onClick={() => openConsult(c.h)}>
                  <div className="h-clinic__img">{c.icon}</div>
                  <h4>{c.h}</h4>
                  <p>{c.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="h-section">
          <div className="h-container h-wide">
            <div className="h-articles">
              <div className="h-articles__lead">
                <h2>Read top articles from health experts</h2>
                <p>
                  Health articles that keep you informed about good health practices and
                  achieve your goals.
                </p>
                <button className="h-solid-btn">See all articles</button>
              </div>
              {ARTICLES.map((a) => (
                <div className="h-article" key={a.title}>
                  <div className="h-article__img">{a.icon}</div>
                  <div className="h-article__tag">{a.tag}</div>
                  <h4>{a.title}</h4>
                  <small>{a.by}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="h-testi">
          <div className="h-container">
            <h2>What our users have to say</h2>
            <p className="h-testi__quote">
              Very easy to book, maintain history. Hassle free from older versions of
              booking appointment via telephone.. Thanks Practo for making it simple.
            </p>
            <span className="h-testi__who">
              <span className="h-avatar">👤</span> Jyothi Bhatia
            </span>
          </div>
        </section>

        {/* Download */}
        <section className="h-download">
          <div className="h-container h-wide">
            <div className="h-download__grid">
              <div className="h-phone">📱</div>
              <div>
                <h2>Download the Practo app</h2>
                <p>
                  Access video consultation with India's top doctors on the Practo app.
                  Connect with doctors online, available 24/7, from the comfort of your home.
                </p>
                <div className="h-sms">
                  <div className="h-sms__code">+91</div>
                  <input placeholder="Enter phone number" aria-label="Phone number" />
                  <button>Send SMS</button>
                </div>
                <div className="h-stores">
                  <span className="h-store">▶ Google Play</span>
                  <span className="h-store"> App Store</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <HealthFooter />

      <ConsultModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialSymptom={seed}
      />
    </>
  );
}
