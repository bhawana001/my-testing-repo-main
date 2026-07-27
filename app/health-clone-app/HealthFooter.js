const COLS = [
  {
    h: "Practo",
    items: ["About", "Blog", "Careers", "Press", "Contact Us"],
  },
  {
    h: "For patients",
    items: [
      "Search for doctors",
      "Search for clinics",
      "Search for hospitals",
      "Book Diagnostic Tests",
      "Read health articles",
    ],
  },
  {
    h: "For doctors",
    items: ["Practo Profile"],
  },
  {
    h: "For hospitals",
    items: ["Insta by Practo", "Qikwell by Practo", "Practo Profile", "Practo Reach"],
  },
  {
    h: "More",
    items: ["Help", "Developers", "Privacy Policy", "Terms & Conditions"],
  },
  {
    h: "Social",
    items: ["Facebook", "Twitter", "LinkedIn", "Youtube", "Github"],
  },
];

export default function HealthFooter() {
  return (
    <footer className="h-footer">
      <div className="h-footer__cols">
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
      <div className="h-footer__brand">
        <span style={{ color: "#14bef0" }}>•</span> practo{" "}
        <span style={{ color: "#14bef0" }}>•</span>
      </div>
    </footer>
  );
}
