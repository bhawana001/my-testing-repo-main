---
mode: testing
url: https://my-testing-repo-main.vercel.app/flipkart/cod-checkout?reset=true
max_steps: 40
tags: [flipkart, e-commerce, checkout]
---

# Flipmart 3.3: COD checkout

Catalog objective: complete a checkout choosing cash on delivery.
Key assertion: the confirmation shows COD as the payment mode.

## Open the cart and proceed
Go to https://my-testing-repo-main.vercel.app/flipkart/cod-checkout?reset=true, verify the cart shows "Stride Runner 3" at "₹2,499.00", then click "Place order" and verify the Delivery step with a shipping address is shown.

## Continue to payment
Click "Continue to payment" and verify the payment options "UPI", "Credit / debit card" and "Cash on delivery" are listed.

## Choose cash on delivery
Click the "Cash on delivery" option, click the "Place order" button, and verify "Order placed" is shown.

## Verify the payment mode
Verify the confirmation shows an Order number starting with "OD-", "Payment" as "Cash on delivery" and "Order total" as "₹2,499.00".
