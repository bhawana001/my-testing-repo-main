import { BRAND } from "./lib";

const COLS = [
  { h: "About Us", items: ["Careers", "Corporate Information", "In the Community", "Newsroom"] },
  { h: "Legal & Security", items: ["Privacy", "Terms of Use", "Security", "Manage Cookie Preferences"] },
  { h: "Support", items: ["Contact Us", "Accessibility", "Site Map", "Español"] },
  { h: "Insurance", items: ["Auto", "Homeowners", "Renters", "Explore All Products"] },
];

export default function InsFooter() {
  return (
    <footer className="ins-footer">
      <div className="ins-container">
        <div className="ins-footer__cols">
          {COLS.map((c) => (
            <div key={c.h}>
              <h5>{c.h}</h5>
              <ul>
                {c.items.map((i) => (
                  <li key={i}>
                    <a href="#">{i}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="ins-footer__brand">{BRAND.toUpperCase()}</div>
    </footer>
  );
}
