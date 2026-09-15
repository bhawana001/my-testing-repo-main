"use client";
// One cart shared by every route in the clone. The storefront, the product
// page and the header all read and write this, so adding from a product page
// updates the header count and the cart drawer without a reload.
//
// sessionStorage (not local) keeps the existing contract with /checkout, which
// already reads this key, and means a fresh browser starts with an empty cart.
import { useCallback, useEffect, useState } from "react";

export const CART_KEY = "shopkart_cart";
export const CART_EVENT = "shopkart:cart";

export function readCart() {
  try {
    const raw = sessionStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
export function writeCart(items) {
  try {
    sessionStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {}
  try {
    window.dispatchEvent(new CustomEvent(CART_EVENT));
  } catch {}
}

/** Add a line, merging with an existing line for the same product+variant. */
export function addLine(line) {
  const items = readCart();
  const match = items.find((i) => i.id === line.id && (i.variant || "") === (line.variant || ""));
  if (match) match.qty += line.qty;
  else items.push(line);
  writeCart(items);
  return items;
}

export function useCart() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const sync = () => setItems(readCart());
    sync();
    window.addEventListener(CART_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CART_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  const set = useCallback((next) => {
    writeCart(next);
    setItems(next);
  }, []);
  return [items, set];
}

export const cartCount = (items) => items.reduce((s, i) => s + i.qty, 0);
export const cartSubtotal = (items) => items.reduce((s, i) => s + i.price * i.qty, 0);
