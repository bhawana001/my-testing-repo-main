---
mode: testing
url: https://my-testing-repo-main.vercel.app/ba-clone-app/travel/flightstatus/public/en_in?reset=true
max_steps: 25
tags: [british-airways, airline, flight-status]
---

# Britannic Airways: Flight status by flight number

Objective: look up today's status for a flight number.
Key assertion: the flight is shown as delayed with its new departure time.

## Search
Type "BX142" into "Flight number", leave "Date" on "Today – Thu 08 Oct 2026", click "Search", and verify BX142 New Delhi to London is marked "Delayed" with estimated departure "04:10".
