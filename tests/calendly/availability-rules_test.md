---
mode: testing
url: https://my-testing-repo-main.vercel.app/calendly/availability-rules?reset=true
max_steps: 45
tags: [calendly, docs-productivity, booking]
---

# Calendlee 46.2: Availability rules respected

Catalog objective: verify blocked times are not offered.
Key assertion: no slots are shown during busy calendar times.

## Pick a day with a conflict
Go to https://my-testing-repo-main.vercel.app/calendly/availability-rules?reset=true, click September 15 in the calendar, and verify the slot list starts "9:00am", "9:30am" then jumps to "11:30am", with "12 of 15 times available".

## Show the host's busy blocks
Turn on "Show host's busy times" and verify "Dentist 10:00–11:30" is listed.

## Verify blocked times are absent
Verify no "10:00am", "10:30am" or "11:00am" slot is offered on September 15, and that September 17 (all-day offsite) and the weekend days are disabled in the calendar.
