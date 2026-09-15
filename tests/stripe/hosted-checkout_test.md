---
mode: testing
url: https://my-testing-repo-main.vercel.app/stripe-clone-app/checkout?reset=true
max_steps: 40
tags: [stripe, payments, checkout]
---

# Stripey 9.1: Hosted checkout

Catalog objective: complete a Stripey Checkout payment with test card 4242.
Key assertion: the success page is reached and the amount is correct.

## Verify the checkout total
Verify the order summary shows "Pro plan — annual" at "$240.00" and "Total due" of "$240.00".

## Fill in the card
Type "4242 4242 4242 4242" into "Card number", "12 / 34" into "Expiry", "123" into "CVC", and verify the pay button reads "Pay $240.00".

## Pay
Click "Pay $240.00" and verify a green banner titled "Payment successful" appears.

## Verify the receipt
Verify the receipt shows "Payment ID" of "pi_3Qb101Mx03", "Amount paid" of "$240.00", "Card" of "Visa ••••4242" and "Status" of "succeeded".
