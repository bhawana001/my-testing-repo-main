---
mode: testing
url: https://my-testing-repo-main.vercel.app/ba-clone-app/travel/olcilandingpageauthreq/public/en_in?reset=true
max_steps: 25
tags: [british-airways, airline, check-in, negative]
---

# Britannic Airways: Check-in refused before the window opens

Objective: try to check in for a flight more than 24 hours away.
Key assertion: check-in is refused with the time it opens.

## Retrieve a future booking
Type "LM2R9D" into "Booking reference" and "Patel" into "Last name", click "Find my booking", and verify the message says check-in for BX138 on Tue 20 Oct 2026 isn't open yet and opens at 02:20 on Mon 19 Oct 2026.
