# Online Check-in — Requirements

**Product:** Britannic Airways website (demo clone of British Airways)
**Feature:** Online check-in
**Start page:** https://my-testing-repo-main.vercel.app/ba-clone-app/travel/olcilandingpageauthreq/public/en_in
**Version:** 1.0 · 8 Oct 2026

## Goal

A passenger with a booking can check in online, choose a seat for free and get a mobile boarding pass, without visiting an airport desk.

## Requirements

### Find the booking

- **REQ-CI-01** The passenger finds their booking by entering a 6-character booking reference and their last name, then selecting "Find my booking". The last name is not case-sensitive.
- **REQ-CI-02** If either field is empty, the page shows "Enter your booking reference and last name."
- **REQ-CI-03** If no booking matches both values, the page shows "We can't find a booking with those details. Check your booking reference and last name and try again." The page must not reveal which of the two values was wrong.

### When check-in is open

- **REQ-CI-04** Online check-in opens 24 hours before departure and closes 60 minutes before departure.
- **REQ-CI-05** Before the window opens, the passenger cannot start check-in. The page names the flight and date and says exactly when check-in opens, for example: "Check-in for BX138 on Tue 20 Oct 2026 isn't open yet. It opens 24 hours before departure, at 02:20 on Mon 19 Oct 2026."
- **REQ-CI-06** After the window closes, the page says "Online check-in has closed for this booking. Please go to the airport check-in desk."

### Passengers and passports

- **REQ-CI-07** The passenger chooses who on the booking is checking in. "Continue" stays disabled until at least one passenger is chosen.
- **REQ-CI-08** Each chosen passenger must give a passport number (8 or 9 letters and numbers), a nationality and a passport expiry date.
- **REQ-CI-09** The passport must be valid for at least 6 months after the last flight on the booking. Otherwise the page shows "Your passport must be valid for at least 6 months after your trip".

### Seats

- **REQ-CI-10** Seat selection is free once check-in is open. The Economy seat map shows rows 30 to 41.
- **REQ-CI-11** Seats that are already taken cannot be selected, and two passengers on the same booking cannot have the same seat.
- **REQ-CI-12** "Continue" stays disabled until every chosen passenger has a seat.

### Safety declaration

- **REQ-CI-13** Before completing check-in, the passenger must confirm that no one in their party is carrying dangerous goods. "Check in" stays disabled until they do.

### Boarding pass

- **REQ-CI-14** After check-in, each passenger gets a boarding pass showing their name, flight number, departure and arrival airports, date, departure time, boarding time, gate, seat, boarding group and sequence number.
- **REQ-CI-15** Boarding time is 45 minutes before departure.
- **REQ-CI-16** Passengers who were not checked in can be checked in later from the same booking. Passengers who are already checked in can view their boarding passes again.

## Test data

| Booking | Last name | Flight | Departs | Check-in |
|---|---|---|---|---|
| QX7K4P | Sharma | BX142 New Delhi → London | Fri 09 Oct 2026, 02:35 | Open |
| LM2R9D | Patel | BX138 Mumbai → London | Tue 20 Oct 2026, 02:20 | Not open yet |

The site's clock is fixed at Thu 08 Oct 2026, 10:00 India time, so these results don't change from one day to the next.

## Out of scope

Check-in for Business and First cabins, paid seat upgrades, adding bags during check-in, and printed boarding passes.
