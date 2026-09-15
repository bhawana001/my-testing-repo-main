---
test: ../rewards-redemption_test.md
status: passed
started: 2026-09-14T10:36:11.216Z
duration_s: 178
session_id: bde786e3-fd99-4593-91d0-cce4ad5d661a
---

# Amerix 25.1: Membership rewards redemption — Result

## Open rewards ✓ passed (25.7s)
md5: ff7d27d06225ab0be0a0e5d9c75cf484
Go to https://my-testing-repo-main.vercel.app/american-express/rewards-redemption?reset=true and verify the points balance badge reads "48,200" and the wizard offers "10,000 points", "25,000 points" and "40,000 points" for statement credit.

## Choose 10,000 points ✓ passed (47.6s)
md5: d8fb6359fab4f18bacd4e06caa75790e
Choose "10,000 points" ($60.00 statement credit), click "Continue", and verify the confirm step lists "10,000 points".

## Redeem ✓ passed (28.7s)
md5: fd102444e7bcfa9e39c137ab45c30792
Click "Redeem points" and verify the message "10,000 points redeemed" with the badge "Redemption submitted".

## Verify deduction and pending credit ✓ passed (72.6s)
md5: 6f44c8a87feb69cebb74bbc78cf4d298
Verify "Statement credit" reads "$60.00", the status reads "Pending · posts in 2–3 days", and the points balance badge in the top bar now reads "38,200".
