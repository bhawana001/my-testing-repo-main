"use client";

import { useState } from "react";
import InsHeader from "../InsHeader";

export default function CreateAccount() {
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  function next(e) {
    e.preventDefault();
    const errs = {};
    if (!/^\d{10}$/.test(phone.replace(/\D/g, ""))) errs.phone = "Mobile Phone Number is a required field.";
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dob)) errs.dob = "Date of Birth is a required field.";
    setErrors(errs);
    if (!Object.keys(errs).length) setDone(true);
  }

  return (
    <>
      <InsHeader />
      <div className="ins-formpage">
        <div className="ins-container">
          <div className="ins-steps">
            <div className="ins-steps__bar is-active">
              <span>Info Verification</span>
              <div className="line" />
            </div>
            <div className="ins-steps__bar">
              <span>Account Setup</span>
              <div className="line" />
            </div>
          </div>

          {done ? (
            <div className="ins-success">
              <div className="ic">✓</div>
              <h2>Information verified!</h2>
              <p>A one-time code was sent to your phone. Continue to Account Setup.</p>
            </div>
          ) : (
            <div className="ins-form">
              <h1 style={{ fontSize: 34 }}>Let&apos;s verify your information.</h1>
              <form onSubmit={next}>
                <div className="ins-field">
                  <label>
                    Mobile Phone Number <span className="req">*</span>
                  </label>
                  <input
                    className={errors.phone ? "err" : ""}
                    placeholder="(___) ___-____"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && <div className="msg">{errors.phone}</div>}
                </div>
                <div className="ins-field">
                  <label>
                    Date of Birth <span className="req">*</span>
                  </label>
                  <input
                    className={errors.dob ? "err" : ""}
                    placeholder="__/__/____"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                  {errors.dob && <div className="msg">{errors.dob}</div>}
                </div>
                <div className="ins-banner">
                  By entering the mobile phone number, you consent to receive a one time code
                  via text from SafeGuard. Message and data rates may apply.
                </div>
                <div style={{ textAlign: "right" }}>
                  <button className="ins-btn ins-btn--primary">Next</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
