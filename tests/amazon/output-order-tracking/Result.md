---
test: ../order-tracking_test.md
status: passed
started: 2026-09-11T11:24:43.992Z
duration_s: 115
session_id: 9f52443d-0898-4a00-8972-68903681dc66
---

# Amazonia 1.4: Order tracking — Result

## Open recent orders ✓ passed (40.2s)
md5: 78ebf18a60f0134f88169f37cb920d73
Go to https://my-testing-repo-main.vercel.app/amazon/order-tracking?reset=true and verify the heading "Your Orders" is visible with three order cards, the first one placed on "September 12, 2026" containing "AuraBuds Pro Wireless Earbuds".

## Track the latest order ✓ passed (40.6s)
md5: 86826154ac7d1026ef1a5ee66b642a90
Click the "Track package" button on the first (latest) order card. Verify the tracking view shows the status badge "Shipped" and the heading "Arriving Tuesday, September 15, 2026".

## Verify the timeline dates ✓ passed (30s)
md5: 8aa6e37b3a1fb117b9f310cfdc5e4e0c
Verify the timeline lists the steps "Ordered", "Shipped", "Out for delivery" and "Delivered" in that order, that "Ordered" is marked complete, and that the "Shipped" step shows the date "Sunday, September 13, 2026 · 6:40 PM".
