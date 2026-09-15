---
test: ../bid-placement_test.md
status: passed
started: 2026-09-13T10:26:11.903Z
duration_s: 122
session_id: d81f46f4-eff9-47c4-a1e0-a174d9319550
---

# eBidz 6.1: Bid placement — Result

## Open the auction ✓ passed (33s)
md5: c3cc3c59e8866720629047232d3c0731
Go to https://my-testing-repo-main.vercel.app/ebay/bid-placement?reset=true and verify the listing "Vintage Automatic Watch · 1974 · Serviced" shows "Current bid" "$120.00", "7 bids" and a high bidder other than you.

## Bid below the minimum ✓ passed (25.3s)
md5: 1adc7aa8c0368a6b8e886549f0d27e59
Type "121" into "Your max bid", click "Place bid", and verify the message "Enter $122.50 or more." is shown.

## Bid above the rival ✓ passed (32.8s)
md5: 01aa889daeeff186861159f028e0da36
Clear the bid field, type "130", click "Place bid", and verify the message "You're the high bidder at $127.50. Your maximum bid is $130.00." appears.

## Verify the bid registered ✓ passed (29.4s)
md5: 93aa88a3efa1f7def07ffaa187c1a36d
Verify "Current bid" reads "$127.50", the count reads "8 bids", "High bidder" shows the badge "You", and the bid history lists "You" at "$127.50".
