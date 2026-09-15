---
mode: testing
url: https://my-testing-repo-main.vercel.app/policybazaar-clone-app/health?reset=true
max_steps: 40
tags: [policybazaar, insurance, filters]
---

# Policybaazar 27.3: Health plan filter

Catalog objective: filter health plans by room rent limit and premium.
Key assertion: the results respect both filters.

## Verify the unfiltered list
Verify "Plans shown" reads "5 of 5".

## Apply the room rent filter
Select "No room rent cap" in "Room rent" and verify "Plans shown" reads "3 of 5" listing "Meridian Care 10L", "Harbour Total 20L" and "Meridian Essential 7.5L".

## Add the premium filter
Type "15000" into "Maximum annual premium" and verify "Plans shown" now reads "2 of 5".

## Verify both filters were applied
Verify the results are "Meridian Care 10L" at "₹14,280.00" and "Meridian Essential 7.5L" at "₹11,430.00", and that "Harbour Total 20L" appears in the "Excluded by these filters" list.
