---
mode: testing
url: https://my-testing-repo-main.vercel.app/stripe-clone-app/checkout?reset=true
max_steps: 45
tags: [stripe, payments, dashboard]
---

# Stripey 9.5: Dashboard payment lookup

Catalog objective: find the latest payment in the dashboard and open its detail.
Key assertion: the payment detail matches the amount and the paid status.

## Take a payment first
Type "4242 4242 4242 4242" into "Card number", "12 / 34" into "Expiry", "123" into "CVC", click "Pay $240.00", and verify the receipt shows "Payment ID" of "pi_3Qb101Mx03".

## Open the dashboard
Go to https://my-testing-repo-main.vercel.app/stripe-clone-app/dashboard and verify the page subtitle reads "4 payments".

## Find the latest payment
Type "pi_3Qb101Mx03" into "Search payments" and verify a single row remains, showing "$240.00" with a "succeeded" status.

## Open its detail
Click "Open" on that row and verify the payment detail shows "$240.00", "Payment ID" of "pi_3Qb101Mx03", "Description" of "Pro plan — annual", "Payment method" of "Visa ••••4242" and a status of "succeeded".
