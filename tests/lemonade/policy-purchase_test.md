---
mode: testing
url: https://my-testing-repo-main.vercel.app/lemonade/policy-purchase?reset=true
max_steps: 40
tags: [lemonade, insurance, checkout]
---

# Lemonaid 26.2: Policy purchase

Catalog objective: buy the quoted policy with a test payment.
Key assertion: the policy is active with its document available.

## Open the quote
Go to https://my-testing-repo-main.vercel.app/lemonade/policy-purchase?reset=true and verify "Your quote" shows "$15.00/month", quote "Q-RENT-2201" and "Policy starts September 15, 2026".

## Pay
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click "Pay $15.00 and activate", and verify the badge "Policy active" and the heading "You're covered, Demo!" appear.

## Verify the policy
Verify "Policy number" reads "LP-2201-0915", "Status" reads "Active from September 15, 2026", and a "Policy documents" row with a "Download PDF" button is shown.

## Download the document
Click "Download PDF" and verify the message "Downloaded lemonaid-policy-LP-2201-0915.pdf" with a byte count appears.
