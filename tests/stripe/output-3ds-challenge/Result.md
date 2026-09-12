---
test: ../3ds-challenge_test.md
status: passed
started: 2026-09-11T16:59:48.516Z
duration_s: 202
session_id: 673a3fb9-79d8-4ed6-b0fc-a87107815256
---

# Stripely 9.2: 3DS challenge — Result

## Open the checkout ✓ passed (28.7s)
md5: 55711f4aa4b3837e152c61aaac0e4111
Go to https://my-testing-repo-main.vercel.app/stripe/3ds-challenge?reset=true and verify the page shows "Pay Northwind Travel" with the amount "$120.00".

## Pay with the 3DS card ✓ passed (57.3s)
md5: 87326de6f4c59edf634b88386bc873ad
Type "4000 0000 0000 3220" into Card number, "12/29" into Expiry, "123" into CVC, click the "Pay $120.00" button, and verify a "Bank verification · 3-D Secure" panel titled "Confirm this payment" appears asking for a one-time code.

## Enter a wrong code ✓ passed (43.1s)
md5: bf48b10cfed2ddbe25cc9ece10c66cd0
Type "000000" into the One-time code field, click "Approve payment", and verify the error "Incorrect verification code" is shown.

## Approve the challenge ✓ passed (37.2s)
md5: 3dda7c3cc72318d380cfe44647fe5e61
Clear the One-time code field, type "123456", click "Approve payment", and verify the heading "Payment successful" appears.

## Verify the result ✓ passed (32s)
md5: 7b3abcfe222d635995cedd1fc0bd823a
Verify "3-D Secure" reads "Authenticated", "Amount paid" reads "$120.00" and "Status" reads "Succeeded".
