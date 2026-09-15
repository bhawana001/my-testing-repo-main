"use client";
// Etsi (Etsy) clone: a marketplace of independent shops. Items can require
// personalization text, carts span multiple shops each with their own shipping,
// favorites persist, and delivered orders can be reviewed with a photo.
import { createStore, money } from "../clones/kit/store";

export const BRAND = {
  name: "Etsi", slug: "etsy", mark: "🧵",
  home: "/etsy-clone-app", accent: "#d5641c", accentText: "#fff", bg: "#fbf7f2",
};
export const BASE = "/etsy-clone-app";
export { money };

export const SHOPS = [
  { id: "sh_kiln", name: "KilnAndClay", location: "Portland, OR", shipping: 5.5, rating: 4.9, sales: 12480 },
  { id: "sh_press", name: "PaperPressCo", location: "Asheville, NC", shipping: 3.25, rating: 4.8, sales: 6310 },
  { id: "sh_wood", name: "NorthGrainWood", location: "Burlington, VT", shipping: 8.0, rating: 5.0, sales: 2140 },
];
export const findShop = (id) => SHOPS.find((s) => s.id === id) || null;

export const LISTINGS = [
  { id: "l_mug", shopId: "sh_kiln", title: "Hand-thrown Speckled Mug", price: 34.0, emoji: "🍵",
    personalize: false, tags: ["ceramic", "mug", "kitchen"] },
  { id: "l_platter", shopId: "sh_kiln", title: "Stoneware Serving Platter", price: 68.0, emoji: "🍽️",
    personalize: false, tags: ["ceramic", "serving"] },
  { id: "l_print", shopId: "sh_press", title: "Custom Name Letterpress Print", price: 42.0, emoji: "🖼️",
    personalize: true, personalizeLabel: "Name to print (max 20 characters)", personalizeMax: 20,
    tags: ["print", "custom", "gift"] },
  { id: "l_card", shopId: "sh_press", title: "Letterpress Card Set of 6", price: 18.0, emoji: "💌",
    personalize: false, tags: ["paper", "cards"] },
  { id: "l_board", shopId: "sh_wood", title: "Engraved Walnut Cutting Board", price: 78.0, emoji: "🪵",
    personalize: true, personalizeLabel: "Engraving text (max 24 characters)", personalizeMax: 24,
    tags: ["wood", "custom", "kitchen"] },
];
export const findListing = (id) => LISTINGS.find((l) => l.id === id) || null;

const SEED = {
  cart: [],
  favorites: [],
  orders: [
    { id: "ET-4471", placedAt: "2026-08-20", status: "delivered", deliveredOn: "August 27, 2026",
      items: [{ id: "l_mug", title: "Hand-thrown Speckled Mug", shopId: "sh_kiln", price: 34.0, qty: 1, personalization: "" }],
      total: 39.5 },
  ],
  reviews: [],
  counter: 4471,
};

export const { useStore, reset } = createStore("etsy", SEED);

/** Group cart lines by shop so each shop's shipping is charged separately. */
export function groupByShop(cart) {
  const groups = {};
  for (const line of cart) {
    (groups[line.shopId] = groups[line.shopId] || []).push(line);
  }
  return Object.entries(groups).map(([shopId, lines]) => {
    const shop = findShop(shopId);
    const items = lines.reduce((s, l) => s + l.price * l.qty, 0);
    return { shop, lines, items: +items.toFixed(2), shipping: shop.shipping, total: +(items + shop.shipping).toFixed(2) };
  });
}

export function cartTotals(cart) {
  const groups = groupByShop(cart);
  const items = groups.reduce((s, g) => s + g.items, 0);
  const shipping = groups.reduce((s, g) => s + g.shipping, 0);
  return { groups, items: +items.toFixed(2), shipping: +shipping.toFixed(2), total: +(items + shipping).toFixed(2) };
}
