---
mode: testing
url: https://my-testing-repo-main.vercel.app/shopify-clone-app?reset=true
max_steps: 45
tags: [shopify, e-commerce, discount]
---

# Shoplify 2.2: Discount code application

Catalog objective: apply a discount code at checkout and verify the reduced total.
Key assertion: discount line item matches the expected percent.

## Add a product and open checkout
Click "Add to cart" on "Heavyweight Cotton Tee", click "View cart", click "Checkout", and verify the order summary shows a Total of "$41.06".

## Apply an invalid code first
Type "NOTACODE" into the "Discount code" field, click "Apply", and verify an error appears reading "Discount code NOTACODE isn't valid for this order."

## Apply the ten percent code
Clear the discount field, type "WELCOME10", click "Apply", and verify a badge appears reading "WELCOME10 (10% off) applied".

## Confirm the discounted total
Verify the summary shows a discount line "Discount (WELCOME10)" of "−$3.20" and a Total of "$37.60".
