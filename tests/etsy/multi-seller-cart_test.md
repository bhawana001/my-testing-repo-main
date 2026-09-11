---
mode: testing
url: https://my-testing-repo-main.vercel.app/etsy/multi-seller-cart?reset=true
max_steps: 40
tags: [etsy, e-commerce, checkout]
---

# Etsily 5.3: Cart with multiple sellers

Catalog objective: add items from two shops and verify shipping is calculated per shop.
Key assertion: two shipping lines with separate totals.

## Open the cart
Go to https://my-testing-repo-main.vercel.app/etsy/multi-seller-cart?reset=true and verify the cart lists "Custom Name Ceramic Mug" sold by "ClayWorks Studio" and "Botanical Art Print A3" sold by "Fernhouse Prints".

## Verify per-shop shipping
Verify the order summary shows two separate shipping rows: "Shipping · ClayWorks Studio" at "$4.50" and "Shipping · Fernhouse Prints" at "$6.25".

## Verify the total
Verify the "Subtotal" row reads "$57.00" and the "Order total" row reads "$67.75" ($57.00 + $4.50 + $6.25).
