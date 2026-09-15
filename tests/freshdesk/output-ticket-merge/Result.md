---
test: ../ticket-merge_test.md
status: passed
started: 2026-09-13T13:46:03.097Z
duration_s: 171
session_id: f9421148-937e-4592-8191-eb4f07d6a010
---

# Freshdeskly 33.3: Ticket merge — Result

## Select two tickets ✓ passed (30.8s)
md5: 24471495d05adee84022917763ae9c2e
Go to https://my-testing-repo-main.vercel.app/freshdesk/ticket-merge?reset=true, check the boxes for #2044 "Order #A-7731 not delivered" and #2046 "Where is my package?" (both from Maria Chen), and verify "2 selected" with the "Merge" button enabled.

## Merge ✓ passed (43.3s)
md5: 2556b6b09974f2089b6bda36b08293a2
Click "Merge", keep #2044 as the primary ticket, click "Merge" in the dialog, and verify "Merged #2046 into #2044."

## Verify the merged thread ✓ passed (46.8s)
md5: 82f659bbdd7e12adbf71a40a0f824555
Verify ticket #2044 shows "Contains merged ticket #2046" and both messages: "My order #A-7731 hasn't arrived." and "Following up: tracking hasn't updated in 3 days." (from #2046).

## Verify the secondary ticket ✓ passed (48.1s)
md5: 058af3202ef0bd36c3f40be364266fea
Click "All tickets" and verify #2046 shows status "Closed" and "Merged into #2044".
