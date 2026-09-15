---
mode: testing
url: https://my-testing-repo-main.vercel.app/wise-clone-app/send?reset=true
max_steps: 40
tags: [wise, payments, fx]
---

# Wize 15.1: Transfer quote

Catalog objective: create a USD to INR transfer quote and verify the fee breakdown.
Key assertion: the rate, fee and arrival estimate are all displayed.

## Set the quote up
Replace "You send" with "1000", leave "From currency" on "USD" and "To currency" on "INR".

## Verify the fee breakdown
Verify the quote shows "Fixed fee" of "$0.71", "Variable fee (0.43%)" of "$4.30" and "Total fees" of "$5.01".

## Verify the rate and the converted amount
Verify "Amount we'll convert" reads "$994.99", "Guaranteed rate" reads "1 USD = 83.42 INR" and "Recipient gets" reads "₹83,002.07".

## Verify the arrival estimate and create the transfer
Verify an arrival estimate of "by Wednesday, 17 September" is shown, then click the create button and verify a green banner titled "Transfer created" names transfer "TR-80115".
