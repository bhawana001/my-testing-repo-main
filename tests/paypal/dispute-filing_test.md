---
mode: testing
url: https://my-testing-repo-main.vercel.app/paypal-clone-app/activity?reset=true
max_steps: 45
tags: [paypal, payments, disputes]
---

# PayPaal 10.4: Dispute filing

Catalog objective: open a transaction and start a dispute with a reason.
Key assertion: a dispute case is created with a reference id.

## Open the transaction
Click "Details" on the "Brightline Electronics" row and verify the transaction detail shows "Transaction" of "TX-9920" and "Amount" of "$128.40".

## Choose a reason
Select "I did not receive the item" in "What went wrong?" and type "Tracking has said out for delivery for nine days." into the detail box.

## File the dispute
Click "File dispute" and verify a green banner titled "Dispute filed" shows the case "PP-D-5500" for Brightline Electronics at "$128.40".

## Verify the case reference is recorded
Verify a "Dispute" card shows "Case reference" of "PP-D-5500", "Reason" of "I did not receive the item" and a status of "Under review".
