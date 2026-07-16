"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import BankHeader from "../BankHeader";
import BankFooter from "../BankFooter";
import { demo } from "../demo";

const BASE = "/bank-clone-app";

// Auto-Heal demo: CTAs get renamed so recorded selectors break.
const CONTINUE_LABEL = demo.autoheal ? "Next step →" : "Continue →";
const SUBMIT_LABEL = demo.autoheal ? "Submit application" : "Open account";

const ACCOUNT_TYPES = [
  {
    id: "hysa",
    name: "High-Yield Savings",
    apy: "4.34%",
    blurb: "No monthly fees, no minimums. Our most popular account.",
    min: 0,
  },
  {
    id: "savings",
    name: "Everyday Savings",
    apy: "3.10%",
    blurb: "Simple savings with easy transfers and automatic goals.",
    min: 0,
  },
  {
    id: "mma",
    name: "Money Market",
    apy: "4.00%",
    blurb: "Higher tiers for larger balances, with check-writing access.",
    min: 100,
  },
];

const STEPS = [
  { title: "Account type", sub: "Pick your savings account" },
  { title: "About you", sub: "Identity & contact" },
  { title: "Fund it", sub: "Initial deposit" },
  { title: "Review", sub: "Confirm & open" },
];

const usd = (n) =>
  Number(n || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

export default function OpenAccountPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});

  const [accountType, setAccountType] = useState("hysa");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    phone: "",
    ssn: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    deposit: "",
    funding: "bank-transfer",
    agree: false,
  });

  const selected = useMemo(
    () => ACCOUNT_TYPES.find((a) => a.id === accountType),
    [accountType]
  );

  const set = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  function validateStep(n) {
    const e = {};
    if (n === 1) {
      if (!form.firstName.trim()) e.firstName = "Required";
      if (!form.lastName.trim()) e.lastName = "Required";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
        e.email = "Enter a valid email";
      if (!form.dob) e.dob = "Required";
      if (form.phone.replace(/\D/g, "").length < 10)
        e.phone = "Enter a 10-digit phone";
      if (!/^\d{4}$/.test(form.ssn)) e.ssn = "Last 4 digits of SSN";
      if (!form.address.trim()) e.address = "Required";
      if (!form.city.trim()) e.city = "Required";
      if (!form.state.trim()) e.state = "Required";
      if (!/^\d{5}$/.test(form.zip)) e.zip = "5-digit ZIP";
    }
    if (n === 2) {
      const dep = Number(form.deposit);
      if (!(dep >= selected.min))
        e.deposit =
          selected.min > 0
            ? `Minimum opening deposit is ${usd(selected.min)}`
            : "Enter an amount of $0 or more";
    }
    if (n === 3) {
      if (!form.agree) e.agree = "You must accept the terms to continue";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function back() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  }
  function submit() {
    if (validateStep(3)) setDone(true);
  }

  const field = (key, label, opts = {}) => (
    <div className="b-field">
      <label htmlFor={key}>{label}</label>
      <input
        id={key}
        className="b-input"
        type={opts.type || "text"}
        placeholder={opts.placeholder}
        inputMode={opts.inputMode}
        maxLength={opts.maxLength}
        value={form[key]}
        onChange={set(key)}
      />
      {errors[key] && <div className="b-error">{errors[key]}</div>}
    </div>
  );

  return (
    <>
      <BankHeader active="Open Account" />

      <main>
        <section
          className="b-section"
          style={{
            background:
              "linear-gradient(135deg, var(--b-cream), var(--b-cream-2))",
            paddingBottom: 26,
          }}
        >
          <div className="b-container">
            <span className="b-eyebrow">Open an account</span>
            <h1 style={{ fontSize: 36, marginTop: 6, letterSpacing: "-0.02em" }}>
              Open your savings account
            </h1>
            <p style={{ color: "var(--b-muted)", maxWidth: 560, marginTop: 8 }}>
              It takes about 5 minutes. Your money is FDIC-insured up to $250,000
              (demo).
            </p>
          </div>
        </section>

        <section className="b-section">
          <div className="b-container">
            {done ? (
              <div className="b-panel">
                <div className="b-success">
                  <div className="check">✓</div>
                  <h2>You&apos;re all set, {form.firstName}!</h2>
                  <p className="b-panel__sub">
                    Your {selected.name} account application has been submitted.
                    We&apos;ve sent a confirmation to {form.email}.
                  </p>
                  <div
                    className="b-review"
                    style={{ maxWidth: 420, margin: "0 auto 24px", textAlign: "left" }}
                  >
                    <div className="b-review__row">
                      <span>Account</span>
                      <b>{selected.name}</b>
                    </div>
                    <div className="b-review__row">
                      <span>APY</span>
                      <b>{selected.apy}</b>
                    </div>
                    <div className="b-review__row">
                      <span>Opening deposit</span>
                      <b>{usd(form.deposit)}</b>
                    </div>
                    <div className="b-review__row">
                      <span>Reference</span>
                      <b>GO-SAV-{form.zip}{form.ssn}</b>
                    </div>
                  </div>
                  <Link href={BASE} className="b-btn b-btn--primary">
                    Back to home
                  </Link>
                </div>
              </div>
            ) : (
              <div className="b-open">
                {/* Stepper */}
                <aside className="b-steps">
                  {STEPS.map((s, i) => (
                    <div
                      key={s.title}
                      className={
                        "b-step" +
                        (i === step ? " is-active" : "") +
                        (i < step ? " is-done" : "")
                      }
                    >
                      <span className="dot">{i < step ? "✓" : i + 1}</span>
                      <div>
                        <strong>{s.title}</strong>
                        <small>{s.sub}</small>
                      </div>
                    </div>
                  ))}
                </aside>

                {/* Panels */}
                <div className="b-panel">
                  {step === 0 && (
                    <>
                      <h2>Choose your account</h2>
                      <p className="b-panel__sub">
                        All accounts are fee-free. Rates shown are annual
                        percentage yields (demo).
                      </p>
                      <div className="b-options">
                        {ACCOUNT_TYPES.map((a) => (
                          <div
                            key={a.id}
                            className={
                              "b-option" +
                              (accountType === a.id ? " is-selected" : "")
                            }
                            onClick={() => setAccountType(a.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) =>
                              e.key === "Enter" && setAccountType(a.id)
                            }
                          >
                            <div className="apy">{a.apy}</div>
                            <h4>{a.name}</h4>
                            <p>{a.blurb}</p>
                            <p style={{ marginTop: 8, fontWeight: 700 }}>
                              Min: {a.min > 0 ? usd(a.min) : "$0"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <h2>About you</h2>
                      <p className="b-panel__sub">
                        We need this to verify your identity, as required for any
                        bank account.
                      </p>
                      <div className="b-grid-2">
                        {field("firstName", "First name")}
                        {field("lastName", "Last name")}
                        {field("email", "Email", { type: "email" })}
                        {field("dob", "Date of birth", { type: "date" })}
                        {field("phone", "Phone", {
                          inputMode: "tel",
                          placeholder: "(555) 555-5555",
                        })}
                        {field("ssn", "SSN (last 4)", {
                          inputMode: "numeric",
                          maxLength: 4,
                          placeholder: "1234",
                        })}
                      </div>
                      <div className="b-divider" />
                      {field("address", "Street address")}
                      <div className="b-grid-2">
                        {field("city", "City")}
                        <div className="b-field-row">
                          {field("state", "State", { maxLength: 2, placeholder: "CA" })}
                          {field("zip", "ZIP", {
                            inputMode: "numeric",
                            maxLength: 5,
                            placeholder: "90210",
                          })}
                        </div>
                      </div>
                      <div className="b-note">
                        🔒 This is a demo. Do not enter real SSN or personal
                        data — nothing is stored.
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <h2>Fund your account</h2>
                      <p className="b-panel__sub">
                        Make your opening deposit for the {selected.name} account
                        ({selected.apy} APY).
                      </p>
                      {field("deposit", "Opening deposit (USD)", {
                        type: "number",
                        inputMode: "decimal",
                        placeholder: "500",
                      })}
                      <div className="b-field">
                        <label htmlFor="funding">Funding method</label>
                        <select
                          id="funding"
                          className="b-select"
                          value={form.funding}
                          onChange={set("funding")}
                        >
                          <option value="bank-transfer">
                            Link an external bank (ACH)
                          </option>
                          <option value="debit">Debit card</option>
                          <option value="wire">Wire transfer</option>
                          <option value="check">Mobile check deposit</option>
                        </select>
                      </div>
                      <div className="b-note">
                        Estimated interest in year one:{" "}
                        <b style={{ color: "var(--b-accent-strong)" }}>
                          {usd(
                            (Number(form.deposit) || 0) *
                              (parseFloat(selected.apy) / 100)
                          )}
                        </b>{" "}
                        at {selected.apy} APY.
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <h2>Review &amp; open</h2>
                      <p className="b-panel__sub">
                        Please confirm everything looks right.
                      </p>
                      <div className="b-review">
                        <div className="b-review__row">
                          <span>Account type</span>
                          <b>
                            {selected.name} · {selected.apy} APY
                          </b>
                        </div>
                        <div className="b-review__row">
                          <span>Name</span>
                          <b>
                            {form.firstName} {form.lastName}
                          </b>
                        </div>
                        <div className="b-review__row">
                          <span>Email</span>
                          <b>{form.email}</b>
                        </div>
                        <div className="b-review__row">
                          <span>Phone</span>
                          <b>{form.phone}</b>
                        </div>
                        <div className="b-review__row">
                          <span>Address</span>
                          <b>
                            {form.address}, {form.city}, {form.state} {form.zip}
                          </b>
                        </div>
                        <div className="b-review__row">
                          <span>Opening deposit</span>
                          <b>{usd(form.deposit)}</b>
                        </div>
                        <div className="b-review__row">
                          <span>Funding method</span>
                          <b>{form.funding}</b>
                        </div>
                      </div>

                      <label
                        className="b-radio"
                        style={{ marginTop: 18, alignItems: "flex-start" }}
                      >
                        <input
                          type="checkbox"
                          checked={form.agree}
                          onChange={set("agree")}
                          style={{ marginTop: 3 }}
                        />
                        <span>
                          I agree to the Account Terms, Electronic Disclosures,
                          and Privacy Policy (demo).
                        </span>
                      </label>
                      {errors.agree && (
                        <div className="b-error">{errors.agree}</div>
                      )}
                    </>
                  )}

                  {/* Actions */}
                  <div className="b-panel__actions">
                    {step > 0 ? (
                      <button className="b-btn b-btn--ghost" onClick={back}>
                        ← Back
                      </button>
                    ) : (
                      <Link href={BASE} className="b-btn b-btn--ghost">
                        Cancel
                      </Link>
                    )}

                    {step < STEPS.length - 1 ? (
                      <button className="b-btn b-btn--primary" onClick={next}>
                        {CONTINUE_LABEL}
                      </button>
                    ) : (
                      <button className="b-btn b-btn--primary" onClick={submit}>
                        {SUBMIT_LABEL}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <BankFooter />
    </>
  );
}
