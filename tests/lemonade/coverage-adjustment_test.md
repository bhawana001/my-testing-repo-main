---
mode: testing
url: https://my-testing-repo-main.vercel.app/lemonade-clone-app/quote?reset=true
max_steps: 60
tags: [lemonade, insurance, policy]
---

# Limonade 26.4: Coverage adjustment

Catalog objective: increase the personal property coverage and verify the premium change.
Key assertion: the new premium reflects the change.

## Get a policy in place
Type "Priya" into "Your name", click "Next", click "Next", click "See my price", click "Buy this policy", type "4242 4242 4242 4242" into "Card number", click "Activate my policy", and verify the policy shows an "Active" badge.

## Verify the current coverage
Go to https://my-testing-repo-main.vercel.app/lemonade-clone-app/coverage and verify the "Today" card shows "Personal property" of "$20,000.00" and "Monthly premium" of "$17.90".

## Raise the personal property cover
Select "$30,000.00" in "Personal property" and verify "New monthly premium" reads "$23.40", "Change" reads "+$5.50 a month" and a badge reads "Premium goes up".

## Apply the change
Click "Apply the change" and verify a green banner says the premium is now $23.40 a month, up $5.50, and the "Today" card shows "Personal property" of "$30,000.00" with "Monthly premium" of "$23.40".
