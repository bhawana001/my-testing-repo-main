---
test: ../guest-card-payment_test.md
status: passed
started: 2026-09-11T17:11:56.773Z
duration_s: 186
session_id: ff89eeba-8c93-4c91-a761-2f29c5b0d926
---

# PayPally 10.2: Guest card payment — Result

## Open the merchant page and the PayPally window ✓ passed (39.7s)
md5: 5d62864a4694e1226d8a8eb051e0174f
Go to https://my-testing-repo-main.vercel.app/paypal/guest-card-payment?reset=true, click "PayPally Checkout", and verify a popup shows "Pay $42.00 to Paper & Ink Studio" with a "Pay with Debit or Credit Card" button.

## Choose guest card ✓ passed (48s)
md5: ed4031db3536851798769b12e138361b
Click "Pay with Debit or Credit Card" and verify the popup shows "Pay with debit or credit card" with the note "No PayPally account needed." and card fields.

## Pay ✓ passed (62.3s)
md5: ba0430b881d08f1dd6a6b4e7612d633f
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the "Pay $42.00" button, and verify the popup closes and the merchant page shows the heading "Payment complete".

## Verify guest payment ✓ passed (33.8s)
md5: 9b5cf8194fe22153da4646cf74c4be46
Verify "Payment method" reads "Guest card · Visa •••• 4242" and "Account" reads "None (guest)".
