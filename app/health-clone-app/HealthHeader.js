import Link from "next/link";
import { BASE } from "./lib";

export default function HealthHeader({ active }) {
  const nav = [
    { label: "Find Doctors", href: `${BASE}` },
    { label: "Video Consult", href: `${BASE}/video-consult` },
    { label: "Lab Tests", href: `${BASE}` },
    { label: "Surgeries", href: `${BASE}` },
  ];
  return (
    <header className="h-header">
      <div className="h-header__row">
        <Link href={BASE} className="h-logo">
          <span className="dot" />
          practo
          <span className="dot" />
        </Link>
        <nav className="h-nav">
          {nav.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className={active === n.label ? "is-active" : ""}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="h-header__right">
          <span>
            <span className="h-badge">NEW</span>For Corporates ▾
          </span>
          <span>For Providers ▾</span>
          <span>Security &amp; help ▾</span>
          <span className="h-login">Login / Signup</span>
        </div>
      </div>
    </header>
  );
}
