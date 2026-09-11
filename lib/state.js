"use client";
// Deterministic, resettable per-flow state for Entity Evals.
// Every flow keeps its state in localStorage under `ee:{entity}:{flow}` and can
// be restored to seeded data via the visible Reset button or `?reset=true`.
import { useCallback, useEffect, useRef, useState } from "react";

export const RESET_EVENT = "ee:reset";

export function storageKey(entitySlug, flowSlug) {
  return `ee:${entitySlug}:${flowSlug}`;
}

function safeGet(key) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}
function safeSet(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}
export function clearState(key) {
  try {
    const drop = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k === key || (k && k.startsWith(key + ":"))) drop.push(k);
    }
    drop.forEach((k) => window.localStorage.removeItem(k));
  } catch {}
}
export function resetRequested() {
  if (typeof window === "undefined") return false;
  const p = new URLSearchParams(window.location.search);
  return p.get("reset") === "true";
}
export function chaosRequested() {
  if (typeof window === "undefined") return false;
  const p = new URLSearchParams(window.location.search);
  return p.get("chaos") === "true";
}
/** Broadcast a reset so every hook bound to `key` re-seeds. */
export function broadcastReset(key) {
  clearState(key);
  window.dispatchEvent(new CustomEvent(RESET_EVENT, { detail: key }));
}

/**
 * useFlowState(key, seed) -> [state, setState, reset, hydrated]
 * - `seed` is a value or a function returning the seeded state.
 * - State is persisted on every change and restored on mount.
 * - `?reset=true` in the URL discards persisted state before hydration.
 */
export function useFlowState(key, seed) {
  const seedFn = useRef(typeof seed === "function" ? seed : () => seed);
  const [state, setStateRaw] = useState(() => seedFn.current());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (resetRequested()) clearState(key);
    const persisted = safeGet(key);
    if (persisted !== undefined) setStateRaw(persisted);
    setHydrated(true);
    const onReset = (e) => {
      if (!e.detail || e.detail === key) setStateRaw(seedFn.current());
    };
    window.addEventListener(RESET_EVENT, onReset);
    return () => window.removeEventListener(RESET_EVENT, onReset);
  }, [key]);

  useEffect(() => {
    if (hydrated) safeSet(key, state);
  }, [key, state, hydrated]);

  const setState = useCallback((updater) => {
    setStateRaw((prev) => (typeof updater === "function" ? updater(prev) : updater));
  }, []);
  const reset = useCallback(() => broadcastReset(key), [key]);
  return [state, setState, reset, hydrated];
}

/** Small deterministic helpers shared by flows. */
export function seq(prefix, n, width = 6) {
  return `${prefix}${String(n).padStart(width, "0")}`;
}
export function nowStamp(base = 0) {
  // Deterministic "clock": fixed epoch + offset, so screenshots and assertions
  // never depend on wall time.
  return new Date(Date.UTC(2026, 8, 14, 10, 0, 0) + base).toISOString();
}
