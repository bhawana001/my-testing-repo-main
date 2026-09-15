---
test: ../drop-in-payment_test.md
status: passed
started: 2026-09-14T10:04:16.478Z
duration_s: 174
session_id: 09baf4d4-94ba-458f-a0a0-44b5cbd68fa1
---

# Adyenly 13.1: Drop-in payment — Result

## Open the drop-in ✓ passed (40.8s)
md5: 40c2f3ded32711c0df476d6b86259055
Go to https://my-testing-repo-main.vercel.app/adyen/drop-in-payment?reset=true and verify "Pay Nordic Home" with amount "€210.00" and a "Drop-in" list containing "Credit or debit card", "iDEAL" and "PayPally" with the card form expanded.

## Pay with the 3DS2 card ✓ passed (45.2s)
md5: fd9afaf7fd9383d6afd39c91f84428a8
Type "4000 0000 0000 3220" into Card number, "12/29" into Expiry, "123" into CVC, click the "Pay €210.00" button, and verify a "Confirm this payment" challenge asking for a one-time code appears.

## Complete the challenge ✓ passed (39.1s)
md5: bc89a209f1c0b1a5c03d06b66eb5b0c6
Type "123456" into the One-time code field, click "Approve payment", and verify the heading "Result: Authorised" appears.

## Verify the result ✓ passed (46.2s)
md5: 08b36b5f58b7cc8e287d069dd697f203
Verify "3DS2" reads "Challenge completed", "Amount paid" reads "€210.00" and a "Payment ID" starting with "8836" is shown.
