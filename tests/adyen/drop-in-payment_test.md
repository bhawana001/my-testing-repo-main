---
mode: testing
url: https://my-testing-repo-main.vercel.app/adyen/drop-in-payment?reset=true
max_steps: 40
tags: [adyen, payments-infra, checkout]
---

# Adyenly 13.1: Drop-in payment

Catalog objective: pay via the Adyenly drop-in with a test card and 3DS2.
Key assertion: the Authorised result is surfaced to the shopper.

## Open the drop-in
Go to https://my-testing-repo-main.vercel.app/adyen/drop-in-payment?reset=true and verify "Pay Nordic Home" with amount "€210.00" and a "Drop-in" list containing "Credit or debit card", "iDEAL" and "PayPally" with the card form expanded.

## Pay with the 3DS2 card
Type "4000 0000 0000 3220" into Card number, "12/29" into Expiry, "123" into CVC, click the "Pay €210.00" button, and verify a "Confirm this payment" challenge asking for a one-time code appears.

## Complete the challenge
Type "123456" into the One-time code field, click "Approve payment", and verify the heading "Result: Authorised" appears.

## Verify the result
Verify "3DS2" reads "Challenge completed", "Amount paid" reads "€210.00" and a "Payment ID" starting with "8836" is shown.
