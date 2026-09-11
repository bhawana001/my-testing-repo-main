---
mode: testing
url: https://my-testing-repo-main.vercel.app/paypal/send-money?reset=true
max_steps: 45
tags: [paypal, payments-infra, wizard]
---

# PayPally 10.3: Send money P2P

Catalog objective: send money to a sandbox contact with a note.
Key assertion: the recipient and amount are confirmed in activity.

## Choose the contact
Go to https://my-testing-repo-main.vercel.app/paypal/send-money?reset=true, choose "Priya Nair", click "Continue", and verify the "How much?" step.

## Amount and note
Type "40" into Amount and "Dinner" into "Add a note", click "Continue", and verify the review lists "Priya Nair", "40" and "Dinner".

## Send
Click "Send Payment Now" and verify "You sent $40.00 to Priya Nair".

## Verify activity
Verify Recent activity shows "You paid Priya Nair" with note "Dinner" and "−$40.00".
