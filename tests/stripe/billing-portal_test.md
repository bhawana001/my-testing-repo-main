---
mode: testing
url: https://my-testing-repo-main.vercel.app/stripe-clone-app/portal?reset=true
max_steps: 45
tags: [stripe, payments, billing]
---

# Stripey 9.4: Billing portal

Catalog objective: open the customer portal, update the card and verify the new default.
Key assertion: the new payment method is shown as the default.

## Verify the current default
Verify the "Payment methods" card shows "Visa ending in 4242" carrying a "Default" badge and "Current default" reads "Visa ending in 4242".

## Add a new card
Click "Add payment method" and verify a dialog titled "Add a payment method" opens, then type "4000 0566 5566 5556" into "New card number", type "09 / 30" into "New card expiry", and click "Add card".

## Verify the confirmation
Verify a green banner reads "Card ending in 5556 added and set as default."

## Verify the default moved
Verify "Visa ending in 5556" now carries the "Default" badge, "Current default" reads "Visa ending in 5556", and the "Visa ending in 4242" row now offers a "Make default" button instead.
