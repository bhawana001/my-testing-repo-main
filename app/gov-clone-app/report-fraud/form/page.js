"use client";

import { useState } from "react";
import Link from "next/link";
import IrsHeader from "../../IrsHeader";
import { BASE } from "../../lib";

const OPTIONS = [
  "A person or business may have committed tax fraud, evasion or a law violation",
  "I may have been scammed or targeted in a tax scheme",
  "Cryptocurrency or other money laundering or wire fraud",
  "Tax preparer misconduct or fraud / Tax preparer self-reporting an issue",
  "Tax-exempt organization, employee plan or government entity non-compliance",
  "Fake IRS, Treasury or tax-related email or message",
  "Identity theft",
  "Other",
];

export default function ReportForm() {
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    const errs = {};
    if (!category) errs.category = "Please select what you are reporting.";
    if (details.trim().length < 10) errs.details = "Please provide at least 10 characters of detail.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setBusy(true);
    try {
      const res = await fetch("/api/gov/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, details: details.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setResult(data);
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <IrsHeader />
      <div className="gov-container">
        <div className="gov-breadcrumb">
          <Link href={BASE}>Home</Link> › <Link href={`${BASE}/report-fraud`}>Report fraud</Link> ›
          Report tax fraud, a scam or law violation
        </div>
        <h1 className="gov-pagetitle" style={{ color: "#1b1b1b", borderBottom: "none" }}>
          Report tax fraud, a scam or law violation
        </h1>

        {result ? (
          <div className="gov-success">
            <h2>✓ Report submitted</h2>
            <p>
              Case <b>{result.caseId}</b> received. Status: <b>{result.status}</b>. Thank you for
              helping promote fairness in the tax system.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="gov-prose">
            <h2>How it works</h2>
            <p>There are several ways to report information to the IRS, including anonymously.</p>
            <h2>What are you reporting?</h2>
            <div className="gov-radios">
              {OPTIONS.map((o) => (
                <label className="gov-radio" key={o}>
                  <input
                    type="radio"
                    name="category"
                    value={o}
                    checked={category === o}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <span>{o}</span>
                </label>
              ))}
              {errors.category && <div className="gov-msg">{errors.category}</div>}
            </div>
            <div className="gov-field">
              <label>Describe what you are reporting</label>
              <textarea
                rows={5}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Provide specific, credible information…"
              />
              {errors.details && <div className="gov-msg">{errors.details}</div>}
            </div>
            {errors.form && <div className="gov-msg">{errors.form}</div>}
            <button className="gov-btn gov-btn--primary" disabled={busy} style={{ color: "#fff", marginBottom: 40 }}>
              {busy ? "Submitting…" : "Submit report"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
