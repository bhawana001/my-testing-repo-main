"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Basic but reasonable email validation.
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubscribed(true);
  }

  if (subscribed) {
    return <p className="newsletter__success">Thanks for subscribing</p>;
  }

  return (
    <div style={{ width: "100%", maxWidth: 420 }}>
      <form className="newsletter" onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn btn--primary">
          Subscribe
        </button>
      </form>
      {error && (
        <p role="alert" style={{ color: "#ff8585", margin: "10px 0 0", fontSize: 14 }}>
          {error}
        </p>
      )}
    </div>
  );
}
