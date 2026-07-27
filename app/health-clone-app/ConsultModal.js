"use client";

import { useMemo, useState } from "react";

// Client-side specialty hint (the API also returns the authoritative one).
const SPECIALTY_MAP = [
  { kw: ["fever", "cold", "cough", "flu"], spec: "General Physician" },
  { kw: ["skin", "acne", "pimple", "rash"], spec: "Dermatologist" },
  { kw: ["pregnan", "period", "menstru"], spec: "Gynecologist" },
  { kw: ["child", "baby", "kid"], spec: "Pediatrician" },
  { kw: ["depress", "anxiety", "stress", "sleep"], spec: "Psychiatrist" },
  { kw: ["performance", "bed", "erectile", "libido"], spec: "Sexologist" },
  { kw: ["teeth", "tooth", "dental", "gum"], spec: "Dentist" },
];

function matchSpecialty(symptom) {
  const s = symptom.toLowerCase();
  for (const m of SPECIALTY_MAP) {
    if (m.kw.some((k) => s.includes(k))) return m.spec;
  }
  return "General Physician";
}

export default function ConsultModal({ open, onClose, initialSymptom = "" }) {
  const [symptom, setSymptom] = useState(initialSymptom);
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const specialty = useMemo(
    () => (symptom.trim().length >= 4 ? matchSpecialty(symptom) : null),
    [symptom]
  );
  const ready = symptom.trim().length >= 4 && /^\d{10}$/.test(phone.trim());

  if (!open) return null;

  async function submit() {
    const errs = {};
    if (symptom.trim().length < 4) errs.symptom = "Please enter at least 4 characters";
    if (!/^\d{10}$/.test(phone.trim())) errs.phone = "Enter a valid 10-digit mobile number";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/health/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptom: symptom.trim(), phone: phone.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Request failed: ${res.status}`);
      setResult(data);
    } catch (e) {
      setErrors({ form: e.message });
    } finally {
      setSubmitting(false);
    }
  }

  function close() {
    setResult(null);
    setErrors({});
    onClose();
  }

  return (
    <div className="h-modal-overlay" role="dialog" aria-modal="true" onClick={close}>
      <div className="h-modal" onClick={(e) => e.stopPropagation()}>
        <button className="h-modal__close" onClick={close} aria-label="Close">
          ×
        </button>

        {result ? (
          <div className="h-modal__success" data-testid="consult-success">
            <div className="ic">✓</div>
            <h3>Consultation booked!</h3>
            <p>
              Reference <b>{result.consultId}</b> — a {result.specialty} will
              connect with you shortly.
            </p>
            <p>A verification code was sent to +91 {phone}.</p>
            <button
              className="h-solid-btn"
              style={{ marginTop: 16 }}
              onClick={close}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h2>Consult with a Doctor</h2>
            <div className="h-modal__grid">
              <div>
                <div className="h-field">
                  <label htmlFor="symptom">Tell us your symptom or health problem</label>
                  <input
                    id="symptom"
                    value={symptom}
                    onChange={(e) => setSymptom(e.target.value)}
                    placeholder="Eg: fever, headache"
                  />
                  {errors.symptom ? (
                    <div className="h-error">{errors.symptom}</div>
                  ) : (
                    <div className="h-hint">Min 4 characters</div>
                  )}
                </div>

                <div className="h-modal__spec">
                  {specialty ? (
                    <>
                      Relevant speciality: <b>{specialty}</b>
                    </>
                  ) : (
                    "A relevant speciality will be shown below..."
                  )}
                </div>

                <div className="h-field" style={{ marginTop: 18 }}>
                  <label htmlFor="phone">Mobile number</label>
                  <div className="h-phone-input">
                    <span>🇮🇳 +91</span>
                    <input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      placeholder="Enter mobile number"
                      maxLength={10}
                    />
                  </div>
                  {errors.phone ? (
                    <div className="h-error">{errors.phone}</div>
                  ) : (
                    <div className="h-hint">A verification code will be sent to this number.</div>
                  )}
                </div>

                {errors.form && <div className="h-error">{errors.form}</div>}

                <button
                  className={"h-continue" + (ready ? " is-ready" : "")}
                  onClick={submit}
                  disabled={submitting}
                >
                  {submitting ? "Please wait…" : "Continue"}
                </button>
              </div>

              <div className="h-modal__divider" />

              <div className="h-modal__aside">
                <div className="ic">💬</div>
                <p>Free Follow-up</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
