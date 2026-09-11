---
mode: testing
url: https://my-testing-repo-main.vercel.app/adyen/stored-card-reuse?reset=true
max_steps: 40
tags: [adyen, payments-infra, checkout]
---

# Adyenly 13.3: Stored card reuse

Catalog objective: pay again using a previously stored card token.
Key assertion: the one-click payment succeeds without card entry.

## Open the payment methods
Go to https://my-testing-repo-main.vercel.app/adyen/stored-card-reuse?reset=true and verify "Pay Nordic Home" with amount "€39.00" and a stored "Visa •••• 1111" option marked "Stored" that is already selected, with no card number field visible.

## Pay with the stored card
Click "Pay €39.00 with stored card" and verify the heading "Result: Authorised" appears.

## Verify no card entry was needed
Verify "Card entry" reads "Not required (token)", "Payment method" reads "Stored Visa •••• 1111" and "Amount paid" reads "€39.00".
