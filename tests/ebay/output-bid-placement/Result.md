---
test: ../bid-placement_test.md
status: failed
started: 2026-09-15T10:15:48.578Z
duration_s: 161
session_id: d4e937a9-6c8d-49e7-a01d-5b91cf3253d2
---

# eBid 6.1: Bid placement — Result

## Open an auction listing ✓ passed (53.9s)
md5: ac6dc6b665c010f0fff2883d3eab891e
Click "Vintage Rangefinder Camera 35mm" and verify the listing shows a current bid of "$82.00", "7" bids and high bidder "m_torres".

## Reject a bid below the minimum ✓ passed (37.7s)
md5: b83a92002b4d1a5f82449772fd01bcd6
Type "83" into the bid field, click "Place bid", and verify an error appears reading "Your bid must be at least $84.50."

## Place a winning bid ✗ failed (67s)
md5: bcf7bdbb7419e3e08f1d430e606a663f
Reason: Final verification failed: "the page shows "Bid placed" with an amount of "$90.00"" — bug verdict: Successful bid lacks placement confirmation [application_issue/functional_defect, confidence 0.91]
Clear the bid field, type "90", click "Place bid", and verify the page shows "Bid placed" with an amount of "$90.00".

## Confirm the bid is recorded ✓ passed (—)
md5: 93aa88a3efa1f7def07ffaa187c1a36d
Click "My eBid" and verify the bids list shows "Vintage Rangefinder Camera 35mm" at "$90.00" with status "High bidder".
