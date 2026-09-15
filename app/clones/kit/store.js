"use client";
// Namespaced persistent state for clone apps. Each brand gets its own key, so
// Flipkart's cart never leaks into Walmart's, and every app supports
// ?reset=true to snap back to its seed for a repeatable test run.
import { useCallback, useEffect, useState } from "react";

export function createStore(namespace, seed) {
  const KEY = `clone:${namespace}`;
  const EVENT = `clone:${namespace}:change`;

  const read = () => {
    try {
      const raw = window.localStorage.getItem(KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  };
  const write = (state) => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {}
    try {
      window.dispatchEvent(new CustomEvent(EVENT));
    } catch {}
  };
  const reset = () => {
    const fresh = structuredClone(seed);
    write(fresh);
    return fresh;
  };

  function useStore() {
    // Seed on the server and first paint so markup matches, then hydrate.
    const [state, setState] = useState(seed);
    useEffect(() => {
      const wantsReset =
        new URLSearchParams(window.location.search).get("reset") === "true";
      setState(wantsReset ? reset() : read() || reset());
      const sync = () => setState(read() || seed);
      window.addEventListener(EVENT, sync);
      window.addEventListener("storage", sync);
      return () => {
        window.removeEventListener(EVENT, sync);
        window.removeEventListener("storage", sync);
      };
    }, []);

    const update = useCallback((fn) => {
      setState((prev) => {
        const next = fn(structuredClone(prev));
        write(next);
        return next;
      });
    }, []);

    return [state, update, reset];
  }

  return { useStore, reset, KEY };
}

export const money = (n, cur = "$") =>
  cur + Number(n || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const inr = (n) =>
  "₹" + Number(n || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/** Deterministic sequential id: no Math.random, so assertions are stable. */
export function seqId(prefix, n, width = 6) {
  return `${prefix}${String(100000 + n * 137).slice(0, width)}`;
}
