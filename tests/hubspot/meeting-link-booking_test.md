---
mode: testing
url: https://my-testing-repo-main.vercel.app/hubspot-clone-app/meetings?reset=true
max_steps: 40
tags: [hubspot, crm, scheduling]
---

# Hubsprout 29.4: Meeting link booking

Catalog objective: book a slot on the meeting link as a prospect.
Key assertion: a meeting is created and a confirmation is shown.

## Verify the open slots
Verify the page title reads "Book time with Priya Nair" and "Times available" reads 4.

## Pick a slot
Click the time button "2026-09-18 14:30" and verify "Selected" reads "2026-09-18 14:30".

## Enter your details and book
Type "Sam Rivera" into "Name", "sam@riverfield.test" into "Email", and click "Confirm the meeting".

## Verify the confirmation
Verify a green card titled "You are booked in" shows "Reference" of "MTG-20410", "When" of "2026-09-18 14:30", "With" of "Priya Nair", "Your email" of "sam@riverfield.test" and a "Scheduled" badge.
