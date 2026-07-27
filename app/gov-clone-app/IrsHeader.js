import Link from "next/link";
import { BASE } from "./lib";

// IRS-style secondary header used on the Report Fraud flow.
export default function IrsHeader() {
  const nav = ["File", "Pay", "Refunds", "Credits & Deductions", "Forms", "Report Fraud"];
  return (
    <>
      <div className="gov-banner">
        <div className="gov-banner__row">
          🇺🇸 An official website of the United States government <a href="#">Here&apos;s how you know ▾</a>
        </div>
      </div>
      <div className="gov-irs-head">
        <div className="gov-container">
          <Link href={`${BASE}/report-fraud`} style={{ color: "#fff", fontWeight: 800, fontSize: 20, textDecoration: "none" }}>
            🏛️ IRS
          </Link>
          <div style={{ marginLeft: "auto", display: "flex", gap: 16, fontSize: 14 }}>
            <span>Help</span>
            <span>News</span>
            <span>English ▾</span>
            <span>Sign in ▾</span>
          </div>
        </div>
      </div>
      <nav className="gov-irs-nav">
        <div className="gov-container">
          {nav.map((n) => (
            <Link key={n} href={n === "Report Fraud" ? `${BASE}/report-fraud` : BASE} className={n === "Report Fraud" ? "is-active" : ""}>
              {n}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
