---
mode: testing
url: https://my-testing-repo-main.vercel.app/policybazaar-clone-app/callback?reset=true
max_steps: 40
tags: [policybazaar, insurance, lead]
---

# Policybaazar 27.2: Lead form to callback

Catalog objective: submit interest and verify the callback is scheduled.
Key assertion: a confirmation appears with an advisor callback promise.

## Verify a bad number is refused
Type "Priya Nair" into "Name", type "98765" into "Mobile number", click "Request a callback", and verify a red banner reads "Enter a 10 digit mobile number."

## Submit a valid lead
Replace the mobile number with "9876543210", select "Term life insurance" in "I am interested in", select "Tomorrow 10:00 – 11:00" in "Call me", and click "Request a callback".

## Verify the confirmation
Verify a green card titled "Callback scheduled" shows "Reference" of "PB-310442", "We will call" of "9876543210", "Window" of "Tomorrow 10:00 – 11:00" and "Advisor" of "Rhea Menon".

## Verify the request is recorded
Verify the "Your requests" card shows "Callbacks requested" of 1 with a "Callback scheduled" badge on the "PB-310442" row.
