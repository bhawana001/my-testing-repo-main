---
mode: testing
url: https://my-testing-repo-main.vercel.app/zoom/meeting-registration?reset=true
max_steps: 45
tags: [zoom, work-collab, booking]
---

# Zoomly 37.1: Meeting schedule with registration

Catalog objective: schedule a meeting requiring registration.
Key assertion: a registration link is generated and the form works.

## Schedule
Go to https://my-testing-repo-main.vercel.app/zoom/meeting-registration?reset=true, type "Product launch webinar" into Topic, keep "Registration required" checked, click "Save", and verify Registration "Required" and a registration link "https://zoomly.test/meeting/register/8512204".

## Open the registration link
Click "Open registration link" and verify a registration form for "Product launch webinar".

## Incomplete registration
Type "Sam" into First name, click "Register", and verify "First name, last name and a valid email are required."

## Complete registration
Type "Lee" into Last name and "sam@acme.test" into Email, click "Register", and verify "Registration approved" with "You're registered, Sam!" and a join link.

## Verify on the host side
Click "Back to meeting (host)" and verify "Registrants" reads 1.
