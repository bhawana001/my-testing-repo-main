---
test: ../deal-pipeline-drag_test.md
status: passed
started: 2026-09-13T13:10:06.334Z
duration_s: 123
session_id: 5592b016-dc02-4596-a0cb-326a4a34086a
---

# HubSpotty 29.2: Deal pipeline drag — Result

## Open the pipeline ✓ passed (33.6s)
md5: df66a5c5d1035f6fc6adf691bb33c77c
Go to https://my-testing-repo-main.vercel.app/hubspot/deal-pipeline-drag?reset=true and verify "Globex · Marketing Hub" (Amount: $18,000.00) is in the "Qualified to buy" column.

## Drag to the next stage ✓ passed (51.9s)
md5: fcf6f3a29aa092491453ee791ab74314
Drag the "Globex · Marketing Hub" card into the "Presentation scheduled" column and verify the message "Globex · Marketing Hub moved from “Qualified to buy” to “Presentation scheduled”. Amount $18,000.00 unchanged."

## Verify after reload ✓ passed (35.6s)
md5: b6a126893ac6922c2710454089652563
Reload the page without the reset parameter and verify the card is still in "Presentation scheduled" with "Amount: $18,000.00".
