---
mode: testing
url: https://my-testing-repo-main.vercel.app/lemonade-clone-app/quote?reset=true
max_steps: 55
tags: [lemonade, insurance, purchase]
---

# Limonade 26.2: Policy purchase

Catalog objective: buy the quoted policy with a test payment.
Key assertion: the policy is active with a document available.

## Get a quote first
Type "Priya" into "Your name" and click "Next", click "Next" again on the place step, then click "See my price" and verify "Monthly premium" reads "$17.90".

## Go to checkout
Click "Buy this policy" and verify a "Confirm and pay" card appears showing "Monthly premium" of "$17.90".

## Pay with the test card
Type "4242 4242 4242 4242" into "Card number", click "Activate my policy", and verify the page shows "Your policy" with an "Active" badge.

## Verify the policy and its document
Verify "Policy number" reads "LMN-770420" and "Monthly premium" reads "$17.90", then click "View policy document" and verify the document body contains "LIMONADE RENTERS POLICY", "Policy number: LMN-770420" and "Personal property .......... $20,000.00".
