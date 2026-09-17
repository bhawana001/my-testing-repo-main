"use client";
// Site footer shown on every ShopKart page (rendered from the layout).
import AmazonLogo from "./AmazonLogo";

export default function ShopFooter() {
  return (
    <footer>
      <div className="footer-back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        Back to top
      </div>
      <div className="footer-nav">
        <div className="footer-nav-container">
          {[
            { h: "Get to Know Us", items: ["Careers", "Blog", "About ShopKart", "Investor Relations"] },
            { h: "Make Money with Us", items: ["Sell products", "Become an Affiliate", "Advertise Your Products"] },
            { h: "Payment Products", items: ["Business Card", "Shop with Points", "Reload Your Balance"] },
            { h: "Let Us Help You", items: ["Your Account", "Shipping Rates & Policies", "Recalls and Product Safety", "Accessibility"] },
          ].map((c) => (
            <div className="footer-column" key={c.h}>
              <h3>{c.h}</h3>
              <ul>
                {c.items.map((i) => (
                  <li key={i}>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-brand-bar">
        <div className="footer-logo">
          <AmazonLogo />
        </div>
        <div className="footer-selectors">
          <button className="footer-selector">🌐 English</button>
          <button className="footer-selector">$ USD</button>
          <button className="footer-selector">🇺🇸 United States</button>
        </div>
      </div>
      <div className="footer-copyright">
        <ul>
          <li><a href="#" onClick={(e) => e.preventDefault()}>Conditions of Use</a></li>
          <li><a href="#" onClick={(e) => e.preventDefault()}>Privacy Notice</a></li>
          <li><a href="#" onClick={(e) => e.preventDefault()}>Your Ads Privacy Choices</a></li>
        </ul>
        <p>© 1996-2026, ShopKart.com, Inc. or its affiliates · Fictional clone built for testing; not affiliated with any real company.</p>
      </div>
    </footer>
  );
}
