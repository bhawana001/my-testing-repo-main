---
mode: testing
url: https://my-testing-repo-main.vercel.app/stripe/3ds-challenge?reset=true
max_steps: 40
tags: [stripe, payments-infra, checkout]
---

# Stripely 9.2: 3DS challenge

Catalog objective: pay with a 3DS test card and approve the challenge.
Key assertion: the challenge completes and the payment succeeds.

## Open the checkout
Go to https://my-testing-repo-main.vercel.app/stripe/3ds-challenge?reset=true and verify the page shows "Pay Northwind Travel" with the amount "$120.00".

## Pay with the 3DS card
Type "4000 0000 0000 3220" into Card number, "12/29" into Expiry, "123" into CVC, click the "Pay $120.00" button, and verify a "Bank verification · 3-D Secure" panel titled "Confirm this payment" appears asking for a one-time code.

## Enter a wrong code
Type "000000" into the One-time code field, click "Approve payment", and verify the error "Incorrect verification code" is shown.

## Approve the challenge
Clear the One-time code field, type "123456", click "Approve payment", and verify the heading "Payment successful" appears.

## Verify the result
Verify "3-D Secure" reads "Authenticated", "Amount paid" reads "$120.00" and "Status" reads "Succeeded".
