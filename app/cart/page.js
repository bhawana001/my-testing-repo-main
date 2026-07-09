"use client";

import { useState } from "react";

const PRICE = 24;

export default function CartDemo() {
  const [cartCount, setCartCount] = useState(0);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAddToCart() {
    setError("");
    setLoading(true);

    try {
      // 1. POST the product to the cart API.
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: "stoneware-mug", qty: 1 }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const { cartId } = await res.json();

      // 2 & 3. Demo logging for DevTools console inspection.
      console.log("Cart updated successfully. Cart ID:", cartId);
      console.warn("Demo mode: payment step skipped");

      // 4. Set a cookie with the cart id.
      document.cookie = `cart_id=${cartId}; path=/; max-age=86400; SameSite=Lax`;

      // 5. Persist the cart to localStorage.
      localStorage.setItem(
        "cart",
        JSON.stringify({ item: "stoneware-mug", qty: 1 })
      );

      // 6. Update the visible UI.
      setCartCount((c) => c + 1);
      setAdded(true);
    } catch (err) {
      // 7. Surface any failure.
      console.error("Add to cart failed", err);
      setError("Something went wrong adding to your cart. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="shop">
      {/* Top bar with cart badge */}
      <header className="shop__bar">
        <div className="container shop__bar-inner">
          <div className="logo">
            <span className="logo__mark" />
            <span>Stoneware&nbsp;Co.</span>
          </div>

          <div
            className="cart-badge"
            aria-label={`Cart: ${cartCount} item${cartCount === 1 ? "" : "s"}`}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && <span className="cart-badge__count">{cartCount}</span>}
          </div>
        </div>
      </header>

      {/* Product card */}
      <section className="product">
        <div className="product__card">
          <div className="product__media" aria-hidden="true">
            <span className="product__mug">☕</span>
          </div>

          <div className="product__info">
            <p className="product__eyebrow">Handmade · Kiln-fired</p>
            <h1 className="product__title">Stoneware Mug</h1>
            <p className="product__desc">
              A weighty, matte-glazed mug that keeps coffee warm and feels good
              in the hand. Microwave and dishwasher safe.
            </p>

            <div className="product__priceRow">
              <span className="product__price">${PRICE.toFixed(2)}</span>
              <span className="product__stock">In stock</span>
            </div>

            <button
              className="btn btn--primary btn--block"
              onClick={handleAddToCart}
              disabled={loading}
            >
              {loading ? "Adding…" : added ? "Added ✓" : "Add to Cart"}
            </button>

            {error && (
              <p className="product__error" role="alert">
                {error}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
