---
mode: testing
url: https://my-testing-repo-main.vercel.app/paypal/guest-card-payment?reset=true
max_steps: 40
tags: [paypal, payments-infra, checkout]
---

# PayPally 10.2: Guest card payment

Catalog objective: choose pay by card without an account in the PayPally window.
Key assertion: the card form completes and the payment succeeds.

## Open the merchant page and the PayPally window
Go to https://my-testing-repo-main.vercel.app/paypal/guest-card-payment?reset=true, click "PayPally Checkout", and verify a popup shows "Pay $42.00 to Paper & Ink Studio" with a "Pay with Debit or Credit Card" button.

## Choose guest card
Click "Pay with Debit or Credit Card" and verify the popup shows "Pay with debit or credit card" with the note "No PayPally account needed." and card fields.

## Pay
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the "Pay $42.00" button, and verify the popup closes and the merchant page shows the heading "Payment complete".

## Verify guest payment
Verify "Payment method" reads "Guest card · Visa •••• 4242" and "Account" reads "None (guest)".
