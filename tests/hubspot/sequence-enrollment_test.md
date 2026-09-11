---
mode: testing
url: https://my-testing-repo-main.vercel.app/hubspot/sequence-enrollment?reset=true
max_steps: 40
tags: [hubspot, crm, crud]
---

# HubSpotty 29.3: Email sequence enrollment

Catalog objective: enroll a contact in a sequence.
Key assertion: the sequence is active on the contact timeline.

## Open the contact
Go to https://my-testing-repo-main.vercel.app/hubspot/sequence-enrollment?reset=true and verify the contact "Maria Chen" shows "Not enrolled in any sequence." and a timeline starting with "Contact created".

## Enroll
Click "Enroll in sequence", keep "Inbound demo follow-up · 4 steps" selected, click "Enroll", and verify the badge "Sequence active" appears.

## Verify the timeline
Verify the sequence panel shows "Inbound demo follow-up", step "1 of 4" and next email "Sep 15, 2026 · 9:00 AM", and the top timeline entry reads "Enrolled in sequence: Inbound demo follow-up".
