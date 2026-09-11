// Pure, deterministic cart math shared by every checkout skin.
import { round2 } from "../seed/index.js";

/**
 * @param {Array<{id:string,name:string,price:number,qty:number,seller?:string,variant?:object,exchange?:number,personalization?:string}>} lines
 * @param {{coupon?:{code:string,type:"percent"|"fixed"|"shipping",value:number,min?:number}|null,
 *          shipping?:number, shippingBySeller?:Record<string,number>, taxRate?:number,
 *          tip?:number, fees?:Array<{label:string,amount:number}>, membershipDiscount?:number}} opts
 */
export function computeTotals(lines, opts = {}) {
  const subtotal = round2(lines.reduce((s, l) => s + l.price * (l.qty || 1), 0));
  const exchange = round2(lines.reduce((s, l) => s + (l.exchange || 0), 0));
  let discount = 0;
  let couponError = null;
  const c = opts.coupon;
  if (c) {
    if (c.min && subtotal < c.min) couponError = `Add ${c.min - subtotal} more to use ${c.code}`;
    else if (c.type === "percent") discount = round2(subtotal * (c.value / 100));
    else if (c.type === "fixed") discount = Math.min(subtotal, c.value);
  }
  let shipping = opts.shipping || 0;
  const shippingLines = [];
  if (opts.shippingBySeller) {
    shipping = 0;
    for (const [seller, amt] of Object.entries(opts.shippingBySeller)) {
      shippingLines.push({ seller, amount: amt });
      shipping += amt;
    }
  }
  if (c && c.type === "shipping" && !couponError) {
    discount = round2(discount + shipping);
  }
  const fees = (opts.fees || []).reduce((s, f) => s + f.amount, 0);
  const taxable = Math.max(0, subtotal - discount - exchange);
  const tax = round2(taxable * (opts.taxRate || 0));
  const tip = opts.tip || 0;
  const total = round2(taxable + shipping + fees + tax + tip);
  return { subtotal, discount, exchange, shipping, shippingLines, fees, tax, tip, total, couponError };
}

export const COUPONS = {
  SAVE10: { code: "SAVE10", type: "percent", value: 10 },
  SAVE20: { code: "SAVE20", type: "percent", value: 20 },
  FLAT15: { code: "FLAT15", type: "fixed", value: 15 },
  FREESHIP: { code: "FREESHIP", type: "shipping", value: 0 },
  BIG50: { code: "BIG50", type: "percent", value: 50, min: 500 },
};
export function lookupCoupon(code) {
  return COUPONS[String(code || "").trim().toUpperCase()] || null;
}
export function orderNumber(prefix, n) {
  return `${prefix}-${String(100000 + n)}`;
}
