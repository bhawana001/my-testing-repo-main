---
mode: testing
url: https://my-testing-repo-main.vercel.app/calendly-clone-app?reset=true
max_steps: 50
tags: [calendly, scheduling, booking]
---

# Calendari 46.3: Reschedule flow

Catalog objective: reschedule a booking from the confirmation link.
Key assertion: the old slot is freed and the new one confirmed.

## Book a slot first
Select "Eastern Time (EDT)" in "Your timezone", click the time button "03:30 EDT", type "Sam Rivera" into "Name" and "sam@riverfield.test" into "Email", click "Schedule event", and verify a "Booking confirmed" card shows "Your time" of "03:30 EDT".

## Open the confirmation link
Click "Open the confirmation link" and verify the booking page shows "Reference CAL-4100" with a "Confirmed" badge and "Your time" of "03:30 EDT".

## Reschedule
Click "Reschedule" and verify a "Pick a new time" card appears, then click the time button "04:00 EDT".

## Verify the old slot is freed and the new one confirmed
Verify a green banner reads "Rescheduled — 03:30 EDT is free again and 04:00 EDT is confirmed.", "Your time" now reads "04:00 EDT", and the History card contains "Rescheduled from 03:30 EDT to 04:00 EDT".
