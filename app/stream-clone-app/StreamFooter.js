"use client";
// Netflix-style footer. Link labels avoid words the Kane tests click on
// ("Account", "Profiles", "Browse", "Download"...) so they never compete with
// the real controls on the page.

const COLS = [
  ["FAQ", "Investor Relations", "Privacy", "Speed Test"],
  ["Help Centre", "Jobs", "Cookie Preferences", "Legal Notices"],
  ["Membership centre", "Ways to Watch", "Corporate Information", "Only on StreamFlix"],
  ["Media Centre", "Terms of Use", "Contact Us"],
];

export default function StreamFooter() {
  const stop = (e) => e.preventDefault();
  return (
    <footer className="flx-footer" data-testid="stream-footer">
      <div className="flx-footer__inner">
        <p className="flx-footer__phone">
          Questions? Call <a href="#" onClick={stop}>1-844-000-0000</a>
        </p>
        <ul className="flx-footer__links">
          {COLS.map((col, i) => (
            <li key={i}>
              <ul>
                {col.map((label) => (
                  <li key={label}>
                    <a href="#" onClick={stop}>{label}</a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <button type="button" className="flx-footer__lang" aria-label="Language: English">
          🌐 English
        </button>
        <p className="flx-footer__country">StreamFlix United States</p>
        <p className="flx-footer__note">
          Fictional clone built for testing; not affiliated with any real company.
        </p>
      </div>
    </footer>
  );
}
