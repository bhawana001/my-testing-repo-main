---
mode: testing
url: https://my-testing-repo-main.vercel.app/stripe/billing-portal?reset=true
max_steps: 45
tags: [stripe, payments-infra, crud]
---

# Stripely 9.4: Billing portal update

Catalog objective: open the customer portal, update the card, verify the new default.
Key assertion: the new payment method is shown as default.

## Open the portal
Go to https://my-testing-repo-main.vercel.app/stripe/billing-portal?reset=true and verify "Visa •••• 4242" is marked "Default".

## Declined card
Click "+ Add payment method", type "4000 0000 0000 0002" into Card number, "12/29" into Expiry, "123" into CVC, click "Add and set as default", and verify "Your card was declined."

## Add a valid card
Replace the card number with "5555 5555 5555 4444", click "Add and set as default", and verify "Mastercard •••• 4444" appears.

## Verify the default
Verify "Mastercard •••• 4444" shows "Default" and "Visa •••• 4242" now shows "Make default".
