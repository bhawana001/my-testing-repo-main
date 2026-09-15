---
test: ../paid-booking_test.md
status: passed
started: 2026-09-13T19:07:11.669Z
duration_s: 257
session_id: 135b9d3c-99a2-4e0b-9d09-48c70c81583e
---

# Calendlee 46.4: Payment collection booking — Result

## Open the event ✓ passed (28.7s)
md5: c26732868240b787c0ce78030f1cbe58
Go to https://my-testing-repo-main.vercel.app/calendly/paid-booking?reset=true and verify "Strategy Consultation" costs "$75.00".

## Pick a time ✓ passed (46.5s)
md5: a3b76f3c098db2ca9c8c337ba10b3f55
Click September 22, click "1:00pm", click "Next", and verify a payment form is shown.

## Declined card ✓ passed (39.9s)
md5: 0f67a6fe3084e0b6089d9f2a83590013
Type "4000 0000 0000 0002" into Card number, "12/29" into Expiry, "123" into CVC, click "Pay $75.00 and schedule", and verify "Your card was declined."

## Pay with the test card ✓ passed (92.5s)
md5: 2acb1ae75f5003cd32958e8e851b9af0
Replace the card number with "4242 4242 4242 4242", click "Pay $75.00 and schedule", and verify "Booking confirmed".

## Verify the receipt ✓ passed (47.7s)
md5: c83d3d66e257c462c588f87d1cfd950c
Verify "When" reads "1:00pm · Tuesday, September 22, 2026" and the Payment receipt shows Receipt # "RCPT-221300", Amount paid "$75.00" and Card "Visa •••• 4242".
