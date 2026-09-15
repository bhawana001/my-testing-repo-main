---
mode: testing
url: https://my-testing-repo-main.vercel.app/calendly-clone-app?reset=true
max_steps: 45
tags: [calendly, scheduling, payments]
---

# Calendari 46.4: Payment collection booking

Catalog objective: book a paid event with a test card.
Key assertion: the booking is confirmed with a payment receipt.

## Choose the paid event
Select "60 minute paid consultation — $75" in "What are you booking", select "Eastern Time (EDT)" in "Your timezone", and verify "Slots offered" reads 10 and a "Card number" field appears.

## Try to confirm without a card
Click the time button "03:30 EDT", type "Sam Rivera" into "Name" and "sam@riverfield.test" into "Email", click "Pay $75 and confirm", and verify a red banner says a paid event needs a card number.

## Pay with the test card
Type "4242 4242 4242 4242" into "Card number", click "Pay $75 and confirm", and verify a green card titled "Booking confirmed" appears.

## Verify the receipt
Verify the confirmation shows "Paid" of "$75.00", "Card" of "•••• 4242", "Receipt" of "RCPT-4100" and a "Paid" badge.
