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
};

export const LIVE_FLOW_KEYS = Object.keys(FLOW_LOADERS);
export function hasFlow(key) {
  return Object.prototype.hasOwnProperty.call(FLOW_LOADERS, key);
}
