---
mode: testing
url: https://my-testing-repo-main.vercel.app/american-express/rewards-redemption?reset=true
max_steps: 40
tags: [american-express, banking, wizard]
---

# Amerix 25.1: Membership rewards redemption

Catalog objective: redeem points for a statement credit.
Key assertion: points are deducted and the credit shows as pending.

## Open rewards
Go to https://my-testing-repo-main.vercel.app/american-express/rewards-redemption?reset=true and verify the points balance badge reads "48,200" and the wizard offers "10,000 points", "25,000 points" and "40,000 points" for statement credit.

## Choose 10,000 points
Choose "10,000 points" ($60.00 statement credit), click "Continue", and verify the confirm step lists "10,000 points".

## Redeem
Click "Redeem points" and verify the message "10,000 points redeemed" with the badge "Redemption submitted".

## Verify deduction and pending credit
Verify "Statement credit" reads "$60.00", the status reads "Pending · posts in 2–3 days", and the points balance badge in the top bar now reads "38,200".
