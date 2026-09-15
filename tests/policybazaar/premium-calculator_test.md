---
mode: testing
url: https://my-testing-repo-main.vercel.app/policybazaar-clone-app/calculator?reset=true
max_steps: 40
tags: [policybazaar, insurance, calculator]
---

# Policybaazar 27.4: Premium calculator

Catalog objective: adjust the age and cover in the calculator and verify the premium updates.
Key assertion: the premium recalculates on each change.

## Verify the starting premium
Verify "Age used" reads 30, "Cover" reads "₹10,000,000.00", "Insurer" reads "Meridian Life", "Annual premium" reads "₹6,100.00" and "Monthly equivalent" reads "₹508.00".

## Change the age
Set "Age (exact)" to "45" and verify "Annual premium" immediately recalculates to "₹11,500.00" with no Calculate button pressed.

## Change the cover
Select "₹5,000,000.00" in "Life cover" and verify "Annual premium" recalculates to "₹5,750.00".

## Apply the tobacco loading
Tick "Tobacco user" and verify "Annual premium" recalculates to "₹8,913.00" with a badge reading "Tobacco loading applied".
