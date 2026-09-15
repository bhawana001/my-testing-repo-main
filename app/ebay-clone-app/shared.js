"use client";
// eBid (eBay) clone: auctions with real bid validation, Buy It Now with a saved
// card, Best Offer negotiation, and a seller listing form that publishes into
// the same searchable catalog buyers browse.
import { createStore, money } from "../clones/kit/store";

export const BRAND = {
  name: "eBid", slug: "ebay", mark: "🔨",
  home: "/ebay-clone-app", accent: "#1e3a8a", accentText: "#fff", bg: "#f4f6fa",
};
export const BASE = "/ebay-clone-app";
export { money };

export const BUYER = {
  name: "Priya Nair",
  handle: "priya_n",
  card: { brand: "Visa", last4: "4242" },
  address: "418 Maple Street, Austin TX 78701",
};

export const CONDITIONS = ["New", "Open box", "Used — excellent", "Used — good", "For parts"];

const SEED = {
  listings: [
    { id: "lst_cam", title: "Vintage Rangefinder Camera 35mm", format: "auction", emoji: "📷",
      currentBid: 82.0, bidIncrement: 2.5, bidCount: 7, highBidder: "m_torres", endsIn: "2d 04h",
      condition: "Used — excellent", seller: "retro_optics", shipping: 9.4, watchers: 31 },
    { id: "lst_watch", title: "Automatic Dive Watch 200m", format: "auction", emoji: "⌚",
      currentBid: 145.0, bidIncrement: 5.0, bidCount: 12, highBidder: "j_okafor", endsIn: "6h 12m",
      condition: "Used — good", seller: "timepiece_hut", shipping: 6.0, watchers: 88 },
    { id: "lst_head", title: "Studio Monitor Headphones", format: "bin", emoji: "🎧",
      price: 129.99, condition: "New", seller: "audio_supply", shipping: 0, bestOffer: true, watchers: 14 },
    { id: "lst_lens", title: "50mm f/1.8 Prime Lens", format: "bin", emoji: "🔭",
      price: 219.0, condition: "Open box", seller: "retro_optics", shipping: 7.5, bestOffer: true, watchers: 42 },
    { id: "lst_deck", title: "Skate Deck — Limited Run", format: "bin", emoji: "🛹",
      price: 74.5, condition: "New", seller: "board_lab", shipping: 5.0, bestOffer: false, watchers: 9 },
  ],
  bids: [],
  offers: [],
  orders: [],
  counter: 7700,
};

export const { useStore, reset } = createStore("ebay", SEED);

/** Minimum acceptable bid for an auction: current bid plus its increment. */
export function minBid(listing) {
  return +(listing.currentBid + listing.bidIncrement).toFixed(2);
}
