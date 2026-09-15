---
mode: testing
url: https://my-testing-repo-main.vercel.app/amex-clone-app/payments?reset=true
max_steps: 45
tags: [american-express, banking, payments]
---

# Amrex 25.2: Card payment scheduling

Catalog objective: schedule a payment for the statement balance.
Key assertion: the scheduled payment carries the correct amount.

## Choose the statement balance
Choose "Statement balance" and verify "Payment amount" reads "$2,318.44".

## Verify a late date is refused
Set "Payment date" to "2026-09-30", click "Schedule the payment", and verify a red banner says that date is after the 2026-09-28 due date.

## Schedule it for a valid date
Set "Payment date" back to "2026-09-26", click "Schedule the payment", and verify a green banner titled "Payment scheduled" says $2,318.44 is scheduled for 2026-09-26 with reference "PMT-31840".

## Verify the scheduled payment
Verify the "Scheduled payments" card lists "$2,318.44" against "Statement balance · 2026-09-26 · Chaise Bank ••••8841" with a "Scheduled" badge.
