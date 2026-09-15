---
test: ../billing-portal_test.md
status: passed
started: 2026-09-13T10:47:55.250Z
duration_s: 137
session_id: 017fb769-9de5-4f92-8e9d-fbed92d9c77d
---

# Stripely 9.4: Billing portal update — Result

## Open the portal ✓ passed (23.2s)
md5: 0fcceb12a6943dca83d6790ca31d0edf
Go to https://my-testing-repo-main.vercel.app/stripe/billing-portal?reset=true and verify "Visa •••• 4242" is marked "Default".

## Declined card ✓ passed (53.7s)
md5: 0c45e3f08cd79e8b27ed14e74dcd0e93
Click "+ Add payment method", type "4000 0000 0000 0002" into Card number, "12/29" into Expiry, "123" into CVC, click "Add and set as default", and verify "Your card was declined."

## Add a valid card ✓ passed (32.9s)
md5: 1c32854b77f896a3eb9fb3ad5ec78423
Replace the card number with "5555 5555 5555 4444", click "Add and set as default", and verify "Mastercard •••• 4444" appears.

## Verify the default ✓ passed (25.1s)
md5: d359b9d84d687e44e6ed92abca223fe1
Verify "Mastercard •••• 4444" shows "Default" and "Visa •••• 4242" now shows "Make default".
