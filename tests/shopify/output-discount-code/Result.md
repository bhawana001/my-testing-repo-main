---
test: ../discount-code_test.md
status: passed
started: 2026-09-11T15:55:36.042Z
duration_s: 174
session_id: 20b5c980-1874-4bac-92f2-8397a8ce7781
---

# Shopifly 2.2: Discount code application — Result

## Open the cart ✓ passed (46.6s)
md5: f0b67f5fa92815fbcbcc952eb9dacb15
Go to https://my-testing-repo-main.vercel.app/shopify/discount-code?reset=true and verify the "Subtotal" row reads "$79.00" and the "Total" row reads "$85.00" (with $6.00 shipping) and no Discount row is shown.

## Try an invalid code ✓ passed (35.8s)
md5: 8a00387ce6c59777bbda410559c1f243
Type "BOGUS" into the "Discount code" field, click "Apply", and verify the message "Code “BOGUS” is not valid." is shown.

## Apply SAVE10 ✓ passed (36.2s)
md5: 516801ec647ff6fc932542eea0c8b14c
Type "SAVE10" into the "Discount code" field, click "Apply", and verify the badge "SAVE10 applied" is shown.

## Verify the discount math ✓ passed (50.7s)
md5: 5ba5abeef15f200cc2623226a18a2399
Verify a "Discount" row reads "−$7.90" (10% of $79.00) and the "Total" row now reads "$77.10".
