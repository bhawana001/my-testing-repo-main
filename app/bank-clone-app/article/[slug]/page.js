import Link from "next/link";
import BankHeader from "../../BankHeader";
import BankFooter from "../../BankFooter";
import { BASE, titleize, articleHref } from "../../lib";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: `${titleize(slug)} — GO MoneyRates` };
}

const RELATED = [
  "Best High-Yield Savings Accounts",
  "How Much Should I Have in Savings?",
  "Best CD Rates Today",
  "4 Costly Banking Mistakes",
];

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const title = titleize(slug);

  return (
    <>
      <BankHeader active="Banking" />

      <main>
        <section
          className="b-section"
          style={{
            background:
              "linear-gradient(135deg, var(--b-cream), var(--b-cream-2))",
            paddingBottom: 30,
          }}
        >
          <div className="b-container">
            <div style={{ fontSize: 13, color: "var(--b-muted)", marginBottom: 10 }}>
              <Link href={BASE} style={{ color: "var(--b-accent-strong)" }}>
                Home
              </Link>{" "}
              /{" "}
              <Link href={`${BASE}/banking`} style={{ color: "var(--b-accent-strong)" }}>
                Banking
              </Link>{" "}
              / {title}
            </div>
            <span className="b-eyebrow">Banking</span>
            <h1 style={{ fontSize: 34, marginTop: 6, letterSpacing: "-0.02em" }}>
              {title}
            </h1>
            <p style={{ color: "var(--b-muted)", marginTop: 8 }}>
              By GO MoneyRates Staff · Updated recently · 5 min read
            </p>
          </div>
        </section>

        <section className="b-section">
          <div className="b-container" style={{ maxWidth: 760 }}>
            <div className="b-article__thumb" style={{ height: 240, borderRadius: 14, fontSize: 52 }}>
              📰
            </div>

            <p style={{ marginTop: 26, fontSize: 17 }}>
              This is a demo article on <strong>{title.toLowerCase()}</strong>.
              GO MoneyRates is a mock banking site built for testing, so the
              content below is placeholder copy — but every link here goes
              somewhere real inside the app.
            </p>
            <p style={{ color: "var(--b-muted)" }}>
              When you&apos;re choosing where to keep your money, a few things
              matter most: the annual percentage yield (APY), monthly fees,
              minimum balance requirements, and how easily you can move funds in
              and out. A high-yield savings account typically pays far more than
              a traditional one while keeping your money just as accessible.
            </p>

            <h2 style={{ fontSize: 22, marginTop: 30 }}>Key takeaways</h2>
            <ul style={{ color: "var(--b-muted)", lineHeight: 1.8, paddingLeft: 20 }}>
              <li>Compare APYs — small differences compound over time.</li>
              <li>Watch for monthly maintenance fees and minimums.</li>
              <li>FDIC insurance covers up to $250,000 per depositor.</li>
              <li>Automate transfers to grow your balance without thinking about it.</li>
            </ul>

            <div className="b-banner" style={{ marginTop: 30 }}>
              <div>
                <h2 style={{ fontSize: 22 }}>Ready to put this into action?</h2>
                <p>Open a high-yield savings account earning up to 4.34% APY.</p>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href={`${BASE}/calculators`} className="b-btn b-btn--ghost">
                  Run the numbers
                </Link>
                <Link href={`${BASE}/open-account`} className="b-btn b-btn--primary">
                  Open an account
                </Link>
              </div>
            </div>

            <h2 style={{ fontSize: 22, marginTop: 36, marginBottom: 16 }}>
              Related articles
            </h2>
            <div className="b-articles">
              {RELATED.map((r) => (
                <Link href={articleHref(r)} className="b-article" key={r}>
                  <div className="b-article__thumb">📄</div>
                  <div className="b-article__body">
                    <span className="b-article__tag">Banking</span>
                    <h3>{r}</h3>
                    <div className="b-article__meta">Read more →</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <BankFooter />
    </>
  );
}
