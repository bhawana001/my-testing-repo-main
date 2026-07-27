import Link from "next/link";
import { BASE, BRAND } from "./lib";

export default function TelHeader() {
  const nav = ["Wi-Fi", "Postpaid", "Prepaid", "DTH", "AirWave Black", "Bank", "Finance", "Help"];
  return (
    <>
      <div className="tel-strip">
        <div className="tel-container tel-strip__row">
          <a href="#" className="is-active">INDIVIDUAL</a>
          <a href="#">BUSINESS</a>
          <a href="#">INVESTOR</a>
        </div>
      </div>
      <header className="tel-header">
        <div className="tel-container tel-header__row">
          <Link href={BASE} className="tel-logo">
            📡 {BRAND}
          </Link>
          <nav className="tel-nav">
            {nav.map((n) => (
              <Link key={n} href={n === "Wi-Fi" ? `${BASE}/bill-payment` : BASE}>
                {n} ▾
              </Link>
            ))}
          </nav>
          <span className="tel-account">👤 Account</span>
        </div>
      </header>
    </>
  );
}
