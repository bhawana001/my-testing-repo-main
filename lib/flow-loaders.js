// Map of "entity/flow" -> lazy loader for the flow component. A flow is "live"
// once it has an entry here; unlisted flows render the scheduled placeholder.
// Each entry is a dynamic import so Next code-splits one chunk per flow.
export const FLOW_LOADERS = {
};

export const LIVE_FLOW_KEYS = Object.keys(FLOW_LOADERS);
export function hasFlow(key) {
  return Object.prototype.hasOwnProperty.call(FLOW_LOADERS, key);
}
