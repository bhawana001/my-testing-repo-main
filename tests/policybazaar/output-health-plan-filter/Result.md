---
test: ../health-plan-filter_test.md
status: passed
started: 2026-09-13T12:53:22.854Z
duration_s: 133
session_id: 75d0a501-927a-4d68-afa2-7892b0e52979
---

# PolicyMart 27.3: Health plan filter — Result

## Open plans ✓ passed (24.7s)
md5: 0fd27c127d1b86ef202f7e25cd356f7c
Go to https://my-testing-repo-main.vercel.app/policybazaar/health-plan-filter?reset=true and verify "6 plans found".

## Filter by room rent ✓ passed (35.1s)
md5: 67effc13326be34ebc8e5601c47292f8
Select "Single private room" for Room rent limit and verify "2 plans found", both showing "Room rent: Single private room".

## Filter by premium ✓ passed (25.8s)
md5: 902a9d6ffbff1d71cab8546f85decaf6
Select "₹10,000 – ₹15,000" for Premium and verify "1 plan found".

## Verify the result ✓ passed (45.4s)
md5: 1696f55318801c9bd38ab5c5e17ee725
Verify the only plan is "Health Companion" by "Nivaish Bupa" with room rent "Single private room" and premium "₹11,800.00" per year.
