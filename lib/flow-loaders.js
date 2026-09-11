// Map of "entity/flow" -> lazy loader for the flow component. A flow is "live"
// once it has an entry here; unlisted flows render the scheduled placeholder.
// Each entry is a dynamic import so Next code-splits one chunk per flow.
export const FLOW_LOADERS = {
  "amazon/add-to-cart-variant": () => import("@/app/entity-flows/amazon/add-to-cart-variant.js"),
  "amazon/order-tracking": () => import("@/app/entity-flows/amazon/order-tracking.js"),
  "chase/login-2fa": () => import("@/app/entity-flows/chase/login-2fa.js"),
  "lemonade/instant-quote": () => import("@/app/entity-flows/lemonade/instant-quote.js"),
  "slack/thread-reply": () => import("@/app/entity-flows/slack/thread-reply.js"),
  "airtable/grid-crud": () => import("@/app/entity-flows/airtable/grid-crud.js"),
  "calendly/invitee-booking": () => import("@/app/entity-flows/calendly/invitee-booking.js"),
  "netflix/playback-resume": () => import("@/app/entity-flows/netflix/playback-resume.js"),
  "amazon/one-click-checkout": () => import("@/app/entity-flows/amazon/one-click-checkout.js"),
  "shopify/guest-checkout": () => import("@/app/entity-flows/shopify/guest-checkout.js"),
  "shopify/discount-code": () => import("@/app/entity-flows/shopify/discount-code.js"),
  "shopify/checkout-extension": () => import("@/app/entity-flows/shopify/checkout-extension.js"),
  "flipkart/cart-exchange-offer": () => import("@/app/entity-flows/flipkart/cart-exchange-offer.js"),
  "flipkart/cod-checkout": () => import("@/app/entity-flows/flipkart/cod-checkout.js"),
  "walmart/store-pickup": () => import("@/app/entity-flows/walmart/store-pickup.js"),
  "walmart/grocery-substitution": () => import("@/app/entity-flows/walmart/grocery-substitution.js"),
  "walmart/membership-upsell": () => import("@/app/entity-flows/walmart/membership-upsell.js"),
  "walmart/reorder-from-history": () => import("@/app/entity-flows/walmart/reorder-from-history.js"),
  "etsy/personalized-item": () => import("@/app/entity-flows/etsy/personalized-item.js"),
  "etsy/multi-seller-cart": () => import("@/app/entity-flows/etsy/multi-seller-cart.js"),
  "ebay/buy-it-now": () => import("@/app/entity-flows/ebay/buy-it-now.js"),
  "instacart/multi-store-cart": () => import("@/app/entity-flows/instacart/multi-store-cart.js"),
  "instacart/delivery-slot-checkout": () => import("@/app/entity-flows/instacart/delivery-slot-checkout.js"),
  "instacart/tip-adjustment": () => import("@/app/entity-flows/instacart/tip-adjustment.js"),
  "nike/checkout-saved-card": () => import("@/app/entity-flows/nike/checkout-saved-card.js"),
};

export const LIVE_FLOW_KEYS = Object.keys(FLOW_LOADERS);
export function hasFlow(key) {
  return Object.prototype.hasOwnProperty.call(FLOW_LOADERS, key);
}
