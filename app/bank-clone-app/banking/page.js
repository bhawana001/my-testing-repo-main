import Link from "next/link";
import BankHeader from "../BankHeader";
import BankFooter from "../BankFooter";
import { BASE, articleHref } from "../lib";

const CATEGORIES = [
  { icon: "🏛️", label: "Best Banks of 2026" },
  { icon: "💵", label: "Best High-Yield Savings" },
  { icon: "✅", label: "Best Checking Accounts" },
  { icon: "📜", label: "Best CD Accounts" },
];

const LEARN = [
  "Best High-Yield Savings Accounts",
  "Best Money Market Accounts",
  "Best 5% Interest Savings Accounts",
  "Best Cash Management Accounts",
  "Best Savings Accounts",
  "Types of Savings Accounts",
  "How High Will Bank Rates Go?",
  "How Much Should I Have in Savings?",
  "Can You Earn 7% Interest?",
];

const ARTICLES = [
  {
    tag: "Banking",
    title: "How Many CDs Can You Have at One Bank? FDIC Rules Explained",
    desc: "Most banks don't limit the number, but FDIC insurance covers up to $250K per depositor.",
    meta: "By Kara McGinley · 6 min read",
    icon: "📄",
  },
  {
    tag: "Banking",
    title: "I Kept $10,000 in a Regular Savings Account for 6 Years",
    desc: "Here's how much money I lost by not switching to a high-yield account sooner.",
    meta: "By A. Nadelle · 5 min read",
    icon: "💸",
  },
  {
    tag: "Banking",
    title: "4 Costly Banking Mistakes Putting Your Money at Risk",
    desc: "Weak passwords, paper checks, and ignoring fraud monitoring can cost you.",
    meta: "By J. Taylor · 4 min read",
    icon: "⚠️",
  },
  {
    tag: "Banking",
    title: "Best CD Rates Today — Earn Up To 4.34% APY",
    desc: "A daily roundup of the most competitive certificate of deposit rates available.",
    meta: "By Staff · Updated daily",
    icon: "📊",
  },
  {
    tag: "Banking",
    title: "9 Best Banks With No ATM Fees for 2026",
    desc: "Skip the surcharges with these fee-free networks and reimbursement programs.",
    meta: "By L. Rivera · 7 min read",
    icon: "🏧",
  },
  {
    tag: "Banking",
    title: "4 Axos Bank Tips To Help Grow Your Social Security Benefits",
    desc: "Customer-centered digital banking with tools that stretch your monthly benefit.",
    meta: "By D. Cole · 5 min read",
    icon: "📱",
  },
];

export default function BankingPage() {
  return (
    <>
      <BankHeader active="Banking" />

      <main>
        {/* Category hero */}
        <section
          className="b-section"
          style={{
            background:
              "linear-gradient(135deg, var(--b-cream), var(--b-cream-2))",
            paddingBottom: 34,
          }}
        >
          <div className="b-container">
            <div className="b-section__head" style={{ marginBottom: 22 }}>
              <span className="b-eyebrow">Category</span>
              <h2 style={{ fontSize: 34 }}>Banking</h2>
              <p style={{ maxWidth: 640, margin: "8px auto 0" }}>
                A bank is one of the most universally accepted places to
                safeguard your money. Explore the benefits of every account type
                and the best way to manage them.
              </p>
            </div>
          </div>
          <div className="b-container">
            <div className="b-quicklinks" style={{ marginTop: 0 }}>
              {CATEGORIES.map((c) => (
                <Link href={articleHref(c.label)} className="b-quicklink" key={c.label}>
                  <span className="b-card__icon">{c.icon}</span>
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Latest articles */}
        <section className="b-section">
          <div className="b-container">
            <div className="b-section__head">
              <h2>Latest in Banking</h2>
              <p>Fresh guides, rate roundups, and money tips.</p>
            </div>
            <div className="b-articles">
              {ARTICLES.map((a) => (
                <Link href={articleHref(a.title)} className="b-article" key={a.title}>
                  <div className="b-article__thumb">{a.icon}</div>
                  <div className="b-article__body">
                    <span className="b-article__tag">{a.tag}</span>
                    <h3>{a.title}</h3>
                    <p>{a.desc}</p>
                    <div className="b-article__meta">{a.meta}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Learn more grid */}
        <section className="b-section" style={{ paddingTop: 0 }}>
          <div className="b-container">
            <div className="b-card" style={{ padding: 30 }}>
              <div className="b-section__head" style={{ marginBottom: 20 }}>
                <h2 style={{ fontSize: 26 }}>Learn More About Banking</h2>
              </div>
              <div
                style={{
                  display: "grid",
                  gap: "12px 24px",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                }}
              >
                {LEARN.map((l) => (
                  <Link
                    key={l}
                    href={articleHref(l)}
                    style={{
                      color: "var(--b-accent-strong)",
                      fontWeight: 600,
                      fontSize: 15,
                    }}
                  >
                    {l}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="b-section" style={{ paddingTop: 0 }}>
          <div className="b-container">
            <div className="b-banner">
              <div>
                <h2>Ready to earn more on your savings?</h2>
                <p>Open a high-yield savings account in just a few minutes.</p>
              </div>
              <Link
                href={`${BASE}/open-account`}
                className="b-btn b-btn--primary"
              >
                Open a savings account
              </Link>
            </div>
          </div>
        </section>
      </main>

      <BankFooter />
    </>
  );
}
