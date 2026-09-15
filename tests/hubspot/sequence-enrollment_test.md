---
mode: testing
url: https://my-testing-repo-main.vercel.app/hubspot-clone-app/sequences?reset=true
max_steps: 40
tags: [hubspot, crm, marketing]
---

# Hubsprout 29.3: Email sequence enrollment

Catalog objective: enrol a contact in a sequence.
Key assertion: the sequence is active on the contact timeline.

## Choose the contact and the sequence
Select "Mira Shah — mira@northgate.test" in "Contact", select "New lead nurture — 4 steps over 12 days" in "Sequence".

## Enrol
Click "Enrol" and verify a green banner reads "Mira enrolled in “New lead nurture”. It is now on their timeline."

## Verify the enrolment is active
Verify the Enrolments card shows "Active enrolments" of 1 with a "Mira Shah" row reading "New lead nurture · step 1 of 4" and an "Active" badge.

## Verify it is on the contact timeline
Verify the "Mira's timeline" card contains the entry "Enrolled in sequence “New lead nurture” — step 1 of 4".
