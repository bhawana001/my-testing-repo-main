// Demo flags: flip one to true, commit, and push to make Vercel redeploy with it.
// All false = the live site behaves exactly as it always has. Each flag is independent.
export const DEMO_FLAGS = {
  // /freshdesk/portal-ticket-view: "Sign in" becomes "Log in", moves above the
  // password field (right-aligned), and gets new id / class / data-testid / name.
  renameSignIn: false,

  // /freshdesk/portal-ticket-view: ticket #2051's detail badge wrongly reads "Resolved".
  badgeBug: false,

  // /travel-clone-app: the "Home in Noida" card moves to last in its row, reads
  // "Noida Home Stay", and gets new id / class / data-testid. Room page unchanged.
  listingMoved: false,

  // /travel-clone-app: sidebar nav + search/filters, listings shown as a list.
  travelRedesign: false,
};
