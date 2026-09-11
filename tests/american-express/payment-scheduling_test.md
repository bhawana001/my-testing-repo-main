---
mode: testing
url: https://my-testing-repo-main.vercel.app/american-express/payment-scheduling?reset=true
max_steps: 40
tags: [american-express, banking, wizard]
---

# Amerix 25.2: Card payment scheduling

Catalog objective: schedule a payment for the statement balance.
Key assertion: a scheduled payment with the correct amount.

## Open payments
Go to https://my-testing-repo-main.vercel.app/american-express/payment-scheduling?reset=true and verify the "Make a payment" page shows "Statement balance" $1,284.60 selected, "Minimum payment due" $40.00, and an empty "Scheduled payments" table.

## Try a date after the due date
Set "Payment date" to 2026-09-30, click "Schedule payment of $1,284.60", and verify the error about choosing a date between September 15 and September 25, 2026 is shown.

## Schedule for a valid date
Set "Payment date" to 2026-09-22, click "Schedule payment of $1,284.60", and verify the message "Payment of $1,284.60 scheduled for 2026-09-22." appears.

## Verify the scheduled list
Verify the "Scheduled payments" table has a row with amount "$1,284.60", date "2026-09-22" and status "Scheduled".
