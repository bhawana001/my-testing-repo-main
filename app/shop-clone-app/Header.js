"use client";
// The storefront header, shared by every route. The search box submits to /s,
// the cart badge tracks the live cart, and Returns & Orders goes to the real
// order list -- on the home page these were decorative.
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AmazonLogo from "./AmazonLogo";
import { BASE } from "./lib";
import { useCart, cartCount } from "./cart";

export default function Header({ initialQuery = "", onOpenCart, onOpenDrawer, onOpenAddress, location = "United States" }) {
  const [q, setQ] = useState(initialQuery);
  const [dept, setDept] = useState("All Departments");
  const router = useRouter();
  const [items] = useCart();
  const count = cartCount(items);

  function submit(e) {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    const params = new URLSearchParams({ k: term });
    if (dept !== "All Departments") params.set("dept", dept);
    router.push(`${BASE}/s?${params.toString()}`);
  }

  return (
    <header>
      <div className="header-top">
        <Link href={BASE} className="header-logo">
          <AmazonLogo />
          <span className="slogan">.com</span>
        </Link>

        <div className="header-location" onClick={onOpenAddress}>
          <div className="location-icon">📍</div>
          <div className="location-text">
            <span>Deliver to</span>
            <span>{location}</span>
          </div>
        </div>

        <form className="header-search" onSubmit={submit} role="search">
          <select className="search-select" aria-label="Category" value={dept} onChange={(e) => setDept(e.target.value)}>
            <option>All Departments</option>
            <option>Gaming</option>
            <option>Electronics</option>
            <option>Home &amp; Kitchen</option>
            <option>Clothing &amp; Fashion</option>
          </select>
          <input
            className="search-input"
            name="k"
            placeholder="Search ShopKart"
            aria-label="Search ShopKart"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="search-button" type="submit" aria-label="Search">🔍</button>
        </form>

        <div className="header-actions">
          <div className="nav-item">
            <span>EN</span>
            <span>🇺🇸 ▾</span>
          </div>
          <Link href={`${BASE}/orders`} className="nav-item">
            <span>Hello, Priya</span>
            <span>Account &amp; Lists ▾</span>
          </Link>
          <Link href={`${BASE}/orders`} className="nav-item">
            <span>Returns</span>
            <span>&amp; Orders</span>
          </Link>
          <button className="header-cart" onClick={onOpenCart} aria-label={`Cart, ${count} items`}>
            <div className="cart-icon-wrapper">
              <span style={{ fontSize: 26 }}>🛒</span>
              <span className="cart-count">{count}</span>
            </div>
            <span className="cart-text">Cart</span>
          </button>
        </div>
      </div>

      <div className="header-sub-nav">
        <button className="sub-nav-menu-btn" onClick={onOpenDrawer}>☰ All</button>
        <div className="sub-nav-links">
          {["Today's Deals", "Customer Service", "Registry", "Gift Cards", "Sell"].map((l) => (
            <a key={l} href="#" className="sub-nav-link" onClick={(e) => e.preventDefault()}>{l}</a>
          ))}
        </div>
        <div className="sub-nav-promo">
          <Link href={`${BASE}/orders`}>Track your ShopKart packages</Link>
        </div>
      </div>
    </header>
  );
}
