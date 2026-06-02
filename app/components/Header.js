"use client";

import { useState } from "react";
import Link from "next/link";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          <span className="logo__mark" />
          Acme
        </Link>

        {/* Desktop nav — hidden under 640px via CSS */}
        <nav className="nav">
          {LINKS.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger — shown only under 640px via CSS */}
        <button
          className="hamburger"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <>
          <div className="overlay" onClick={() => setOpen(false)} />
          <nav className="mobile-menu open" aria-label="Mobile">
            <button
              className="mobile-menu__close"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            {LINKS.map((l) => (
              <Link key={l.label} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
          </nav>
        </>
      )}
    </header>
  );
}
