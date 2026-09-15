---
test: ../payment-scheduling_test.md
status: passed
started: 2026-09-13T12:33:08.139Z
duration_s: 118
session_id: 564ec46b-b36a-4dcc-b8ed-5be85b086718
---

# Amerix 25.2: Card payment scheduling — Result

## Open payments ✓ passed (28.8s)
md5: f6ca3bf6270273ebc85ab49641da49cc
Go to https://my-testing-repo-main.vercel.app/american-express/payment-scheduling?reset=true and verify the "Make a payment" page shows "Statement balance" $1,284.60 selected, "Minimum payment due" $40.00, and an empty "Scheduled payments" table.

## Try a date after the due date ✓ passed (33s)
md5: f4ad567b89a21e6482fa1b5e04b0169d
Set "Payment date" to 2026-09-30, click "Schedule payment of $1,284.60", and verify the error about choosing a date between September 15 and September 25, 2026 is shown.

## Schedule for a valid date ✓ passed (35.4s)
md5: e3b214cb513504c2383a094fce77dbdc
Set "Payment date" to 2026-09-22, click "Schedule payment of $1,284.60", and verify the message "Payment of $1,284.60 scheduled for 2026-09-22." appears.

## Verify the scheduled list ✓ passed (19.1s)
md5: 82327aeb6c90ab2c23be16e7128b02cb
Verify the "Scheduled payments" table has a row with amount "$1,284.60", date "2026-09-22" and status "Scheduled".
