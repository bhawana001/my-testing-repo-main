---
mode: testing
url: https://my-testing-repo-main.vercel.app/amazon/one-click-checkout?reset=true
max_steps: 40
tags: [amazon, e-commerce, checkout]
---

# Amazonia 1.3: One-click checkout

Catalog objective: buy an item with saved address and payment, reach order confirmation.
Key assertion: an order number is shown and the total matches the product page price.

## Open the 1-Click page
Go to https://my-testing-repo-main.vercel.app/amazon/one-click-checkout?reset=true and verify the item "AuraBuds Pro Wireless Earbuds" is listed and the note reads "Product page price: $129.00".

## Check the saved address and payment
Verify the summary shows "Ship to: Demo User, 1200 Market St, San Francisco", "Pay with: Visa •••• 4242" and the "Order total" row reads "$129.00".

## Place the order
Click the "Place your order (1-Click)" button and verify the text "Order placed" is shown.

## Verify the confirmation
Verify an "Order number" starting with "112-" is displayed and the "Order total" on the confirmation reads "$129.00", matching the product page price.
