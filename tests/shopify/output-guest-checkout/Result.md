---
test: ../guest-checkout_test.md
status: passed
started: 2026-09-15T09:17:15.944Z
duration_s: 257
session_id: d98a48c0-d1d8-4ce3-9b71-30c9ae64d795
---

# Shoplify 2.1: Storefront guest checkout — Result

## Add a product to the cart ✓ passed (32.7s)
md5: 58762b11031975bad7857c925fc411f7
Click "Add to cart" on "Heavyweight Cotton Tee" and verify the page shows a confirmation reading "Added Heavyweight Cotton Tee to cart".

## Open the cart ✓ passed (40.7s)
md5: 6d0e845154fea05ae67bb8f0ee5ee806
Click "View cart" and verify the cart lists "Heavyweight Cotton Tee" with a subtotal of "$32.00".

## Go to checkout ✓ passed (47.5s)
md5: a756eb905a441072a940cb6004284df9
Click "Checkout" and verify the checkout page shows "Guest checkout — no account required" and a "Contact" section.

## Fill in contact and shipping ✓ passed (46.2s)
md5: d51fceaad20e7483e0dfc311f5dc7453
Type "guest@example.com" into Email, "Dana Reyes" into "Full name", "9 Pine Lane" into Address, "Austin" into City, and "78701" into ZIP, then verify the order summary shows a Total of "$41.06".

## Pay with the test card ✓ passed (86s)
md5: 1bd389db0092097ede958d01ecd83b19
Type "4242 4242 4242 4242" into "Card number", "12 / 34" into Expiration, "123" into CVC, click the Pay button, and verify the page shows "Thank you for your order!" with order number "#1003" and a total paid of "$41.06".
