import Link from "next/link";
import BankHeader from "./BankHeader";
import BankFooter from "./BankFooter";
import LevelTabs from "./LevelTabs";
import { BASE, articleHref } from "./lib";

const HEADLINES = [
  "Here's How Much Every Tax Bracket Would Gain — or Lose",
  "3 Money Moves To Consider Now That Rates Are Shifting",
  "I Asked an Advisor How To Grow My Retirement Savings",
  "5 Costly Mistakes People Make With Their Estate Taxes",
  "3 Grocery Staples That Tend To Rise in Price",
  "How Much a 65-Year-Old Worker Pays in Social Security Taxes",
];

const FEATURED = [
  {
    tag: "Saving Money",
    title: "5 Accounts With Low Fees and Strong Returns",
    desc: "These accounts keep costs low while your balance keeps growing.",
    icon: "🏦",
  },
  {
    tag: "Banking",
    title: "9 Low-Risk Accounts Savvy Savers Trust",
    desc: "Reliable returns without the volatility of the market.",
    icon: "📈",
  },
  {
    tag: "Saving Money",
    title: "The Easiest Way To Pocket an Extra $250",
    desc: "Pocket some extra cash just for doing your day-to-day shopping.",
    icon: "💰",
  },
];

const PERSONALIZED = [
  {
    title: "This Year's Best Banks",
    desc: "Our experts released this year's list of best banks. Switch to a top-rated bank today.",
    icon: "🏆",
  },
  {
    title: "Top 100 Money Experts",
    desc: "We gathered the best financial minds to answer your biggest money questions.",
    icon: "🎓",
  },
  {
    title: "Leave Your Legacy",
    desc: "Practical guidance on budgeting, safeguarding loved ones, and long-term security.",
    icon: "🌱",
  },
  {
    title: "Financially Savvy",
    desc: "Educating you about every phase of your financial life, from student loans to retirement.",
    icon: "📓",
  },
];

export default function BankHome() {
  return (
    <>
      <BankHeader active="Home" />

      <main>
        {/* Hero */}
        <section className="b-hero">
          <div className="b-container">
            <h1>Let&apos;s make your money work for you</h1>
            <p>
              From getting started to becoming a financial pro, elevate your
              financial journey.
            </p>
            <LevelTabs />
          </div>
        </section>

        {/* Featured cards */}
        <section className="b-section" style={{ paddingTop: 24 }}>
          <div className="b-container">
            <div className="b-cards">
              {FEATURED.map((f) => (
                <article className="b-card" key={f.title}>
                  <div className="b-card__icon">{f.icon}</div>
                  <span className="b-article__tag">{f.tag}</span>
                  <h3 style={{ marginTop: 6 }}>{f.title}</h3>
                  <p>{f.desc}</p>
                  <Link href={articleHref(f.title)} className="b-card__link">
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Today's headlines */}
        <section className="b-section" style={{ paddingTop: 0 }}>
          <div className="b-container">
            <div className="b-section__head">
              <h2>Today&apos;s Headlines</h2>
            </div>
            <div className="b-headlines">
              {HEADLINES.map((h, i) => (
                <div className="b-headline" key={h}>
                  <span className="num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4>{h}</h4>
                    <Link href={articleHref(h)}>Read more →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Personalized content */}
        <section className="b-section" style={{ paddingTop: 0 }}>
          <div className="b-container">
            <div className="b-section__head">
              <span className="b-eyebrow">For You</span>
              <h2>Personalized Content for Your Financial Journey</h2>
            </div>
            <div className="b-cards">
              {PERSONALIZED.map((p) => (
                <article className="b-card" key={p.title}>
                  <div className="b-card__icon">{p.icon}</div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <Link href={`${BASE}/open-account`} className="b-card__link">
                    Let&apos;s GO →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA banner */}
        <section className="b-section" style={{ paddingTop: 0 }}>
          <div className="b-container">
            <div className="b-banner">
              <div>
                <span className="b-eyebrow">High-Yield Savings</span>
                <h2>Earn up to 4.34% APY on your savings</h2>
                <p>Open an account in minutes — no monthly fees, no minimums.</p>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link
                  href={`${BASE}/calculators`}
                  className="b-btn b-btn--ghost"
                >
                  Try the calculator
                </Link>
                <Link
                  href={`${BASE}/open-account`}
                  className="b-btn b-btn--primary"
                >
                  Open a savings account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BankFooter />
    </>
  );
}
