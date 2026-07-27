import Link from "next/link";
import { BASE, BRAND } from "./lib";

export default function TrvHeader({ showSearch = true }) {
  return (
    <header className="trv-header">
      <div className="trv-container">
        <div className="trv-header__row">
          <Link href={BASE} className="trv-logo">
            ⌂ {BRAND}
          </Link>
          <nav className="trv-tabs">
            <Link href={BASE} className="is-active">
              Homes
            </Link>
            <Link href={BASE}>Experiences</Link>
            <Link href={BASE}>Services</Link>
          </nav>
          <div className="trv-header__right">
            <span>Become a host</span>
            <span>🌐</span>
            <span className="trv-avatar">☰ 👤</span>
          </div>
        </div>
        {showSearch && (
          <div className="trv-search">
            <div className="trv-search__seg">
              <small>Where</small>
              <span>Search destinations</span>
            </div>
            <div className="trv-search__seg">
              <small>When</small>
              <span>Add dates</span>
            </div>
            <div className="trv-search__seg">
              <small>Who</small>
              <span>Add guests</span>
            </div>
            <button className="trv-search__btn" aria-label="Search">🔍</button>
          </div>
        )}
      </div>
    </header>
  );
}
