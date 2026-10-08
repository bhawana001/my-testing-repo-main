---
mode: testing
url: https://my-testing-repo-main.vercel.app/ba-clone-app/travel/olcilandingpageauthreq/public/en_in?reset=true
max_steps: 50
tags: [british-airways, airline, check-in]
---

# Britannic Airways: Online check-in with seat selection

Objective: check in for a flight inside the 24-hour window, give passport details and pick a seat.
Key assertion: a boarding pass is issued with the chosen seat.

## Retrieve the booking
Type "QX7K4P" into "Booking reference" and "Sharma" into "Last name", click "Find my booking", and verify "Who is checking in?" lists "Ms Ananya Sharma".

## Choose the passenger
Tick "Ms Ananya Sharma", click "Continue", and verify the heading reads "Passport for Ananya Sharma".

## Passport
Type "Z1234567" into "Passport number", select "Indian" in "Nationality", set "Expiry date" to 2031-08-15, click "Continue to seats", and verify the heading reads "Choose your seats".

## Seat
Click seat "33K" and verify the passenger button reads "Ananya: 33K".

## Dangerous goods
Click "Continue", tick "I confirm that no one in my party is carrying dangerous goods", click "Check in", and verify the boarding pass shows seat "33K" and gate "14" for flight BX142.
