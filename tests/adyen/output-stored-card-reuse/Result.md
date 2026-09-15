---
test: ../stored-card-reuse_test.md
status: passed
started: 2026-09-15T06:42:57.064Z
duration_s: 106
session_id: af16d42d-031e-4d70-807f-35e7a7431d6f
---

# Adyenly 13.3: Stored card reuse — Result

## Open the payment methods ✓ passed (39.1s)
md5: 15b2b170aae125d8a64a8bf06e351a91
Go to https://my-testing-repo-main.vercel.app/adyen/stored-card-reuse?reset=true and verify "Pay Nordic Home" with amount "€39.00" and a stored "Visa •••• 1111" option marked "Stored" that is already selected, with no card number field visible.

## Pay with the stored card ✓ passed (22s)
md5: 0f799468824cf7d82237bbfa4ca45425
Click "Pay €39.00 with stored card" and verify the heading "Result: Authorised" appears.

## Verify no card entry was needed ✓ passed (40.6s)
md5: b4f9bd79bcd8b085610d55368b2926b0
Verify "Card entry" reads "Not required (token)", "Payment method" reads "Stored Visa •••• 1111" and "Amount paid" reads "€39.00".
