---
mode: testing
url: https://my-testing-repo-main.vercel.app/paypal-clone-app/checkout?reset=true
max_steps: 45
tags: [paypal, payments, checkout]
---

# PayPaal 10.2: Guest card payment

Catalog objective: choose pay by card without an account in the PayPaal window.
Key assertion: the card form completes and the payment succeeds.

## Open the PayPaal window
Click "Pay with PayPaal" and verify the dialog titled "PayPaal" opens.

## Switch to paying by card
Click the "Pay by card" tab and verify a badge reads "Paying as a guest — no PayPaal account needed".

## Fill in the card
Type "4242 4242 4242 4242" into "Card number", "12 / 34" into "Expiry", "123" into "CVC", and click "Pay $41.06 as guest".

## Verify the payment succeeded without an account
Verify a green banner titled "Payment complete" says "$41.06" was paid to Alder & Oak with "Guest card" and shows transaction "TX-9921".
