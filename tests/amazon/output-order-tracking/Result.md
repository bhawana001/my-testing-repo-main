---
test: ../order-tracking_test.md
status: passed
started: 2026-09-15T09:12:21.091Z
duration_s: 101
session_id: c30457ab-e1da-4e30-89ba-2d498ca92026
---

# ShopKart 1.4: Order tracking — Result

## Confirm the order list ✓ passed (34.2s)
md5: 39d69838e2c9d76c77d9cfbb15cacdad
Verify the orders page lists "3 orders" including order "112-8830571-2094318" with status text containing "Arriving Tuesday, September 16".

## Open tracking for the in-transit order ✓ passed (43.5s)
md5: 36cf0ed56714bbed68c838cec2c329c1
Click "Track package" on order "112-8830571-2094318" and verify the detail page shows "Arriving Tuesday, September 16" and "ShopKart Logistics · Tracking ID TBA304991285001".

## Confirm the timeline stage ✓ passed (21.7s)
md5: dfbd93e8fad2ff55b0a13be74d844d24
Verify the timeline lists the steps "Ordered", "Shipped", "Out for delivery" and "Delivered", and that "Shipped" is marked "Current status".
