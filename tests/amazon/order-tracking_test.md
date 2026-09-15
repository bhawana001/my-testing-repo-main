---
mode: testing
url: https://my-testing-repo-main.vercel.app/shop-clone-app/orders?reset=true
max_steps: 40
tags: [amazon, e-commerce, tracking]
---

# ShopKart 1.4: Order tracking

Catalog objective: open recent orders and track a shipment.
Key assertion: status timeline renders with the current stage.

## Confirm the order list
Verify the orders page lists "3 orders" including order "112-8830571-2094318" with status text containing "Arriving Tuesday, September 16".

## Open tracking for the in-transit order
Click "Track package" on order "112-8830571-2094318" and verify the detail page shows "Arriving Tuesday, September 16" and "ShopKart Logistics · Tracking ID TBA304991285001".

## Confirm the timeline stage
Verify the timeline lists the steps "Ordered", "Shipped", "Out for delivery" and "Delivered", and that "Shipped" is marked "Current status".
