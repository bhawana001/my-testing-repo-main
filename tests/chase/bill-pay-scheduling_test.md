---
mode: testing
url: https://my-testing-repo-main.vercel.app/chase/bill-pay-scheduling?reset=true
max_steps: 40
tags: [chase, banking, wizard]
---

# Chaise Bank 23.3: Bill pay scheduling

Catalog objective: schedule a future-dated bill payment.
Key assertion: the payment is listed as scheduled with its date.

## Open bill pay
Go to https://my-testing-repo-main.vercel.app/chase/bill-pay-scheduling?reset=true and verify the "Schedule a bill payment" form and a "Scheduled payments" table containing "Bay Internet" for "$59.99" on "2026-09-20".

## Try a past date
Select "City Power & Light" as Payee, type "120.40" into Amount, set "Deliver by" to 2026-09-10, click "Schedule payment", and verify the error "Choose a future date (after September 14, 2026)." is shown.

## Schedule with a future date
Set "Deliver by" to 2026-09-28, click "Schedule payment", and verify the message "Payment of $120.40 to City Power & Light scheduled for 2026-09-28." appears.

## Verify the list
Verify the "Scheduled payments" table now has a row "City Power & Light" with amount "$120.40", deliver-by date "2026-09-28" and status "Scheduled".
