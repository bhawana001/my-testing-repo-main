---
mode: testing
url: https://my-testing-repo-main.vercel.app/square/tip-and-receipt?reset=true
max_steps: 40
tags: [square, payments-infra, checkout]
---

# Squarely 12.3: Tip and receipt screen

Catalog objective: complete a payment with tip selection on web POS.
Key assertion: the total includes the tip and a receipt is offered.

## Open the POS
Go to https://my-testing-repo-main.vercel.app/square/tip-and-receipt?reset=true and verify the register shows "Subtotal" of "$24.00" and the question "Add a tip?" with 15%, 20%, 25% and "No tip" options.

## Choose a 20% tip
Click the "20%" tip option and verify "Tip" reads "$4.80" and "Total" reads "$28.80".

## Charge
Click "Charge $28.80" and verify the message "Payment of $28.80 approved (includes $4.80 tip)" and the question "How would you like your receipt?" with "Email", "Text message" and "No receipt" options.

## Choose an email receipt
Click "Email" and verify the completion screen shows "Total charged" of "$28.80", "Tip" of "$4.80" and "Receipt" reading "Emailed to demo@evals.dev".
