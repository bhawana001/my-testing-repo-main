---
test: ../bill-pay-scheduling_test.md
status: passed
started: 2026-09-13T12:14:13.903Z
duration_s: 128
session_id: 849401ff-854a-4f9f-a9e6-2344db5d5935
---

# Chaise Bank 23.3: Bill pay scheduling — Result

## Open bill pay ✓ passed (27.7s)
md5: d83dbe4da7d26856999f9d3d6ffad245
Go to https://my-testing-repo-main.vercel.app/chase/bill-pay-scheduling?reset=true and verify the "Schedule a bill payment" form and a "Scheduled payments" table containing "Bay Internet" for "$59.99" on "2026-09-20".

## Try a past date ✓ passed (48.4s)
md5: 93ed6240f912771f4ee2f2100f09bd27
Select "City Power & Light" as Payee, type "120.40" into Amount, set "Deliver by" to 2026-09-10, click "Schedule payment", and verify the error "Choose a future date (after September 14, 2026)." is shown.

## Schedule with a future date ✓ passed (31.2s)
md5: 792f999edc53e3b276b748a764f9961c
Set "Deliver by" to 2026-09-28, click "Schedule payment", and verify the message "Payment of $120.40 to City Power & Light scheduled for 2026-09-28." appears.

## Verify the list ✓ passed (19s)
md5: f98dbc5db4e2a9ebef258f6049a80416
Verify the "Scheduled payments" table now has a row "City Power & Light" with amount "$120.40", deliver-by date "2026-09-28" and status "Scheduled".
