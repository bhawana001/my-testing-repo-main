import Link from "next/link";
import { BASE, articleHref } from "./lib";
import { demo } from "./demo";

const LINKS = [
  { label: "Banking", href: `${BASE}/banking` },
  { label: "Calculators", href: `${BASE}/calculators` },
  { label: "Financial Planning", href: articleHref("Financial Planning") },
  { label: "Investing", href: articleHref("Investing") },
  { label: "Saving & Spending", href: articleHref("Saving & Spending") },
];

export default function BankHeader({ active }) {
  return (
    <header className="b-header">
      <div className="b-topbar">
        <span>Open Bank Account</span>
        <span>Start Saving Today</span>
      </div>

      <div className="b-container b-header__inner">
        <Link href={BASE} className="b-logo">
          <span className="b-logo__mark">GO</span>
          <span>
            Money<b>Rates</b>
          </span>
        </Link>

        <nav className="b-nav">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={active === l.label ? "is-active" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="b-header__cta">
          <span className="b-search">Search</span>
          <Link href={`${BASE}/open-account`} className="b-btn b-btn--primary">
            {/* Auto-Heal demo: label flips so a hard-coded selector breaks */}
            {demo.autoheal ? "Get Started" : "Open Account"}
          </Link>
        </div>
      </div>
    </header>
  );
}
