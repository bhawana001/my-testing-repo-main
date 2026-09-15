---
mode: testing
url: https://my-testing-repo-main.vercel.app/amex-clone-app/rewards?reset=true
max_steps: 40
tags: [american-express, banking, rewards]
---

# Amrex 25.1: Membership rewards redemption

Catalog objective: redeem points for a statement credit.
Key assertion: points are deducted and the credit shows as pending.

## Verify the starting balance
Verify the page subtitle reads "84,200 points available" and "Rate" reads "0.6 cents per point".

## Set the redemption
Leave "Points to redeem" as "5000" and verify "Statement credit" reads "$30.00".

## Redeem
Click "Redeem" and verify a green banner titled "Redemption submitted" says 5,000 points were redeemed for a $30.00 statement credit.

## Verify the deduction and the pending credit
Verify "Points balance" now reads "79,200" and the "Statement credits" card lists "$30.00" from 5,000 points with a "Pending" badge.
