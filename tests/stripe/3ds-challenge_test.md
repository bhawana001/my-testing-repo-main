---
mode: testing
url: https://my-testing-repo-main.vercel.app/stripe-clone-app/checkout?reset=true
max_steps: 40
tags: [stripe, payments, authentication]
---

# Stripey 9.2: 3DS challenge

Catalog objective: pay with a 3DS test card and approve the challenge.
Key assertion: the challenge completes and the payment succeeds.

## Use the 3DS test card
Type "4000 0025 0000 3155" into "Card number", "12 / 34" into "Expiry", "123" into "CVC", and click "Pay $240.00".

## Verify the challenge appears
Verify a dialog titled "3D Secure authentication" appears saying the bank needs to verify this payment, showing "Amount" of "$240.00" and "Card" of "Visa ••••3155".

## Approve the challenge
Click "Approve payment" and verify a green banner titled "Payment successful" appears.

## Verify the payment is marked as authenticated
Verify the receipt shows "Card" of "Visa ••••3155", "Status" of "succeeded" and a badge reading "3D Secure authenticated".
