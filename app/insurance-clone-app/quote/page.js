"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import InsHeader from "../InsHeader";

function QuoteForm() {
  const params = useSearchParams();
  const product = params.get("product") || "auto";
  const [zip, setZip] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    const errs = {};
    if (!/^\d{5}$/.test(zip)) errs.zip = "Enter a valid 5-digit ZIP";
    if (!(Number(age) >= 16 && Number(age) <= 100)) errs.age = "Enter an age between 16 and 100";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setBusy(true);
    try {
      const res = await fetch("/api/insurance/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, zip, age: Number(age) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Quote failed");
      setResult(data);
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="ins-formpage">
      <div className="ins-container ins-form">
        <div className="ins-breadcrumb">Quote › {product}</div>
        <h1 style={{ fontSize: 34 }}>Get your {product} quote</h1>
        {result ? (
          <div className="ins-success">
            <div className="ic">✓</div>
            <h2>Your estimated {product} premium</h2>
            <p style={{ fontSize: 32, fontWeight: 800, color: "var(--ins-blue)" }}>
              ${result.monthlyPremium}/mo
            </p>
            <p>
              Quote <b>{result.quoteId}</b> · estimated annual savings ${result.annualSavings}.
            </p>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="ins-field">
              <label>ZIP Code</label>
              <input className={errors.zip ? "err" : ""} value={zip} onChange={(e) => setZip(e.target.value)} />
              {errors.zip && <div className="msg">{errors.zip}</div>}
            </div>
            <div className="ins-field">
              <label>Age of primary driver</label>
              <input className={errors.age ? "err" : ""} value={age} onChange={(e) => setAge(e.target.value)} />
              {errors.age && <div className="msg">{errors.age}</div>}
            </div>
            {errors.form && <div className="msg">{errors.form}</div>}
            <button className="ins-btn ins-btn--primary" disabled={busy}>
              {busy ? "Calculating…" : "Get My Quote"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function QuotePage() {
  return (
    <>
      <InsHeader />
      <Suspense fallback={<div className="ins-formpage" />}>
        <QuoteForm />
      </Suspense>
    </>
  );
}
