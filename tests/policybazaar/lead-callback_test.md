---
mode: testing
url: https://my-testing-repo-main.vercel.app/policybazaar/lead-callback?reset=true
max_steps: 40
tags: [policybazaar, insurance, wizard]
---

# PolicyMart 27.2: Lead form to callback

Catalog objective: submit interest and verify the callback scheduled state.
Key assertion: confirmation with an advisor callback promise.

## Invalid mobile
Go to https://my-testing-repo-main.vercel.app/policybazaar/lead-callback?reset=true, choose "Term life insurance", type "Demo User" into Full name and "12345" into Mobile number, click "Continue", and verify "Enter a valid 10-digit Indian mobile number."

## Fix and consent
Change the mobile to "9876543210", check "I agree to receive a call from an advisor", click "Continue", and verify the step "When should we call?"

## Pick a slot
Choose "Tomorrow, 10:00–11:00 AM" and click "Request callback".

## Verify the callback promise
Verify the badge "Callback scheduled", "Thanks Demo User! An advisor will call you.", "When" reading "Tomorrow, 10:00–11:00 AM", reference "LD-3210-0914", and the text "Our certified advisor will call you within your chosen slot."
