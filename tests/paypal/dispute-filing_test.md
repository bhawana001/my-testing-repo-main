---
mode: testing
url: https://my-testing-repo-main.vercel.app/paypal/dispute-filing?reset=true
max_steps: 45
tags: [paypal, payments-infra, wizard]
---

# PayPally 10.4: Dispute filing

Catalog objective: open a transaction and start a dispute with a reason.
Key assertion: a dispute case is created with a reference ID.

## Choose the transaction
Go to https://my-testing-repo-main.vercel.app/paypal/dispute-filing?reset=true, choose "Retro Gadgets LLC · −$89.99", click "Continue", and verify "What's the problem?"

## Reason and details
Choose "I didn't receive an item I bought", type "Tracking stopped updating 10 days ago." into "Tell us more", click "Continue", and verify the review step.

## Open the dispute
Click "Open dispute" and verify "We've opened your dispute".

## Verify the case
Verify Case ID "PP-D-8999-INR", status "Open" and "Seller response due September 24, 2026".
