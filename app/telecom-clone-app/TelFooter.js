import { BRAND } from "./lib";

const COLS = [
  { h: "Quick Access", items: ["AirWave App", "Wi-Fi Bill Payment", "Prepaid Recharge", "Postpaid Bill Payment", "DTH Recharge"] },
  { h: "Help At Hand", items: ["Find a store", "Check Coverage", "Customer Care", "Manage Your account"] },
  { h: "About AirWave", items: ["Brand", "Privacy Center", "Career", "Investor"] },
  { h: "New Connections", items: ["Buy Wi-Fi New Connection", "Buy Prepaid New Connection", "Buy DTH New Connection"] },
];

export default function TelFooter() {
  return (
    <footer className="tel-footer">
      <div className="tel-container tel-footer__cols">
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
      <div className="tel-copy">© 2026 {BRAND} India. All Rights Reserved.</div>
    </footer>
  );
}
