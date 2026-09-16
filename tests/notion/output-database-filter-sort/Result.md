---
test: ../database-filter-sort_test.md
status: passed
started: 2026-09-15T11:58:06.393Z
duration_s: 140
session_id: c927371d-cb8e-4a52-ab3e-261ee77c7717
---

# Notiond 38.2: Database filter and sort — Result

## Verify the unfiltered view ✓ passed (24.8s)
md5: efb5bc0e21844991952c245e20de3411
Verify the View card shows "Rows shown" of "5 of 5".

## Filter by status ✓ passed (42.8s)
md5: d2eb5e138d5567a9ed449f5dd84f3eb0
Select "In progress" in "Filter by status" and verify "Rows shown" now reads "2 of 5" and the table lists only "Checkout redesign" and "Mobile nav polish".

## Sort by due date ✓ passed (35.6s)
md5: 94a07cc7817b75ad446e3e9602b45979
Select "Due date, earliest first" in "Sort by due date" and verify the first row is "Checkout redesign" with a due date of "2026-09-18" and the second row is "Mobile nav polish" with "2026-09-25".

## Reverse the sort ✓ passed (31.2s)
md5: 062cc3ca125d187995339ebcda0134e1
Select "Due date, latest first" and verify the first row is now "Mobile nav polish" with "2026-09-25".
