import Link from "next/link";
import Header from "./components/Header";
import Newsletter from "./components/Newsletter";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="container">
            <h1>Ship your idea faster</h1>
            <p>
              A clean, fast landing page starter. Launch your product, collect
              signups, and start charging customers today.
            </p>
            <Link href="/#pricing" className="btn btn--primary">
              Get Started
            </Link>
          </div>
        </section>

        {/* Pricing */}
        <section className="section" id="pricing">
          <div className="container">
            <div className="section__head">
              <h2>Pricing</h2>
              <p>Simple plans that scale with you.</p>
            </div>

            <div className="pricing-grid">
              <div className="card">
                <p className="card__name">Free</p>
                <p className="card__price">
                  $0<span> / mo</span>
                </p>
                <ul className="card__features">
                  <li>Up to 3 projects</li>
                  <li>Community support</li>
                  <li>Basic analytics</li>
                </ul>
                <button className="btn btn--ghost btn--block">
                  Get Started
                </button>
              </div>

              <div className="card card--featured">
                <p className="card__name">Pro</p>
                <p className="card__price">
                  $24<span> / mo</span>
                </p>
                <ul className="card__features">
                  <li>Unlimited projects</li>
                  <li>Priority support</li>
                  <li>Advanced analytics</li>
                  <li>Custom domains</li>
                </ul>
                <Link
                  href="/checkout?plan=Pro"
                  className="cta-buy-pro">
                  Buy Pro
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer" id="contact">
          <div className="container footer__inner">
            <h3>Join our newsletter</h3>
            <p>Get product updates and tips. No spam.</p>
            <Newsletter />
            <p className="footer__copy">
              © {new Date().getFullYear()} Acme, Inc. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
