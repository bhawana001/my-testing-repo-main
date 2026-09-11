"use client";
// Simulated outbound email. Flows call sendEmail(); /inbox lists everything "sent".
// Stored per browser in localStorage under ee:inbox, independent of flow resets.
export const INBOX_KEY = "ee:inbox";
export function readInbox() {
  try { return JSON.parse(window.localStorage.getItem(INBOX_KEY) || "[]"); } catch { return []; }
}
export function sendEmail({ to, subject, body = "", from = "no-reply@evals.dev", flow = "" }) {
  try {
    const list = readInbox();
    const n = list.length + 1;
    list.unshift({ id: "msg-" + n, to, from, subject, body, flow, at: "Sep 14, 2026 · 10:" + String(n % 60).padStart(2, "0") + " AM" });
    window.localStorage.setItem(INBOX_KEY, JSON.stringify(list.slice(0, 200)));
  } catch {}
}
export function clearInbox() {
  try { window.localStorage.removeItem(INBOX_KEY); } catch {}
}
