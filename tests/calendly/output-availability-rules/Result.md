---
test: ../availability-rules_test.md
status: passed
started: 2026-09-13T19:02:54.643Z
duration_s: 110
session_id: ff1cd571-04d5-42a8-90fa-3735b8b100b6
---

# Calendlee 46.2: Availability rules respected — Result

## Pick a day with a conflict ✓ passed (43.3s)
md5: a154adfef983e102d828a709b9f6b4d7
Go to https://my-testing-repo-main.vercel.app/calendly/availability-rules?reset=true, click September 15 in the calendar, and verify the slot list starts "9:00am", "9:30am" then jumps to "11:30am", with "12 of 15 times available".

## Show the host's busy blocks ✓ passed (24.7s)
md5: 0414ab02199162f6d16504d42ae04d29
Turn on "Show host's busy times" and verify "Dentist 10:00–11:30" is listed.

## Verify blocked times are absent ✓ passed (40.7s)
md5: 268f25f33ee76ef862fe5c44209b0344
Verify no "10:00am", "10:30am" or "11:00am" slot is offered on September 15, and that September 17 (all-day offsite) and the weekend days are disabled in the calendar.
