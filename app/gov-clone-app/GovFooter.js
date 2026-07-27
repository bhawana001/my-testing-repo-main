const COLS = [
  { h: "Government information", items: ["All topics and services", "Directory of agencies", "Branches of government"] },
  { h: "About us", items: ["About USAServices", "Report a website issue", "Website usage data"] },
  { h: "For federal agencies", items: ["Partner with us", "Read our blog"] },
  { h: "For media", items: ["Outreach", "Feature articles"] },
];

export default function GovFooter() {
  return (
    <footer>
      <div className="gov-footer">
        <div className="gov-container gov-footer__cols">
          {COLS.map((c) => (
            <div key={c.h}>
              <h5>{c.h}</h5>
              {c.items.map((i) => (
                <a href="#" key={i}>
                  {i}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="gov-footer__bar">
        <div className="gov-container">
          USAServices is the official guide to government information and services. An official
          website of the U.S. General Services Administration. · <a href="#">Accessibility</a> ·{" "}
          <a href="#">Privacy</a> · <a href="#">FOIA requests</a>
        </div>
      </div>
    </footer>
  );
}
