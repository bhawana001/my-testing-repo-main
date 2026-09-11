---
mode: testing
url: https://my-testing-repo-main.vercel.app/stripe/dashboard-payment-lookup?reset=true
max_steps: 45
tags: [stripe, payments-infra, crud]
---

# Stripely 9.5: Dashboard payment lookup

Catalog objective: in the dashboard, find the latest payment and open its detail.
Key assertion: the payment detail matches the amount and status paid.

## Open payments
Go to https://my-testing-repo-main.vercel.app/stripe/dashboard-payment-lookup?reset=true and verify the first (latest) row is "$79.00 USD" "Succeeded" for "Pro plan + 2 seats" dated "Sep 14, 2026, 10:04 AM".

## Open the latest payment
Click "$79.00 USD" on the first row and verify the payment detail page.

## Verify the detail
Verify the amount "$79.00 USD", status "Succeeded · Paid", Payment ID "pi_3Q9zLatest4242" and Payment method "Visa •••• 4242".
