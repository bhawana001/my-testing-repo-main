"use client";
import { TopBar } from "../clones/kit/ui";
import { BRAND, BASE } from "./shared";

export default function Nav() {
  return (
    <TopBar brand={BRAND} nav={[
      { href: BASE, label: "Book", testId: "nav-book" },
      { href: `${BASE}/availability`, label: "Availability", testId: "nav-availability" },
      { href: `${BASE}/bookings`, label: "Bookings", testId: "nav-bookings" },
    ]} />
  );
}
