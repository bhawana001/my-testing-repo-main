---
mode: testing
url: https://my-testing-repo-main.vercel.app/calendly/invitee-booking?reset=true
max_steps: 30
tags: [calendly, docs-productivity, booking]
---

# Calendlee 46.1: Event booking as invitee

Catalog objective: book a 30 minute slot with a timezone shift.
Key assertion: the correct local time is confirmed on both sides.

## Open the booking page
Go to https://my-testing-repo-main.vercel.app/calendly/invitee-booking?reset=true and verify the event "30 Minute Meeting" hosted by "Priya Nair" is shown with "Host time zone: Eastern Time (New York)" and the "Time zone" selector set to "India (IST)".

## Pick a day
Click the day "15" in the September 2026 calendar. Verify the label "Tuesday, September 15, 2026" appears above the time slots and the first slot reads "6:30pm" (which is 9:00am New York shown in India time).

## Pick the slot
Click the "6:30pm" slot, then click "Next". Verify the "Enter details" form shows Name "Demo User" and Email "demo@evals.dev".

## Schedule
Click "Schedule Event".

## Verify both local times
Verify the confirmation shows the badge "Confirmed", "Your time: 6:30pm · Tuesday, September 15, 2026 (India (IST))", "Host time: 9:00am · Tuesday, September 15, 2026 (Eastern Time (New York))", "Duration: 30 minutes" and a Reference starting with "CAL-".
