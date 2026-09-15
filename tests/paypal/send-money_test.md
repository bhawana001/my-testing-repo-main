---
mode: testing
url: https://my-testing-repo-main.vercel.app/paypal-clone-app/send?reset=true
max_steps: 45
tags: [paypal, payments, p2p]
---

# PayPaal 10.3: Send money

Catalog objective: send money to a contact with a note.
Key assertion: the recipient and amount are confirmed in the activity.

## Choose the recipient and amount
Choose "Tom Alvarez", type "25" into "You send (USD)", and type "Dinner on Friday" into "Add a note".

## Review the send
Click "Review and send" and verify the review panel shows "Sending" of "$25.00" and "To" of "Tom Alvarez".

## Send it
Click "Send now" and verify a green banner titled "Money sent" says you sent "$25.00" to "Tom Alvarez".

## Verify it in the activity feed
Verify the receipt shows "Transaction" of "TX-9921" and "Note" of "Dinner on Friday", then go to https://my-testing-repo-main.vercel.app/paypal-clone-app/activity and verify the feed has a "Tom Alvarez" row reading "TX-9921 · 2026-09-15 · “Dinner on Friday”" with an amount of "−$25.00".
