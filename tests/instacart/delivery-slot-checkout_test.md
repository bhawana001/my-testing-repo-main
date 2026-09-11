---
mode: testing
url: https://my-testing-repo-main.vercel.app/instacart/delivery-slot-checkout?reset=true
max_steps: 40
tags: [instacart, e-commerce, booking]
---

# Instakart 7.3: Delivery slot checkout

Catalog objective: choose a priority slot and complete checkout with a test card.
Key assertion: the confirmation shows the chosen window and fees.

## Open the cart and proceed
Go to https://my-testing-repo-main.vercel.app/instacart/delivery-slot-checkout?reset=true, click "Proceed to checkout", and verify a "Choose a delivery window" card lists "Priority", "Standard" and "Tomorrow morning" options.

## Choose the priority slot
Click the "Priority" option ("Today, within 60 minutes (2:00–3:00 PM)") and verify the "Fees" row reads "$4.49" ($1.50 service fee + $2.99 priority fee) and the "Order total" reads "$21.74".

## Pay
Click "Continue to payment", type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the Pay button, and verify "Order placed" is shown.

## Verify the window and fees
Verify the confirmation shows "Delivery window" as "Today, within 60 minutes (2:00–3:00 PM)", "Order total" as "$21.74" and "Arrives" as "Today, within 60 minutes (2:00–3:00 PM)".
