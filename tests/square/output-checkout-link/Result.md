---
test: ../checkout-link_test.md
status: passed
started: 2026-09-13T11:01:29.964Z
duration_s: 83
session_id: b01a4caa-beb2-4067-a7f5-fbbaae700df1
---

# Squarely 12.1: Online checkout link — Result

## Open the checkout link ✓ passed (1.35s)
md5: 4a892febd007dba1e37ce6da0ece145b
Go to https://my-testing-repo-main.vercel.app/square/checkout-link?reset=true and verify "Pay Bean There Coffee" with amount "$35.00" and the note "Squarely Online Checkout link".

## Pay ✓ passed (40.5s)
md5: fa7b85d16eec2e58f2f517c0045bb5a4
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the "Pay $35.00" button, and verify the heading "Receipt" appears.

## Verify the receipt ✓ passed (39.3s)
md5: b1b4cdab0187b077dae7317c5d8233e5
Verify "Amount paid" reads "$35.00", "Receipt #" reads "R-000731" and "Merchant" reads "Bean There Coffee".
