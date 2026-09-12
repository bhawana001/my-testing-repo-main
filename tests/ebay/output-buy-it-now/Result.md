---
test: ../buy-it-now_test.md
status: passed
started: 2026-09-11T16:30:52.801Z
duration_s: 183
session_id: b8daf6dc-aaa7-4f76-8ca9-3b835f7a53ea
---

# eBidz 6.2: Buy It Now checkout — Result

## Open the listing ✓ passed (23.6s)
md5: 633c4211333806b8462ff23c8a420dc3
Go to https://my-testing-repo-main.vercel.app/ebay/buy-it-now?reset=true and verify the listing "Vintage Film Camera · 35mm · Fully working" shows a Buy It Now price of "$185.00".

## Buy It Now ✓ passed (47.4s)
md5: d628093206ca5d8f51e82ad5ca36d3c5
Click the "Buy It Now" button and verify the review page shows the item, the "Subtotal" as "$185.00", "Shipping" as "$12.00" and "Order total" as "$197.00".

## Confirm with the saved card ✓ passed (25.3s)
md5: dfbda4213ca6beeb29b1e22e6fa7dc22
Click "Confirm and pay" and verify the saved card "Visa •••• 4242" is selected.

## Pay ✓ passed (26.9s)
md5: dd633301c9f5c62d761b95e9ac437d37
Click the "Pay $197.00" button and verify "Order placed" is shown.

## Verify the confirmation ✓ passed (56.6s)
md5: 85fac224cd99688fe7c41489ec8b0e2b
Verify the confirmation shows an Order number starting with "EB-", the item "Vintage Film Camera · 35mm · Fully working" at "$185.00", "Payment" as "Visa •••• 4242" and "Order total" as "$197.00".
