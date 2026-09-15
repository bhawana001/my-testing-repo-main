---
mode: testing
url: https://my-testing-repo-main.vercel.app/klarna-clone-app/checkout?reset=true
max_steps: 50
tags: [klarna, payments, bnpl]
---

# Klarnah 14.3: Payment schedule

Catalog objective: verify the placed order appears with its payment schedule.
Key assertion: the first instalment date and amount are correct.

## Place the order
Type "Priya Nair" into "Full name", type "4417" into "Last 4 of ID number", click "Continue with Klarnah", then click "Confirm and pay $45.00 today".

## Open the Klarnah app
Click "Open it in the Klarnah app" and verify the order card title reads "Studio Lamps · KL-3301".

## Verify the balances
Verify "Order total" reads "$180.00" and "Outstanding" reads "$135.00".

## Verify the first instalment
Verify the schedule table shows Payment 1 of 4 due "2026-09-15" at "$45.00" with a "Paid" badge, and Payment 2 of 4 due "2026-09-29" at "$45.00" with a "Scheduled" badge.
