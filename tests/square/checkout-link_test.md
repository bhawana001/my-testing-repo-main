---
mode: testing
url: https://my-testing-repo-main.vercel.app/square/checkout-link?reset=true
max_steps: 40
tags: [square, payments-infra, checkout]
---

# Squarely 12.1: Online checkout link

Catalog objective: complete a Squarely checkout link with a test card.
Key assertion: the receipt page shows the correct amount.

## Open the checkout link
Go to https://my-testing-repo-main.vercel.app/square/checkout-link?reset=true and verify "Pay Bean There Coffee" with amount "$35.00" and the note "Squarely Online Checkout link".

## Pay
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the "Pay $35.00" button, and verify the heading "Receipt" appears.

## Verify the receipt
Verify "Amount paid" reads "$35.00", "Receipt #" reads "R-000731" and "Merchant" reads "Bean There Coffee".
