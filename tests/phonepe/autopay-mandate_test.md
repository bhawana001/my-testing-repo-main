---
mode: testing
url: https://my-testing-repo-main.vercel.app/phonepe-clone-app/autopay?reset=true
max_steps: 45
tags: [phonepe, fintech, mandates]
---

# PhonePey 21.2: Autopay mandate

Catalog objective: create a UPI autopay mandate for a service.
Key assertion: the mandate is active with its cap amount.

## Choose the service
Select "StreamFlix Premium" in "Service" and verify "Debit amount" reads "₹649.00" and "Frequency" reads "Monthly".

## Verify the cap must cover the debit
Type "500" into "Maximum limit per debit", type "4321" into "UPI PIN", click "Approve mandate", and verify an error says the limit must be at least ₹649.00.

## Set a valid cap and approve
Replace "Maximum limit per debit" with "1000", type "4321" into "UPI PIN", and click "Approve mandate".

## Verify the mandate is active with its cap
Verify a green banner titled "Mandate created" names the mandate for StreamFlix Premium at "₹649.00" monthly with a first debit of "2026-10-15", and the mandate list shows it with "Max ₹1,000.00" and an active status.
