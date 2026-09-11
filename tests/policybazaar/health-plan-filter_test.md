---
mode: testing
url: https://my-testing-repo-main.vercel.app/policybazaar/health-plan-filter?reset=true
max_steps: 40
tags: [policybazaar, insurance, crud]
---

# PolicyMart 27.3: Health plan filter

Catalog objective: filter health plans by room rent limit and premium.
Key assertion: results respect both filters.

## Open plans
Go to https://my-testing-repo-main.vercel.app/policybazaar/health-plan-filter?reset=true and verify "6 plans found".

## Filter by room rent
Select "Single private room" for Room rent limit and verify "2 plans found", both showing "Room rent: Single private room".

## Filter by premium
Select "₹10,000 – ₹15,000" for Premium and verify "1 plan found".

## Verify the result
Verify the only plan is "Health Companion" by "Nivaish Bupa" with room rent "Single private room" and premium "₹11,800.00" per year.
