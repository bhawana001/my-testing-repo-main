---
mode: testing
url: https://my-testing-repo-main.vercel.app/policybazaar/premium-calculator?reset=true
max_steps: 40
tags: [policybazaar, insurance, custom]
---

# PolicyMart 27.4: Premium calculator

Catalog objective: adjust age and cover in the calculator and verify the premium updates.
Key assertion: the premium recalculates on each change.

## Open the calculator
Go to https://my-testing-repo-main.vercel.app/policybazaar/premium-calculator?reset=true and verify age "30", cover "₹1Cr" and the premium "₹1,425.00" per year.

## Increase age
Click "+ Age" and verify the age reads "31" and the premium reads "₹1,475.00".

## Increase cover
Click "₹2Cr" and verify the premium reads "₹2,950.00" and "Cover" reads "₹2,00,00,000.00".

## Verify the recalculation log
Verify "Recent recalculations" lists "Age 31, cover ₹100L → ₹1,475.00" and "Age 31, cover ₹200L → ₹2,950.00".
