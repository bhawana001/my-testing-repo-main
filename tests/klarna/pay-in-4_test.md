---
mode: testing
url: https://my-testing-repo-main.vercel.app/klarna/pay-in-4?reset=true
max_steps: 40
tags: [klarna, payments-infra, checkout]
---

# Klarnah 14.1: Pay in 4 selection

Catalog objective: choose Klarnah at checkout and complete the Pay in 4 signup flow in sandbox.
Key assertion: the instalment schedule is shown before confirming.

## Open the merchant checkout
Go to https://my-testing-repo-main.vercel.app/klarna/pay-in-4?reset=true and verify "Pay Studio Lamps" with amount "$180.00" and the option "Klarnah · Pay in 4" described as "4 payments of $45.00, interest-free".

## Start Klarnah signup
Click "Continue with Klarnah" and verify a Klarnah window opens asking for Email and Mobile number.

## Enter contact details
Type "demo@evals.dev" into Email and "+1 555 010 0123" into Mobile number, click "Continue", and verify a "Verification code" field appears.

## Verify the code
Type "123456" into Verification code, click "Verify", and verify "Your payment schedule" is shown listing "Today · Sep 14, 2026" $45.00, "Payment 2 · Sep 28, 2026" $45.00, "Payment 3 · Oct 12, 2026" $45.00, "Payment 4 · Oct 26, 2026" $45.00 and "Total" $180.00.

## Confirm
Click "Confirm and pay $45.00 today" and verify the merchant page shows "Order confirmed" with "Instalment 2 · Sep 28, 2026" reading "$45.00".
