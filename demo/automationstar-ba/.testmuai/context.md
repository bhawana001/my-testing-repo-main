# Project instructions — Britannic Airways

Applies to every test in this project.

## Where to test

- Test only the Britannic Airways demo at https://my-testing-repo-main.vercel.app/ba-clone-app. Never open britishairways.com.
- Always add `?reset=true` to the first URL of a test, so the test starts from the original data.
- Online check-in starts at /ba-clone-app/travel/olcilandingpageauthreq/public/en_in.

## Test data

- Booking that can check in now: reference **QX7K4P**, last name **Sharma** (one passenger, Ms Ananya Sharma, flight BX142).
- Booking that can't check in yet: reference **LM2R9D**, last name **Patel** (flight BX138 on 20 Oct 2026).
- Passport details: number **Z1234567**, nationality **Indian**, expiry **2031-08-15**.
- The site's date is always Thu 08 Oct 2026, 10:00 India time. Never work dates out from today's real date.

## How to write tests

- Name tests "Check-in: <what is checked>", for example "Check-in: booking not found".
- Each step ends with one check, and every check matches exact on-screen text (a heading, message, button or value).
- Choose seats by seat number, for example "33K", never by position on the map.
- Write expected messages word for word, as the requirements give them.
- When a test covers a requirement, tag it with that requirement's ID, for example `REQ-CI-05`.
