---
mode: testing
url: https://my-testing-repo-main.vercel.app/zoom-clone-app/schedule?reset=true
max_steps: 45
tags: [zoom, work-collab, meetings]
---

# Zuum 37.1: Meeting schedule with registration

Catalog objective: schedule a meeting that requires registration.
Key assertion: a registration link is generated and the form works.

## Schedule the meeting
Type "Partner onboarding" into "Topic", leave "When" as "2026-09-20 15:00", select "45 minutes" in "Duration", make sure "Required registration" is ticked, click "Save", and verify a green card titled "Meeting scheduled" appears.

## Verify the registration link was generated
Verify the "Meeting scheduled" card shows "Topic" of "Partner onboarding", "Meeting ID" of "914 2200 5508", "Registration" of "Required" and a "Registration link" of "/zoom-clone-app/register/91422005508".

## Open the registration form
Click "Open registration form" and verify the page title reads "Register — Partner onboarding" with the fields "Full name", "Email" and "Organisation".

## Register and confirm
Type "Sam Rivera" into "Full name", "sam@riverfield.test" into "Email", click "Register", and verify a green card titled "You are registered" shows "Name" of "Sam Rivera", "Email" of "sam@riverfield.test" and "Total registrants" of 1.
