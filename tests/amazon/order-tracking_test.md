---
mode: testing
url: https://my-testing-repo-main.vercel.app/amazon/order-tracking?reset=true
max_steps: 30
tags: [amazon, e-commerce, tracker]
---

# Amazonia 1.4: Order tracking

Catalog objective: open recent orders and check the delivery status of the latest order.
Key assertion: the status timeline renders with a valid date.

## Open recent orders
Go to https://my-testing-repo-main.vercel.app/amazon/order-tracking?reset=true and verify the heading "Your Orders" is visible with three order cards, the first one placed on "September 12, 2026" containing "AuraBuds Pro Wireless Earbuds".

## Track the latest order
Click the "Track package" button on the first (latest) order card. Verify the tracking view shows the status badge "Shipped" and the heading "Arriving Tuesday, September 15, 2026".

## Verify the timeline dates
Verify the timeline lists the steps "Ordered", "Shipped", "Out for delivery" and "Delivered" in that order, that "Ordered" is marked complete, and that the "Shipped" step shows the date "Sunday, September 13, 2026 · 6:40 PM".
