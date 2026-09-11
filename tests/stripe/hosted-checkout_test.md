---
mode: testing
url: https://my-testing-repo-main.vercel.app/stripe/hosted-checkout?reset=true
max_steps: 40
tags: [stripe, payments-infra, checkout]
---

# Stripely 9.1: Hosted Checkout session

Catalog objective: complete a Stripely Checkout payment with test card 4242.
Key assertion: the success page is reached and the amount is correct.

## Open the hosted checkout
Go to https://my-testing-repo-main.vercel.app/stripe/hosted-checkout?reset=true and verify the page shows "Pay Acme Cloud" with the amount "$79.00" and a "TEST MODE" badge.

## Pay with the test card
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, then click the "Pay $79.00" button and verify the heading "Payment successful" appears.

## Verify the amount
Verify "Amount paid" reads "$79.00", "Payment method" reads "Visa •••• 4242" and "Status" reads "Succeeded".
