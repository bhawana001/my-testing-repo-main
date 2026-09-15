---
mode: testing
url: https://my-testing-repo-main.vercel.app/calendly-clone-app?reset=true
max_steps: 45
tags: [calendly, scheduling, booking]
---

# Calendari 46.1: Event booking as invitee

Catalog objective: book a 30 minute slot with a timezone shift.
Key assertion: the correct local time is confirmed on both sides.

## Choose the event and your timezone
Leave "What are you booking" on "30 minute meeting — free", select "Eastern Time (EDT)" in "Your timezone", and verify "Slots offered" reads 13.

## Pick a time
Click the time button labelled "03:30 EDT" and verify "You picked" reads "03:30 EDT" and "Priya Nair sees" reads "13:00 IST".

## Enter your details and schedule
Type "Sam Rivera" into "Name", "sam@riverfield.test" into "Email", click "Schedule event", and verify a green card titled "Booking confirmed" appears.

## Verify both sides show the right local time
Verify the confirmation shows "Reference" of "CAL-4100", "Your time" of "03:30 EDT" and "Priya Nair's time" of "13:00 IST".
