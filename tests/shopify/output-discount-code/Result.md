---
test: ../discount-code_test.md
status: passed
started: 2026-09-15T09:21:50.747Z
duration_s: 174
session_id: 2d3b01a6-5014-4bf3-9c3e-75d277a7f921
---

# Shoplify 2.2: Discount code application — Result

## Add a product and open checkout ✓ passed (60.1s)
md5: e78d860c73d44fa658232026c1a1bde1
Click "Add to cart" on "Heavyweight Cotton Tee", click "View cart", click "Checkout", and verify the order summary shows a Total of "$41.06".

## Apply an invalid code first ✓ passed (33.1s)
md5: 5eb4fb64e9a382ff46fe43df8f7cf2da
Type "NOTACODE" into the "Discount code" field, click "Apply", and verify an error appears reading "Discount code NOTACODE isn't valid for this order."

## Apply the ten percent code ✓ passed (40.9s)
md5: a0c09a7e6123d93a3b59d033832a9860
Clear the discount field, type "WELCOME10", click "Apply", and verify a badge appears reading "WELCOME10 (10% off) applied".

## Confirm the discounted total ✓ passed (35.9s)
md5: cdd2b6341ec07546d92ac66b7fd1ae52
Verify the summary shows a discount line "Discount (WELCOME10)" of "−$3.20" and a Total of "$37.60".
