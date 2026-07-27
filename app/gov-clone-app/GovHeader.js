import Link from "next/link";
import { BASE, BRAND } from "./lib";

const TOPICS = [
  "All topics and services",
  "The U.S. and its government",
  "Government benefits",
  "Immigration and U.S. citizenship",
  "Money and credit",
  "Taxes",
  "Travel",
];

export default function GovHeader() {
  return (
    <>
      <div className="gov-banner">
        <div className="gov-banner__row">
          🇺🇸 An official website of the United States government <a href="#">Here&apos;s how you know ▾</a>
        </div>
      </div>
      <header className="gov-header">
        <div className="gov-container gov-header__row">
          <Link href={BASE} className="gov-logo">
            <span className="badge">USA</span> {BRAND}
          </Link>
          <div className="gov-header__right">
            <span>Call us at 1-844-USAGOV1</span>
            <div className="gov-search">
              <input placeholder="Search" aria-label="Search" />
              <button aria-label="Search">🔍</button>
            </div>
            <a href="#" className="gov-es">
              Español
            </a>
          </div>
        </div>
      </header>
      <nav className="gov-topnav">
        <div className="gov-container gov-topnav__row">
          {TOPICS.map((t) => (
            <Link key={t} href={t === "Taxes" ? `${BASE}/taxes` : BASE}>
              {t}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
