---
mode: testing
url: https://my-testing-repo-main.vercel.app/klarna/payment-schedule?reset=true
max_steps: 40
tags: [klarna, payments-infra, tracker]
---

# Klarnah 14.3: Order in Klarnah app

Catalog objective: verify the placed order appears with its payment schedule (mobile web equivalent).
Key assertion: the first instalment date and amount are correct.

## Open purchases
Go to https://my-testing-repo-main.vercel.app/klarna/payment-schedule?reset=true and verify the purchase "Studio Lamps" ("Arc floor lamp · $180.00") appears with a "Pay in 4" badge.

## Open the order
Click the Studio Lamps purchase and verify the order "KL-ORD-2201" shows "Total" of "$180.00" and a "Payment schedule" with four rows.

## Verify the instalments
Verify instalment 1 reads "Sep 14, 2026" "$45.00" marked "Paid", instalment 2 reads "Sep 28, 2026" "$45.00" marked "Upcoming", and "Next payment" reads "Sep 28, 2026 · $45.00".
