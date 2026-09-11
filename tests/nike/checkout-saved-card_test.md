---
mode: testing
url: https://my-testing-repo-main.vercel.app/nike/checkout-saved-card?reset=true
max_steps: 40
tags: [nike, e-commerce, checkout]
---

# Nyke 8.4: Checkout with saved card

Catalog objective: check out a cart item with saved payment.
Key assertion: the order confirmation shows the correct size and price.

## Open the cart
Go to https://my-testing-repo-main.vercel.app/nike/checkout-saved-card?reset=true and verify the cart contains "Velocity Racer" with "Size: US 10 · Color: Blue" at "$139.00".

## Proceed to delivery
Click "Proceed to checkout" and verify the "Standard" shipping option is selected at "Free".

## Continue to payment
Click "Continue to payment" and verify saved cards "Visa •••• 4242" (Default) and "Mastercard •••• 4444" are listed with Visa selected.
## Pay with the saved card
Click the "Pay $149.08" button ($139.00 + $10.08 tax) and verify "Order placed" is shown.

## Verify size and price
Verify the confirmation shows the item "Velocity Racer" with "Size: US 10 · Color: Blue" at "$139.00", "Payment" as "Visa •••• 4242" and "Order total" as "$149.08".
