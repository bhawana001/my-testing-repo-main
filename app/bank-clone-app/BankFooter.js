import Link from "next/link";
import { BASE, articleHref } from "./lib";

const COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "Who We Are", href: articleHref("Who We Are") },
      { label: "Careers", href: articleHref("Careers") },
      { label: "Editorial Team", href: articleHref("Editorial Team") },
      { label: "Press Releases", href: articleHref("Press Releases") },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Banking", href: `${BASE}/banking` },
      { label: "Calculators", href: `${BASE}/calculators` },
      { label: "Open Account", href: `${BASE}/open-account` },
      { label: "Savings", href: `${BASE}/open-account` },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Use", href: articleHref("Terms of Use") },
      { label: "Privacy Policy", href: articleHref("Privacy Policy") },
      { label: "Advertiser Disclosure", href: articleHref("Advertiser Disclosure") },
      { label: "Sitemap", href: articleHref("Sitemap") },
    ],
  },
];

export default function BankFooter() {
  return (
    <footer className="b-footer">
      <div className="b-container">
        <div className="b-footer__grid">
          <div>
            <Link href={BASE} className="b-logo">
              <span className="b-logo__mark">GO</span>
              <span>
                Money<b>Rates</b>
              </span>
            </Link>
            <p style={{ color: "var(--b-muted)", fontSize: 14, marginTop: 14 }}>
              A demo banking experience. Not a real financial institution — for
              testing and prototyping only.
            </p>
            <form
              className="b-subscribe"
              style={{ marginTop: 18 }}
              action={BASE}
            >
              <input type="email" placeholder="Email address" aria-label="Email address" />
              <button type="submit" className="b-btn b-btn--primary">
                Submit
              </button>
            </form>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h5>{col.title}</h5>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="b-footer__copy">
          © {new Date().getFullYear()} GO MoneyRates (demo clone). Built with
          Next.js for testing purposes.
        </p>
      </div>
    </footer>
  );
}
