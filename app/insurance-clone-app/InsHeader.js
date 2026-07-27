import Link from "next/link";
import { BASE, BRAND } from "./lib";

export default function InsHeader() {
  return (
    <header className="ins-header">
      <div className="ins-container ins-header__row">
        <Link href={BASE} className="ins-logo">
          {BRAND}
        </Link>
        <nav className="ins-nav">
          <Link href={`${BASE}/auto`}>PRODUCTS ▾</Link>
          <Link href={`${BASE}/claim`}>CLAIMS CENTER ▾</Link>
          <Link href={BASE}>RESOURCE CENTER ▾</Link>
        </nav>
        <div className="ins-header__right">
          <span>🌐 ES</span>
          <Link href={`${BASE}/login`} className="ins-pill">
            Log In
          </Link>
        </div>
      </div>
    </header>
  );
}
