---
test: ../return-initiation_test.md
status: passed
started: 2026-09-15T09:14:17.121Z
duration_s: 160
session_id: 077b93a2-c075-463f-b358-1190e0f2398a
---

# ShopKart 1.5: Return initiation — Result

## Open the delivered order ✓ passed (32.2s)
md5: 7e059382d4a65ad8ad64b74fd6184f20
Click "Return or replace items" on order "112-4419602-7831456" and verify the order detail page shows "Delivered Friday, September 5".

## Start the return ✓ passed (40.9s)
md5: 5eb18ec40ccc70c46f04518e64780a31
Click "Return or replace items" in the Returns section and verify a reason dropdown labelled "Why are you returning this?" is shown.

## Choose a reason and method ✓ passed (50.9s)
md5: 7621632bff75cbbc785285d088834d96
Select "Item arrived damaged" as the reason, click "Schedule a pickup", and verify "Schedule a pickup" is selected.

## Submit the return ✓ passed (33.4s)
md5: d733c7cc338f88e565c47717aac47426
Click "Submit return" and verify the page shows "Return started" with a return authorization starting with "RMA-" and a refund line containing "$86.39".
