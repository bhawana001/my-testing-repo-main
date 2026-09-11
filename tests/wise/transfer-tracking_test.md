---
mode: testing
url: https://my-testing-repo-main.vercel.app/wise/transfer-tracking?reset=true
max_steps: 40
tags: [wise, payments-infra, tracker]
---

# Wyse 15.3: Transfer status tracking

Catalog objective: open an in-flight transfer and check the status steps.
Key assertion: the timeline shows the current step accurately.

## Open activity
Go to https://my-testing-repo-main.vercel.app/wise/transfer-tracking?reset=true and verify the Activity list shows a transfer "To Asha Rao" with status "In progress" and amount "−$1,000.00".

## Open the transfer
Click the "To Asha Rao" row and verify the detail shows "$1,000.00 to Asha Rao", the status badge "In progress" and a timeline with the steps "Transfer set up", "We received your USD", "Your money's being processed", "Sent to Asha's bank" and "Asha received the money".

## Verify the current step
Verify the first two steps are marked complete, the text "Current step: Your money's being processed" is shown, and that step displays "Converted at 1 USD = 83.20 INR".

## Advance and re-verify
Click "Simulate next update" and verify the text now reads "Current step: Sent to Asha's bank" and the status badge reads "Sent".
