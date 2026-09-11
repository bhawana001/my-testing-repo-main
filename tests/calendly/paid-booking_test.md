---
mode: testing
url: https://my-testing-repo-main.vercel.app/calendly/paid-booking?reset=true
max_steps: 45
tags: [calendly, docs-productivity, booking]
---

# Calendlee 46.4: Payment collection booking

Catalog objective: book a paid event with a test card.
Key assertion: the booking is confirmed with a payment receipt.

## Open the event
Go to https://my-testing-repo-main.vercel.app/calendly/paid-booking?reset=true and verify "Strategy Consultation" costs "$75.00".

## Pick a time
Click September 22, click "1:00pm", click "Next", and verify a payment form is shown.

## Declined card
Type "4000 0000 0000 0002" into Card number, "12/29" into Expiry, "123" into CVC, click "Pay $75.00 and schedule", and verify "Your card was declined."

## Pay with the test card
Replace the card number with "4242 4242 4242 4242", click "Pay $75.00 and schedule", and verify "Booking confirmed".

## Verify the receipt
Verify "When" reads "1:00pm · Tuesday, September 22, 2026" and the Payment receipt shows Receipt # "RCPT-221300", Amount paid "$75.00" and Card "Visa •••• 4242".
