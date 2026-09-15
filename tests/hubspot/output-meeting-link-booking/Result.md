---
test: ../meeting-link-booking_test.md
status: passed
started: 2026-09-13T13:14:22.428Z
duration_s: 193
session_id: 14cfee96-6896-412d-ae1b-287ec19d99a3
---

# HubSpotty 29.4: Meeting link booking — Result

## Pick a day ✓ passed (40.6s)
md5: 67416235e2f802d0735cb341ba7ddb20
Go to https://my-testing-repo-main.vercel.app/hubspot/meeting-link-booking?reset=true, click September 16 in the calendar, and verify the times "9:00am", "2:00pm" and "3:00pm" are offered (10:00 and 11:00 are busy).

## Pick a time ✓ passed (34.6s)
md5: ef9c14ae257f576a49b9e7d12d1c01b2
Click "2:00pm" and verify a details form for "2:00pm · Wednesday, September 16, 2026".

## Enter details and confirm ✓ passed (60.8s)
md5: c040db301017af3be51fcd01caab59bf
Type "Sam" into First name, "Lee" into Last name, "sam@acme.test" into Email, click "Confirm", and verify the badge "Booking confirmed".

## Verify the meeting ✓ passed (55.3s)
md5: 14b603151ca5a3b1f27f1b711655738e
Verify "You're booked with Priya Nair", "When" reading "2:00pm · Wednesday, September 16, 2026" and "Meeting ID" reading "MTG-161400".
