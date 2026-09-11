// Deterministic market data. Prices never move on their own; "ticks" follow a fixed script.
export const STOCKS = [
  { sym: "NOVA", name: "Nova Corp", price: 182.4, prev: 179.9 },
  { sym: "ACME", name: "Acme Industries", price: 64.1, prev: 65.02 },
  { sym: "ORBT", name: "Orbit Space", price: 23.75, prev: 22.1 },
  { sym: "HLIX", name: "Helix Bio", price: 411.2, prev: 405.0 },
  { sym: "VOLT", name: "Volt Motors", price: 248.6, prev: 251.3 },
];
export const TICK_SCRIPT = [
  { NOVA: 183.1, ACME: 63.8, ORBT: 24.0, HLIX: 409.5, VOLT: 250.0 },
  { NOVA: 184.25, ACME: 64.4, ORBT: 23.6, HLIX: 412.0, VOLT: 247.1 },
  { NOVA: 181.9, ACME: 65.0, ORBT: 24.3, HLIX: 414.8, VOLT: 249.4 },
];
export const NSE = [
  { sym: "INFX", name: "Infoxis Ltd", ltp: 1540.0, prev: 1522.3, lower: 1386.0, upper: 1694.0 },
  { sym: "RELX", name: "Relianz Industries", ltp: 2912.5, prev: 2940.0, lower: 2621.25, upper: 3203.75 },
  { sym: "TCSX", name: "Tata Consultz", ltp: 3988.0, prev: 3960.1, lower: 3589.2, upper: 4386.8 },
  { sym: "HDFX", name: "HDFB Bank", ltp: 1612.4, prev: 1605.0, lower: 1451.15, upper: 1773.65 },
];
export const CRYPTO = [
  { sym: "BTC", name: "Bitcoin", price: 65000.0 },
  { sym: "ETH", name: "Ethereum", price: 3120.0 },
  { sym: "SOL", name: "Solana", price: 148.5 },
];
export function stock(sym) { return STOCKS.find((s) => s.sym === sym); }
export function pct(a, b) { return ((a - b) / b) * 100; }
