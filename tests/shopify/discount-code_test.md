---
mode: testing
url: https://my-testing-repo-main.vercel.app/shopify/discount-code?reset=true
max_steps: 40
tags: [shopify, e-commerce, checkout]
---

# Shopifly 2.2: Discount code application

Catalog objective: apply a discount code at checkout and verify the reduced total.
Key assertion: the discount line item matches the expected percent.

## Open the cart
Go to https://my-testing-repo-main.vercel.app/shopify/discount-code?reset=true and verify the "Subtotal" row reads "$79.00" and the "Total" row reads "$85.00" (with $6.00 shipping) and no Discount row is shown.

## Try an invalid code
Type "BOGUS" into the "Discount code" field, click "Apply", and verify the message "Code “BOGUS” is not valid." is shown.

## Apply SAVE10
Type "SAVE10" into the "Discount code" field, click "Apply", and verify the badge "SAVE10 applied" is shown.

## Verify the discount math
Verify a "Discount" row reads "−$7.90" (10% of $79.00) and the "Total" row now reads "$77.10".
