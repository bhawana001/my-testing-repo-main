"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";
import { PRODUCTS, byCategory, GRID_CARDS, SLIDERS, findProduct } from "./data";
import { BASE, usd } from "./lib";
import { readCart, writeCart } from "./cart";

const HERO = [
  { emoji: "🎮", bg: "#2b2f45", label: "Gaming Store" },
  { emoji: "🎒", bg: "#3a4a63", label: "Back to School" },
  { emoji: "👗", bg: "#5a3a52", label: "Fashion Trends" },
];

const DEPARTMENTS = [
  { key: "gaming", label: "Gaming" },
  { key: "computers", label: "Electronics" },
  { key: "home", label: "Home & Kitchen" },
  { key: "fashion", label: "Clothing & Fashion" },
  { key: "toys", label: "Toys & Games" },
];

function Stars({ n }) {
  const full = Math.floor(n);
  return (
    <span>
      {"★".repeat(full)}
      {"☆".repeat(5 - full)}
    </span>
  );
}

export default function ShopApp() {
  const [cart, setCart] = useState([]); // [{ product, qty }]
  const [cartOpen, setCartOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [location, setLocation] = useState("United States");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("United States");
  const [hero, setHero] = useState(0);
  const [bounce, setBounce] = useState(false);
  const [busy, setBusy] = useState(false);
  const sliderRefs = useRef({});
  const router = useRouter();

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);

  useEffect(() => {
    const t = setInterval(() => setHero((h) => (h + 1) % HERO.length), 5000);
    return () => clearInterval(t);
  }, []);

  // The cart is shared with the product page and checkout. Hydrate from it on
  // mount, then mirror every local change back so the header count stays right.
  const hydrated = useRef(false);
  useEffect(() => {
    const lines = readCart();
    if (lines.length) {
      setCart(
        lines
          .map((l) => ({ product: findProduct(l.id), qty: l.qty }))
          .filter((i) => i.product)
      );
    }
    hydrated.current = true;
  }, []);
  useEffect(() => {
    if (!hydrated.current) return;
    writeCart(
      cart.map((i) => ({
        id: i.product.id,
        title: i.product.title,
        price: i.product.price,
        emoji: i.product.emoji,
        qty: i.qty,
      }))
    );
  }, [cart]);

  async function addToCart(product) {
    setBusy(true);
    try {
      const res = await fetch("/api/shop/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, qty: 1 }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      await res.json();
      setCart((c) => {
        const found = c.find((i) => i.product.id === product.id);
        if (found)
          return c.map((i) =>
            i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
          );
        return [...c, { product, qty: 1 }];
      });
      setBounce(true);
      setTimeout(() => setBounce(false), 250);
    } catch {
      // demo: swallow, still reflect locally
    } finally {
      setBusy(false);
    }
  }

  function setQty(id, qty) {
    setCart((c) =>
      c.map((i) => (i.product.id === id ? { ...i, qty: Number(qty) } : i))
    );
  }
  function removeItem(id) {
    setCart((c) => c.filter((i) => i.product.id !== id));
  }

  // Hand the cart to the payment page. The checkout route reads it back from
  // sessionStorage, charges the card, and shows the confirmation.
  function goToCheckout() {
    setCartOpen(false);
    router.push(`${BASE}/checkout`);
  }

  function scrollSlider(key, dx) {
    const el = sliderRefs.current[key];
    if (el) el.scrollBy({ left: dx, behavior: "smooth" });
  }

  const ProductCard = ({ p }) => (
    <div className="product-slider-card" onClick={() => setModalProduct(p)}>
      <div className="product-slider-img-wrapper">{p.emoji}</div>
      <div className="product-slider-title">{p.title}</div>
      <div className="rating-stars">
        <Stars n={p.rating} />
        <span className="rating-count">{p.ratingCount.toLocaleString()}</span>
      </div>
      <div className="product-slider-price">{usd(p.price)}</div>
      <button
        className="btn-add-cart-mini"
        onClick={(e) => {
          e.stopPropagation();
          addToCart(p);
        }}
      >
        Add to Cart
      </button>
    </div>
  );

  return (
    <>
      {/* ===== Header ===== */}
      <Header
        onOpenCart={() => setCartOpen(true)}
        onOpenDrawer={() => setDrawerOpen(true)}
        onOpenAddress={() => setAddressOpen(true)}
        location={location}
      />

      {/* ===== Hero ===== */}
      <div className="hero-container">
        <button
          className="hero-btn hero-btn-prev"
          onClick={() => setHero((h) => (h - 1 + HERO.length) % HERO.length)}
        >
          ‹
        </button>
        <button
          className="hero-btn hero-btn-next"
          onClick={() => setHero((h) => (h + 1) % HERO.length)}
        >
          ›
        </button>
        <div
          className="hero-slider"
          style={{ transform: `translateX(-${hero * 33.333}%)` }}
        >
          {HERO.map((s) => (
            <div className="hero-slide" key={s.label}>
              <div className="hero-slide-fallback" style={{ background: s.bg }}>
                {s.emoji}
              </div>
              <div className="hero-slide-overlay" />
            </div>
          ))}
        </div>
      </div>

      {/* ===== Main grid ===== */}
      <main className="main-content">
        {GRID_CARDS.map((card, idx) => {
          const items = byCategory(card.category, card.single ? 1 : 4);
          return (
            <div className={"card" + (card.single ? " card-single-item" : "")} key={card.title}>
              <h2 className="card-title">{card.title}</h2>
              {card.single ? (
                <div
                  className="card-single-img-wrapper"
                  onClick={() => items[0] && setModalProduct(items[0])}
                >
                  {items[0]?.emoji}
                </div>
              ) : (
                <div className="grid-4">
                  {items.map((p) => (
                    <div className="grid-item" key={p.id} onClick={() => setModalProduct(p)}>
                      <div className="grid-item-img">{p.emoji}</div>
                      <div className="grid-item-label">{p.title}</div>
                    </div>
                  ))}
                </div>
              )}
              <a href="#" className="card-link" onClick={(e) => e.preventDefault()}>
                {card.link}
              </a>
            </div>
          );
        })}

        {/* Sliders */}
        {SLIDERS.map((sl) => {
          const items = PRODUCTS.filter((p) => p.category === sl.category);
          const key = sl.title;
          return (
            <div className="slider-container-section" key={key}>
              <div className="slider-header">
                <h2>{sl.title}</h2>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  {sl.link}
                </a>
              </div>
              <div className="slider-wrapper">
                <button
                  className="slider-btn slider-btn-prev"
                  onClick={() => scrollSlider(key, -320)}
                >
                  ‹
                </button>
                <div
                  className="slider-list"
                  ref={(el) => (sliderRefs.current[key] = el)}
                >
                  {items.concat(items).map((p, i) => (
                    <ProductCard p={p} key={p.id + "_" + i} />
                  ))}
                </div>
                <button
                  className="slider-btn slider-btn-next"
                  onClick={() => scrollSlider(key, 320)}
                >
                  ›
                </button>
              </div>
            </div>
          );
        })}
      </main>

      {/* ===== Sign-in banner ===== */}
      <div className="signin-banner">
        <p>See personalized recommendations</p>
        <button className="btn-signin">Sign in</button>
        <div>
          <span>
            New customer?{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              Start here.
            </a>
          </span>
        </div>
      </div>


      {/* ===== Hamburger drawer ===== */}
      <div
        className={"drawer-overlay" + (drawerOpen ? " active" : "")}
        onClick={() => setDrawerOpen(false)}
      />
      <div className={"drawer-menu" + (drawerOpen ? " active" : "")}>
        <div className="drawer-header">
          <span>👤</span> Hello, Sign In
          <button className="drawer-close-btn" onClick={() => setDrawerOpen(false)}>
            ×
          </button>
        </div>
        <div className="drawer-body">
          <div className="drawer-section">
            <div className="drawer-section-title">Trending</div>
            <div className="drawer-item">Best Sellers</div>
            <div className="drawer-item">New Releases</div>
          </div>
          <div className="drawer-section">
            <div className="drawer-section-title">Shop by Department</div>
            {DEPARTMENTS.map((d) => (
              <div className="drawer-item" key={d.key} onClick={() => setDrawerOpen(false)}>
                {d.label} <span className="drawer-item-arrow">›</span>
              </div>
            ))}
          </div>
          <div className="drawer-section">
            <div className="drawer-section-title">Help & Settings</div>
            <div className="drawer-item">Your Account</div>
            <div className="drawer-item">Customer Service</div>
          </div>
        </div>
      </div>

      {/* ===== Cart drawer ===== */}
      <div className={"cart-drawer" + (cartOpen ? " active" : "")}>
        <div className="cart-drawer-header">
          Shopping Cart
          <span className="cart-drawer-close" onClick={() => setCartOpen(false)}>
            ×
          </span>
        </div>
        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <div className="cart-empty-msg">Your ShopKart cart is empty.</div>
          ) : (
            cart.map((i) => (
              <div className="cart-drawer-item" key={i.product.id}>
                <div className="cart-drawer-item-img">{i.product.emoji}</div>
                <div className="cart-drawer-item-details">
                  <div className="cart-drawer-item-title">{i.product.title}</div>
                  <div className="cart-drawer-item-price">{usd(i.product.price)}</div>
                  <div className="cart-drawer-item-actions">
                    <select
                      className="cart-qty-select"
                      value={i.qty}
                      onChange={(e) => setQty(i.product.id, e.target.value)}
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          Qty: {n}
                        </option>
                      ))}
                    </select>
                    <span
                      className="cart-item-delete"
                      onClick={() => removeItem(i.product.id)}
                    >
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-drawer-footer">
          <div className="cart-drawer-subtotal">
            <span>Subtotal:</span>
            <span>{usd(subtotal)}</span>
          </div>
          <button
            className="btn-checkout"
            disabled={cart.length === 0 || busy}
            onClick={goToCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* ===== Overlay for modals ===== */}
      <div
        className={
          "modal-overlay" + (modalProduct || addressOpen ? " active" : "")
        }
        onClick={() => {
          setModalProduct(null);
          setAddressOpen(false);
        }}
      >
        {/* Product modal */}
        {modalProduct && (
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setModalProduct(null)}>
              ×
            </span>
            <div className="modal-body">
              <div className="modal-img-container">{modalProduct.emoji}</div>
              <div className="modal-info-container">
                <h2 className="modal-product-title">{modalProduct.title}</h2>
                <div className="modal-rating">
                  <Stars n={modalProduct.rating} /> {modalProduct.rating} ·{" "}
                  {modalProduct.ratingCount.toLocaleString()} ratings
                </div>
                <div className="modal-divider" />
                <div className="modal-price-row">
                  <span>Price:</span>
                  <div className="modal-price">{usd(modalProduct.price)}</div>
                </div>
                <div className="modal-divider" />
                <div className="modal-about-title">About this item</div>
                <ul className="modal-about-list">
                  {modalProduct.about.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="modal-actions">
                  <button
                    className="btn-add-cart-modal"
                    onClick={() => {
                      addToCart(modalProduct);
                      setModalProduct(null);
                      setCartOpen(true);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Address modal */}
        {addressOpen && (
          <div className="address-modal" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setAddressOpen(false)}>
              ×
            </span>
            <div className="address-modal-header">Choose your location</div>
            <div className="address-modal-body">
              <div className="address-input-group">
                <label>Country/Region</label>
                <select value={country} onChange={(e) => setCountry(e.target.value)}>
                  {["United States", "India", "United Kingdom", "Canada", "Germany"].map(
                    (c) => (
                      <option key={c}>{c}</option>
                    )
                  )}
                </select>
              </div>
              <div className="address-input-group">
                <label>Zip or Postal Code</label>
                <input
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="e.g. 90210"
                />
              </div>
              <button
                className="btn-address-submit"
                onClick={() => {
                  setLocation(country);
                  setAddressOpen(false);
                }}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
