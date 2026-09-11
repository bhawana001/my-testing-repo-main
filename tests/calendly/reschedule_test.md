---
mode: testing
url: https://my-testing-repo-main.vercel.app/calendly/reschedule?reset=true
max_steps: 45
tags: [calendly, docs-productivity, booking]
---

# Calendlee 46.3: Reschedule flow

Catalog objective: reschedule a booking from the confirmation email link.
Key assertion: the old slot is freed and the new one confirmed.

## Open the confirmation email
Go to https://my-testing-repo-main.vercel.app/calendly/reschedule?reset=true and verify the email "Confirmed: 30 Minute Meeting with Priya Nair" shows "9:00am · Tuesday, September 15, 2026 (Eastern)".

## Reschedule
Click "Reschedule", click September 16, click the "2:00pm" slot, and verify a "Confirm new time" button appears.

## Confirm
Click "Confirm new time" and verify "Rescheduled" with New time "2:00pm · Wednesday, September 16, 2026" and Previous time "9:00am · Tuesday, September 15, 2026".

## Verify the old slot was freed
Click "Check availability on the old day" and verify September 15 now offers the "9:00am" slot again.
