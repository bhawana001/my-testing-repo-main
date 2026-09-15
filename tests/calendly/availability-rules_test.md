---
mode: testing
url: https://my-testing-repo-main.vercel.app/calendly-clone-app/availability?reset=true
max_steps: 40
tags: [calendly, scheduling, availability]
---

# Calendari 46.2: Availability rules respected

Catalog objective: verify blocked times are not offered.
Key assertion: no slots are shown during busy calendar times.

## Verify the counts
With "30 minute meeting" selected, verify "Slots in working hours" reads 16, "Offered to invitees" reads 13 and "Withheld" reads 3.

## Verify the busy blocks
Verify the "Busy on the host calendar" card lists "Standup" at "11:00–12:00 IST" and "1:1 with Dan" at "15:30–16:00 IST".

## Verify the standup slot is withheld
Verify the slot-by-slot table has a row for host time "11:00 IST" marked "Not offered" with the reason "Standup".

## Verify the 1:1 slot is withheld
Verify the row for host time "15:30 IST" is marked "Not offered" with the reason "1:1 with Dan", and the row for "09:00 IST" is marked "Offered".
