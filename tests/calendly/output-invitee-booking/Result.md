---
test: ../invitee-booking_test.md
status: passed
started: 2026-09-11T11:38:13.449Z
duration_s: 193
session_id: 4c09bd43-ece2-4fdc-bc93-13f9372c75fe
---

# Calendlee 46.1: Event booking as invitee — Result

## Open the booking page ✓ passed (39s)
md5: 009879e552c7786fd86e60bdd5e3ad98
Go to https://my-testing-repo-main.vercel.app/calendly/invitee-booking?reset=true and verify the event "30 Minute Meeting" hosted by "Priya Nair" is shown with "Host time zone: Eastern Time (New York)" and the "Time zone" selector set to "India (IST)".

## Pick a day ✓ passed (60s)
md5: 92e527493c13f8fecbdb021a699d4a8c
Click the day "15" in the September 2026 calendar. Verify the label "Tuesday, September 15, 2026" appears above the time slots and the first slot reads "6:30pm" (which is 9:00am New York shown in India time).

## Pick the slot ✓ passed (36.6s)
md5: 0d28cd6722cfc8e092fe745e5e721ddf
Click the "6:30pm" slot, then click "Next". Verify the "Enter details" form shows Name "Demo User" and Email "demo@evals.dev".

## Schedule ✓ passed (15.6s)
md5: aef16e37e2defefc8f445852edebe60d
Click "Schedule Event".

## Verify both local times ✓ passed (37.6s)
md5: f68b4eaa6b76aecb2bae4681c210ca28
Verify the confirmation shows the badge "Confirmed", "Your time: 6:30pm · Tuesday, September 15, 2026 (India (IST))", "Host time: 9:00am · Tuesday, September 15, 2026 (Eastern Time (New York))", "Duration: 30 minutes" and a Reference starting with "CAL-".
