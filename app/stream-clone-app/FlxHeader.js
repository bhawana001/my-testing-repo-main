import Link from "next/link";
import { BASE, BRAND } from "./lib";

export default function FlxHeader() {
  const nav = ["Home", "Shows", "Movies", "Games", "New & Popular", "My List", "Browse by Languages"];
  return (
    <header className="flx-header">
      <Link href={BASE} className="flx-logo">
        {BRAND}
      </Link>
      <nav className="flx-nav">
        {nav.map((n) => (
          <Link key={n} href={BASE} className={n === "Home" ? "is-active" : ""}>
            {n}
          </Link>
        ))}
      </nav>
      <div className="flx-header__right">
        <span>🔍</span>
        <span>🔔</span>
        <span className="flx-badge">Children</span>
        <span>👤 ▾</span>
      </div>
    </header>
  );
}
