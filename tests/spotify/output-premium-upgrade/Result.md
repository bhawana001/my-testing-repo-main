---
test: ../premium-upgrade_test.md
status: passed
started: 2026-09-13T19:22:23.457Z
duration_s: 167
session_id: 7f31a836-69e6-4753-b701-9d3bb6991ee0
---

# Spotifly 48.1: Premium upgrade flow — Result

## Free with ads ✓ passed (39.6s)
md5: 9acf9fe9077117317066f98ae45df2d3
Go to https://my-testing-repo-main.vercel.app/spotify/premium-upgrade?reset=true and verify the "Free" badge, an "Advertisement" banner, and "Listening: With ads".

## Pick a plan ✓ passed (54.3s)
md5: 0808c34079ad8c999c80da850b1fb83f
Click "Upgrade to Premium", keep "Individual" ($10.99/mo), click "Continue", and verify the payment form "Premium Individual · $10.99/month".

## Pay ✓ passed (46.8s)
md5: 256a2a2fe6d74b2f22673388607fd349
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click "Buy Premium", and verify the Home screen returns.

## Verify premium ✓ passed (24.5s)
md5: b2b796f7a66501bd29116720dbc896f6
Verify the badge reads "Premium Individual", the advertisement banner is gone, and "Listening" reads "Ad-free ✓".
