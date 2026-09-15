---
test: ../dashboard-payment-lookup_test.md
status: passed
started: 2026-09-13T10:50:30.550Z
duration_s: 88
session_id: b8f2b9fa-6bf5-4e3c-8664-f24cd17f81cf
---

# Stripely 9.5: Dashboard payment lookup — Result

## Open payments ✓ passed (22.2s)
md5: fab854096c94e393c2d1a6cfdbd2ddea
Go to https://my-testing-repo-main.vercel.app/stripe/dashboard-payment-lookup?reset=true and verify the first (latest) row is "$79.00 USD" "Succeeded" for "Pro plan + 2 seats" dated "Sep 14, 2026, 10:04 AM".

## Open the latest payment ✓ passed (34.8s)
md5: 32ca024e92c1df69b9722c21d5341118
Click "$79.00 USD" on the first row and verify the payment detail page.

## Verify the detail ✓ passed (29.5s)
md5: be8f37941a0004e4f44971721432066d
Verify the amount "$79.00 USD", status "Succeeded · Paid", Payment ID "pi_3Q9zLatest4242" and Payment method "Visa •••• 4242".
