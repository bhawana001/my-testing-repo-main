import Link from "next/link";
import "./evals.css";

const GITHUB = "https://github.com/bhawana001/my-testing-repo-main";

const CLONES = [
  { ic: "🏦", industry: "Banking", brand: "GO Money Rates", clone: "clone of GOBankingRates", slug: "/bank-clone-app", api: "calculators · open-account" },
  { ic: "🩺", industry: "Healthcare", brand: "CareWell", clone: "clone of Practo", slug: "/health-clone-app", api: "/api/health/* · 4 routes" },
  { ic: "🛒", industry: "E-commerce", brand: "ShopKart", clone: "clone of Amazon", slug: "/shop-clone-app", api: "/api/shop/* · 5 routes" },
  { ic: "🛡️", industry: "Insurance", brand: "SafeGuard", clone: "clone of GEICO", slug: "/insurance-clone-app", api: "/api/insurance/* · 4 routes" },
  { ic: "🏝️", industry: "Travel", brand: "StayNest", clone: "clone of Airbnb", slug: "/travel-clone-app", api: "/api/travel/* · 4 routes" },
  { ic: "📡", industry: "Telecom", brand: "AirWave", clone: "clone of Airtel", slug: "/telecom-clone-app", api: "/api/telecom/* · 4 routes" },
  { ic: "🎬", industry: "Streaming", brand: "StreamFlix", clone: "clone of Netflix", slug: "/stream-clone-app", api: "/api/stream/* · 4 routes" },
  { ic: "🏛️", industry: "Government", brand: "USAServices", clone: "clone of USAGov / IRS", slug: "/gov-clone-app", api: "/api/gov/* · 4 routes" },
  { ic: "🎧", industry: "Interactive site", brand: "Auralis", clone: "motion-heavy product landing page", slug: "/interactive-website", api: "UI only · scroll, canvas, parallax" },
];

export default function RealEvals() {
  return (
    <div className="evals">
      <div className="e-wrap">
        <div className="e-topbar">
          <span className="e-brand">
            <span className="dot" /> Real Evals
          </span>
          <a className="e-ghbtn" href={GITHUB} target="_blank" rel="noreferrer">
            ★ View on GitHub
          </a>
        </div>

        <section className="e-hero">
          <h1>Real Evals</h1>
          <p>
            A living playground of realistic web-app clones, with real UI flows and live APIs to
            practice and evaluate <strong>any kind of testing</strong>: functional, end-to-end,
            UI &amp; visual regression, browser automation, API, performance and accessibility.
          </p>
          <div className="e-stats">
            <span className="e-stat">8 industries</span>
            <span className="e-stat">1 interactive motion site</span>
            <span className="e-stat">Any testing type</span>
            <span className="e-stat">Realistic UI flows</span>
            <span className="e-stat">30+ live API endpoints</span>
            <span className="e-stat">Open source</span>
          </div>
        </section>

        <div className="e-h2">Explore the clones</div>
        <div className="e-grid">
          {CLONES.map((c) => (
            <Link href={c.slug} key={c.slug} className="e-card">
              <span className="e-card__ic">{c.ic}</span>
              <span className="e-card__ind">{c.industry}</span>
              <span className="e-card__brand">{c.brand}</span>
              <span className="e-card__clone">{c.clone}</span>
              <span className="e-card__slug">{c.slug}</span>
              <span className="e-card__api">{c.api}</span>
            </Link>
          ))}
        </div>

        <div className="e-about">
          <h3>What is this?</h3>
          <p>
            Real Evals is a set of production-looking clones across 8 industries, each with real
            UI flows <em>and</em> live REST API endpoints, so anyone can practice real test
            scenarios instead of toy pages. It isn&apos;t tied to one kind of testing: use it for{" "}
            <strong>functional &amp; end-to-end</strong> flows, <strong>UI / visual regression</strong>,{" "}
            <strong>browser automation</strong> (kane-cli, Playwright, Selenium, Cypress),{" "}
            <strong>API testing</strong>, <strong>performance</strong> and{" "}
            <strong>accessibility</strong>, manual or automated.
          </p>
          <p>
            For API work, every app exposes a consistent surface: <code>GET …/health</code>{" "}
            (smoke), <code>POST …/login</code> (200/401), <code>GET …/&lt;list&gt;?filter=</code>{" "}
            (schema checks), and <code>POST …/&lt;action&gt;</code> (create + negative paths).
            Anyone can use it: drive the live UI, hit the APIs directly, clone the repo, run{" "}
            <code>npm run dev</code>, and open any app locally, or add your own industry.
          </p>
          <p>
            Source &amp; setup:{" "}
            <a href={GITHUB} target="_blank" rel="noreferrer">
              github.com/bhawana001/my-testing-repo-main
            </a>
          </p>
        </div>

        <div className="e-footer">
          Real Evals · open-source testing playground ·{" "}
          <a href={GITHUB} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
