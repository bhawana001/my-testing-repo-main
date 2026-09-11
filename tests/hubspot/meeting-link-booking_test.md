---
mode: testing
url: https://my-testing-repo-main.vercel.app/hubspot/meeting-link-booking?reset=true
max_steps: 40
tags: [hubspot, crm, booking]
---

# HubSpotty 29.4: Meeting link booking

Catalog objective: book a slot on a meeting link as a prospect.
Key assertion: the meeting is created and a confirmation is shown.

## Pick a day
Go to https://my-testing-repo-main.vercel.app/hubspot/meeting-link-booking?reset=true, click September 16 in the calendar, and verify the times "9:00am", "2:00pm" and "3:00pm" are offered (10:00 and 11:00 are busy).

## Pick a time
Click "2:00pm" and verify a details form for "2:00pm · Wednesday, September 16, 2026".

## Enter details and confirm
Type "Sam" into First name, "Lee" into Last name, "sam@acme.test" into Email, click "Confirm", and verify the badge "Booking confirmed".

## Verify the meeting
Verify "You're booked with Priya Nair", "When" reading "2:00pm · Wednesday, September 16, 2026" and "Meeting ID" reading "MTG-161400".
