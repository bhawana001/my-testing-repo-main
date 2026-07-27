const COLS = [
  { h: "Support", items: ["Help Centre", "Get help with a safety issue", "AirCover", "Cancellation options"] },
  { h: "Hosting", items: ["StayNest your home", "AirCover for Hosts", "Hosting resources", "Community forum"] },
  { h: "StayNest", items: ["Newsroom", "New features", "Careers", "Investors"] },
  { h: "Explore", items: ["Rishikesh", "Goa", "Dehradun", "Noida"] },
];

export default function TrvFooter() {
  return (
    <footer className="trv-footer">
      <div className="trv-container">
        <div className="trv-footer__cols">
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
        <p style={{ marginTop: 24 }}>© 2026 StayNest, Inc. · Privacy · Terms · Company details</p>
      </div>
    </footer>
  );
}
