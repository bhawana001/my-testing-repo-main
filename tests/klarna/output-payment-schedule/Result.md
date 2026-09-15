---
test: ../payment-schedule_test.md
status: passed
started: 2026-09-13T11:24:08.296Z
duration_s: 149
session_id: 4af7fce5-ad26-422e-b366-e4d1a23e4a7d
---

# Klarnah 14.3: Order in Klarnah app — Result

## Open purchases ✓ passed (17.8s)
md5: 5c21adfe8508f067b36eafa1dbdbd4a8
Go to https://my-testing-repo-main.vercel.app/klarna/payment-schedule?reset=true and verify the purchase "Studio Lamps" ("Arc floor lamp · $180.00") appears with a "Pay in 4" badge.

## Open the order ✓ passed (89.8s)
md5: dc58ed8f7c3302beb23e9c2a88b1181d
Click the Studio Lamps purchase and verify the order "KL-ORD-2201" shows "Total" of "$180.00" and a "Payment schedule" with four rows.

## Verify the instalments ✓ passed (39.5s)
md5: 0edab0116fec7b98f0a393c0c0bfa2f8
Verify instalment 1 reads "Sep 14, 2026" "$45.00" marked "Paid", instalment 2 reads "Sep 28, 2026" "$45.00" marked "Upcoming", and "Next payment" reads "Sep 28, 2026 · $45.00".
